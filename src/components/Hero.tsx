import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { PageId } from '../types';

interface HeroProps {
  onNavigate: (page: PageId) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  // The poster is the LCP image; the video loads only after the page has, so it never delays first paint.
  // Phones get a 9:16 crop (about 320 KB, no audio) instead of the 2.5 MB desktop file.
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || connection?.saveData) return;
    const src = window.matchMedia('(min-width: 1024px)').matches ? '/Prompt_A_seamless_cinematic.mp4' : '/hero-mobile.mp4';
    let timer = 0;
    const start = () => { timer = window.setTimeout(() => setVideoSrc(src), 500); };
    if (document.readyState === 'complete') start(); else window.addEventListener('load', start, { once: true });
    return () => { window.removeEventListener('load', start); window.clearTimeout(timer); };
  }, []);
  // iOS only autoplays inline video that is muted as a DOM property, which React's `muted` prop does not reliably set.
  const startVideo = (video: HTMLVideoElement | null) => {
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.play().catch(() => { /* Autoplay refused (e.g. iOS Low Power Mode): the poster stays visible. */ });
  };

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
      {videoSrc && <video
        id="hero-bg-video"
        ref={startVideo}
        autoPlay
        aria-hidden="true"
        preload="auto"
        muted
        loop
        playsInline
        onPlaying={() => setPlaying(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${playing ? 'opacity-100' : 'opacity-0'}`}
        src={videoSrc}
      />}

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
