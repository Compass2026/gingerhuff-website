import { useState } from 'react';
import { SERVICES } from '../data';
import { Check, ArrowRight, Video, Sparkles, Image as ImageIcon, HelpCircle } from 'lucide-react';
import { PageId } from '../types';
import { SERVICE_PAGES, getServicePage, servicePagePath } from '../content/service-pages';
import { PAGE_PATHS } from '../routing';

interface ServicesSectionProps {
  onNavigate: (page: PageId) => void;
}

export default function ServicesSection({ onNavigate }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState(SERVICES[0].id);


  return (
    <section id="services-section" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
      {/* Background radial effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-500 uppercase tracking-[0.25em] text-xs font-semibold font-mono">
            Key Practices
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-stone-900 font-light tracking-tight mt-2 mb-6">
            Bespoke <span className="italic font-normal text-brand-500">Design Services</span>
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            Delivering high-end interior solutions across luxury residences, custom build sites, boutique corporate atmospheres, and convenient E-Design.
          </p>
          <div className="w-24 h-[1px] bg-brand-500/50 mx-auto mt-6"></div>
        </div>

        {/* Dynamic Services Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Navigation Controls (Left - Col 4) */}
          <div className="lg:col-span-4 space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-mono pl-4 mb-4">
              Select Practice Area
            </p>
            {SERVICES.map((s) => (
              <button
                key={s.id}
                id={`services-tab-${s.id}`}
                aria-expanded={activeTab === s.id}
                aria-controls={`service-panel-${s.id}`}
                onClick={() => setActiveTab(s.id)}
                className={`w-full text-left px-6 py-5 rounded-2xl border transition-all duration-500 cursor-pointer flex items-center justify-between group ${
                  activeTab === s.id
                    ? 'glass-accent border-brand-500/30 text-stone-900 shadow-lg shadow-gold-500/5 translate-x-2'
                    : 'glass border-transparent text-stone-500 hover:text-stone-800 hover:bg-white'
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-1">
                    0{SERVICES.indexOf(s) + 1}.
                  </span>
                  <span className="font-serif text-xl sm:text-2xl font-light tracking-wide group-hover:text-brand-500 transition-colors">
                    {s.title}
                  </span>
                </div>
                <ArrowRight className={`w-5 h-5 text-brand-500 transition-transform duration-300 ${
                  activeTab === s.id ? 'translate-x-1 opacity-100' : 'opacity-0 -translate-x-2'
                }`} />
              </button>
            ))}

            <div className="glass p-6 rounded-2xl border border-stone-100 mt-8 space-y-4">
              <h3 className="font-serif text-md text-brand-500 font-semibold uppercase tracking-wider">
                Need Trade Pricing?
              </h3>
              <p className="text-[12px] text-stone-500 leading-relaxed font-light">
                We maintain direct trade relationships with Ballard Designs, Pottery Barn, Sherwin Williams, and elite boutique fabric houses. We help you explore furnishings and finishes suited to your project.
              </p>
            </div>
          </div>

          {/* Active Detail Canvas (Right - Col 8) */}
          <div className="lg:col-span-8">
            {SERVICES.map((selectedService) => (
            <div key={selectedService.id} id={`service-panel-${selectedService.id}`} hidden={activeTab !== selectedService.id} aria-labelledby={`services-tab-${selectedService.id}`} className="seo-panel glass-card rounded-[32px] p-6 sm:p-10 border border-stone-100 shadow-2xl relative overflow-hidden">
              {/* Luxury Accent Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/5 rounded-bl-full blur-2xl pointer-events-none"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                
                {/* Core descriptions */}
                <div className="flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-brand-500 font-bold mb-3 inline-block">
                      Comprehensive Offer
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl text-stone-900 font-light tracking-wide mb-6">
                      {selectedService.title}
                    </h3>
                    
                    <p className="text-stone-800 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                      {selectedService.description}
                    </p>

                    <div className="space-y-3 mb-8">
                      <p className="text-[11px] uppercase tracking-widest text-brand-500 font-semibold">
                        What's Included:
                      </p>
                      {selectedService.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-stone-700">
                          <Check className="w-4 h-4 text-brand-500 mt-1 flex-shrink-0" />
                          <span className="text-xs sm:text-sm font-light">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-[11px] uppercase tracking-widest text-brand-700 font-semibold mb-2">
                      {selectedService.detailPages.length > 1 ? 'Explore these services' : 'Learn more'}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {selectedService.detailPages.map((id) => (
                        <li key={id}>
                          <a href={servicePagePath(id)} className="inline-flex items-center gap-1 rounded-full border border-brand-500/40 px-3 py-1.5 text-xs text-stone-800 hover:bg-brand-50 hover:border-brand-600 transition-colors">
                            {getServicePage(id)?.name} <ArrowRight aria-hidden="true" className="w-3 h-3" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    id={`service-cta-${selectedService.id}`}
                    onClick={() => onNavigate('contact')}
                    className="w-full bg-brand-500 hover:bg-brand-600 text-stone-900 py-4 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all hover:-translate-y-0.5 shadow-md shadow-brand-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Request consultation for {selectedService.title}
                  </button>
                </div>

                {/* Imagery & Social Embed Placeholder Hook */}
                <div className="space-y-6 flex flex-col justify-between">
                  {/* Photo Display */}
                  <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-16/10 border border-stone-100 group">
                    <img loading="lazy" decoding="async"
                      src={selectedService.image}
                      alt={selectedService.title}
                      className="w-full h-full object-cover filter brightness-90 transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-4">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-brand-500 font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Project Render Showcase
                      </span>
                    </div>
                  </div>

                  {/* Social Video & Reels Placement Code Anchor */}
                  <div className="glass-accent p-5 rounded-2xl border border-brand-500/20 relative">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-500 flex-shrink-0">
                        <Video className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs uppercase tracking-wider text-stone-700 font-semibold flex items-center gap-2">
                          Follow Along With Ginger
                        </h4>
                        <p className="text-[11px] text-stone-500 leading-relaxed font-light">
                          Explore design ideas and updates from Ginger Huff Interiors. 
                        </p>
                      </div>
                    </div>

                    <a className="inline-block mt-4 underline text-brand-700" href="https://www.facebook.com/gingerhuffinteriors/" target="_blank" rel="noreferrer">Visit our Facebook page</a>
                  </div>

                </div>

              </div>
            </div>
            ))}
          </div>

        </div>

        {/* Index of every service detail page, crawlable without opening a tab. */}
        <nav aria-labelledby="service-index-heading" className="mt-20">
          <h3 id="service-index-heading" className="font-serif text-2xl sm:text-3xl text-stone-900 font-light tracking-tight mb-6 text-center">
            Explore each <span className="italic text-brand-600">service</span>
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
            {[...SERVICE_PAGES.map((page) => ({ href: servicePagePath(page.id), label: page.name })), { href: PAGE_PATHS['window-treatments'], label: 'Custom Window Treatments' }].map((link) => (
              <li key={link.href}>
                <a href={link.href} className="flex items-center justify-between gap-3 glass rounded-2xl px-5 py-4 text-sm text-stone-800 hover:text-brand-800 hover:border-brand-500/40 transition-colors">
                  {link.label} <ArrowRight aria-hidden="true" className="w-4 h-4 text-brand-600 shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

      </div>
    </section>
  );
}
