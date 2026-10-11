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

After Resend accepts the email, `/api/contact` saves the same inquiry in Compass CRM, server to server (`inquiry-intake`). Resend stays the only email sender.

Production Vercel environment variables (server only; all three or none):

- `CRM_INTAKE_URL`: `https://iokcopiyzajigvhwexhe.supabase.co/functions/v1/inquiry-intake`
- `CRM_INTAKE_SOURCE`: `ginger-huff-website` (the source key Compass shows)
- `CRM_INTAKE_TOKEN`: the source token a Compass admin issues (shown once). Secret; mark it Sensitive.
- `CRM_INTAKE_REQUIRED` (optional): leave unset. `false` reports success once the email is accepted even if the CRM save failed.

Without them the form is email-only, exactly as before. Compass decides the client from the source key and token; nothing in this repo names it, and no Supabase or Twilio credential is here.

How a submission is handled:

1. The browser gives each inquiry a submission id and keeps it across retries of the same details (edited details get a new id).
2. Resend sends the email. Its idempotency key includes the submission id, so a retry within 24 hours reuses the first send. The email ends with `Reference: <submission id>`.
3. Compass saves the inquiry with the email's outcome. One quick retry on a dropped connection or a 5xx. Compass keeps one inquiry per submission id, so a repeat is a no-op.
4. The visitor sees success only when the email was accepted and Compass saved the inquiry. Otherwise they are asked to press Send again: the retry never sends a second email or makes a second inquiry.

Partial failures:

- Email accepted, Compass down: the inquiry is in Ginger's inbox (with its reference). The visitor is asked to retry, and the retry saves it in Compass with no second email. Set `CRM_INTAKE_REQUIRED=false` during a long Compass outage to show success instead; each such inquiry is logged as `Inquiry emailed; CRM save pending` with its reference.
- Email failed, Compass up: the inquiry is saved in Compass marked "email failed", and the visitor is asked to retry. The retry sends the email and updates Compass.
- Both down: a plain failure; the visitor's details stay in the form.

Logs carry the submission reference and status codes only. `npm test` covers these cases with mocked Resend and Compass.

Rollback: remove the three `CRM_INTAKE_*` variables and redeploy. Inquiries already saved stay in Compass.

## Migration

The three published blog articles keep their original URLs. `/contact-2/` redirects to `/contact/`; category archives redirect to `/blog/`. Main pages are static HTML with canonical URLs, metadata, sitemap and business schema. Unknown paths use 404.html. Source concept images are labeled as design inspiration rather than completed projects. Testimonials were restored from the existing website.

Before domain cutover: verify sending, Cloudflare website records and HTTPS, mobile layout, existing indexed URLs and any analytics property ID. Keep the old host available for rollback. Do not alter mailbox MX records when adding the Resend sending subdomain.
