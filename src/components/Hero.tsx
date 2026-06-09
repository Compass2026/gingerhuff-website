import { useRef, useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { PageId } from '../types';

interface HeroProps {
  onNavigate: (page: PageId) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onCanPlay = () => setLoaded(true);
    v.addEventListener('canplay', onCanPlay);
    return () => v.removeEventListener('canplay', onCanPlay);
  }, []);

  return (
    <div
      id="hero-section"
      className="relative w-full h-screen min-h-[680px] max-h-[1080px] overflow-hidden"
    >
      {/* ── Animated gradient fallback (always renders, video overlays on top) ─ */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 60%, #2a3020 0%, #1a1c17 40%, #0f110d 100%)',
          animation: 'heroGradientShift 8s ease-in-out infinite alternate',
        }}
      />
      {/* ── Full-Bleed Video ─────────────────────────────── */}
      <video
        ref={videoRef}
        id="hero-bg-video"
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Locally hosted hero video */}
        <source
          src="/Prompt_A_seamless_cinematic.mp4"
          type="video/mp4"
        />
      </video>

      {/* ── Gradient scrim — light on top, richer at bottom ─ */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/65 z-10" />
      {/* Subtle left vignette for text breathing room */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent z-10" />

      {/* ── Hero Text — floats freely, no glass box ──────── */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-20 px-8 sm:px-14 md:px-24 lg:px-32 max-w-[1400px] mx-auto left-0 right-0">

        {/* Eyebrow */}
        <p className="eyebrow text-white/70 mb-5 animate-fade-up">
          <span className="inline-block w-6 h-px bg-white/50 mr-3 align-middle" />
          St. Louis &amp; Edwardsville · Est. 1996
        </p>

        {/* Master headline */}
        <h1
          className="font-serif font-light text-white leading-[1.08] tracking-tight mb-6 animate-fade-up-d1"
          style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
        >
          Spaces that feel<br />
          <em className="italic not-italic font-normal" style={{ color: '#a8d840' }}>
            entirely yours.
          </em>
        </h1>

        {/* Sub-copy */}
        <p
          className="text-white/75 font-light leading-relaxed mb-10 max-w-lg animate-fade-up-d2"
          style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)' }}
        >
          Three generations of refined interior design. We translate your vision
          into spaces that are beautiful, liveable, and unmistakably you.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 animate-fade-up-d3">
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
            View Our Work
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
