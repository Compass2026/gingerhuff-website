import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { PageId } from '../types';

interface NavbarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home',               label: 'Home'              },
    { id: 'about',              label: 'Our Story'          },
    { id: 'services',           label: 'Services'           },
    { id: 'window-treatments',  label: 'Window Treatments'  },
    { id: 'portfolio',          label: 'Portfolio'          },
    { id: 'blog',               label: 'Design Journal'     },
    { id: 'faq',                label: 'FAQ'                },
  ];

  // Text is white when over a dark full-bleed hero (home + window-treatments), dark once scrolled
  const DARK_HERO_PAGES: typeof currentPage[] = ['home', 'window-treatments'];
  const isDark = !scrolled && DARK_HERO_PAGES.includes(currentPage);

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? 'bg-white/96 backdrop-blur-xl border-b border-black/5 shadow-[0_1px_20px_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-14 flex items-center justify-between h-[72px]">

        {/* ── Logo ───────────────────────────────────────── */}
        <button
          id="brand-logo-btn"
          onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer leading-none"
        >
          {/* Logo mark */}
          <img
            src="/logos/Ginger Huff Interiors Logo.webp"
            alt="Ginger Huff Interiors"
            className="w-9 h-9 rounded-full object-contain shrink-0"
            style={isDark ? { filter: 'brightness(1.1)' } : {}}
          />
          {/* Wordmark */}
          <div className="flex flex-col">
            <span
              className={`font-serif tracking-[0.12em] font-normal transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-stone-800 group-hover:text-brand-600'
              }`}
              style={{ fontSize: '1.35rem' }}
            >
              GINGER HUFF
            </span>
            <span
              className={`text-[0.55rem] uppercase tracking-[0.3em] font-medium transition-colors duration-300 ${
                isDark ? 'text-white/50' : 'text-stone-400'
              }`}
            >
              INTERIORS&nbsp;&nbsp;·&nbsp;&nbsp;EST.&nbsp;1996
            </span>
          </div>
        </button>

        {/* ── Desktop nav links ───────────────────────────── */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => { setCurrentPage(item.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`relative px-4 py-2 text-[0.72rem] uppercase tracking-[0.12em] font-medium transition-all duration-200 rounded-md cursor-pointer focus:outline-none ${
                currentPage === item.id
                  ? isDark ? 'text-white' : 'text-stone-900'
                  : isDark
                    ? 'text-white/60 hover:text-white'
                    : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {item.label}
              {currentPage === item.id && (
                <span
                  className="absolute bottom-1 left-4 right-4 h-px"
                  style={{ background: '#a8d840' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ── Consultation CTA ───────────────────────────── */}
        <div className="hidden lg:block">
          <button
            id="cta-nav-btn"
            onClick={() => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full cursor-pointer transition-all duration-300 hover:-translate-y-px text-[0.68rem] uppercase tracking-[0.16em] font-semibold"
            style={{
              background: '#a8d840',
              color: '#1a2800',
              boxShadow: '0 4px 16px rgba(168,216,64,0.30)',
            }}
          >
            Consultation
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </button>
        </div>

        {/* ── Mobile menu trigger ─────────────────────────── */}
        <button
          id="mobile-nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden p-2 rounded-lg transition-all focus:outline-none cursor-pointer ${
            isDark ? 'text-white hover:bg-white/10' : 'text-stone-600 hover:bg-stone-100'
          }`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile Drawer ────────────────────────────────── */}
      {isOpen && (
        <div
          id="mobile-menu-overlay"
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)' }}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="absolute top-20 left-4 right-4 bg-white rounded-2xl p-6 shadow-2xl flex flex-col gap-1 border border-black/5"
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-item-${item.id}`}
                onClick={() => { setCurrentPage(item.id); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm uppercase tracking-widest font-medium transition-all cursor-pointer ${
                  currentPage === item.id
                    ? 'text-stone-900 bg-brand-50 border-l-2 pl-5'
                    : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50'
                }`}
                style={currentPage === item.id ? { borderColor: '#a8d840' } : {}}
              >
                {item.label}
              </button>
            ))}
            <div className="h-px bg-stone-100 my-2" />
            <button
              id="mobile-cta-nav-btn"
              onClick={() => { setCurrentPage('contact'); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full py-3 rounded-xl font-semibold text-sm uppercase tracking-widest cursor-pointer text-center transition-all"
              style={{ background: '#a8d840', color: '#1a2800' }}
            >
              Book Consultation
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
