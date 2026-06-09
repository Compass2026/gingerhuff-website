import { useState } from 'react';
import { PROJECTS } from '../data';
import { Project, PageId } from '../types';
import { Filter, Eye, X, MapPin, Calendar, Sparkles, Building, ChevronRight } from 'lucide-react';

interface PortfolioSectionProps {
  onNavigate: (page: PageId) => void;
}

export default function PortfolioSection({ onNavigate }: PortfolioSectionProps) {
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Home Interiors', 'Kitchen & Bath', 'Commercial Design', 'E-Design'];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="portfolio-section" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      {/* Background blobs */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-brand-600/5 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-amber-600/5 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-brand-500 uppercase tracking-[0.25em] text-xs font-semibold font-mono">
              Selected Works
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-stone-900 font-light tracking-tight mt-2">
              Our Design <span className="italic font-normal text-brand-500">Portfolio</span>
            </h2>
            <div className="w-24 h-[1px] bg-brand-500/50 mt-4"></div>
          </div>
          <p className="text-stone-500 text-xs sm:text-sm font-light max-w-md leading-relaxed">
            Take a look at three generations of polished interior mastery. From expansive Edwardsville estates to modern corporate suites in Clayton.
          </p>
        </div>

        {/* Category Filters (Glass List) */}
        <div className="flex flex-wrap gap-2 mb-12 bg-white p-2 rounded-2xl border border-stone-100 max-w-3xl">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`portfolio-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                filter === cat
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid (Responsive & Fluid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              id={`portfolio-card-${proj.id}`}
              onClick={() => setSelectedProject(proj)}
              className="group relative rounded-3xl overflow-hidden glass border border-stone-100 shadow-xl cursor-pointer"
            >
              <div className="aspect-16/10 overflow-hidden relative">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Frosted Top Overlay for tags */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="glass px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-widest text-brand-500 font-bold backdrop-blur-md">
                    {proj.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4 bg-black/60 p-2.5 rounded-full border border-stone-100 text-stone-900 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                  <Eye className="w-4 h-4 text-brand-500" />
                </div>
              </div>

              {/* Information Row */}
              <div className="p-6 sm:p-8 flex items-end justify-between bg-white/70 backdrop-blur-sm border-t border-stone-100">
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-[11px] uppercase tracking-widest text-brand-500 font-mono">
                    <MapPin className="w-3.5 h-3.5" /> {proj.location}
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-stone-900 font-light group-hover:text-brand-500 transition-colors">
                    {proj.title}
                  </h3>
                </div>
                <div className="p-3 bg-white rounded-xl border border-stone-100 group-hover:bg-brand-500 group-hover:text-black transition-colors duration-300">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-100">
            <span className="text-brand-500 font-mono text-xs">No active projects found in this category</span>
            <p className="text-stone-500 text-sm font-light max-w-sm mx-auto mt-2">
              We frequently update our portfolio as projects clear photographing. Check back soon for brand new luxury updates!
            </p>
          </div>
        )}

        {/* Bottom Callout */}
        <div className="mt-20 glass p-8 rounded-3xl border border-stone-100 text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-brand-500/5 rounded-full blur-2xl"></div>
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-stone-900 mb-4">
            Curious about what your space could look like?
          </h3>
          <p className="text-stone-600 text-xs sm:text-sm font-light max-w-2xl mx-auto mb-6">
            Every project begins with a simple chat. We analyze your lighting, functional goals, structural limits, and design inspiration, presenting a custom digital design journal layout.
          </p>
          <button
            id="portfolio-inquire-btn"
            onClick={() => onNavigate('contact')}
            className="glass-accent hover:bg-brand-500 hover:text-black hover:border-transparent px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest text-brand-500 transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
          >
            Request Private Consultation
          </button>
        </div>

      </div>

      {/* Detail Overlay Drawer Modal */}
      {selectedProject && (
        <div
          id="portfolio-modal"
          className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glass rounded-3xl max-w-4xl w-full border border-stone-100 overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Toggle */}
            <button
              id="portfolio-modal-close"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black p-2.5 rounded-full border border-stone-100 text-stone-700 hover:text-stone-900 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Product Render Visual (Col 7) */}
              <div className="md:col-span-7 h-[250px] sm:h-[400px] md:h-[500px]">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Specifications Description Box (Col 5) */}
              <div className="md:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-black/50">
                <div className="space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-brand-500 font-bold bg-white border border-stone-100 px-3 py-1 rounded-lg">
                      {selectedProject.category}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-light tracking-wide mt-4 mb-2">
                      {selectedProject.title}
                    </h3>
                  </div>

                  <p className="text-stone-700 text-xs sm:text-sm font-light leading-relaxed">
                    {selectedProject.description}
                  </p>

                  <div className="h-[1px] bg-white"></div>

                  <div className="space-y-3 font-sans">
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-stone-600">
                      <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0" />
                      <span><strong>Location:</strong> {selectedProject.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-stone-600">
                      <Calendar className="w-4 h-4 text-brand-500 flex-shrink-0" />
                      <span><strong>Completed:</strong> Year {selectedProject.year}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-stone-600">
                      <Sparkles className="w-4 h-4 text-brand-500 flex-shrink-0" />
                      <span><strong>Spec Level:</strong> White-Glove Luxury Custom</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-100 flex gap-4">
                  <button
                    id="modal-cta-btn"
                    onClick={() => {
                      setSelectedProject(null);
                      onNavigate('contact');
                    }}
                    className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs py-3.5 rounded-xl uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    Inquire About Similar Design
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
