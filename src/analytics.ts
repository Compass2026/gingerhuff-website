import { pageMetadata } from './routing';

const MEASUREMENT_ID = 'G-93C5WFGCZE';
const LIVE_HOSTS = ['www.gingerhuffinteriors.com', 'gingerhuffinteriors.com'];
const QA_HOST = 'gingerhuff-website.vercel.app';
type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window { dataLayer?: unknown[]; gtag?: Gtag; }
}

export function initializeAnalytics() {
  if (typeof window === 'undefined' || window.gtag) return;
  const host = window.location.hostname;
  if (!LIVE_HOSTS.includes(host) && host !== QA_HOST) return;
  if (navigator.doNotTrack === '1') return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer!.push(arguments); };
  const metadata = pageMetadata(window.location.pathname);
  let referrer = '';
  try { referrer = document.referrer ? new URL(document.referrer).origin : ''; } catch { /* Ignore invalid referrers. */ }
  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID, {
    page_location: metadata.page === 'not-found' ? 'https://www.gingerhuffinteriors.com/404/' : metadata.canonical,
    page_title: metadata.title,
    page_referrer: referrer,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    ...(host === QA_HOST ? { debug_mode: true, traffic_type: 'internal' } : {}),
  });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

// Called only after the inquiry API confirms acceptance. Never pass form fields.
export function trackInquiry() {
  try {
    window.gtag?.('event', 'generate_lead', { form_name: 'design_inquiry', method: 'website' });
  } catch { /* Analytics must never affect the inquiry success state. */ }
}
