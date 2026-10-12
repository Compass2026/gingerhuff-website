import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { PageId } from '../types';

interface HeroProps {
  onNavigate: (page: PageId) => void;
}

// The video is part of the prerendered HTML so the phone can start it as soon as the page arrives, without
// waiting for JavaScript. Each <source> media query picks the file: desktop gets the original, phones a 9:16
// crop (about 320 KB, no audio), and visitors who ask for reduced motion match neither, so nothing downloads and
// the poster stays. Raw HTML keeps the `muted` attribute, which iOS needs for autoplay and React does not render.
// The video must stay visible: iOS will not autoplay a hidden (e.g. opacity 0) video.
const HERO_VIDEO = '<video id="hero-bg-video" autoplay muted loop playsinline preload="auto" aria-hidden="true" poster="/hero-poster.webp" class="absolute inset-0 w-full h-full object-cover">'
  + '<source src="/Prompt_A_seamless_cinematic.mp4" type="video/mp4" media="(min-width: 1024px) and (prefers-reduced-motion: no-preference)">'
  + '<source src="/hero-mobile.mp4" type="video/mp4" media="(prefers-reduced-motion: no-preference)">'
  + '</video>';

export default function Hero({ onNavigate }: HeroProps) {
  const videoHost = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const video = videoHost.current?.querySelector('video');
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if ((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) {
      video.querySelectorAll('source').forEach(source => source.remove());
      video.load();
      return;
    }
    // Autoplay refused (e.g. iOS Low Power Mode): keep the poster and retry on the visitor's first tap.
    const retry = () => { video.play().catch(() => {}); };
    video.muted = true;
    video.play().catch(() => {
      document.addEventListener('touchend', retry, { once: true, passive: true });
      document.addEventListener('click', retry, { once: true });
    });
    return () => { document.removeEventListener('touchend', retry); document.removeEventListener('click', retry); };
  }, []);

  return (
    <div
      id="hero-section"
      className="relative w-full h-screen min-h-[680px] max-h-[1080px] overflow-hidden"
    >
      <img
        src="/hero-poster.webp"
        alt=""
        width="1400"
        height="788"
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div ref={videoHost} className="absolute inset-0" aria-hidden="true" dangerouslySetInnerHTML={{ __html: HERO_VIDEO }} />

      {/* ── Gradient scrim — light on top, richer at bottom ─ */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/65 z-10" />
      {/* Subtle left vignette for text breathing room */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent z-10" />

      {/* ── Hero Text — floats freely, no glass box ──────── */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-20 px-8 sm:px-14 md:px-24 lg:px-32 max-w-[1400px] mx-auto left-0 right-0">

        {/* Eyebrow */}
        <p className="eyebrow text-white/70 mb-5">
          <span className="inline-block w-6 h-px bg-white/50 mr-3 align-middle" />
          St. Louis &amp; Edwardsville · Est. 1996
        </p>

        {/* Master headline */}
        <h1
          className="font-serif font-light text-white leading-[1.08] tracking-tight mb-6"
          style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
        >
          Spaces that feel<br />
          <em className="italic not-italic font-normal" style={{ color: '#a8d840' }}>
            entirely yours.
          </em>
        </h1>

        {/* Sub-copy */}
        <p
          className="text-white/75 font-light leading-relaxed mb-10 max-w-lg"
          style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)' }}
        >
          Three generations of refined interior design. We translate your vision
          into spaces that are beautiful, liveable, and unmistakably you.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Primary — lime */}
          <button
            id="hero-portfolio-btn"
            onClick={() => onNavigate('portfolio')}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full cursor-pointer transition-all duration-300 hover:-translate-y-px"
            style={{
              background: '#a8d840',
              color: '#1a2800',
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
              boxShadow: '0 8px 32px rgba(168,216,64,0.35)',
            }}
          >
            Explore Design Ideas
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>

          {/* Secondary — ghost on dark */}
          <button
            id="hero-consult-btn"
            onClick={() => onNavigate('contact')}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-white/40 text-white hover:bg-white/10 cursor-pointer transition-all duration-300 hover:-translate-y-px"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
              backdropFilter: 'blur(8px)',
            }}
          >
            Book Consultation
          </button>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────── */}
      <div className="absolute bottom-8 right-10 z-20 flex flex-col items-center gap-2 animate-bob">
        <span
          className="eyebrow text-white/40"
          style={{ writingMode: 'vertical-rl', letterSpacing: '0.25em' }}
        >
          Scroll
        </span>
        <ArrowDown className="w-3.5 h-3.5 text-white/30" />
      </div>

      {/* ── Slim brand bar at very bottom ────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 h-[2px]"
        style={{ background: 'linear-gradient(to right, transparent, #a8d840 40%, transparent)' }}
      />
    </div>
  );
}
