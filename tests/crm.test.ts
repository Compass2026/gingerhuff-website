// Compass CRM ingestion (CRM Lite) from the inquiry endpoint, with mocked
// Resend and a mocked Compass intake. No real email or request leaves the
// process; tokens and addresses are fixtures.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/contact.ts';

const valid={name:'Launch Test',email:'visitor@example.com',phone:'618-555-0142',location:'Edwardsville, IL',serviceType:'Home Interiors',investment:'Not sure yet',details:'We would like help with a living room.',website:'',submissionId:'5f0e1d2c-3b4a-4968-8776-5a4b3c2d1e0f'};
const CRM_URL='https://crm.example.test/functions/v1/inquiry-intake';
const TOKEN='cit_test-only-not-a-real-token';
let number=0;
async function run(body:unknown,overrides:Record<string,unknown>={}){
 const req={method:'POST',headers:{origin:'https://www.gingerhuffinteriors.com','content-type':'application/json','x-vercel-forwarded-for':`crm-${number++}`},body,...overrides};
 const result={status:0,body:{} as any};
 const res={statusCode:0,setHeader(){},end(value:string){result.status=this.statusCode;result.body=JSON.parse(value);}};
 await handler(req as any,res as any);return result;
}
const fresh=()=>({...valid,startedAt:Date.now()-5000});

// Resend keeps one email per idempotency key; Compass keeps one inquiry per submission id.
function world(o:{resend?:'ok'|'down'|'reject',crm?:'ok'|'down'|'reject'}={}){
 const w={resend:o.resend??'ok',crm:o.crm??'ok',emails:new Map<string,any>(),resendCalls:0,crmCalls:[] as any[],inquiries:new Map<string,any>()};
 globalThis.fetch=(async(url:string,init:any)=>{
  if(url==='https://api.resend.com/emails'){
   w.resendCalls++;
   if(w.resend==='down') throw new Error('network');
   if(w.resend==='reject') return new Response(JSON.stringify({message:'denied'}),{status:403});
   const key=init.headers['Idempotency-Key'];
   if(!w.emails.has(key)) w.emails.set(key,{id:`email-${w.emails.size+1}`,body:JSON.parse(init.body)});
   return new Response(JSON.stringify({id:w.emails.get(key).id}),{status:200});
  }
  if(url===CRM_URL){
   const payload=JSON.parse(init.body);
   w.crmCalls.push({headers:init.headers,payload});
   if(w.crm==='down') throw new Error('connect ECONNREFUSED');
   if(w.crm==='reject') return new Response(JSON.stringify({ok:false,error:'unauthorized'}),{status:401});
   const dup=w.inquiries.has(payload.submission_id);
   if(!dup) w.inquiries.set(payload.submission_id,{...payload});
   else if(payload.email_status==='accepted') w.inquiries.get(payload.submission_id).email_status='accepted';
   return new Response(JSON.stringify({ok:true,inquiry_id:'inq-1',duplicate:dup}),{status:200});
  }
  throw new Error(`unexpected request to ${url}`);
 }) as any;
 return w;
}

test('Compass CRM ingestion keeps the email, saves once, and never reports a false success',async t=>{
 const original=globalThis.fetch;
 const saved={...process.env};
 process.env.RESEND_API_KEY='test-only-not-a-real-key';
 process.env.CONTACT_FROM='Ginger <inquiries@send.gingerhuffinteriors.com>';
 const logs:string[]=[];const err=console.error;console.error=(...a:unknown[])=>{logs.push(JSON.stringify(a));};
 const crmOn=()=>{process.env.CRM_INTAKE_URL=CRM_URL;process.env.CRM_INTAKE_SOURCE='ginger-huff-website';process.env.CRM_INTAKE_TOKEN=TOKEN;delete process.env.CRM_INTAKE_REQUIRED;};
 const crmOff=()=>{delete process.env.CRM_INTAKE_URL;delete process.env.CRM_INTAKE_SOURCE;delete process.env.CRM_INTAKE_TOKEN;delete process.env.CRM_INTAKE_REQUIRED;};
 try{
  await t.test('without CRM configuration the form is email-only, exactly as before',async()=>{
   crmOff();const w=world();
   const r=await run(fresh());
   assert.equal(r.status,200);assert.equal(w.crmCalls.length,0);assert.equal(w.emails.size,1);
  });
  await t.test('configured: one email and one Compass inquiry; the token stays server-side; no client id is sent',async()=>{
   crmOn();const w=world();
   const r=await run(fresh());
   assert.deepEqual(r.body,{ok:true});
   assert.equal(w.crmCalls.length,1);
   const {headers,payload}=w.crmCalls[0];
   assert.equal(headers.Authorization,`Bearer ${TOKEN}`);
   assert.equal(headers['X-Compass-Source'],'ginger-huff-website');
   assert.equal(payload.submission_id,valid.submissionId);
   assert.equal(payload.message,valid.details);
   assert.equal(payload.service_type,'Home Interiors');
   assert.equal(payload.email_status,'accepted');
   assert.equal(payload.email_provider_id,'email-1');
   assert.ok(!('client_id' in payload)&&!('clientId' in payload));
   assert.ok(!JSON.stringify(r.body).includes(TOKEN));
   assert.match([...w.emails.values()][0].body.text,/Reference: 5f0e1d2c-3b4a-4968-8776-5a4b3c2d1e0f/);
  });
  await t.test('the same submission sent twice is one email and one inquiry',async()=>{
   crmOn();const w=world();
   await run(fresh());await run(fresh());
   assert.equal(w.emails.size,1);assert.equal(w.inquiries.size,1);assert.equal(w.resendCalls,2);
  });
  await t.test('separate submissions from the same person are separate inquiries',async()=>{
   crmOn();const w=world();
   await run(fresh());await run({...fresh(),submissionId:'7a6b5c4d-3e2f-4a1b-8c9d-0e1f2a3b4c5d',details:'Also the dining room.'});
   assert.equal(w.inquiries.size,2);assert.equal(w.emails.size,2);
  });
  await t.test('CRM down: the visitor is asked to retry (no false success); the retry saves it without a second email',async()=>{
   crmOn();const w=world({crm:'down'});
   const first=await run(fresh());
   assert.equal(first.status,502);assert.equal(first.body.ok,undefined);
   assert.match(first.body.error,/emailed, but we could not finish saving it/);
   assert.equal(w.crmCalls.length,2,'one quick retry inside the request');
   w.crm='ok';
   const second=await run(fresh());
   assert.deepEqual(second.body,{ok:true});
   assert.equal(w.emails.size,1,'Resend reused the first send');
   assert.equal(w.inquiries.size,1);
  });
  await t.test('email failed but CRM up: the inquiry is kept in Compass (email failed) and the visitor retries; the retry updates it',async()=>{
   crmOn();const w=world({resend:'reject'});
   const first=await run(fresh());
   assert.equal(first.status,502);
   assert.equal(w.inquiries.get(valid.submissionId).email_status,'failed');
   w.resend='ok';
   assert.equal((await run(fresh())).status,200);
   assert.equal(w.inquiries.get(valid.submissionId).email_status,'accepted');
   assert.equal(w.inquiries.size,1);
  });
  await t.test('both down: a plain failure, nothing claimed',async()=>{
   crmOn();world({resend:'down',crm:'down'});
   const r=await run(fresh());
   assert.equal(r.status,502);assert.match(r.body.error,/could not confirm/);
  });
  await t.test('a refused token is a failure, not a success',async()=>{
   crmOn();const w=world({crm:'reject'});
   assert.equal((await run(fresh())).status,502);
   assert.equal(w.crmCalls.length,1,'a 401 is not retried');
  });
  await t.test('incomplete CRM configuration fails safe (email still sent, visitor asked to retry)',async()=>{
   crmOn();delete process.env.CRM_INTAKE_TOKEN;const w=world();
   assert.equal((await run(fresh())).status,502);
   assert.equal(w.emails.size,1);assert.equal(w.crmCalls.length,0);
  });
  await t.test('CRM_INTAKE_REQUIRED=false: an emailed inquiry is a success while the CRM is down (logged with its reference)',async()=>{
   crmOn();process.env.CRM_INTAKE_REQUIRED='false';world({crm:'down'});
   assert.equal((await run(fresh())).status,200);
   assert.ok(logs.some(l=>l.includes('CRM save pending')&&l.includes(valid.submissionId)));
  });
  await t.test('a page without submission ids still dedupes by content; a malformed id is refused',async()=>{
   crmOn();const w=world();
   const {submissionId,...old}=fresh();
   await run(old);await run({...old,startedAt:Date.now()-6000});
   assert.equal(w.inquiries.size,1);assert.equal(w.emails.size,1);
   assert.match([...w.inquiries.keys()][0],/^web-[0-9a-f]{40}$/);
   assert.equal((await run({...fresh(),submissionId:'bad id!'})).status,400);
  });
  await t.test('logs never carry the visitor details or the token',async()=>{
   const all=logs.join('\n');
   for(const s of [TOKEN,'visitor@example.com','555-0142','living room']) assert.ok(!all.includes(s),s);
  });
 }finally{globalThis.fetch=original;console.error=err;for(const k of Object.keys(process.env)) if(!(k in saved)) delete process.env[k];Object.assign(process.env,saved);}
});
