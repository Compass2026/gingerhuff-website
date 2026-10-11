const asset6 = '/images/commercial_lounge_1780882276745.webp';
const asset4 = '/images/edesign_bedroom_1780882294734.webp';
const asset3 = '/images/kitchen_remodel_1780882262249.webp';
const asset2 = '/images/modern_living_room_1780882249127.webp';
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
    image: asset2,
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
    image: asset3,
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
    image: asset6,
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
    image: asset4,
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
    title: 'Contemporary Living Room Concept',
    category: 'Home Interiors',
    description: 'A complete custom interior remodeling featuring breathtaking panoramic glass views, hand-selected Travertine fireplace surround, and bespoke silk velvet couches.',
    image: asset2,
    location: 'Design inspiration',
    year: 'Concept'
  },
  {
    id: 'proj2',
    title: 'Warm Oak Kitchen Concept',
    category: 'Kitchen & Bath',
    description: 'Warm oak paneling combined with black soapstone slabs and glowing glass pendants to create an welcoming open atmosphere.',
    image: asset3,
    location: 'Design inspiration',
    year: 'Concept'
  },
  {
    id: 'proj3',
    title: 'Executive Lounge Concept',
    category: 'Commercial Design',
    description: 'An executive relaxation hub designed with custom glass dividers, luxury mid-century seating collection, and subtle integrated LED lines.',
    image: asset6,
    location: 'Design inspiration',
    year: 'Concept'
  },
  {
    id: 'proj4',
    title: 'Relaxed Bedroom Concept',
    category: 'E-Design',
    description: 'Curated virtually with handpicked tactile linen textiles, warm modern accent light fixtures, and customized floating beige vanities.',
    image: asset4,
    location: 'Design inspiration',
    year: 'Concept'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    "id": "test1",
    "name": "Katherine McDonald",
    "role": "Client testimonial",
    "quote": "Ginger is AMAZING! She is so responsive and has such great ideas! She is very easy to work with. Her taste is so good and she has the resources to find anything you need!!!",
    "stars": 5
  },
  {
    "id": "test2",
    "name": "Debbie Weinacht",
    "role": "Client testimonial",
    "quote": "I have worked with Ginger for a number of years. She has impeccable taste in her design work. She has a keen eye for paint color. She has done work at my home and my office. We always get compliments. I would recommend Ginger on any size project someone would have. You won't be disappointed.",
    "stars": 5
  },
  {
    "id": "test3",
    "name": "CS",
    "role": "Client testimonial",
    "quote": "Ginger is great! She is extremely professional, responsive, and talented. She pays great attention to detail and makes sure that everything is done according to plan. I am very lucky to have found her for our quick-turnaround bath, kitchen, and living room remodeling jobs and will most certainly look to her for all future remodeling projects!",
    "stars": 5
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

export { BLOG_POSTS } from './content/articles';

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
