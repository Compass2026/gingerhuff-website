# Ginger Huff Interiors

React/Vite website with prerendered HTML routes and a Vercel serverless inquiry endpoint.

## Develop and validate

- `npm ci`
- `npm run dev` (website only; /api/contact requires Vercel)
- `npm run lint`
- `npm test` (mocked delivery, validation, retry and failure cases; sends no real emails)
- `npm run build` (optimizes source images, builds assets and prerenders 13 routes)

## Inquiry configuration

Production Vercel environment variables:

- `RESEND_API_KEY`: sending-only key scoped to `send.gingerhuffinteriors.com`. Secret; never commit or expose through VITE variables.
- `CONTACT_FROM`: `Ginger Huff Interiors <inquiries@send.gingerhuffinteriors.com>`
- `CONTACT_TO`: `ghi@gingerhuffinteriors.com`

Verify the sending domain in Resend, add the key securely in Vercel, then redeploy. The form intentionally fails with a useful direct-contact message until configured. Success means Resend accepted the email, not proof it reached the recipient inbox. Verify an authorized test inquiry in Resend and the inbox before switching website DNS.

The endpoint validates bounded fields, uses a honeypot and minimum form age, restricts browser origins, and uses Resend idempotency for retries. Burst limits are per warm function instance; configure managed firewall rate limiting for distributed abuse protection. No visitor data is logged. The form does not subscribe visitors to marketing.

## Compass CRM (CRM Lite)

When configured, `/api/contact` saves the validated inquiry to a **private Vercel Blob outbox** before acknowledging it. The server then starts email and CRM delivery using `waitUntil`. An authenticated Vercel Cron job runs every five minutes to recover unfinished delivery after outages, process exits or closed browser tabs. Resend remains the sole email sender. Compass remains the system of record for the inquiry and follow-up work.

Server-only production settings:

- `CRM_INTAKE_URL`: the deployed Compass `inquiry-intake` endpoint.
- `CRM_INTAKE_SOURCE=ginger-huff-website`.
- `CRM_INTAKE_TOKEN`: issued by a signed-in Compass admin; mark Sensitive.
- `BLOB_STORE_ID`: a private Blob store connected to this Vercel project (OIDC). Alternatively a scoped `BLOB_READ_WRITE_TOKEN`, marked Sensitive. Never use a public store.
- `CRON_SECRET`: a random secret, marked Sensitive, which Vercel sends to `/api/inquiry-retry/`.
- Keep the existing `RESEND_API_KEY`, `CONTACT_FROM` and `CONTACT_TO`.

All three CRM settings absent preserves the existing email-only form. Partial CRM configuration, or missing durable storage/scheduler configuration, returns unavailable before sending anything. `CRM_INTAKE_REQUIRED` is retired and cannot bypass persistence.

### Delivery and recovery

1. Each submission has a stable ID. The private outbox atomically creates its immutable payload before returning success. Original submission time and email recipient remain fixed across retries.
2. The immediate background worker sends Resend's email with a stable idempotency key, then records its accepted email ID in a durable receipt.
3. The worker posts the inquiry to Compass using the configured source token. Compass enforces one inquiry per source/submission ID. If email is still uncertain, Compass receives `not_reported`; a later retry updates it to `accepted`.
4. Failures leave the private payload pending. The cron worker retries without the visitor, using bounded batches and a persistent pagination cursor. It never logs visitor details or tokens.
5. After both acknowledgements, a non-PII completion receipt is saved before deleting the pending payload. A repeated request cannot resend a completed inquiry. Remaining receipts contain only a hash, timestamps and provider ID.

| Failure | Result |
| --- | --- |
| CRM unavailable | Email can arrive; saved outbox retries CRM automatically. |
| Email unavailable | Inquiry can reach CRM; saved outbox retries email automatically. |
| Both unavailable | Inquiry stays in private storage and both deliveries retry. |
| Private storage unavailable | No false success and no provider side effect; visitor retains form. |
| Lost email/CRM response | Stable provider key and CRM unique submission ID prevent duplicates during recovery. |
| Changed source configuration | Existing pending entries are held for operator attention, never routed to another client. |

Resend deduplicates for 24 hours. An email accepted receipt prevents all later email sends. If no acceptance receipt exists after 23 hours from the first attempt, automated email retries stop because its outcome may be unknown. **The inquiry remains stored and CRM delivery continues.** Logs report `email_confirmation_required`; the operator must check Resend and reconcile the accepted ID before releasing a held email. Do not delete its attempt marker or resend blindly. Pending work is never expired or discarded.

### Operations and rollout

Deploy the CRM schema/functions first. Provision the private store, configure the scheduler secret, issue the intake token through the CRM admin setup, and add the three CRM variables. Deploy the website and verify the registered five-minute cron. Run one authorized end-to-end test before calling the integration live. Preview environments must use a separate store and test credentials; no production inquiry credentials are copied into previews.

The authenticated retry endpoint returns counts of completed, pending and attention items for its current batch, with a continuation cursor. Vercel error logs report delayed work after 15 minutes. Configure a Vercel alert for `Inquiry delivery needs attention` and `Inquiry retry unavailable` so an operator sees sustained outages; logging alone is not an external notification.

Rollback: disable new CRM capture by removing all three CRM intake settings and redeploying to email-only. **First drain or preserve pending records.** Removing configuration also pauses the retry worker; no pending record is deleted. Restore the same source and credentials to resume. Do not delete the Blob store or its completion receipts. To stop texts, use the CRM SMS switch separately.

`npm test` uses in-memory durable storage and mocked Resend/Compass. It covers outages, restart recovery, concurrency, response loss, repeated submissions, private storage failure, retention past the provider window, configuration isolation and cron authentication. No real messages are sent.

## Migration

The three published blog articles keep their original URLs. `/contact-2/` redirects to `/contact/`; category archives redirect to `/blog/`. Main pages are static HTML with canonical URLs, metadata, sitemap and business schema. Unknown paths use 404.html. Source concept images are labeled as design inspiration rather than completed projects. Testimonials were restored from the existing website.

Before domain cutover: verify sending, Cloudflare website records and HTTPS, mobile layout, existing indexed URLs and any analytics property ID. Keep the old host available for rollback. Do not alter mailbox MX records when adding the Resend sending subdomain.
