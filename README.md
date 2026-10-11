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

## Migration

The three published blog articles keep their original URLs. `/contact-2/` redirects to `/contact/`; category archives redirect to `/blog/`. Main pages are static HTML with canonical URLs, metadata, sitemap and business schema. Unknown paths use 404.html. Source concept images are labeled as design inspiration rather than completed projects. Testimonials were restored from the existing website.

Before domain cutover: verify sending, Cloudflare website records and HTTPS, mobile layout, existing indexed URLs and any analytics property ID. Keep the old host available for rollback. Do not alter mailbox MX records when adding the Resend sending subdomain.
