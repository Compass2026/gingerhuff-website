import { createHash } from 'node:crypto';

export type Crm = { url: string; source: string; token: string };
export type Inquiry = {
  version: 1; id: string; fingerprint: string; submittedAt: string;
  source: string; intakeUrl: string; pageUrl: string | null;
  data: Record<string, string>; from: string; to: string;
};
export type Store = {
  read<T>(key: string): Promise<T | null>;
  create<T>(key: string, value: T): Promise<T>;
  remove(key: string): Promise<void>;
  list(cursor?: string): Promise<{ keys: string[]; cursor?: string }>;
};
type Receipt = { fingerprint: string; emailId?: string; completedAt?: string };
export const digest = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const prefix = 'inquiries/v1/';
export const pendingKey = (id: string) => `${prefix}pending/${id}.json`;
const receiptKey = (id: string, kind: string) => `${prefix}${kind}/${id}.json`;
// Leave a full hour before Resend's 24-hour idempotency window expires.
export const SAFE_EMAIL_RETRY_MS = 23 * 60 * 60 * 1000;

export function crmConfig(): Crm | 'incomplete' | null {
  const url = process.env.CRM_INTAKE_URL, source = process.env.CRM_INTAKE_SOURCE, token = process.env.CRM_INTAKE_TOKEN;
  if (!url && !source && !token) return null;
  if (!url || !source || !token || !/^https:\/\//.test(url)) return 'incomplete';
  return { url, source, token };
}
export class SubmissionConflict extends Error {}

export async function acceptInquiry(store: Store, inquiry: Inquiry): Promise<void> {
  const completed = await store.read<Receipt>(receiptKey(inquiry.id, 'completed'));
  if (completed) {
    if (completed.fingerprint !== inquiry.fingerprint) throw new SubmissionConflict();
    return;
  }
  // Create-only writes freeze recipient, payload and original submission time.
  // A concurrent request receives the existing record, never overwrites it.
  const existing = await store.create(pendingKey(inquiry.id), inquiry);
  if (existing.fingerprint !== inquiry.fingerprint) throw new SubmissionConflict();
}

export async function deliverInquiry(store: Store, id: string, crm: Crm, now = Date.now()): Promise<'complete' | 'pending' | 'attention'> {
  const key = pendingKey(id);
  if (await store.read<Receipt>(receiptKey(id, 'completed'))) {
    await store.remove(key);
    return 'complete';
  }
  const inquiry = await store.read<Inquiry>(key);
  if (!inquiry) return 'complete';
  // Never replay old pending work into a newly configured client's source.
  if (inquiry.source !== crm.source || inquiry.intakeUrl !== crm.url) {
    console.error('Inquiry delivery needs attention', { reference: id, reason: 'destination_changed' });
    return 'attention';
  }
  let email = await store.read<Receipt>(receiptKey(id, 'emailed'));
  let attention = false;
  if (!email) {
    const attempt = await store.create(receiptKey(id, 'email-attempt'), { firstAttemptAt: now });
    if (now - attempt.firstAttemptAt >= SAFE_EMAIL_RETRY_MS) {
      // The provider may have accepted a request whose response was lost.
      // Keep the inquiry, but never risk a duplicate after its key expires.
      attention = true;
    } else if (process.env.RESEND_API_KEY) {
      const { data } = inquiry;
      const text = [`New website inquiry from ${data.name}`, `Email: ${data.email}`, `Phone: ${data.phone || 'Not provided'}`, `Location: ${data.location}`, `Service: ${data.serviceType}`, `Budget: ${data.investment}`, '', data.details, '', `Reference: ${id}`].join('\n');
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST', headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `ginger-inquiry-${digest({ from: inquiry.from, to: inquiry.to, submissionId: id, ...data })}` },
          body: JSON.stringify({ from: inquiry.from, to: [inquiry.to], reply_to: data.email, subject: `Website inquiry: ${data.name}`, text }),
          signal: AbortSignal.timeout(8000),
        });
        const result = await response.json().catch(() => ({}));
        if (response.ok && typeof result.id === 'string' && result.id) {
          // Persist the acknowledgement before the CRM call. Future retries
          // reuse this receipt, including retries days after Resend's window.
          email = await store.create(receiptKey(id, 'emailed'), { fingerprint: inquiry.fingerprint, emailId: result.id });
        } else console.error('Inquiry email pending', { reference: id, status: response.status });
      } catch { console.error('Inquiry email pending', { reference: id }); }
    }
  }
  let saved = false;
  try {
    const { data } = inquiry;
    const response = await fetch(crm.url, {
      method: 'POST', headers: { Authorization: `Bearer ${crm.token}`, 'X-Compass-Source': crm.source, 'Content-Type': 'application/json' },
      body: JSON.stringify({ submission_id: id, name: data.name, email: data.email, phone: data.phone || null, location: data.location, service_type: data.serviceType, budget: data.investment, message: data.details, page_url: inquiry.pageUrl, submitted_at: inquiry.submittedAt, email_status: email ? 'accepted' : 'not_reported', email_provider_id: email?.emailId || null }),
      signal: AbortSignal.timeout(7000),
    });
    const result = await response.json().catch(() => ({}));
    saved = response.ok && result.ok === true;
    if (!saved) console.error('Inquiry CRM pending', { reference: id, status: response.status });
  } catch { console.error('Inquiry CRM pending', { reference: id }); }
  if (saved && email) {
    // Write a permanent non-PII tombstone before deleting the private payload.
    // A process crash or repeated browser request cannot start delivery again.
    await store.create(receiptKey(id, 'completed'), { fingerprint: inquiry.fingerprint, completedAt: new Date(now).toISOString() });
    await store.remove(key);
    return 'complete';
  }
  if (attention || now - Date.parse(inquiry.submittedAt) > 15 * 60 * 1000) {
    console.error('Inquiry delivery needs attention', { reference: id, reason: attention ? 'email_confirmation_required' : 'delivery_delayed' });
    return 'attention';
  }
  return 'pending';
}

// Bounded batches with a durable cursor prevent a bad destination or a large
// backlog from starving newer records. Failed records are retained indefinitely.
export async function drainInquiries(store: Store, crm: Crm, cursor?: string) {
  const page = await store.list(cursor);
  const counts = { complete: 0, pending: 0, attention: 0 };
  for (let start = 0; start < page.keys.length; start += 5) {
    await Promise.all(page.keys.slice(start, start + 5).map(async key => {
      const id = key.slice(key.lastIndexOf('/') + 1, -5);
      try { counts[await deliverInquiry(store, id, crm)]++; }
      catch { counts.pending++; console.error('Inquiry retry deferred', { reference: id }); }
    }));
  }
  return { ...counts, cursor: page.cursor };
}
