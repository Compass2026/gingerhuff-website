export default function BrandTicker() {
  const brands = [
    { name: 'Pottery Barn',          logo: '/logos/pottery-barn.svg',    width: 160 },
    { name: 'Ballard Designs',       logo: '/logos/ballard-designs.svg', width: 200 },
    { name: 'Sherwin-Williams',      logo: '/logos/sherwin-williams.svg',width: 180 },
    { name: 'Hunter Douglas',        logo: '/logos/hunter-douglas.svg',  width: 185 },
    { name: 'Arhaus',                logo: '/logos/arhaus.svg',          width: 120 },
    { name: 'RH',                    logo: '/logos/rh.svg',              width: 52  },
  ];

  // Duplicate for seamless infinite scroll
  const doubled = [...brands, ...brands];

  return (
    <div
      id="brand-ticker-section"
      className="relative py-14 border-y overflow-hidden"
      style={{ background: '#fafaf8', borderColor: 'rgba(0,0,0,0.07)' }}
    >
      {/* Label */}
      <p
        className="text-center mb-10 uppercase tracking-[0.3em] text-xs font-mono"
        style={{ color: '#aaa' }}
      >
        Trusted Trade Partnerships
      </p>

      {/* Marquee track */}
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #fafaf8, transparent)' }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #fafaf8, transparent)' }}
        />

        <div className="flex items-center gap-20 animate-marquee" style={{ width: 'max-content' }}>
          {doubled.map((brand, i) => (
            <div
              key={i}
              className="flex items-center justify-center shrink-0 opacity-40 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0"
              style={{ width: brand.width, height: 48 }}
              title={brand.name}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-full max-w-full object-contain"
                style={{ color: '#555' }}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
