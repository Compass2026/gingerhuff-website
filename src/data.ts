import { Service, Project, Testimonial, BlogPost, FAQItem } from './types';

export const GINGER_HUFF_STORY = {
  founded: 'Over 30 Years of Design Excellence',
  generations: 'Three Generations of Designers',
  headquarters: 'St. Louis Metro Area',
  focusAreas: ['Edwardsville', 'Glen Carbon', 'Clayton', 'Ladue', 'Town and Country'],
  bio: 'At Ginger Huff Interiors, design is more than a profession—it is a family legacy. For over three decades, our family-owned and operated firm has transformed houses into forever homes across the St. Louis Metro Area. Combining twenty-first-century sophistication with the warm, personalized approach of three generations of interior designers, we bring unrivaled passion and premium craft to every detail of your space.',
  philosophy: 'We believe that your space should tell your story. Our design process is deeply collaborative, blending high-end luxury with functional, liveable ease. From bespoke custom furniture to full-scale home construction consultation, we deliver high-end interiors that resonate with your personal lifestyle.'
};

export const SERVICES: Service[] = [
  {
    id: 'home-interiors',
    title: 'Home Interiors',
    shortDescription: 'Bespoke residential solutions meticulously tailored representing the absolute pinnacle of custom style.',
    description: 'Our premier residential service delivers completely personalized layout planning, color coordination, fine art advising, and tailored custom furniture, resulting in cohesive luxury that perfectly fits your day-to-day life.',
    image: '/images/modern_living_room_1780882249127.png',
    features: [
      'Full-Scale Spatial Planning',
      'Custom Furniture Design & Fabric Sourcing',
      'Art Curation & Lighting Consultation',
      'Window Treatment Selection (Hunter Douglas partner)',
      'Accessory Styling & Final White-Glove Installation'
    ]
  },
  {
    id: 'kitchen-bath',
    title: 'Kitchen & Bath',
    shortDescription: 'Bespoke, timeless redesigns creating modern hubs of culinary luxury and serene spa-like relaxation.',
    description: 'We elevate kitchens and bathrooms from utility spaces to custom architectural highlights. We source gorgeous countertops, bespoke custom cabinetry, statement plumbing fixtures, and innovative space solutions.',
    image: '/images/kitchen_remodel_1780882262249.png',
    features: [
      'Custom Cabinetry Design & Layouts',
      'Premium Solid-Surface & Marble Selection',
      'Plumbing Fixture & Appliance Integration',
      'Task & Accent Lighting Plans',
      'Coordination with Elite Local Craftsmen'
    ]
  },
  {
    id: 'commercial-design',
    title: 'Commercial Design',
    shortDescription: 'Polished, contemporary corporate and boutique layouts centered on productivity, elegance, and brand identity.',
    description: 'Whether a stylish client-facing boutique, a luxury doctor’s office, or a modern corporate suite, we design layouts that inspire productivity, celebrate your brand, and leave your clients breathless.',
    image: '/images/commercial_lounge_1780882276745.png',
    features: [
      'Brand Identity Interior Integration',
      'High-Durability Professional Furnishings',
      'Ergonomic Layouts & Glass Partition Design',
      'Acoustic Ceiling & Noise Dampening Sourcing',
      'Lighting & Reception Desk Visual Masterwork'
    ]
  },
  {
    id: 'edesign',
    title: 'E-Design & Virtual Consultation',
    shortDescription: 'Flexible, high-efficiency remote interior architectural planning delivered directly to your inbox.',
    description: 'Distance is no barrier to high-end luxury. Through our curated E-Design services, we deliver comprehensive, digital room plans, 3D photorealistic mockups, and clickable buying guides tailored to your budget and room measurements.',
    image: '/images/edesign_bedroom_1780882294734.png',
    features: [
      'Interactive Room Layout Renderings (3D)',
      'Clickable Curated Shopping & Sourcing Guild',
      'Custom Color & Material Swatch Palette Selection',
      'Sizing, Dimensioning, & Decor Positioning Guides',
      'Direct Digital Communication with Lead Designer'
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj1',
    title: 'The Ladue Contemporary Estate',
    category: 'Home Interiors',
    description: 'A complete custom interior remodeling featuring breathtaking panoramic glass views, hand-selected Travertine fireplace surround, and bespoke silk velvet couches.',
    image: '/images/modern_living_room_1780882249127.png',
    location: 'Ladue, MO',
    year: '2025'
  },
  {
    id: 'proj2',
    title: 'Edwardsville Modern Oak Kitchen',
    category: 'Kitchen & Bath',
    description: 'Warm oak paneling combined with black soapstone slabs and glowing glass pendants to create an award-winning open atmosphere.',
    image: '/images/kitchen_remodel_1780882262249.png',
    location: 'Edwardsville, IL',
    year: '2025'
  },
  {
    id: 'proj3',
    title: 'Clayton Corporate Executive Lounge',
    category: 'Commercial Design',
    description: 'An executive relaxation hub designed with custom glass dividers, luxury mid-century seating collection, and subtle integrated LED lines.',
    image: '/images/commercial_lounge_1780882276745.png',
    location: 'Clayton, MO',
    year: '2026'
  },
  {
    id: 'proj4',
    title: 'Glen Carbon Minimalistic Master Suite',
    category: 'E-Design',
    description: 'Curated virtually with handpicked tactile linen textiles, warm modern accent light fixtures, and customized floating beige vanities.',
    image: '/images/edesign_bedroom_1780882294734.png',
    location: 'Glen Carbon, IL (Remote)',
    year: '2026'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test1',
    name: 'Katherine McDonald',
    role: 'Homeowner, Clayton MO',
    quote: 'Working with Ginger Huff Interiors was an absolute dream. As a three-generation team, they brought so much warmth, expertise, and precision to our home. They listened to every concern and delivered a living room that gets compliments from literally every single guest we host!',
    stars: 5
  },
  {
    id: 'test2',
    name: 'Debbie Weinacht',
    role: 'Executive Director, St. Louis IL',
    quote: 'The team handled our boutique design with impeccable professionalism. They completely understood how to blend high-end executive comfort with clean, commercial-grade materials. The glass accents they recommended have changed the entire flow of our workspace. Absolutely superb!',
    stars: 5
  },
  {
    id: 'test3',
    name: 'C. S.',
    role: 'Residential Client, Edwardsville IL',
    quote: 'They spent so much time making sure our custom kitchen remodel met our needs, and they had wonderful relationships with the best cabinetmakers in the area. Ginger Huff and her daughter are true visionary artists, and their 30+ year reputation shows in every minor detail.',
    stars: 5
  }
];

export const BRANDS = [
  { name: 'Pottery Barn', logo: 'PB' },
  { name: 'Ballard Designs', logo: 'BD' },
  { name: 'Sherwin Williams', logo: 'SW' },
  { name: 'Hunter Douglas', logo: 'HD' },
  { name: 'Arhaus', logo: 'AR' },
  { name: 'Restoration Hardware', logo: 'RH' }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog1',
    title: 'The Art of Mixing Design Eras: Luxury Antiques Meet Modern Glassmorphism',
    excerpt: 'How our three generations of interior designers combine family heirloom craftsmanship with contemporary glass, metal, and light overlays.',
    content: 'Interiors should feel collected over decades, not ordered from a single catalog. Our core design ethos revolves around creating high-contrast relationships between textures: think high-gloss polished marble placed alongside rough-sawn natural oak boards, or a vintage heirloom console placed underneath a modern glassmorphic frosted shelf with built-in soft LED lighting. In this blog, we explore our favorite techniques to weave three generations of interior design lessons into contemporary home interiors.',
    category: 'Design Guide',
    date: 'May 12, 2026',
    readTime: '4 min read',
    image: '/images/modern_living_room_1780882249127.png'
  },
  {
    id: 'blog2',
    title: '5 Crucial Secrets to a Functional, Luxurious Kitchen Layout & Custom Cabinets',
    excerpt: 'Before launching your kitchen remodel, discover how we coordinate flow, lighting placement, and bespoke carpentry to maximize both beauty and utility.',
    content: 'The kitchen is the absolute center of gravity of the modern home. Many homeowners get distracted by choosing counter stones first, but true gourmet kitchen architecture begins with structural workflow (the kitchen triangle) and detailed cabinetry layouts. Custom cabinet designs allow you to conceal high-volume appliances while creating magnificent focal pillars of white oak or custom lacquered finishes, matching exactly with premium brushed brass hardware.',
    category: 'Remodeling Tips',
    date: 'April 28, 2026',
    readTime: '6 min read',
    image: '/images/kitchen_remodel_1780882262249.png'
  },
  {
    id: 'blog3',
    title: 'Expanding Your Vision: How Virtual E-Design Brings Luxury Directly to Your Inbox',
    excerpt: 'Do you live outside the St. Louis area? Experience our high-end, bespoke interior planning from local comfort with digital 3D rendering consults.',
    content: 'Not everyone has the time or geographical availability for traditional full-scale in-person construction consulting. E-design is our answer for high-efficiency design. We ship high-resolution 3D layouts, handpicked physical textile swap lists directly to your door, and present a clickable digital spreadsheet sourcing list so you can purchase products on your timeline at trade discounts we pass straight to you.',
    category: 'E-Design',
    date: 'March 15, 2026',
    readTime: '4 min read',
    image: '/images/edesign_bedroom_1780882294734.png'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq1',
    question: 'How does your three-generation legacy benefit my residential project?',
    answer: 'With over 30 years of design experience passed down, we merge foundational, timeless principles with cutting-edge current trends. Our junior designers introduce fresh, modern aesthetics like sleek glass layouts and high-efficiency home tech, while our senior principals provide invaluable wisdom in structural construction, architectural sourcing, and contractor coordination. You get the best of all design worlds!',
    category: 'About the Firm'
  },
  {
    id: 'faq2',
    question: 'Which specific areas in the St. Louis Metro Area do you serve?',
    answer: 'We serve the entire St. Louis Metro Area, with a heavy emphasis on Edwardsville, Glen Carbon, Clayton, Ladue, Town and Country, Chesterfield, Kirkwood, and Belleville. For clients located outside these areas or nationwide, our comprehensive E-Design and Virtual Consult package is the absolute perfect luxury alternative.',
    category: 'Location & Sourcing'
  },
  {
    id: 'faq3',
    question: 'How do you structure your design fees? Can we work in phases?',
    answer: 'We provide clear, transparent pricing based on the scope of the project. For custom kitchens, baths, or entire home remodeling, we outline detailed project fees upfront. For smaller-scale residential updates or virtual e-designs, we work on a flat room-rate package so you can control your budget step-by-step. Working in phases is extremely common and welcomed!',
    category: 'Investment & Pricing'
  },
  {
    id: 'faq4',
    question: 'What is the standard timeline for custom furniture and custom window treatments?',
    answer: 'Because we partner directly with world-class manufacturers such as Hunter Douglas, Ballard Designs, Sherwin Williams, and elite boutique fabric mills, custom drapery, blinds, and upholstered sofas typically average 6 to 12 weeks. We manage the entire ordering, tracking, and white-glove setup process, shielding you from any logistical headaches.',
    category: 'Process & Timelines'
  },
  {
    id: 'faq5',
    question: 'How do we begin working together on our home project?',
    answer: 'Starting is incredibly simple! You can fill out our contact form, selecting your preferred services. We will schedule a personalized 15-minute discovery consultation, followed by an in-home or virtual consultation where we outline design options, analyze natural lighting, measure proportions, and present design layouts.',
    category: 'Getting Started'
  }
];
