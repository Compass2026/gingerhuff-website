import { createHash } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';
type Request = IncomingMessage & { body?: unknown };
const attempts = new Map<string, { count: number; until: number }>();
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const submissionPattern = /^[A-Za-z0-9-]{8,100}$/;

// Compass CRM (CRM Lite): after the email, the same inquiry is saved in
// Compass server to server. Compass decides the client from the source key
// and its token; nothing here names it. Without the three CRM_INTAKE_*
// variables the form works exactly as before (email only).
type Crm = { url: string; source: string; token: string };
function crmConfig(): Crm | 'incomplete' | null {
 const url=process.env.CRM_INTAKE_URL, source=process.env.CRM_INTAKE_SOURCE, token=process.env.CRM_INTAKE_TOKEN;
 if(!url && !source && !token) return null;
 if(!url || !source || !token || !/^https:\/\//.test(url)) return 'incomplete';
 return {url,source,token};
}
// One retry for a dropped connection or a 5xx; the submission id makes a
// repeat a no-op in Compass, so retrying is safe.
async function saveToCrm(crm: Crm, payload: Record<string, unknown>): Promise<{ ok: boolean; status: number | null }> {
 for(let attempt=0; attempt<2; attempt++){
  try {
   const response=await fetch(crm.url,{method:'POST',headers:{Authorization:`Bearer ${crm.token}`,'X-Compass-Source':crm.source,'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(7000)});
   const result=await response.json().catch(()=>({}));
   if(response.ok && result.ok===true) return {ok:true,status:response.status};
   if(response.status<500 || attempt===1) return {ok:false,status:response.status};
  } catch { if(attempt===1) return {ok:false,status:null}; }
  await new Promise(r=>setTimeout(r,400));
 }
 return {ok:false,status:null};
}

export default async function handler(req: Request, res: ServerResponse) {
 const reply = (status: number, data: Record<string, unknown>) => { res.statusCode=status; res.setHeader('Content-Type','application/json'); res.setHeader('Cache-Control','no-store'); res.end(JSON.stringify(data)); };
 if(req.method !== 'POST'){ res.setHeader('Allow','POST'); return reply(405,{error:'Use the inquiry form to send your request.'}); }
 const origins = new Set(['https://www.gingerhuffinteriors.com','https://gingerhuffinteriors.com','https://gingerhuff-website.vercel.app']);
 if(process.env.VERCEL_URL) origins.add('https://'+process.env.VERCEL_URL);
 if(process.env.NODE_ENV !== 'production') origins.add('http://localhost:3000');
 if(!origins.has(String(req.headers.origin || ''))) return reply(403,{error:'Please submit your inquiry from our website.'});
 if(!String(req.headers['content-type'] || '').startsWith('application/json')) return reply(415,{error:'Invalid request format.'});
 let body: any;
 try { body=typeof req.body==='string'?JSON.parse(req.body):req.body; } catch { return reply(400,{error:'Please check your inquiry and try again.'}); }
 if(!body || Array.isArray(body) || typeof body !== 'object' || Buffer.byteLength(JSON.stringify(body))>16000) return reply(400,{error:'Your inquiry is too long or has an invalid format.'});
 if(typeof body.website !== 'string' || body.website.trim()) return reply(400,{error:'Unable to submit this inquiry.'});
 const fields = {name:120,email:254,phone:60,location:160,serviceType:160,investment:160,details:5000};
 const data:Record<string,string>={};
 for(const [key,max] of Object.entries(fields)) { const value=body[key]; if(typeof value!=='string' || value.length>max || (key!=='phone'&&!value.trim())) return reply(400,{error:'Please complete all required fields within the allowed length.'}); data[key]=value.trim(); }
 if(!emailPattern.test(data.email) || /[\r\n]/.test(data.email+data.name)) return reply(400,{error:'Please enter a valid name and email address.'});
 const startedAt=Number(body.startedAt);
 if(!Number.isFinite(startedAt) || Date.now()-startedAt<2000 || Date.now()-startedAt>86400000) return reply(400,{error:'Please take a moment to review the form, or refresh the page if it has been open for a day.'});
 // The browser keeps one submission id per inquiry across retries. A page
 // loaded before this change sends none: the content decides it instead.
 if(body.submissionId!==undefined && (typeof body.submissionId!=='string' || !submissionPattern.test(body.submissionId))) return reply(400,{error:'Please refresh the page and try again.'});
 const submissionId=typeof body.submissionId==='string'?body.submissionId:'web-'+createHash('sha256').update(JSON.stringify(data)).digest('hex').slice(0,40);
 // Best-effort per-instance burst protection. Provider/firewall limits should also be enabled.
 const ip=String(req.headers['x-vercel-forwarded-for'] || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0];
 const key=createHash('sha256').update(ip).digest('hex'); const now=Date.now();
 for(const [k,v] of attempts) if(v.until<now) attempts.delete(k);
 const rate=attempts.get(key) || {count:0,until:now+60000};
 if(rate.count>=5){res.setHeader('Retry-After','60'); return reply(429,{error:'Please wait a minute before trying again, or call 618-791-9113.'});}
 rate.count++; attempts.set(key,rate);
 const apiKey=process.env.RESEND_API_KEY;
 const from=process.env.CONTACT_FROM;
 const to=process.env.CONTACT_TO || 'ghi@gingerhuffinteriors.com';
 if(!apiKey || !from) return reply(503,{error:'Our inquiry form is temporarily unavailable. Please email ghi@gingerhuffinteriors.com or call 618-791-9113.'});
 const text=[`New website inquiry from ${data.name}`,`Email: ${data.email}`,`Phone: ${data.phone || 'Not provided'}`,`Location: ${data.location}`,`Service: ${data.serviceType}`,`Budget: ${data.investment}`,'',data.details,'',`Reference: ${submissionId}`].join('\n');
 // The same submission within Resend's idempotency window reuses the original send.
 const idempotency=createHash('sha256').update(JSON.stringify({from,to,submissionId,...data})).digest('hex');

 // 1. The email (Resend), as before: the only email sent for an inquiry.
 let emailId: string | null = null;
 let emailFailure: 'rejected' | 'unconfirmed' | null = null;
 try {
  const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json','Idempotency-Key':`ginger-inquiry-${idempotency}`},body:JSON.stringify({from,to:[to],reply_to:data.email,subject:`Website inquiry: ${data.name}`,text}),signal:AbortSignal.timeout(10000)});
  const result=await response.json().catch(()=>({}));
  if(!response.ok || !result.id){ console.error('Inquiry email provider failure',{status:response.status,reference:submissionId}); emailFailure='rejected'; }
  else emailId=String(result.id);
 } catch { console.error('Inquiry email request failed',{reference:submissionId}); emailFailure='unconfirmed'; }

 // 2. Compass CRM, with what happened to the email. Attempted even when the
 // email failed, so the inquiry is kept somewhere durable.
 const crm=crmConfig();
 let crmSaved=crm===null;
 if(crm==='incomplete') console.error('Inquiry CRM configuration incomplete',{reference:submissionId});
 else if(crm){
  const site=String(req.headers.origin || '');
  const saved=await saveToCrm(crm,{submission_id:submissionId,name:data.name,email:data.email,phone:data.phone||null,location:data.location,service_type:data.serviceType,budget:data.investment,message:data.details,page_url:/^https:\/\//.test(site)?`${site}/contact/`:null,submitted_at:new Date().toISOString(),email_status:emailId?'accepted':'failed',email_provider_id:emailId});
  crmSaved=saved.ok;
  if(!saved.ok) console.error('Inquiry CRM save failed',{status:saved.status,reference:submissionId});
 }

 // 3. Success only when the email was accepted and (when configured) Compass
 // has the inquiry. A retry reuses the submission id and the email's
 // idempotency key, so it never duplicates either.
 if(emailId && crmSaved) return reply(200,{ok:true});
 if(emailId && crm!=='incomplete' && process.env.CRM_INTAKE_REQUIRED==='false'){ console.error('Inquiry emailed; CRM save pending',{reference:submissionId}); return reply(200,{ok:true}); }
 if(emailId) return reply(502,{error:'Your inquiry was emailed, but we could not finish saving it. Please press Send once more. You will not send a duplicate.'});
 if(emailFailure==='rejected') return reply(502,{error:'Your inquiry could not be sent. Your details are still here. Please try again or email ghi@gingerhuffinteriors.com.'});
 return reply(502,{error:'We could not confirm your inquiry was sent. Please retry or contact ghi@gingerhuffinteriors.com. Retrying the same inquiry will not send a duplicate.'});
}
