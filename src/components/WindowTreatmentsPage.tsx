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
      "Ginger's signature drapery service combines fine European fabrics with expert workroom craftsmanship. Each panel is hand-tailored to your exact window dimensions, lining preference, and heading style — from classically elegant pinch pleat to modern ripple-fold.",
    features: [
      'Fabric selection from Kravet, Fabricut, Schumacher & boutique mills',
      'Custom heading styles: pinch pleat, goblet, ripple-fold, tab top',
      'Blackout, thermal, and decorative lining options',
      'Custom hardware: rods, rings, and statement finials',
      'Professional measurement, fabrication & white-glove installation',
    ],
    image: '/images/window_treatments_hero.png',
    badge: 'Signature Service',
  },
  {
    id: 'shutters',
    label: 'Plantation Shutters',
    icon: Shield,
    headline: 'Timeless Plantation Shutters',
    description:
      'Plantation shutters offer the ultimate in light control, privacy, and architectural elegance. Our shutters are custom-built to your window openings in premium wood, faux wood, or painted finishes — and stand as a permanent, value-adding feature in any home.',
    features: [
      'Real hardwood & premium poly-resin construction',
      'Louver sizes: 2½", 3½", and 4½" for any aesthetic',
      'Bay, arch, arched, and specialty window solutions',
      'Custom paint matching to any Sherwin Williams color',
      'Full-frame & café-style configurations available',
    ],
    image: '/images/window_shutters_detail.png',
    badge: 'Most Requested',
  },
  {
    id: 'motorized',
    label: 'Motorized & Smart',
    icon: Smartphone,
    headline: 'Motorized & Smart Home Shades',
    description:
      'As a certified Hunter Douglas PowerView® dealer, we integrate cutting-edge motorized shading into your smart home ecosystem. Control every window in your home with a tap, voice command, or automated schedule — effortlessly elegant.',
    features: [
      'Hunter Douglas PowerView® Automation certified installer',
      'Compatible with Alexa, Google Home, Apple HomeKit, Control4',
      'Scene programming: Morning Rise, Movie Mode, Privacy settings',
      'Solar, blackout, and woven wood motorized options',
      'Battery, hardwired, and rechargeable motor systems',
    ],
    image: '/images/motorized_shades.png',
    badge: 'Hunter Douglas Partner',
  },
  {
    id: 'shades',
    label: 'Roman & Roller Shades',
    icon: Sun,
    headline: 'Roman Shades & Roller Shades',
    description:
      'A beautifully tailored Roman or roller shade is the workhorse of the window treatment world — versatile, functional, and endlessly stylish. Our custom shades are crafted from hundreds of fabric options and engineered to operate flawlessly for years.',
    features: [
      'Classic flat, relaxed, and hobbled Roman shade styles',
      'Roller shades in solar screen, light-filtering & blackout',
      'Cordless and continuous-loop lift systems for child safety',
      'Custom sizing to the 1/8 inch for a perfect fit',
      'Woven wood, linen, velvet, and performance fabric options',
    ],
    image: '/images/roman_shades_kitchen.png',
    badge: 'Most Versatile',
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'In-Home Consultation',
    desc: 'Ginger visits your home to assess natural light patterns, window architecture, existing décor, and lifestyle needs. No guesswork — just precise, personalized recommendations.',
    icon: Eye,
  },
  {
    step: '02',
    title: 'Custom Fabric & Style Selection',
    desc: 'We bring the showroom to you. From our curated collection of trade-exclusive fabrics, hardware finishes, and motorization systems, you choose exactly what resonates.',
    icon: Sparkles,
  },
  {
    step: '03',
    title: 'Professional Measurement',
    desc: 'Every window is measured to the 1/8 inch by our certified team. Precision measurement is the foundation of a flawless finished product — never an afterthought.',
    icon: Shield,
  },
  {
    step: '04',
    title: 'White-Glove Installation',
    desc: "Our expert installers arrive on schedule, handle every bracket, rod, and panel with care, and leave your home spotless. We don't consider the job done until you're wowed.",
    icon: Star,
  },
];

const FAQS = [
  {
    q: 'How long do custom window treatments take to arrive?',
    a: "Custom drapery and Hunter Douglas motorized products typically take 6–10 weeks from order to installation. In-stock or semi-custom shades can be ready in 2–4 weeks. We'll provide a precise timeline during your consultation.",
  },
  {
    q: 'Can you match my existing décor colors?',
    a: 'Absolutely. We work with hundreds of fabric options across our trade accounts and can custom-match to virtually any color palette. We also coordinate with Sherwin Williams for painted shutter finishes.',
  },
  {
    q: 'Do you offer motorization for existing shades?',
    a: "In many cases, yes. Hunter Douglas PowerView® retrofit kits are available for compatible shade systems. We'll assess your current treatments during the consultation and advise accordingly.",
  },
  {
    q: 'What areas do you serve for window treatment installations?',
    a: 'We serve the full St. Louis Metro Area including Edwardsville, Glen Carbon, Clayton, Ladue, and Town & Country. For clients outside the area, we offer virtual consultation and can coordinate with local installers.',
  },
];

export default function WindowTreatmentsPage({ onNavigate }: WindowTreatmentsPageProps) {
  const [activeTab, setActiveTab] = useState(TREATMENT_CATEGORIES[0].id);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const selected = TREATMENT_CATEGORIES.find((c) => c.id === activeTab) || TREATMENT_CATEGORIES[0];
  const ActiveIcon = selected.icon;

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
          <img
            src="/images/window_treatments_hero.png"
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
                Hunter Douglas Certified Partner
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-light tracking-tight leading-[1.08] mb-6">
              Window<br />
              <span className="italic" style={{ color: '#a8d840' }}>Treatments</span>
            </h1>
            <p className="text-white/70 text-base sm:text-lg font-light leading-relaxed mb-10 max-w-lg">
              From floor-to-ceiling custom drapery to motorized smart shades — Ginger Huff brings 30+ years of window treatment mastery to every room in your home.
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
              { value: '30+', label: 'Years of Experience' },
              { value: '500+', label: 'Homes Dressed' },
              { value: '100%', label: 'Custom Made' },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-serif text-2xl sm:text-3xl font-light" style={{ color: '#a8d840' }}>{s.value}</div>
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
              Whether you need light-filtering softness, complete blackout privacy, or intelligent motorized automation — we have a bespoke solution tailored precisely to your lifestyle.
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

              {/* Hunter Douglas badge card */}
              <div className="mt-8 p-6 rounded-2xl border border-stone-100 space-y-3" style={{ background: 'rgba(168,216,64,0.05)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-mono font-bold text-[#96c52e] border border-[#a8d840]/30" style={{ background: 'rgba(168,216,64,0.12)' }}>HD</div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#96c52e] font-mono">Hunter Douglas Partner</span>
                </div>
                <p className="text-[12px] text-stone-500 leading-relaxed font-light">
                  As a certified Hunter Douglas dealer, we offer trade-exclusive access to their full PowerView® motorization, Duette® honeycomb shades, and Silhouette® collections — unavailable at retail.
                </p>
              </div>
            </div>

            {/* Detail canvas */}
            <div className="lg:col-span-8">
              <div className="glass-card rounded-[32px] p-6 sm:p-10 border border-stone-100 shadow-2xl relative overflow-hidden">
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
                    <img
                      src={selected.image}
                      alt={selected.headline}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 p-5">
                      <span className="text-[10px] uppercase font-mono tracking-widest font-bold flex items-center gap-1" style={{ color: '#a8d840' }}>
                        <Sparkles className="w-3 h-3" /> Project Showcase
                      </span>
                      <p className="text-white/80 text-xs mt-0.5 font-light">{selected.headline}</p>
                    </div>
                  </div>
                </div>
              </div>
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
              A seamless, stress-free process guided by 30+ years of window treatment expertise.
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

      {/* ── Hunter Douglas Spotlight ──────────────────────────────── */}
      <section id="wt-hd-partner" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1a1c17] relative overflow-hidden">
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
                Exclusive Trade Partnership
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-tight leading-tight mb-6">
                Hunter Douglas<br />
                <span className="italic" style={{ color: '#a8d840' }}>Certified Dealer</span>
              </h2>
              <p className="text-white/60 text-sm sm:text-base font-light leading-relaxed mb-8">
                As an authorized Hunter Douglas dealer, Ginger Huff Interiors offers the complete collection of PowerView® motorized shading — including exclusive trade programs not available in retail showrooms. Our certification means factory-trained measurement, installation, and ongoing service.
              </p>
              <div className="space-y-4">
                {[
                  'PowerView® Automation — voice, app, or schedule control',
                  'Duette® Architella® honeycomb shades for energy efficiency',
                  'Silhouette® & Pirouette® shadings for soft, diffused light',
                  'Luminette® Privacy Sheers for floor-to-ceiling windows',
                  'Vignette® Modern Roman Shades in 100+ fabric options',
                ].map((feat, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#a8d840' }} />
                    <span className="text-white/70 text-sm font-light">{feat}</span>
                  </div>
                ))}
              </div>
              <button
                id="wt-hd-cta-btn"
                onClick={() => onNavigate('contact')}
                className="mt-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[0.72rem] uppercase tracking-[0.18em] transition-all hover:-translate-y-0.5 cursor-pointer"
                style={{ background: '#a8d840', color: '#1a2800', boxShadow: '0 4px 24px rgba(168,216,64,0.25)' }}
              >
                Book a Hunter Douglas Demo
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl">
                <img src="/images/motorized_shades.png" alt="Motorized Hunter Douglas shades" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl mt-8">
                <img src="/images/window_shutters_detail.png" alt="Plantation shutters detail" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery Strip ─────────────────────────────────────────── */}
      <section id="wt-gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#96c52e] uppercase tracking-[0.25em] text-xs font-semibold font-mono">Installation Gallery</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-light tracking-tight mt-2">
              Recent <span className="italic text-[#96c52e]">Projects</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: '/images/window_treatments_hero.png', caption: 'Custom Drapery · Ladue, MO' },
              { src: '/images/window_shutters_detail.png', caption: 'Plantation Shutters · Edwardsville, IL' },
              { src: '/images/motorized_shades.png', caption: 'Motorized Shades · Clayton, MO' },
              { src: '/images/roman_shades_kitchen.png', caption: 'Roman Shades · Town & Country, MO' },
            ].map((img, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden shadow-md aspect-[3/4] border border-stone-100 hover:shadow-xl transition-shadow duration-500">
                <img src={img.src} alt={img.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-7 py-6 text-left cursor-pointer"
                >
                  <span className="font-serif text-lg text-stone-800 font-light pr-4">{faq.q}</span>
                  <span className="flex-shrink-0 text-[#96c52e]">
                    {openFaq === i ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-7 pb-6">
                    <div className="h-px bg-stone-100 mb-4" />
                    <p className="text-stone-600 text-sm font-light leading-relaxed">{faq.a}</p>
                  </div>
                )}
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
            Schedule your complimentary in-home consultation and discover how the right window treatments can completely transform the light, privacy, and personality of your home.
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
              href="tel:6186561111"
              id="wt-phone-cta"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-[0.18em] transition-all hover:bg-stone-100 cursor-pointer text-stone-800 border border-stone-200"
            >
              Call (618) 656-1111
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
