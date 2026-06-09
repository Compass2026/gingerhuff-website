import { useState } from 'react';
import { FAQ_ITEMS } from '../data';
import { HelpCircle, ChevronDown, ChevronUp, Info } from 'lucide-react';


export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>('faq1');

  const categories = ['All', 'About the Firm', 'Location & Sourcing', 'Investment & Pricing', 'Process & Timelines'];

  const filteredFAQs = activeCategory === 'All'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter((item) => item.category === activeCategory);

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="faq-section" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="absolute top-1/4 left-10 w-80 h-80 rounded-full blur-[140px] pointer-events-none" style={{ background: 'rgba(168,216,64,0.05)' }} />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="eyebrow mb-4">Clear Answers</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-stone-900 font-light tracking-tight mt-2 mb-6">
            Frequently Asked <span className="italic font-normal text-brand-500">Questions</span>
          </h2>
          <p className="text-stone-500 text-base sm:text-lg font-light leading-relaxed">
            Everything you need to know about starting an interior project, sourcing fine fabric treatments, local trade budgets, and contractor partnerships.
          </p>
          <div className="w-12 h-px mx-auto mt-8" style={{ background: '#a8d840' }} />
        </div>

        {/* Category Pill Filters */}

        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`faq-cat-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => {
                setActiveCategory(cat);
                setExpandedId(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'text-stone-900 font-semibold'
                  : 'text-stone-400 hover:text-stone-700 border border-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion Grid */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-accordion-item-${faq.id}`}
                className={`glass rounded-2xl overflow-hidden transition-all duration-350 border ${
                  isExpanded ? 'border-brand-500/30 shadow-lg shadow-gold-500/5 bg-white' : 'border-stone-100'
                }`}
              >
                {/* Header Switcher */}
                <button
                  id={`faq-accordion-toggle-${faq.id}`}
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="mt-1 flex-shrink-0">
                      <HelpCircle className="w-5 h-5 text-brand-500" />
                    </div>
                    <span className="font-serif text-base sm:text-lg lg:text-xl font-light text-stone-900 tracking-wide">
                      {faq.question}
                    </span>
                  </div>
                  <div className="p-1 rounded-lg bg-white border border-stone-100 text-stone-500">
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-brand-500" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Answer Box */}
                <div
                  id={`faq-accordion-answer-box-${faq.id}`}
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isExpanded ? 'max-h-[300px] border-t border-stone-100' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 text-stone-700 text-xs sm:text-sm leading-relaxed font-light font-sans space-y-4">
                    <p>{faq.answer}</p>
                    <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-brand-500 font-mono">
                      <Info className="w-3.5 h-3.5" /> Category: {faq.category}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct Sourcing Query CTA */}
        <div className="mt-16 text-center">
          <p className="text-stone-500 text-xs sm:text-sm font-light mb-4">
            Don't see your specific remodeling concern answered above?
          </p>
          <div className="inline-flex items-center gap-3 glass p-2.5 px-6 rounded-2xl border border-stone-100">
            <span className="text-xs text-stone-700">Message Ginger Huff directly:</span>
            <a
              href="mailto:design@gingerhuffinteriors.com"
              className="text-xs font-semibold text-brand-500 hover:text-brand-500 underline tracking-wider uppercase font-mono"
            >
              design@gingerhuffinteriors.com
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
