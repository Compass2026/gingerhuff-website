import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { PageId } from '../types';
import { PAGE_PATHS } from '../routing';
export default function Navbar({ currentPage }: { currentPage: PageId; setCurrentPage: (page: PageId) => void }) {
 const [isOpen,setIsOpen] = useState(false);
 const [scrolled,setScrolled] = useState(false);
 useEffect(() => { const scroll = () => setScrolled(window.scrollY > 24); scroll(); window.addEventListener('scroll',scroll,{passive:true}); return () => window.removeEventListener('scroll',scroll); }, []);
 useEffect(() => { if (!isOpen) return; const close = (event: KeyboardEvent) => { if (event.key === 'Escape') {setIsOpen(false); document.getElementById('mobile-nav-toggle')?.focus();} }; document.addEventListener('keydown',close); return () => document.removeEventListener('keydown',close); },[isOpen]);
 const dark = !scrolled && ['home','window-treatments'].includes(currentPage);
 const links: [PageId,string][] = [['home','Home'],['about','Our Story'],['services','Services'],['window-treatments','Window Treatments'],['portfolio','Inspiration'],['blog','Design Journal'],['faq','FAQ']];
 return <nav aria-label="Main navigation" id="main-nav" className={`fixed inset-x-0 top-0 z-50 transition-colors ${scrolled || isOpen ? 'bg-white shadow-sm text-stone-900' : dark ? 'bg-black/20 text-white' : 'bg-white text-stone-900'}`}>
 <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex items-center justify-between h-[72px] gap-4">
 <a href="/" className="flex items-center gap-3 shrink-0" aria-label="Ginger Huff Interiors home"><img src="/logos/Ginger Huff Interiors Logo.webp" width="36" height="36" alt=""/><span><span className="block font-serif text-xl tracking-widest">GINGER HUFF</span><span className="block text-[9px] tracking-[0.25em]">INTERIORS</span></span></a>
 <div className="hidden xl:flex items-center gap-4">{links.map(([page,label])=><a key={page} href={PAGE_PATHS[page]} aria-current={page === currentPage ? 'page' : undefined} className="text-[11px] font-semibold uppercase tracking-wider py-3 hover:underline">{label}</a>)}</div>
 <a href="/contact/" className="hidden xl:block rounded-full bg-brand-400 text-stone-900 px-5 py-3 text-xs uppercase font-semibold">Consultation →</a>
 <button id="mobile-nav-toggle" aria-label={isOpen?'Close menu':'Open menu'} aria-expanded={isOpen} aria-controls="mobile-menu" className="xl:hidden p-3" onClick={()=>setIsOpen(!isOpen)}>{isOpen?<X/>:<Menu/>}</button>
 </div>
 {isOpen && <div id="mobile-menu" className="xl:hidden px-6 pb-6 max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-stone-100">{links.map(([page,label])=><a key={page} href={PAGE_PATHS[page]} aria-current={page === currentPage ? 'page' : undefined} className="block py-3 text-sm">{label}</a>)}<a href="/contact/" className="block py-3 px-4 mt-3 rounded-lg bg-brand-400 text-stone-900 font-semibold">Book Consultation</a></div>}
 </nav>;
}
