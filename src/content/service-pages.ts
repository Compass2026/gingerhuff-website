/**
 * Service detail pages. Each page is owned by one approved Compass service and its
 * primary keyword (see `crm`). Copy uses only confirmed business claims; anything
 * not confirmed (pricing, timelines, deliverables, installation, partners) is left
 * for the consultation rather than stated here.
 */
export type ServicePageId =
  | 'kitchen-bath-design'
  | 'commercial-interior-design'
  | 'interior-styling-decorating'
  | 'custom-furniture-design'
  | 'e-design'
  | 'space-planning'
  | 'color-consultation'
  | 'home-makeovers';

export interface ServicePageContent {
  id: ServicePageId;
  /** Short name used in links and breadcrumbs. */
  name: string;
  /** One line shown on related-service cards. */
  summary: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string[];
  image: { src: string; alt: string; width: number; height: number };
  audience: { heading: string; items: string[] };
  problems: { heading: string; items: string[] };
  help: { heading: string; intro: string; items: string[]; note?: string };
  guidance: { heading: string; intro: string; steps: { title: string; text: string }[] };
  faqs: { q: string; a: string }[];
  related: ServicePageId[];
  /** Other existing pages worth linking from this one. */
  alsoSee?: { href: string; label: string; text: string }[];
  citation?: { text: string; source: string; href: string };
  /** Must match an existing inquiry form service option. */
  inquiryService: string;
  crm: { serviceId: string; primaryKeywordId: string; primaryKeyword: string; supportingKeywords: string[] };
}

const IMAGES = {
  kitchen: { src: '/images/kitchen_remodel_1780882262249.webp', width: 1376, height: 768 },
  commercial: { src: '/images/commercial_lounge_1780882276745.webp', width: 1376, height: 768 },
  edesign: { src: '/images/edesign_bedroom_1780882294734.webp', width: 1376, height: 768 },
  livingRoom: { src: '/images/modern_living_room_1780882249127.webp', width: 1376, height: 768 },
  seating: { src: '/images/window_treatments_hero.webp', width: 1024, height: 1024 },
  readingNook: { src: '/images/window_shutters_detail.webp', width: 1024, height: 1024 },
  bedroom: { src: '/images/motorized_shades.webp', width: 1024, height: 1024 },
  creamKitchen: { src: '/images/roman_shades_kitchen.webp', width: 1024, height: 1024 },
};

export const SERVICE_PAGES: ServicePageContent[] = [
  {
    id: 'kitchen-bath-design',
    name: 'Kitchen & Bath Design',
    summary: 'Design guidance for kitchen and bathroom remodels and new builds.',
    metaTitle: 'Kitchen and Bath Design in Edwardsville, IL',
    description: 'Plan a kitchen or bathroom remodel with Ginger Huff Interiors. Design guidance on layout, finishes, fixtures and lighting for Edwardsville and St. Louis metro homes.',
    eyebrow: 'Residential · Kitchen & Bath',
    h1: 'Kitchen and Bath Design in Edwardsville',
    intro: [
      'Kitchens and bathrooms ask more of a design than almost any other room. They have to work hard every day, they involve the most permanent selections in a home, and changing your mind after the tile is set is expensive.',
      'Ginger Huff Interiors helps homeowners across Edwardsville and the St. Louis metro think through kitchen and bathroom remodels and new construction from the design side, so the room you live with matches the way you actually cook, get ready and gather.',
    ],
    image: { ...IMAGES.kitchen, alt: 'Kitchen with warm oak cabinetry, a dark stone island and glass pendant lights' },
    audience: {
      heading: 'Who this is for',
      items: [
        'Homeowners planning a kitchen or bathroom remodel who want a clear design direction before construction decisions are locked in.',
        'Families building a new home who need help pulling kitchen and bath selections together with the rest of the house.',
        'Anyone weighing a full remodel against a lighter update and wanting a second opinion on where the money matters most.',
      ],
    },
    problems: {
      heading: 'Problems it helps solve',
      items: [
        'A kitchen that looks fine but works poorly: crowded paths, no landing space, storage in the wrong places.',
        'Too many choices for cabinetry, counters, tile, fixtures and lighting, with no clear way to make them work together.',
        'A bathroom that feels dated or cramped, and uncertainty about which changes will make the biggest difference.',
        'Selections for the kitchen and bath that do not relate to the rest of the home.',
      ],
    },
    help: {
      heading: 'How Ginger helps',
      intro: 'Kitchen and bath design is one of the core services at Ginger Huff Interiors, for both remodels and new construction. Your consultation is the place to talk through:',
      items: [
        'How you use the room today and what is not working.',
        'Layout priorities, such as storage, work zones, seating and how the room connects to the spaces around it.',
        'Coordinating finishes, fixtures, lighting and color so the room feels cohesive.',
        'How the kitchen or bath should relate to the style of the rest of your home.',
      ],
      note: 'Construction, plumbing, electrical and installation are performed by licensed trades. Ask during your consultation how Ginger can work alongside your builder or remodeler.',
    },
    guidance: {
      heading: 'Before you start a kitchen or bath project',
      intro: 'A little preparation makes the first conversation far more productive.',
      steps: [
        { title: 'Write down what bothers you', text: 'List the daily frustrations: where things pile up, where people bump into each other, what you can never find. These shape the layout more than any finish will.' },
        { title: 'Decide what is staying', text: 'Note anything you plan to keep, such as cabinets, flooring, a window or an appliance. Keeping a piece is a design decision that affects everything around it.' },
        { title: 'Gather a few images', text: 'Save photos of kitchens and baths you love and a few you do not. The contrast often explains your taste better than words.' },
        { title: 'Know your range', text: 'Have a comfortable investment range in mind, even a rough one. It helps focus the conversation on the choices with the most impact.' },
      ],
    },
    faqs: [
      { q: 'Do you design both kitchens and bathrooms?', a: 'Yes. Kitchen and bath design is one service, and many homeowners plan both rooms together so finishes and fixtures feel related.' },
      { q: 'Can you help with a new build as well as a remodel?', a: 'Yes. Ginger Huff Interiors works on both remodels and new construction across Edwardsville and the St. Louis metro.' },
      { q: 'Do you handle the construction?', a: 'This service is design guidance. Construction and installation are carried out by licensed contractors. Bring your questions about working with your builder or remodeler to the consultation.' },
      { q: 'How do I get started?', a: 'Book a complimentary design consultation. Share photos of the room, rough measurements if you have them, and a list of what you want to change.' },
    ],
    related: ['space-planning', 'color-consultation', 'home-makeovers'],
    alsoSee: [{ href: '/window-treatments/', label: 'Custom Window Treatments', text: 'Kitchen and bath windows often need privacy and moisture-friendly choices.' }],
    inquiryService: 'Kitchen & Bath',
    crm: {
      serviceId: '8e8c3008-45be-528a-b9b8-985f5d964292', primaryKeywordId: 'c434f861-70cf-4133-a93e-885e4ff867e3', primaryKeyword: 'kitchen and bath design',
      supportingKeywords: ['kitchen design', 'bathroom design', 'kitchen designer', 'kitchen remodel design', 'bathroom remodel', 'kitchen design edwardsville il', 'bathroom design edwardsville il', 'kitchen remodeling designer edwardsville', 'bathroom remodel designer edwardsville'],
    },
  },
  {
    id: 'commercial-interior-design',
    name: 'Commercial Interiors',
    summary: 'Inviting, practical interiors for offices, practices and client-facing businesses.',
    metaTitle: 'Commercial Interior Design in the St. Louis Metro',
    description: 'Commercial interior design for offices, practices and client-facing businesses in Edwardsville and the St. Louis metro. Plan a space that works for staff and clients.',
    eyebrow: 'Commercial',
    h1: 'Commercial Interior Design for St. Louis Metro Businesses',
    intro: [
      'The space your clients walk into says something about your business before anyone speaks. The space your team works in every day affects how well they can do their jobs.',
      'Ginger Huff Interiors designs for commercial clients as well as homeowners, helping businesses across Edwardsville and the St. Louis metro create interiors that are inviting, practical and consistent with who they are.',
    ],
    image: { ...IMAGES.commercial, alt: 'Office reception area with lounge seating, glass partitions and warm wood paneling' },
    audience: {
      heading: 'Who this is for',
      items: [
        'Offices and professional practices updating a reception area, conference room or work floor.',
        'Business owners moving into a new space or building out a new location.',
        'Client-facing businesses that want the interior to match the quality of their service.',
      ],
    },
    problems: {
      heading: 'Problems it helps solve',
      items: [
        'A waiting or reception area that feels cold, crowded or forgettable.',
        'Furniture and finishes collected over years that no longer look like one business.',
        'Layouts that make it hard for staff to work or for clients to find their way.',
        'Uncertainty about where to invest first when the whole space needs attention.',
      ],
    },
    help: {
      heading: 'How Ginger helps',
      intro: 'Commercial work starts with understanding how your business runs. In a consultation, Ginger can talk through:',
      items: [
        'The first impression you want clients and visitors to have.',
        'How staff and visitors move through the space, and where the layout works against them.',
        'Furniture, color and finishes that feel welcoming and stand up to daily use.',
        'Priorities and phasing if the whole space cannot change at once.',
      ],
      note: 'Building permits, construction and code compliance are handled by your architect, landlord or contractor. Ginger can discuss how design work fits alongside them.',
    },
    guidance: {
      heading: 'Planning a commercial interior',
      intro: 'Commercial projects go more smoothly when a few things are clear early.',
      steps: [
        { title: 'Define who uses the space', text: 'Count the people who work there daily and the visitors you expect. Different rooms serve very different groups.' },
        { title: 'Know your constraints', text: 'Check your lease or building rules for what you can change. Some spaces limit work on walls, floors or lighting.' },
        { title: 'Pick the moments that matter', text: 'Decide which areas clients see first. Reception and meeting rooms often deserve the most attention.' },
        { title: 'Plan around operations', text: 'Think about when work can happen without disrupting staff or appointments.' },
      ],
    },
    faqs: [
      { q: 'Do you work with businesses as well as homeowners?', a: 'Yes. Ginger Huff Interiors serves both residential and commercial clients across the St. Louis metro area.' },
      { q: 'What kinds of commercial spaces do you design?', a: 'Offices, professional practices and other client-facing spaces are a natural fit. Share your space type at the consultation to talk about whether it is a match.' },
      { q: 'Can a project be done in phases?', a: 'Phasing is something to discuss during your consultation, especially if you need the business to stay open while the work happens.' },
      { q: 'Where do we start?', a: 'Book a complimentary design consultation and bring a floor plan or photos of the space along with your goals.' },
    ],
    related: ['space-planning', 'color-consultation', 'custom-furniture-design'],
    inquiryService: 'Commercial Design',
    crm: {
      serviceId: '9c16437f-7834-519c-ad6f-7782cc414110', primaryKeywordId: '7c94d783-011d-4d8d-93f1-ddb56cb2caf8', primaryKeyword: 'commercial interior design',
      supportingKeywords: ['commercial interior design edwardsville il'],
    },
  },
  {
    id: 'interior-styling-decorating',
    name: 'Interior Styling & Decorating',
    summary: 'The finishing touches: textiles, art and accessories that pull a room together.',
    metaTitle: 'Home Decorating Services in Edwardsville, IL',
    description: 'Home decorating and interior styling in Edwardsville. Pull a room together with accessories, art, textiles and finishing touches that reflect your style.',
    eyebrow: 'Residential · Styling',
    h1: 'Home Decorating and Interior Styling in Edwardsville',
    intro: [
      'Some rooms have good bones and the right furniture, yet still feel unfinished. The difference is usually in the layers: the textiles, art, lighting and objects that make a room feel personal.',
      'At Ginger Huff Interiors, the finishing touches are what transform a house into a home. Styling and decorating is the service for pulling a room together so it looks considered and feels like you.',
    ],
    image: { ...IMAGES.readingNook, alt: 'Cream armchair with a throw, side table and potted olive tree beside a bright bay window' },
    audience: {
      heading: 'Who this is for',
      items: [
        'Homeowners whose furniture is in place but whose rooms still feel bare or disconnected.',
        'People who have just moved and want their home to feel settled.',
        'Anyone who knows what they like when they see it but struggles to put the pieces together.',
      ],
    },
    problems: {
      heading: 'Problems it helps solve',
      items: [
        'Empty walls, shelves and surfaces you are unsure how to fill.',
        'Accessories and art collected over time that do not feel related.',
        'Pillows, rugs and throws that clash or blend into nothing.',
        'A room that photographs flat and feels cold in person.',
      ],
    },
    help: {
      heading: 'How Ginger helps',
      intro: 'Styling focuses on the finishing layer of a room rather than its structure. Together you can work through:',
      items: [
        'Coordinating color across textiles, art and accessories.',
        'Choosing which of your existing pieces to feature and where.',
        'Adding texture, pattern and lighting so the room feels warm and layered.',
        'Arranging shelves, tables and walls so they look intentional rather than crowded.',
      ],
    },
    guidance: {
      heading: 'Is styling the right starting point?',
      intro: 'Styling works best when the larger decisions are settled. A few questions help you decide.',
      steps: [
        { title: 'Does the furniture work?', text: 'If the sofa, bed or table fits and suits you, styling can finish the room. If the layout itself is the problem, start with space planning.' },
        { title: 'Do you like the wall color?', text: 'Accessories are easier to choose once the color direction is clear. If you are unsure, a color consultation may come first.' },
        { title: 'Are you refreshing the whole room?', text: 'If you are rethinking furniture, layout and finishes together, a room makeover is a better fit than styling alone.' },
        { title: 'What do you already own?', text: 'Gather the art, objects and textiles you love. Good styling often starts by using what you have in a better way.' },
      ],
    },
    faqs: [
      { q: 'What is the difference between styling and a room makeover?', a: 'Styling finishes a room whose furniture and layout already work. A makeover rethinks the room more broadly, including what stays, what goes and how it is arranged.' },
      { q: 'Can you work with things I already own?', a: 'Yes. Your favorite pieces are often the starting point. Ginger can help you decide what to feature and what to add around it.' },
      { q: 'Can styling be done one room at a time?', a: 'Yes. Many people start with the room they use most and continue from there.' },
      { q: 'How do I begin?', a: 'Book a complimentary design consultation and share photos of the room as it is today.' },
    ],
    related: ['home-makeovers', 'color-consultation', 'space-planning'],
    alsoSee: [{ href: '/window-treatments/', label: 'Custom Window Treatments', text: 'Drapery and shades are often the layer that makes a styled room feel finished.' }],
    inquiryService: 'Home Interiors',
    crm: {
      serviceId: '92e0a3b7-6a6f-528f-931e-80136f18dd3a', primaryKeywordId: 'fb97e89a-7729-405f-bd48-9e0c54b30726', primaryKeyword: 'home decorating services edwardsville',
      supportingKeywords: ['interior styling', 'interior styling edwardsville', 'home decorating services'],
    },
  },
  {
    id: 'custom-furniture-design',
    name: 'Custom Furniture Design',
    summary: 'Pieces designed around your room when ready-made will not fit.',
    metaTitle: 'Custom Furniture Design in Edwardsville, IL',
    description: 'Custom furniture design from Ginger Huff Interiors. Plan pieces sized, styled and selected for your room in Edwardsville and the St. Louis metro.',
    eyebrow: 'Custom Products',
    h1: 'Custom Furniture Design, Planned Around Your Room',
    intro: [
      'Ready-made furniture is designed for an average room. When your room is not average, because of an awkward wall, an unusual ceiling or a specific way your family lives, the right piece may not exist off the shelf.',
      'Custom furniture design is one of the services at Ginger Huff Interiors. It is about designing a piece around your space and selecting the size, shape and finishes so it belongs in the room.',
    ],
    image: { ...IMAGES.livingRoom, alt: 'Living room with a large cream sectional, an upholstered ottoman and a stone fireplace wall' },
    audience: {
      heading: 'Who this is for',
      items: [
        'Homeowners with a space where standard furniture never quite fits.',
        'Families who need a piece to do something specific, such as seat more people or hide more storage.',
        'Anyone furnishing a room as part of a larger design who wants key pieces to relate to the whole plan.',
      ],
    },
    problems: {
      heading: 'Problems it helps solve',
      items: [
        'Sofas, tables or storage that are always too big, too small or the wrong shape.',
        'Rooms with angles, alcoves or windows that ready-made pieces work against.',
        'Furniture that does not hold up to the way the room is used.',
        'A finished room that is missing the one piece that would tie it together.',
      ],
    },
    help: {
      heading: 'How Ginger helps',
      intro: 'Custom furniture works best as part of a room plan. In a consultation, you can talk through:',
      items: [
        'Which pieces in the room would benefit from being designed to fit.',
        'Proportions and scale relative to the room and the furniture around it.',
        'Selecting fabrics, finishes and details that suit how the piece will be used.',
        'How custom pieces fit with furniture you are keeping or buying ready-made.',
      ],
      note: 'Details such as materials, makers and lead times depend on the piece. Ask about them during your consultation.',
    },
    guidance: {
      heading: 'Custom or ready-made?',
      intro: 'Custom is not always the answer. These questions help you decide where it is worth it.',
      steps: [
        { title: 'Have you looked and not found it?', text: 'If you have searched for a piece in the size and shape you need and keep coming up short, custom is worth considering.' },
        { title: 'Is the piece the focal point?', text: 'Anchor pieces like a sofa, dining table or built-in style storage shape the whole room. That is where custom tends to matter most.' },
        { title: 'How long will you keep it?', text: 'A piece you expect to keep for many years justifies more planning than one you may replace soon.' },
        { title: 'Measure the path in', text: 'Note doorways, stairs and turns, not just the room. A piece has to get into the space as well as fit in it.' },
      ],
    },
    faqs: [
      { q: 'Do you design custom furniture?', a: 'Yes. Custom furniture design is one of the services Ginger Huff Interiors offers.' },
      { q: 'Can custom pieces be mixed with furniture I already own?', a: 'Yes. Custom pieces are often planned to work alongside furniture you are keeping, so the room feels cohesive.' },
      { q: 'How long does a custom piece take?', a: 'It depends on the piece and how it is made. Ginger can give you guidance once the design direction is clear.' },
      { q: 'How do I start?', a: 'Book a complimentary design consultation. Bring measurements of the space and photos of the room.' },
    ],
    related: ['space-planning', 'interior-styling-decorating', 'home-makeovers'],
    inquiryService: 'Other Custom Design Sourcing',
    crm: {
      serviceId: '8cad3e5e-2a99-5585-acbe-c9858f4526f4', primaryKeywordId: '51c6ee30-c065-4c7e-abb5-8c9b519e9bf3', primaryKeyword: 'custom furniture',
      supportingKeywords: ['custom furniture design edwardsville', 'custom furniture edwardsville il', 'furniture design'],
    },
  },
  {
    id: 'e-design',
    name: 'E-Design',
    summary: 'Virtual design direction for busy schedules, carried out on your timeline.',
    metaTitle: 'E-Design Services | Virtual Interior Design',
    description: 'E-design from Ginger Huff Interiors in Edwardsville. Virtual interior design guidance for busy homeowners who want a clear plan on their own schedule.',
    eyebrow: 'Virtual',
    h1: 'E-Design Services for Busy Schedules',
    intro: [
      'Not every project needs in-person visits. If your schedule is full, or you are comfortable carrying out a plan yourself, working together virtually can be a simpler way to get design direction.',
      'Ginger Huff Interiors offers e-design for busy clients who want professional guidance while keeping their investment focused. The work happens remotely, built around photos, measurements and conversation.',
    ],
    image: { ...IMAGES.edesign, alt: 'Tablet showing a bedroom design beside fabric swatches, wood samples and a measuring tape' },
    audience: {
      heading: 'Who this is for',
      items: [
        'Busy homeowners who find in-person appointments hard to schedule.',
        'People who want a clear design direction and prefer to handle purchasing and setup themselves.',
        'Clients who want professional input on one room without committing to a larger engagement.',
      ],
    },
    problems: {
      heading: 'Problems it helps solve',
      items: [
        'Knowing a room needs work but not having time to research every option.',
        'Buying pieces one at a time and ending up with a room that does not hang together.',
        'Wanting a designer’s eye while keeping spending focused.',
      ],
    },
    help: {
      heading: 'How e-design works',
      intro: 'E-design replaces site visits with shared information. Typically that means:',
      items: [
        'Sharing photos, measurements and the details of how you use the room.',
        'Talking through your style, priorities and what you want to keep.',
        'Receiving design direction you can carry out on your own timeline.',
      ],
      note: 'Ask during your consultation exactly what Ginger’s e-design service includes and whether it suits your room.',
    },
    guidance: {
      heading: 'Is e-design right for your room?',
      intro: 'E-design suits some projects better than others.',
      steps: [
        { title: 'Good fit: furnishing and decorating', text: 'Choosing furniture, color and accessories translates well to working remotely.' },
        { title: 'Good fit: you like to do it yourself', text: 'If you enjoy ordering and arranging pieces, a clear plan may be all you need.' },
        { title: 'Consider in-person: complex remodels', text: 'Projects involving construction, such as a kitchen or bath remodel, often benefit from a site visit.' },
        { title: 'Measure carefully', text: 'Remote design depends on accurate dimensions. Include windows, doors, outlets and ceiling height.' },
      ],
    },
    faqs: [
      { q: 'Do you offer virtual interior design?', a: 'Yes. Ginger Huff Interiors offers e-design services for clients who prefer to work remotely.' },
      { q: 'What do I need to provide?', a: 'Plan on clear photos of the room, accurate measurements and notes about how you use the space. Ginger will let you know if anything else is needed.' },
      { q: 'Is e-design a good fit for a remodel?', a: 'Furnishing and decorating projects tend to suit e-design best. Remodels often benefit from in-person design help, which you can discuss at the consultation.' },
      { q: 'How do I get started?', a: 'Book a complimentary design consultation and mention that you are interested in e-design.' },
    ],
    related: ['space-planning', 'color-consultation', 'interior-styling-decorating'],
    inquiryService: 'E-Design & Virtual Consultation',
    crm: {
      serviceId: 'ee8151d1-9bf3-5fcb-9b22-9ae51eacd13d', primaryKeywordId: '212db138-ac7a-42a2-8237-c1b1a555970d', primaryKeyword: 'e-design services edwardsville',
      supportingKeywords: ['e-design', 'virtual interior design'],
    },
  },
  {
    id: 'space-planning',
    name: 'Space Planning & Furniture Layout',
    summary: 'Furniture placement, clear paths and rooms that work the way you live.',
    metaTitle: 'Space Planning and Furniture Layout in Edwardsville',
    description: 'Space planning and furniture layout in Edwardsville, IL. Arrange rooms for comfortable movement, conversation and everyday function with Ginger Huff Interiors.',
    eyebrow: 'Residential · Layout',
    h1: 'Space Planning and Furniture Layout in Edwardsville, IL',
    intro: [
      'A room can have beautiful furniture and still be uncomfortable to live in. When pieces block the path to the door, seats face the wrong way or a corner goes unused, the problem is usually the layout.',
      'Layout planning is part of Ginger Huff Interiors’ residential design work. Space planning looks at how a room is used, how people move through it and where each piece belongs, before anything new is bought.',
    ],
    image: { ...IMAGES.seating, alt: 'Living room with a sofa, two armchairs and a coffee table arranged in front of tall windows' },
    audience: {
      heading: 'Who this is for',
      items: [
        'Homeowners with open floor plans that feel undefined or hard to furnish.',
        'Anyone moving into a new home and deciding where existing furniture should go.',
        'Families whose needs have changed, such as working from home or hosting more often.',
      ],
    },
    problems: {
      heading: 'Problems it helps solve',
      items: [
        'Walkways that are blocked, tight or awkward.',
        'Seating that does not support conversation or a view of the television.',
        'Large rooms that feel empty and small rooms that feel crowded.',
        'Furniture that was bought before the room was planned and never quite fits.',
      ],
    },
    help: {
      heading: 'How Ginger helps',
      intro: 'Space planning focuses on function first. Together you can work through:',
      items: [
        'How each room is used day to day, and by whom.',
        'Where people walk and how to keep those paths clear.',
        'Defining zones for conversation, dining, work or play in larger rooms.',
        'Which existing pieces fit the plan and what, if anything, is missing.',
      ],
    },
    guidance: {
      heading: 'How to think about a layout',
      intro: 'A few principles help before moving a single piece.',
      steps: [
        { title: 'Start with how you live', text: 'List what happens in the room: reading, homework, movie nights, entertaining. The layout should support those activities.' },
        { title: 'Find the paths', text: 'Trace how people enter, cross and leave the room. Keep those routes open before placing furniture.' },
        { title: 'Choose a focal point', text: 'A fireplace, window or view usually anchors the arrangement. Seating should relate to it.' },
        { title: 'Measure before you buy', text: 'Measure the room and the pieces you own. Plan the layout first, then shop for what fits.' },
      ],
    },
    faqs: [
      { q: 'What is the difference between space planning and a makeover?', a: 'Space planning is about arrangement and function: where things go and how you move around them. A makeover can include layout, but also covers what stays, what goes and how the room looks.' },
      { q: 'Can you plan around furniture I already own?', a: 'Yes. Working with what you own is often the first step, and it shows clearly what, if anything, needs to change.' },
      { q: 'Is space planning only for large rooms?', a: 'No. Small rooms often benefit the most, because every piece has to earn its place.' },
      { q: 'How do I start?', a: 'Book a complimentary design consultation and bring room measurements and photos if you have them.' },
    ],
    related: ['home-makeovers', 'custom-furniture-design', 'interior-styling-decorating'],
    inquiryService: 'Home Interiors',
    crm: {
      serviceId: '28763861-be3e-56f6-a91e-8fbcdd55495b', primaryKeywordId: 'e42418d4-1479-4fff-9147-fc24aa963ea2', primaryKeyword: 'space planning edwardsville il',
      supportingKeywords: ['space planning', 'furniture layout', 'furniture layout services edwardsville'],
    },
  },
  {
    id: 'color-consultation',
    name: 'Color Consultation',
    summary: 'Choosing and coordinating colors that suit your light and your home.',
    metaTitle: 'Color Consultation in Edwardsville, IL',
    description: 'Color consultation in Edwardsville, IL. Choose and coordinate paint, finishes and fabrics that work with your light, your furniture and the rest of your home.',
    eyebrow: 'Residential · Color',
    h1: 'Color Consultation in Edwardsville, IL',
    intro: [
      'Color is one of the most affordable ways to change a room and one of the easiest to get wrong. A shade that looked perfect on a small chip can feel completely different on four walls in your own light.',
      'Color coordination is part of Ginger Huff Interiors’ residential design work. A color consultation focuses on choosing colors that suit your home and making sure they work together from room to room.',
    ],
    image: { ...IMAGES.creamKitchen, alt: 'Kitchen in soft cream tones with natural wood, brass fixtures and a Roman shade' },
    audience: {
      heading: 'Who this is for',
      items: [
        'Homeowners about to paint who are stuck between options.',
        'People whose current colors feel off but who cannot say why.',
        'Anyone updating finishes, fabrics or furniture who wants the whole palette to work together.',
      ],
    },
    problems: {
      heading: 'Problems it helps solve',
      items: [
        'Walls painted and repainted because the color never looks right.',
        'Rooms that each look fine but clash when seen from one another.',
        'Paint that fights with flooring, counters or furniture you are keeping.',
        'A home that feels flat or cold, without knowing how color could change it.',
      ],
    },
    help: {
      heading: 'How Ginger helps',
      intro: 'A color consultation looks at the room as a whole, not just the walls. Together you can consider:',
      items: [
        'How natural and artificial light affect color in each room.',
        'The fixed elements you are keeping, such as floors, counters, tile and large furniture.',
        'A palette that flows between connected rooms.',
        'How color in fabrics, rugs and accessories relates to the walls.',
      ],
    },
    guidance: {
      heading: 'Choosing color with confidence',
      intro: 'These habits help whether you are painting one room or many.',
      steps: [
        { title: 'Test in your own light', text: 'Look at samples on the wall at different times of day. Morning and evening light can change a color dramatically.' },
        { title: 'Start with what stays', text: 'Choose colors that work with the floors, counters and furniture you are keeping, not the other way around.' },
        { title: 'Look from room to room', text: 'Stand where you can see several spaces at once. Colors that relate to one another make a home feel connected.' },
        { title: 'Think beyond paint', text: 'Fabric, wood tones and metal finishes are all part of the palette. Coordinate them together.' },
      ],
    },
    faqs: [
      { q: 'Is a color consultation just about paint?', a: 'No. Paint is often the focus, but a good palette also considers flooring, cabinetry, fabrics and finishes.' },
      { q: 'Can you help with one room, or does it have to be the whole house?', a: 'Either. Many people start with one room, though it helps to consider the spaces you can see from it.' },
      { q: 'How is this different from interior styling?', a: 'A color consultation focuses on selecting and coordinating colors. Styling focuses on pulling a room together with accessories, art and textiles once the larger choices are made.' },
      { q: 'How do I start?', a: 'Book a complimentary design consultation and share photos of the rooms in natural light.' },
    ],
    related: ['interior-styling-decorating', 'home-makeovers', 'kitchen-bath-design'],
    alsoSee: [{ href: '/window-treatments/', label: 'Custom Window Treatments', text: 'Window treatments affect both the light in a room and how its colors read.' }],
    inquiryService: 'Home Interiors',
    crm: {
      serviceId: '8d4d7cba-0801-5608-ae57-414136b89cf0', primaryKeywordId: '90a7dff7-6e22-4438-a599-432cead5b401', primaryKeyword: 'color consultation edwardsville il',
      supportingKeywords: ['color consultation'],
    },
  },
  {
    id: 'home-makeovers',
    name: 'Home Makeovers & Room Redesign',
    summary: 'Refresh an existing room and decide what stays, what goes and what changes.',
    metaTitle: 'Home Makeovers and Room Redesign in Edwardsville',
    description: 'Refresh a room without starting over. Home makeovers and room redesign in Edwardsville, IL, deciding what stays, what goes and what will make the biggest difference.',
    eyebrow: 'Residential · Makeovers',
    h1: 'Home Makeovers and Room Redesign in Edwardsville',
    intro: [
      'Refreshing a room rarely means replacing everything. Usually there are pieces you love, pieces that still work and a few that are holding the room back. The hard part is knowing which is which.',
      'A home makeover with Ginger Huff Interiors starts with the room you already have. Room redesign looks at what to keep, what to change and how to bring it all together so the room feels new without starting from scratch.',
    ],
    image: { ...IMAGES.bedroom, alt: 'Bedroom with layered neutral bedding, a bedside lamp and large windows with shades' },
    audience: {
      heading: 'Who this is for',
      items: [
        'Homeowners who are tired of a room but do not want a full renovation.',
        'People whose lives have changed, such as a new baby, grown children or a home office, and whose rooms have not kept up.',
        'Anyone planning a whole-home refresh one room at a time.',
      ],
    },
    problems: {
      heading: 'Problems it helps solve',
      items: [
        'Not knowing which existing furniture to keep and which to let go.',
        'Rooms that feel dated, but where the cause is hard to pin down.',
        'A space that no longer fits how the household uses it.',
        'Spending on new pieces that end up not working with the rest of the room.',
      ],
    },
    help: {
      heading: 'How Ginger helps',
      intro: 'A makeover draws on layout, color and furniture selection together. In a consultation, you can work through:',
      items: [
        'An honest look at what is working in the room and what is not.',
        'Which pieces to keep, which to reposition and which to replace.',
        'Layout, color and furniture choices that bring old and new together.',
        'Where to focus first if you plan to refresh in stages.',
      ],
    },
    guidance: {
      heading: 'Deciding what stays',
      intro: 'Before you buy anything new, sort what you have.',
      steps: [
        { title: 'Keep what you love and what works', text: 'Pieces that are comfortable, well made or meaningful usually earn a place. They can anchor the new look.' },
        { title: 'Question what is merely there', text: 'Some furniture stays out of habit. If a piece is uncomfortable, the wrong size or never used, it may be time for it to go.' },
        { title: 'Consider moving before replacing', text: 'A piece that fails in one room can work well in another. Try a new spot first.' },
        { title: 'Pass on what goes', text: 'Furniture in good condition can often be donated, which keeps usable goods out of landfills.' },
      ],
    },
    faqs: [
      { q: 'How is a makeover different from styling?', a: 'A makeover rethinks the room more broadly, including what stays, the layout and the overall look. Styling adds the finishing layer to a room whose furniture and layout already work.' },
      { q: 'Do I have to replace my furniture?', a: 'No. Keeping the pieces that work is central to a room redesign. The goal is to change what makes the biggest difference.' },
      { q: 'Can we refresh one room at a time?', a: 'Yes. Many homeowners start with the room they use most and continue through the house in stages.' },
      { q: 'How do I get started?', a: 'Book a complimentary design consultation and share photos of the room as it is now, along with the pieces you hope to keep.' },
    ],
    related: ['space-planning', 'interior-styling-decorating', 'color-consultation'],
    alsoSee: [{ href: '/window-treatments/', label: 'Custom Window Treatments', text: 'New drapery or shades can refresh a room while the furniture stays put.' }],
    citation: {
      text: 'The U.S. Environmental Protection Agency lists donating usable items as one way to reduce waste.',
      source: 'U.S. EPA, What You Can Do: Reducing and Reusing Basics',
      href: 'https://www.epa.gov/recycle/what-you-can-do',
    },
    inquiryService: 'Home Interiors',
    crm: {
      serviceId: 'c8d45a19-73f6-5399-9b03-29dcf9fa0676', primaryKeywordId: 'f029d78c-ef5d-47e1-8c26-e8b40ff3cba2', primaryKeyword: 'home makeover edwardsville il',
      supportingKeywords: ['home makeover', 'room redesign', 'room redesign edwardsville il'],
    },
  },
];

export const SERVICE_PAGE_IDS = SERVICE_PAGES.map(page => page.id);
export const servicePagePath = (id: ServicePageId) => `/${id}/`;
export const getServicePage = (id: string) => SERVICE_PAGES.find(page => page.id === id);
