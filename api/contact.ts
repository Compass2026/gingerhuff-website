import { createHash } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';
type Request = IncomingMessage & { body?: unknown };
const attempts = new Map<string, { count: number; until: number }>();
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
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
 const text=[`New website inquiry from ${data.name}`,`Email: ${data.email}`,`Phone: ${data.phone || 'Not provided'}`,`Location: ${data.location}`,`Service: ${data.serviceType}`,`Budget: ${data.investment}`,'',data.details].join('\n');
 // Same content within Resend's idempotency window reuses the original send.
 const idempotency=createHash('sha256').update(JSON.stringify({from,to,...data})).digest('hex');
 try {
  const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json','Idempotency-Key':`ginger-inquiry-${idempotency}`},body:JSON.stringify({from,to:[to],reply_to:data.email,subject:`Website inquiry: ${data.name}`,text}),signal:AbortSignal.timeout(12000)});
  const result=await response.json();
  if(!response.ok || !result.id){ console.error('Inquiry email provider failure',{status:response.status}); return reply(502,{error:'Your inquiry could not be sent. Your details are still here. Please try again or email ghi@gingerhuffinteriors.com.'}); }
  return reply(200,{ok:true});
 } catch { console.error('Inquiry email request failed'); return reply(502,{error:'We could not confirm your inquiry was sent. Please retry or contact ghi@gingerhuffinteriors.com. Retrying the same inquiry will not send a duplicate.'}); }
}
