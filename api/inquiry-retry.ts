import { timingSafeEqual } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { crmConfig, drainInquiries } from '../lib/inquiry-delivery.ts';
import { blobStore, saveCursor } from '../lib/inquiry-store.ts';

export function authorized(header: string | undefined, secret: string | undefined): boolean {
  if (!secret || !header) return false;
  const a = Buffer.from(header), b = Buffer.from(`Bearer ${secret}`);
  return a.length === b.length && timingSafeEqual(a, b);
}
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'GET') { res.statusCode = 405; res.end('{}'); return; }
  if (!authorized(req.headers.authorization, process.env.CRON_SECRET)) { res.statusCode = 401; res.end('{}'); return; }
  const crm = crmConfig();
  if (!crm || crm === 'incomplete') { res.statusCode = 503; res.end('{"error":"CRM configuration required"}'); return; }
  try {
    const state = await blobStore.read<{ cursor?: string }>('inquiries/v1/scan-cursor.json');
    const result = await drainInquiries(blobStore, crm, state?.cursor || undefined);
    await saveCursor(result.cursor);
    res.statusCode = 200;
    res.end(JSON.stringify({ ok: true, ...result }));
  } catch {
    console.error('Inquiry retry unavailable');
    res.statusCode = 503; res.end('{"error":"Retry temporarily unavailable"}');
  }
}
