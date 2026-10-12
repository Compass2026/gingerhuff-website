import { ArrowRight, Check, ChevronDown, Phone, Sparkles } from 'lucide-react';
import { getServicePage, servicePagePath, type ServicePageContent } from '../content/service-pages';
import { PAGE_PATHS } from '../routing';
import { imageSrcSet } from '../images';

const contactHref = (page: ServicePageContent) => `${PAGE_PATHS.contact}?service=${encodeURIComponent(page.inquiryService)}`;

export default function ServiceDetailPage({ page }: { page: ServicePageContent }) {
  const related = page.related.map(getServicePage).filter((item): item is ServicePageContent => Boolean(item));
  return (
    <div className="bg-white" data-service-page={page.id}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section id="service-hero" className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 px-4 sm:px-6 lg:px-8" style={{ background: '#f8faf4' }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none" style={{ background: 'rgba(168,216,64,0.08)' }} />
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                <li><a href={PAGE_PATHS.home} className="hover:text-brand-800 hover:underline">Home</a></li>
                <li aria-hidden="true">/</li>
                <li><a href={PAGE_PATHS.services} className="hover:text-brand-800 hover:underline">Services</a></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-stone-700">{page.name}</li>
              </ol>
            </nav>
            <p className="text-brand-700 uppercase tracking-[0.25em] text-xs font-semibold font-mono">{page.eyebrow}</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 font-light tracking-tight leading-[1.08] mt-3 mb-6">{page.h1}</h1>
            {page.intro.map(paragraph => (
              <p key={paragraph} className="text-stone-700 text-base sm:text-lg font-light leading-relaxed mb-4 max-w-xl">{paragraph}</p>
            ))}
            <div className="flex flex-wrap gap-3 mt-8">
              <a href={contactHref(page)} id="service-hero-cta" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-400 hover:bg-brand-500 text-stone-900 font-semibold text-[0.72rem] uppercase tracking-[0.18em] transition-colors">
                Book a complimentary consultation <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </a>
              <a href="tel:+16187919113" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-stone-300 text-stone-800 font-semibold text-[0.72rem] uppercase tracking-[0.18em] hover:bg-white transition-colors">
                <Phone aria-hidden="true" className="w-4 h-4" /> (618) 791-9113
              </a>
            </div>
          </div>
          <figure className="lg:col-span-6 relative rounded-[28px] overflow-hidden shadow-2xl border border-stone-100">
            <img src={page.image.src} srcSet={imageSrcSet(page.image.src, page.image.width)} sizes="(min-width: 1024px) 50vw, 100vw" alt={page.image.alt} width={page.image.width} height={page.image.height} loading="eager" fetchPriority="high" decoding="async" className="w-full h-auto aspect-[4/3] object-cover" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 p-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-brand-300 font-bold flex items-center gap-1"><Sparkles aria-hidden="true" className="w-3 h-3" /> Design inspiration</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Who it is for / problems ─────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {[page.audience, page.problems].map(group => (
            <div key={group.heading} className="glass-card rounded-[28px] p-7 sm:p-10">
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-light tracking-tight mb-6">{group.heading}</h2>
              <ul className="space-y-4">
                {group.items.map(item => (
                  <li key={item} className="flex items-start gap-3 text-stone-700 text-sm sm:text-base font-light leading-relaxed">
                    <span aria-hidden="true" className="mt-2.5 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── How Ginger helps ─────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#f8faf4' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-brand-700 uppercase tracking-[0.25em] text-xs font-semibold font-mono">The service</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-900 font-light tracking-tight mt-2 mb-5">{page.help.heading}</h2>
          <p className="text-stone-700 text-base font-light leading-relaxed mb-8">{page.help.intro}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {page.help.items.map(item => (
              <li key={item} className="flex items-start gap-3 bg-white rounded-2xl border border-stone-100 p-5 text-stone-700 text-sm font-light leading-relaxed">
                <Check aria-hidden="true" className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />{item}
              </li>
            ))}
          </ul>
          {page.help.note && <p className="mt-6 text-sm text-stone-600 font-light leading-relaxed border-l-2 border-brand-400 pl-4">{page.help.note}</p>}
        </div>
      </section>

      {/* ── Decision guidance ────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <p className="text-brand-700 uppercase tracking-[0.25em] text-xs font-semibold font-mono">Decision guide</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-900 font-light tracking-tight mt-2 mb-4">{page.guidance.heading}</h2>
            <p className="text-stone-600 text-base font-light leading-relaxed">{page.guidance.intro}</p>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {page.guidance.steps.map((step, index) => (
              <li key={step.title} className="bg-white rounded-3xl p-7 border border-stone-100 shadow-sm h-full">
                <span aria-hidden="true" className="font-mono text-3xl font-light text-stone-300">0{index + 1}</span>
                <h3 className="font-serif text-xl text-stone-900 font-normal mt-3 mb-3">{step.title}</h3>
                <p className="text-stone-600 text-sm font-light leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
          {page.citation && (
            <p className="mt-8 text-sm text-stone-600 font-light">
              {page.citation.text} Source: <a href={page.citation.href} target="_blank" rel="noopener noreferrer" className="underline text-brand-800 hover:text-brand-900">{page.citation.source}</a>.
            </p>
          )}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#f8faf4' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-light tracking-tight mb-8 text-center">{page.name} <span className="italic text-brand-600">questions</span></h2>
          <div className="space-y-3">
            {page.faqs.map(faq => (
              <details key={faq.q} className="group bg-white rounded-2xl border border-stone-100 shadow-sm">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-serif text-lg text-stone-800 font-normal">{faq.q}</h3>
                  <ChevronDown aria-hidden="true" className="w-5 h-5 text-brand-600 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-6 pb-6 text-stone-600 text-sm font-light leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related services ─────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="related-services-heading">
        <div className="max-w-7xl mx-auto">
          <h2 id="related-services-heading" className="font-serif text-3xl sm:text-4xl text-stone-900 font-light tracking-tight mb-8">Related services</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map(item => (
              <li key={item.id}>
                <a href={servicePagePath(item.id)} className="group block h-full glass-card rounded-3xl p-6 hover:border-brand-400 transition-colors">
                  <span className="font-serif text-xl text-stone-900 group-hover:text-brand-800">{item.name}</span>
                  <span className="block mt-2 text-sm text-stone-600 font-light leading-relaxed">{item.summary}</span>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-widest font-semibold text-brand-800">Learn more <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" /></span>
                </a>
              </li>
            ))}
            {page.alsoSee?.map(item => (
              <li key={item.href}>
                <a href={item.href} className="group block h-full glass-card rounded-3xl p-6 hover:border-brand-400 transition-colors">
                  <span className="font-serif text-xl text-stone-900 group-hover:text-brand-800">{item.label}</span>
                  <span className="block mt-2 text-sm text-stone-600 font-light leading-relaxed">{item.text}</span>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-widest font-semibold text-brand-800">Learn more <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" /></span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-stone-600 font-light">See every service, including full residential interior design, on our <a href={PAGE_PATHS.services} className="underline text-brand-800 hover:text-brand-900">interior design services</a> overview.</p>
        </div>
      </section>

      {/* ── Consultation CTA ─────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1a1c17] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none" style={{ background: 'rgba(168,216,64,0.08)' }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-tight mb-5">Start with a <span className="italic text-brand-400">complimentary</span> consultation</h2>
          <p className="text-white/70 text-base font-light leading-relaxed mb-8">Tell Ginger about your space and what you would like to change. Ginger Huff Interiors is family-owned, with three generations of designers, serving Edwardsville and the St. Louis metro.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={contactHref(page)} id="service-final-cta" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-400 hover:bg-brand-300 text-stone-900 font-semibold text-sm uppercase tracking-[0.15em] transition-colors">
              Book a complimentary design consultation <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </a>
            <a href="tel:+16187919113" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/30 text-white font-semibold text-sm uppercase tracking-[0.15em] hover:bg-white/10 transition-colors">Call (618) 791-9113</a>
          </div>
        </div>
      </section>
    </div>
  );
}
