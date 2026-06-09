import { GINGER_HUFF_STORY } from '../data';
import { Award, ShieldCheck, Heart, MapPin, Users, Flame, ArrowRight } from 'lucide-react';
import { PageId } from '../types';

interface AboutSectionProps {
  onNavigate: (page: PageId) => void;
}

export default function AboutSection({ onNavigate }: AboutSectionProps) {
  const highlights = [
    {
      icon: <Users className="w-6 h-6 text-brand-500" />,
      title: 'Three Generations',
      desc: 'Passed down from grandmother to daughter and grand-daughter, ensuring consistent, time-tested wisdom paired with forward-thinking design elements.'
    },
    {
      icon: <Award className="w-6 h-6 text-brand-500" />,
      title: 'Over 30 Years',
      desc: 'Formally established design presence, guiding homeowners through decades of shifting design currents with constant focus on timeless quality.'
    },
    {
      icon: <MapPin className="w-6 h-6 text-brand-500" />,
      title: 'St. Louis Regional Pride',
      desc: 'Deep local roots serving fine estates in Edwardsville, Glen Carbon, Ladue, Clayton, and Town and Country with premier, personalized style.'
    },
    {
      icon: <Heart className="w-6 h-6 text-brand-500" />,
      title: '100% Tailored Focus',
      desc: 'We limit our active roster to prioritize bespoke, direct collaboration—ensuring your homes aesthetic meets your distinct lifestyle.'
    }
  ];

  return (
    <section id="about-section" className="relative py-28 px-8 sm:px-14 lg:px-20 overflow-hidden bg-white">
      {/* Very subtle background tint */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none" style={{ background: 'rgba(168,216,64,0.04)' }} />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <p className="eyebrow mb-4">Our Legacy</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-stone-900 font-light tracking-tight mt-2 mb-6">
            Three Generations of <br />
            <span className="italic font-normal text-brand-500">Design Excellence</span>
          </h2>
          <div className="w-12 h-px mx-auto mt-8" style={{ background: '#a8d840' }} />
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Asymmetric Image/Card Stack (Left - Col 7) */}
          <div className="lg:col-span-7 space-y-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-100 group shadow-[0_4px_40px_rgba(0,0,0,0.10)]">
              <img
                src="/src/assets/images/modern_living_room_1780882249127.png"
                alt="Ginger Huff Interiors Heritage Showroom"
                className="w-full h-[400px] sm:h-[500px] object-cover filter brightness-90 transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

            </div>


          </div>

          {/* Bio Text (Right - Col 5) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative">

            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-stone-100 shadow-sm">
              
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-6">
                A Family Tradition of Beautiful Spaces
              </h3>
              
              <p className="text-stone-800 text-base sm:text-lg leading-relaxed mb-6 font-light">
                {GINGER_HUFF_STORY.bio}
              </p>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-8 font-light">
                {GINGER_HUFF_STORY.philosophy}
              </p>

              <div className="flex flex-wrap gap-3">
                {GINGER_HUFF_STORY.focusAreas.map((loc) => (
                  <span
                    key={loc}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-100 text-xs tracking-wider uppercase text-stone-700"
                  >
                    <MapPin className="w-3 h-3 text-brand-500" />
                    {loc}
                  </span>
                ))}
              </div>
            </div>
            </div>

            {/* Inquire Push Button */}
            <button
              id="story-inquire-btn"
              onClick={() => onNavigate('contact')}
              className="group flex items-center justify-between w-full py-4 px-8 rounded-xl border cursor-pointer transition-all duration-300 hover:-translate-y-px text-sm uppercase tracking-widest font-semibold"
              style={{ borderColor: '#a8d840', color: '#79a020' }}
            >
              <span>Partner With Us</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

        {/* Highlighting 3 Generations Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-stone-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(168,216,64,0.25)] hover:border-brand-500/40 group relative overflow-hidden"
            >
              {/* Green left accent bar on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-brand-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{ background: 'rgba(168,216,64,0.10)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(168,216,64,0.28)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(168,216,64,0.10)')}
              >
                {item.icon}
              </div>
              <h4 className="font-serif text-lg font-medium text-stone-900 mb-3 tracking-wide transition-colors duration-300 group-hover:text-brand-600">
                {item.title}
              </h4>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
