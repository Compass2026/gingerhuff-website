import { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../data';
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

export default function TestimonialsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000); // Shift every 7 seconds
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const activeTestimonial = TESTIMONIALS[activeIndex];

  return (
    <div id="testimonials-container" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Very subtle lime glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[130px] pointer-events-none" style={{ background: 'rgba(168,216,64,0.06)' }} />

      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">Client Praise</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-light tracking-tight mt-1">
            Word of Mouth
          </h2>
          <div className="w-12 h-[1px] bg-brand-500/50 mx-auto mt-3"></div>
        </div>

        {/* Elegant Floating Glass Box */}
        <div className="glass-card rounded-[32px] p-8 sm:p-12 md:p-16 border border-stone-100 relative overflow-hidden shadow-2xl">
          {/* Gigantic decorative quotes symbol */}
          <div className="absolute top-4 left-6 text-stone-200 font-mono select-none pointer-events-none text-[120px] sm:text-[180px] leading-none">
            "
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(activeTestimonial.stars)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-brand-500 fill-brand-500" />
              ))}
            </div>

            {/* Quote body text */}
            <p className="font-serif text-lg sm:text-xl md:text-2xl text-stone-900 font-light leading-relaxed mb-8 italic">
              "{activeTestimonial.quote}"
            </p>

            {/* Author details */}
            <div>
              <h4 className="font-sans font-semibold text-sm uppercase tracking-[0.2em] text-brand-500">
                {activeTestimonial.name}
              </h4>
              <p className="text-xs text-stone-400 tracking-wider mt-1">
                {activeTestimonial.role}
              </p>
            </div>
          </div>

          {/* Navigational buttons tucked on bottom margins */}
          <div className="flex items-center justify-center gap-6 mt-10 relative z-20">
            <button
              id="test-prev-btn"
              onClick={handlePrev}
              className="p-3 bg-white hover:bg-brand-500 rounded-xl border border-stone-100 text-stone-900 hover:text-black transition-all cursor-pointer"
              aria-label="Previous quote"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    activeIndex === idx ? 'w-8' : 'bg-stone-200 hover:bg-stone-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                ></button>
              ))}
            </div>

            <button
              id="test-next-btn"
              onClick={handleNext}
              className="p-3 bg-white hover:bg-brand-500 rounded-xl border border-stone-100 text-stone-900 hover:text-black transition-all cursor-pointer"
              aria-label="Next quote"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
