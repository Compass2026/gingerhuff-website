const launchImage3 = '/images/roman_shades_kitchen.webp';
const launchImage2 = '/images/window_shutters_detail.webp';
const launchImage1 = '/images/motorized_shades.webp';
const launchImage0 = '/images/window_treatments_hero.webp';
import { useState } from 'react';
import {
  Check,
  ChevronDown,
  ChevronUp,
  Zap,
  Sun,
  Eye,
  Shield,
  Layers,
  Smartphone,
  ArrowRight,
  Sparkles,
  Star,
} from 'lucide-react';
import { PageId } from '../types';
import { imageSrcSet } from '../images';

interface WindowTreatmentsPageProps {
  onNavigate: (page: PageId) => void;
}

const TREATMENT_CATEGORIES = [
  {
    id: 'drapery',
    label: 'Custom Drapery',
    icon: Layers,
    headline: 'Floor-to-Ceiling Custom Drapery',
    description:
      'Custom drapery is made to your window dimensions, with choices of fabric, lining and heading style, from classic pinch pleat to modern ripple-fold. It softens a room, frames the view and can add privacy and light control.',
    features: [
      'Fabric choices to suit your room and style',
      'Heading styles such as pinch pleat, goblet, ripple-fold and tab top',
      'Blackout, thermal and decorative lining options',
      'Hardware choices: rods, rings and finials',
      'Made to the measurements of your windows',
    ],
    image: launchImage0,
    badge: 'Tailored Look',
  },
  {
    id: 'shutters',
    label: 'Plantation Shutters',
    icon: Shield,
    headline: 'Timeless Plantation Shutters',
    description:
      'Plantation shutters are fitted to your window openings and offer strong light control and privacy with a clean, architectural look. They come in wood and composite materials with painted or stained finishes.',
    features: [
      'Wood and composite options',
      'Common louver sizes include 2½", 3½" and 4½"',
      'Options for bay, arched and specialty windows',
      'Painted and stained finishes',
      'Full-height and café-style configurations',
    ],
    image: launchImage2,
    badge: 'Classic Choice',
  },
  {
    id: 'motorized',
    label: 'Motorized & Smart',
    icon: Smartphone,
    headline: 'Motorized & Smart Home Shades',
    description:
      'We help you explore motorized shading options for your home. Depending on the system, shades can be operated by remote, app, voice command or schedule, which is especially useful for tall or hard-to-reach windows.',
    features: [
      'Remote, app or scheduled control, depending on the system',
      'Smart home compatibility on many systems',
      'Solar, blackout and woven motorized options',
      'Battery, rechargeable and hardwired motor options',
      'Helpful for tall, wide or hard-to-reach windows',
    ],
    image: launchImage1,
    badge: 'Smart Living',
  },
  {
    id: 'shades',
    label: 'Roman & Roller Shades',
    icon: Sun,
    headline: 'Roman Shades & Roller Shades',
    description:
      'A tailored Roman or roller shade is one of the most versatile window treatments: clean when raised, soft or streamlined when lowered, and available in fabrics from sheer to blackout.',
    features: [
      'Flat, relaxed and hobbled Roman shade styles',
      'Roller shades in solar screen, light-filtering and blackout',
      'Cordless and continuous-loop lift options',
      'Sized to your windows',
      'Woven wood, linen, velvet and performance fabric options',
    ],
    image: launchImage3,
    badge: 'Most Versatile',
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Complimentary Consultation',
    desc: 'Start by talking through your windows, how much light and privacy you want, and how each room is used. The right treatment depends on all three.',
    icon: Eye,
  },
  {
    step: '02',
    title: 'Style & Fabric Selection',
    desc: 'Compare styles, fabrics, linings, hardware and motorization options, and choose what suits your room and the way you live.',
    icon: Sparkles,
  },
  {
    step: '03',
    title: 'Measurement',
    desc: 'Custom treatments depend on accurate measurements. Ginger will explain how measuring is handled for your project.',
    icon: Shield,
  },
  {
    step: '04',
    title: 'Ordering & Installation',
    desc: 'Once your selections are final, Ginger will walk you through ordering, timing and installation for your project.',
    icon: Star,
  },
];

const FAQS = [
  {
    q: 'How long do custom window treatments take to arrive?',
    a: 'It depends on the product and how it is made. Ginger can give you timing guidance once your selections are clear.',
  },
  {
    q: 'Can you match my existing décor colors?',
    a: 'Coordinating window treatments with your existing colors and finishes is part of the process. Bring photos or samples of fabrics, paint and flooring to your consultation.',
  },
  {
    q: 'Can existing shades be motorized?',
    a: 'Sometimes. It depends on the shade and the system. Share details of your current treatments during the consultation and Ginger can advise.',
  },
  {
    q: 'What areas do you serve for window treatments?',
    a: 'We serve Edwardsville and the St. Louis metro area. If you are outside the area, get in touch to ask whether we can help.',
  },
];

export default function WindowTreatmentsPage({ onNavigate }: WindowTreatmentsPageProps) {
  const [activeTab, setActiveTab] = useState(TREATMENT_CATEGORIES[0].id);
  const [openFaq, setOpenFaq] = useState<number | null>(null);


  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        id="wt-hero"
        className="relative min-h-[72vh] flex items-end overflow-hidden"
        style={{ background: '#0f110d' }}
      >
        {/* Hero background image */}
        <div className="absolute inset-0">
          <img loading="eager" fetchPriority="high" decoding="async"
            src={launchImage0}
            srcSet={imageSrcSet(launchImage0, 1024)}
            sizes="100vw"
            alt="Custom luxury window treatments by Ginger Huff Interiors"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 hero-overlay" />
          {/* Brand green glow accents */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none" style={{ background: 'rgba(168,216,64,0.08)' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(168,216,64,0.06)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pb-20 pt-40 w-full">
          <div className="max-w-2xl animate-fade-up">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-semibold font-mono border"
                style={{ background: 'rgba(168,216,64,0.12)', borderColor: 'rgba(168,216,64,0.3)', color: '#a8d840' }}>
                <Zap className="w-3 h-3" />
                Custom Window Treatments
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-light tracking-tight leading-[1.08] mb-6">
              Window<br />
              <span className="italic" style={{ color: '#a8d840' }}>Treatments</span>
            </h1>
            <p className="text-white/70 text-base sm:text-lg font-light leading-relaxed mb-10 max-w-lg">
              From floor-to-ceiling custom drapery to motorized smart shades, Ginger Huff Interiors helps you choose window treatments for light, privacy and style in every room of your home.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                id="wt-hero-cta-btn"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[0.72rem] uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                style={{ background: '#a8d840', color: '#1a2800', boxShadow: '0 4px 24px rgba(168,216,64,0.35)' }}
              >
                Schedule Consultation
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="wt-hero-scroll-btn"
                onClick={() => document.getElementById('wt-categories')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[0.72rem] uppercase tracking-[0.18em] transition-all hover:bg-white/10 cursor-pointer"
                style={{ border: '1px solid rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.85)' }}
              >
                Explore Treatments
              </button>
            </div>
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-3 gap-6 mt-16 pt-10 border-t border-white/10 max-w-lg animate-fade-up-d2">
            {[
              { value: 'Drapery', label: 'Custom Made' },
              { value: 'Shutters', label: 'And Shades' },
              { value: 'Motorized', label: 'Smart Options' },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-serif text-xl sm:text-3xl font-light" style={{ color: '#a8d840' }}>{s.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/50 font-mono mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Treatment Categories ─────────────────────────────────── */}
      <section id="wt-categories" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none" style={{ background: 'rgba(168,216,64,0.05)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(251,191,36,0.04)' }} />

        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#96c52e] uppercase tracking-[0.25em] text-xs font-semibold font-mono">Treatment Collections</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-stone-900 font-light tracking-tight mt-2 mb-6">
              Crafted for Every <span className="italic font-normal text-[#96c52e]">Window</span>
            </h2>
            <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
              Whether you want soft, filtered light, blackout privacy or motorized convenience, there is a window treatment suited to your room and the way you live.
            </p>
            <div className="w-24 h-[1px] bg-[#96c52e]/50 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Tab navigation */}
            <div className="lg:col-span-4 space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-mono pl-4 mb-4">Select Treatment Type</p>
              {TREATMENT_CATEGORIES.map((cat) => {
                const CatIcon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    id={`wt-tab-${cat.id}`}
                    aria-expanded={activeTab === cat.id}
                    aria-controls={`wt-panel-${cat.id}`}
                    onClick={() => setActiveTab(cat.id)}
                    className={`w-full text-left px-6 py-5 rounded-2xl border transition-all duration-500 cursor-pointer flex items-center justify-between group ${
                      activeTab === cat.id
                        ? 'border-[#96c52e]/30 text-stone-900 shadow-lg translate-x-2'
                        : 'border-transparent text-stone-500 hover:text-stone-800 hover:bg-white'
                    }`}
                    style={activeTab === cat.id ? { background: 'rgba(168,216,64,0.07)' } : { background: 'rgba(255,255,255,0.88)' }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl transition-colors ${activeTab === cat.id ? 'bg-[#a8d840]/15' : 'bg-stone-100 group-hover:bg-[#a8d840]/10'}`}>
                        <CatIcon className={`w-4 h-4 ${activeTab === cat.id ? 'text-[#96c52e]' : 'text-stone-400 group-hover:text-[#96c52e]'}`} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-[#96c52e] font-semibold mb-0.5 font-mono">{cat.badge}</span>
                        <span className="font-serif text-xl font-light tracking-wide group-hover:text-[#96c52e] transition-colors">{cat.label}</span>
                      </div>
                    </div>
                    <ArrowRight className={`w-5 h-5 text-[#96c52e] transition-transform duration-300 ${activeTab === cat.id ? 'translate-x-1 opacity-100' : 'opacity-0 -translate-x-2'}`} />
                  </button>
                );
              })}

              {/* Consultation card */}
              <div className="mt-8 p-6 rounded-2xl border border-stone-100 space-y-3" style={{ background: 'rgba(168,216,64,0.05)' }}>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#96c52e]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#96c52e] font-mono">Complimentary Consultation</span>
                </div>
                <p className="text-[12px] text-stone-500 leading-relaxed font-light">
                  Compare styles, light control and features with Ginger to find the right treatment for each window.
                </p>
              </div>
            </div>

            {/* Detail canvas */}
            <div className="lg:col-span-8">
              {TREATMENT_CATEGORIES.map((selected) => {
              const ActiveIcon = selected.icon;
              return <div key={selected.id} id={`wt-panel-${selected.id}`} hidden={activeTab !== selected.id} aria-labelledby={`wt-tab-${selected.id}`} className="seo-panel glass-card rounded-[32px] p-6 sm:p-10 border border-stone-100 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-bl-full blur-2xl pointer-events-none" style={{ background: 'rgba(168,216,64,0.05)' }} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                  {/* Description & features */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl" style={{ background: 'rgba(168,216,64,0.12)' }}>
                          <ActiveIcon className="w-5 h-5 text-[#96c52e]" />
                        </div>
                        <span className="text-xs uppercase tracking-[0.2em] text-[#96c52e] font-bold font-mono">{selected.badge}</span>
                      </div>
                      <h3 className="font-serif text-3xl sm:text-4xl text-stone-900 font-light tracking-wide mb-4">
                        {selected.headline}
                      </h3>
                      <p className="text-stone-700 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                        {selected.description}
                      </p>
                      <div className="space-y-3 mb-8">
                        <p className="text-[11px] uppercase tracking-widest text-[#96c52e] font-semibold">What's Included:</p>
                        {selected.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 text-stone-700">
                            <Check className="w-4 h-4 text-[#96c52e] mt-0.5 flex-shrink-0" />
                            <span className="text-xs sm:text-sm font-light">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      id={`wt-cta-${selected.id}`}
                      onClick={() => onNavigate('contact')}
                      className="w-full py-4 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      style={{ background: '#a8d840', color: '#1a2800', boxShadow: '0 4px 16px rgba(168,216,64,0.25)' }}
                    >
                      Request Consultation for {selected.label}
                    </button>
                  </div>

                  {/* Image */}
                  <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-100 group" style={{ minHeight: '360px' }}>
                    <img loading="lazy" decoding="async"
                      src={selected.image}
                      srcSet={imageSrcSet(selected.image, 1024)}
                      sizes="(min-width: 1024px) 380px, (min-width: 768px) 40vw, 100vw"
                      alt={selected.headline}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 p-5">
                      <span className="text-[10px] uppercase font-mono tracking-widest font-bold flex items-center gap-1" style={{ color: '#a8d840' }}>
                        <Sparkles className="w-3 h-3" /> Design Inspiration
                      </span>
                      <p className="text-white/80 text-xs mt-0.5 font-light">{selected.headline}</p>
                    </div>
                  </div>
                </div>
              </div>;
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Process ───────────────────────────────────────────── */}
      <section id="wt-process" className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: '#f8faf4' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#96c52e] uppercase tracking-[0.25em] text-xs font-semibold font-mono">Our Approach</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-900 font-light tracking-tight mt-2 mb-4">
              From Concept to <span className="italic text-[#96c52e]">Installation</span>
            </h2>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              A clear, step-by-step process from your first conversation to finished windows.
            </p>
            <div className="w-20 h-[1px] bg-[#96c52e]/40 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div key={idx} className="relative group">
                  {/* Connector line (hidden on last) */}
                  {idx < PROCESS_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[calc(100%_-_1rem)] w-8 h-[1px] z-10" style={{ background: 'rgba(168,216,64,0.4)' }} />
                  )}
                  <div className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 h-full">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: 'rgba(168,216,64,0.12)' }}>
                        <StepIcon className="w-5 h-5 text-[#96c52e]" />
                      </div>
                      <span className="font-mono text-4xl font-light text-stone-200">{step.step}</span>
                    </div>
                    <h4 className="font-serif text-xl text-stone-900 font-light mb-3">{step.title}</h4>
                    <p className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Motorized Spotlight ──────────────────────────────────── */}
      <section id="wt-motorized" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1a1c17] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[160px]" style={{ background: 'rgba(168,216,64,0.07)' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: 'rgba(168,216,64,0.05)' }} />
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-semibold font-mono border mb-6"
                style={{ background: 'rgba(168,216,64,0.12)', borderColor: 'rgba(168,216,64,0.3)', color: '#a8d840' }}>
                <Zap className="w-3 h-3" />
                Light &amp; Privacy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-tight leading-tight mb-6">
                Motorized<br />
                <span className="italic" style={{ color: '#a8d840' }}>Shading</span>
              </h2>
              <p className="text-white/60 text-sm sm:text-base font-light leading-relaxed mb-8">
                Motorized shades can rise and lower from a remote, an app or a schedule, depending on the system. They are especially helpful on tall, wide or hard-to-reach windows, and for managing sun and privacy through the day.
              </p>
              <div className="space-y-4">
                {[
                  'Control by remote, app or schedule, depending on the system',
                  'Helpful for tall, wide or hard-to-reach windows',
                  'Light-filtering, sheer and blackout options',
                  'Scheduled lowering to manage afternoon sun',
                  'Ask which options suit your windows and wiring',
                ].map((feat, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#a8d840' }} />
                    <span className="text-white/70 text-sm font-light">{feat}</span>
                  </div>
                ))}
              </div>
              <button
                id="wt-motorized-cta-btn"
                onClick={() => onNavigate('contact')}
                className="mt-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[0.72rem] uppercase tracking-[0.18em] transition-all hover:-translate-y-0.5 cursor-pointer"
                style={{ background: '#a8d840', color: '#1a2800', boxShadow: '0 4px 24px rgba(168,216,64,0.25)' }}
              >
                Ask About Motorized Options
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl">
                <img src={launchImage1} srcSet={imageSrcSet(launchImage1, 1024)} sizes="(min-width: 1024px) 300px, 50vw" loading="lazy" decoding="async" alt="Motorized shades in a bedroom" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl mt-8">
                <img src={launchImage2} srcSet={imageSrcSet(launchImage2, 1024)} sizes="(min-width: 1024px) 300px, 50vw" loading="lazy" decoding="async" alt="Plantation shutters detail" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery Strip ─────────────────────────────────────────── */}
      <section id="wt-gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#96c52e] uppercase tracking-[0.25em] text-xs font-semibold font-mono">Design Inspiration</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-light tracking-tight mt-2">
              Window Treatment <span className="italic text-[#96c52e]">Ideas</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: launchImage0, caption: 'Custom Drapery · Design inspiration' },
              { src: launchImage2, caption: 'Plantation Shutters · Design inspiration' },
              { src: launchImage1, caption: 'Motorized Shades · Design inspiration' },
              { src: launchImage3, caption: 'Roman Shades · Design inspiration' },
            ].map((img, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden shadow-md aspect-[3/4] border border-stone-100 hover:shadow-xl transition-shadow duration-500">
                <img loading="lazy" decoding="async" src={img.src} srcSet={imageSrcSet(img.src, 1024)} sizes="(min-width: 768px) 25vw, 50vw" alt={img.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                  <span className="text-white text-xs font-light font-mono tracking-wide">{img.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section id="wt-faq" className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: '#f8faf4' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#96c52e] uppercase tracking-[0.25em] text-xs font-semibold font-mono">Common Questions</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-light tracking-tight mt-2 mb-4">
              Window Treatment <span className="italic text-[#96c52e]">FAQs</span>
            </h2>
            <div className="w-20 h-[1px] bg-[#96c52e]/40 mx-auto" />
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  id={`wt-faq-${i}`}
                  aria-expanded={openFaq === i}
                  aria-controls={`wt-answer-${i}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-7 py-6 text-left cursor-pointer"
                >
                  <span className="font-serif text-lg text-stone-800 font-light pr-4">{faq.q}</span>
                  <span className="flex-shrink-0 text-[#96c52e]">
                    {openFaq === i ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>
                <div id={`wt-answer-${i}`} hidden={openFaq !== i} className="seo-panel px-7 pb-6">
                    <div className="h-px bg-stone-100 mb-4" />
                    <p className="text-stone-600 text-sm font-light leading-relaxed">{faq.a}</p>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────── */}
      <section id="wt-final-cta" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#96c52e] uppercase tracking-[0.25em] text-xs font-semibold font-mono">Begin Your Project</span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-stone-900 font-light tracking-tight mt-3 mb-6">
            Every Window Deserves<br />
            <span className="italic text-[#96c52e]">Something Beautiful</span>
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed mb-10 max-w-xl mx-auto">
            Book a complimentary design consultation and find out how the right window treatments can change the light, privacy and personality of your home.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              id="wt-final-cta-btn"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              style={{ background: '#a8d840', color: '#1a2800', boxShadow: '0 6px 28px rgba(168,216,64,0.35)' }}
            >
              Book a Free Consultation
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:6187919113"
              id="wt-phone-cta"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-[0.18em] transition-all hover:bg-stone-100 cursor-pointer text-stone-800 border border-stone-200"
            >
              Call (618) 791-9113
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
