/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PageId } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import PortfolioSection from './components/PortfolioSection';
import BlogSection from './components/BlogSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import TestimonialsSlider from './components/TestimonialsSlider';
import WindowTreatmentsPage from './components/WindowTreatmentsPage';
import BrandTicker from './components/BrandTicker';
import { Mail, Phone, MapPin, Instagram, Facebook, Award, ArrowUp, Sparkles } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-stone-800 selection:bg-brand-300 selection:text-stone-900">
      {/* Sticky Luminous Glassmorphic Navbar */}
      <Navbar currentPage={currentPage} setCurrentPage={handleNavigate} />

      {/* Main Content Area - Render based on state with subtle entering transitions */}
      <main className="flex-grow transition-opacity duration-500 animate-fade-in">
        {currentPage === 'home' && (
          <div className="space-y-0">
            {/* 1. Cinematic Hero Header */}
            <Hero onNavigate={handleNavigate} />

            {/* 2. Trusted By Brand Ticker */}
            <BrandTicker />

            {/* 3. Legacy Brand Story */}
            <AboutSection onNavigate={handleNavigate} />

            {/* 4. Practices/Services with reels support */}
            <ServicesSection onNavigate={handleNavigate} />

            {/* 5. Client Testimonial slider */}
            <TestimonialsSlider />

            {/* 6. Accordion Frequently Asked Questions */}
            <FAQSection />

            {/* 7. Contact Questionnaire intake */}
            <ContactSection />
          </div>
        )}

        {currentPage === 'about' && (
          <AboutSection onNavigate={handleNavigate} />
        )}

        {currentPage === 'services' && (
          <ServicesSection onNavigate={handleNavigate} />
        )}

        {currentPage === 'window-treatments' && (
          <WindowTreatmentsPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'portfolio' && (
          <PortfolioSection onNavigate={handleNavigate} />
        )}

        {currentPage === 'blog' && (
          <BlogSection />
        )}

        {currentPage === 'faq' && (
          <FAQSection />
        )}

        {currentPage === 'contact' && (
          <ContactSection />
        )}
      </main>

      {/* Luxury, High-End Glassmorphic Footer */}
      <footer id="global-footer" className="bg-[#1a1c17] border-t border-white/5 pt-20 pb-10 px-8 sm:px-14 lg:px-20 relative overflow-hidden">
        {/* Soft back-glow inside footer */}
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-[110px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/15">
            
            {/* Branding Column - Col 4 */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-3">
                <img
                  src="/logos/Ginger Huff Interiors Logo.webp"
                  alt="Ginger Huff Interiors"
                  className="w-10 h-10 rounded-full object-contain shrink-0"
                />
                <div className="flex flex-col">
                  <span className="font-serif text-2xl tracking-wider text-brand-200">
                    GINGER HUFF
                  </span>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-brand-400 font-semibold">
                    Interiors
                  </p>
                </div>
              </div>

              <p className="text-white/55 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
                Combining timeless family practice, architectural brilliance, and trade alliances to create custom, luxurious residential and commercial spaces across three proud generations.
              </p>

              {/* Badges of Practice */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/8 border border-brand-500/25 text-[10px] uppercase font-mono tracking-wider text-brand-400">
                  <Award className="w-3.5 h-3.5" /> 30+ Years Legacy
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/8 border border-brand-500/25 text-[10px] uppercase font-mono tracking-wider text-brand-400">
                  <Sparkles className="w-3.5 h-3.5" /> Hunter Douglas Partner
                </div>
              </div>
            </div>

            {/* Navigation Quick Links - Col 3 */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-brand-400 font-semibold font-mono">
                Explore Showcase
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm font-light">
                <li>
                  <button
                    onClick={() => handleNavigate('home')}
                    className="text-white/55 hover:text-brand-300 transition-colors cursor-pointer"
                  >
                    Return Home Page
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('about')}
                    className="text-white/55 hover:text-brand-300 transition-colors cursor-pointer"
                  >
                    Our Family Story
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('services')}
                    className="text-white/55 hover:text-brand-300 transition-colors cursor-pointer"
                  >
                    Interior Packages
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('window-treatments')}
                    className="text-white/55 hover:text-brand-300 transition-colors cursor-pointer"
                  >
                    Window Treatments
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('portfolio')}
                    className="text-white/55 hover:text-brand-300 transition-colors cursor-pointer"
                  >
                    Filtration Portfolio
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('blog')}
                    className="text-white/55 hover:text-brand-300 transition-colors cursor-pointer"
                  >
                    Design Journal
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('faq')}
                    className="text-white/55 hover:text-brand-300 transition-colors cursor-pointer"
                  >
                    Questions & Answers
                  </button>
                </li>
              </ul>
            </div>

            {/* Regional Coverage Areas - Col 3 */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-brand-400 font-semibold font-mono">
                Regional Coverage
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/55 font-light">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
                  Edwardsville, IL (Metro East HQ)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
                  Glen Carbon, IL
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
                  Clayton, MO (St. Louis Central)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
                  Ladue, MO
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
                  Town and Country, MO
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
                  National Scale E-Design (Remote)
                </li>
              </ul>
            </div>

            {/* Direct Lines & Social - Col 2 */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-brand-400 font-semibold font-mono">
                Follow Journal
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/gingerhuffinteriors/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-brand-500 border border-white/15 text-white hover:text-white transition-all"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/gingerhuffinteriors/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-brand-500 border border-white/15 text-white hover:text-white transition-all"
                  aria-label="Facebook Page"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>

              <div className="pt-2">
                <p className="text-[10px] text-white/45 uppercase tracking-widest font-mono">
                  Direct Sourcing Cell
                </p>
                <a
                  href="tel:6186561111"
                  className="text-sm font-semibold text-brand-300 hover:text-brand-400 block mt-1 transition-colors"
                >
                  (618) 656-1111
                </a>
              </div>
            </div>

          </div>

          {/* Sourcing Copyright Rights */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
            <p className="text-[11px] text-white/45 font-light">
              &copy; {new Date().getFullYear()} Ginger Huff Interiors. All Rights Reserved. Family-owned and operated in Edwardsville & St. Louis metro.
            </p>
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider text-white/40 font-mono">
              <button
                onClick={() => handleNavigate('faq')}
                className="hover:text-brand-400 transition-colors cursor-pointer"
              >
                Remodeling Terms
              </button>
              <span className="text-white/15">|</span>
              <button
                onClick={() => handleNavigate('contact')}
                className="hover:text-brand-400 transition-colors cursor-pointer"
              >
                Inquire Presentation
              </button>
            </div>
          </div>

        </div>

        {/* Back To Top Float Button */}
        <button
          id="back-to-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute bottom-6 right-6 p-2 rounded-xl bg-white/8 border border-white/15 text-white/60 hover:text-white hover:bg-brand-500 transition-all focus:outline-none cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
}
