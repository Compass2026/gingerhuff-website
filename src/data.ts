const asset6 = '/images/commercial_lounge_1780882276745.webp';
const asset4 = '/images/edesign_bedroom_1780882294734.webp';
const asset3 = '/images/kitchen_remodel_1780882262249.webp';
const asset2 = '/images/modern_living_room_1780882249127.webp';
import { Service, Project, Testimonial, BlogPost, FAQItem } from './types';

export const GINGER_HUFF_STORY = {
  generations: 'Three Generations of Designers',
  headquarters: 'St. Louis Metro Area',
  focusAreas: ['Edwardsville', 'Glen Carbon', 'Clayton', 'Ladue', 'Town and Country'],
  bio: 'At Ginger Huff Interiors, design is a family affair. We are family-owned and operated, with three generations of designers, and we help homeowners and businesses across Edwardsville and the St. Louis metro create spaces that reflect their style and the way they live.',
  philosophy: 'Our motto is simple: Collaborate. Renovate. Elevate. Whether you are planning new construction, a remodel or a refresh of a single room, we work closely with you, because the finishing touches are what transform a house into a home.'
};

export const SERVICES: Service[] = [
  {
    id: 'home-interiors',
    detailPages: ['space-planning', 'color-consultation', 'interior-styling-decorating', 'home-makeovers', 'custom-furniture-design'],
    title: 'Home Interiors',
    shortDescription: 'Personalized residential design, from layout and color to furniture and finishing touches.',
    description: 'Our residential design service covers layout planning, color coordination and furniture selection, so each room fits the way you live and your home feels cohesive from room to room.',
    image: asset2,
    features: [
      'Layout and space planning',
      'Color coordination',
      'Furniture selection and custom furniture design',
      'Custom window treatments',
      'Styling and finishing touches'
    ]
  },
  {
    id: 'kitchen-bath',
    detailPages: ['kitchen-bath-design'],
    title: 'Kitchen & Bath',
    shortDescription: 'Design guidance for kitchen and bathroom remodels and new construction.',
    description: 'Kitchens and bathrooms involve some of the most permanent choices in a home. We help you plan how the room should work and coordinate finishes, fixtures, lighting and color so it feels connected to the rest of your home.',
    image: asset3,
    features: [
      'Layout priorities for storage, work zones and seating',
      'Coordinating finishes and fixtures',
      'Lighting and color coordination',
      'Remodels and new construction',
      'A look that relates to the rest of your home'
    ]
  },
  {
    id: 'commercial-design',
    detailPages: ['commercial-interior-design'],
    title: 'Commercial Design',
    shortDescription: 'Inviting, practical interiors for offices, practices and client-facing businesses.',
    description: 'Whether you are updating a reception area, a conference room or a whole office, we design commercial spaces that welcome clients, work well for staff and reflect your business.',
    image: asset6,
    features: [
      'Reception and client-facing areas',
      'Layouts that support staff and visitors',
      'Furniture, color and finishes for daily use',
      'Planning around how your business runs',
      'New spaces and updates to existing ones'
    ]
  },
  {
    id: 'edesign',
    detailPages: ['e-design'],
    title: 'E-Design & Virtual Consultation',
    shortDescription: 'Virtual design guidance for busy schedules.',
    description: 'E-design brings design direction to you remotely. Share photos, measurements and how you use the room, and work through a plan together that you can carry out on your own timeline.',
    image: asset4,
    features: [
      'Work together remotely',
      'Built around your photos and measurements',
      'Guidance on furniture, color and layout',
      'Carry out the plan on your own timeline',
      'A good fit for busy schedules'
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

export { BLOG_POSTS } from './content/articles';

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq1',
    question: 'What is it like to work with a family-owned design firm?',
    answer: 'Ginger Huff Interiors is family-owned and operated, with three generations of designers. That means a personal, collaborative approach: we get to know how you live and what you love before recommending anything.',
    category: 'About the Firm'
  },
  {
    id: 'faq2',
    question: 'Which areas do you serve?',
    answer: 'We serve homeowners and businesses across Edwardsville and the St. Louis metro area. If you are outside the area or prefer to work remotely, ask about our virtual e-design service.',
    category: 'Location & Sourcing'
  },
  {
    id: 'faq3',
    question: 'How do you structure your design fees? Can we work in phases?',
    answer: 'Fees depend on the scope of your project. Your complimentary design consultation is the place to talk through scope, fees and whether working in phases makes sense for you.',
    category: 'Investment & Pricing'
  },
  {
    id: 'faq4',
    question: 'How long do custom furniture and custom window treatments take?',
    answer: 'Timing depends on the product, the materials and how each piece is made. Ginger can give you guidance on timing once your selections are clear.',
    category: 'Process & Timelines'
  },
  {
    id: 'faq5',
    question: 'How do we begin working together on our home project?',
    answer: 'Fill out our contact form or call (618) 791-9113. We will set up a complimentary design consultation to talk about your space, your goals and how we can help.',
    category: 'Getting Started'
  }
];
