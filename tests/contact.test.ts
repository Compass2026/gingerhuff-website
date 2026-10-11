import {test} from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/contact.ts';
const valid={name:'Launch Test',email:'visitor@example.com',phone:'',location:'Edwardsville, IL',serviceType:'Home Interiors',investment:'Not sure yet',details:'Test',website:'',startedAt:Date.now()-5000};
let number=0;
async function run(body:unknown=valid,overrides:Record<string,unknown>={}){
 const req={method:'POST',headers:{origin:'https://www.gingerhuffinteriors.com','content-type':'application/json','x-vercel-forwarded-for':`test-${number++}`},body,...overrides};
 const result={status:0,body:{} as any,headers:{} as Record<string,string>};
 const res={statusCode:0,setHeader(k:string,v:string){result.headers[k]=v;},end(value:string){result.status=this.statusCode;result.body=JSON.parse(value);}};
 await handler(req as any,res as any);return result;
}
test('inquiry API protects visitors from false success and validates provider delivery acceptance',async t=>{
 const original=globalThis.fetch;const oldKey=process.env.RESEND_API_KEY,oldFrom=process.env.CONTACT_FROM;
 process.env.CONTACT_FROM='Ginger <inquiries@send.gingerhuffinteriors.com>';
 try{
 await t.test('missing key returns unavailable, not success',async()=>{delete process.env.RESEND_API_KEY;const r=await run();assert.equal(r.status,503);assert.equal(r.body.ok,undefined);});
 process.env.RESEND_API_KEY='test-only-not-a-real-key';
 let sends:any[]=[];globalThis.fetch=async(url,init)=>{sends.push({url,init});return new Response(JSON.stringify({id:'mock-email-id'}),{status:200});};
 await t.test('successful inquiry has fixed recipient and visitor reply-to',async()=>{const r=await run();assert.equal(r.status,200);const payload=JSON.parse(sends[0].init.body);assert.deepEqual(payload.to,['ghi@gingerhuffinteriors.com']);assert.equal(payload.reply_to,'visitor@example.com');assert.equal(payload.from,process.env.CONTACT_FROM);});
 await t.test('retry uses same idempotency key',async()=>{await run();assert.equal(sends[0].init.headers['Idempotency-Key'],sends[1].init.headers['Idempotency-Key']);});
 await t.test('invalid email, header injection and blank name never reach provider',async()=>{const count=sends.length;for(const data of [{...valid,email:'bad'},{...valid,name:'Test\r\nBcc: other@example.com'},{...valid,name:'  '}])assert.equal((await run(data)).status,400);assert.equal(sends.length,count);});
 await t.test('honeypot, blank details and oversized inquiry rejected',async()=>{assert.equal((await run({...valid,website:'spam'})).status,400);assert.equal((await run({...valid,details:'   '})).status,400);assert.equal((await run({...valid,details:'x'.repeat(5001)})).status,400);});
 await t.test('cross-site request rejected',async()=>assert.equal((await run(valid,{headers:{origin:'https://unrelated.example','content-type':'application/json'}})).status,403));
 await t.test('wrong HTTP method rejected',async()=>assert.equal((await run(valid,{method:'GET'})).status,405));
 await t.test('provider rejection is never shown as successful',async()=>{globalThis.fetch=async()=>new Response(JSON.stringify({message:'denied'}),{status:403});assert.equal((await run()).status,502);});
 await t.test('provider timeout is recoverable, not a false success',async()=>{globalThis.fetch=async()=>{throw new Error('timeout')};const r=await run();assert.equal(r.status,502);assert.equal(r.body.ok,undefined);});
 }finally{globalThis.fetch=original;if(oldKey===undefined)delete process.env.RESEND_API_KEY;else process.env.RESEND_API_KEY=oldKey;if(oldFrom===undefined)delete process.env.CONTACT_FROM;else process.env.CONTACT_FROM=oldFrom;}
});
