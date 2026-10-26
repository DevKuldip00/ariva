export interface Project {
  id: string;
  title: string;
  category: 'Living Spaces' | 'Bedrooms' | 'Kitchens' | 'Dining Spaces' | 'Complete Residences';
  subtitle: string;
  location: string;
  heroImage: string;
  gallery: string[];
  summary: string;
  scope: string;
  palette: string[];
  highlights: string[];
  isRealProject?: boolean;
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  deliverables: string[];
  suitableFor: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export interface PhilosophyPrinciple {
  number: string;
  title: string;
  statement: string;
  description: string;
}

export const brandConfig = {
  name: 'Ariva Living',
  tagline: 'Spaces that feel like you.',
  descriptor: 'Interior Design Studio · Satellite, Ahmedabad',
  city: 'Ahmedabad',
  locality: 'Satellite',
  state: 'Gujarat',
  country: 'India',
  fullAddress: 'Satellite, Ahmedabad, Gujarat 380015, India',
  
  // Configurable contact channels (editable placeholders until verified business details are supplied)
  phone: {
    display: '+91 (Studio Contact Pending Verification)',
    link: 'tel:+910000000000',
    isConfigured: false,
  },
  email: {
    display: 'studio@arivaliving.com (Configurable)',
    link: 'mailto:studio@arivaliving.com',
    isConfigured: false,
  },
  whatsapp: {
    display: 'WhatsApp Consultation (Configurable)',
    link: 'https://wa.me/',
    isConfigured: false,
  },
  socials: {
    instagram: {
      display: 'Instagram (Configurable)',
      link: '#',
      isConfigured: false,
    },
    pinterest: {
      display: 'Pinterest (Configurable)',
      link: '#',
      isConfigured: false,
    },
    linkedin: {
      display: 'LinkedIn (Configurable)',
      link: '#',
      isConfigured: false,
    },
  },
  
  // Brand color tokens derived from uploaded logo
  colors: {
    brandGreen: '#1A211D',
    brandGold: '#C5A880',
    warmIvory: '#F9F7F2',
    naturalStone: '#D6CFBF',
    mutedOlive: '#5E6554',
    warmTaupe: '#9E9281',
    charcoal: '#181A18',
  },
};

export const projectsData: Project[] = [
  {
    id: 'satellite-master-suite',
    title: 'The Satellite Suite',
    category: 'Bedrooms',
    subtitle: 'Bespoke Acoustic Slats, Dark Timber Reveal & Ambient Niche Illumination',
    location: 'Satellite, Ahmedabad',
    heroImage: '/images/project-suite-wide.png',
    gallery: [
      '/images/project-suite-wide.png',
      '/images/project-wardrobe-tv.png',
      '/images/project-headboard-detail.png',
      '/images/project-bedroom-angle.png',
    ],
    summary: 'A refined master bedroom suite balancing minimal geometric planes with tactile warmth, acoustic vertical fluting, and soft recessed illumination.',
    scope: 'Complete bedroom interior architecture, custom headboard wall with fluted acoustic paneling, floating LED display shelves, concealed seamless wardrobes, concrete plaster TV accent wall, ambient cove ceiling design.',
    palette: ['Warm Ivory', 'Muted Linen', 'Smoked Walnut', 'Soft Terracotta', 'Raw Concrete Plaster', 'Champagne Brass'],
    highlights: [
      'Custom fluted vertical acoustic paneling with concealed shadow gap detailing',
      'Low-profile upholstered platform bed with integrated floating nightstands and bedside sconces',
      'Seamless full-height wardrobe system with warm backlit display niches for curated sculpture',
      'Micro-cement textured media wall with floating minimal TV console',
    ],
    isRealProject: true,
  },
  {
    id: 'sabarmati-riverside-penthouse',
    title: 'Riverside Penthouse Living',
    category: 'Living Spaces',
    subtitle: 'Double-Height Travertine Pavilion & Panoramic River Vistas',
    location: 'Ahmedabad',
    heroImage: '/images/hero-penthouse.jpg',
    gallery: [
      '/images/hero-penthouse.jpg',
      '/images/project-lounge.jpg',
    ],
    summary: 'An expansive double-height architectural living space celebrating natural stone, organic curvature, and dramatic vertical glass curtains overlooking the water.',
    scope: 'Double-height volume interior architecture, full-height bookmatched travertine stone wall, fluted dark timber mezzanine paneling, curved bouclé conversation lounge, floating terrazzo stairs.',
    palette: ['Honed Travertine', 'Natural Oak', 'Muted Olive Velvet', 'Warm Ivory Bouclé', 'Smoked Eucalyptus'],
    highlights: [
      '6.2-meter ceiling volume with continuous recessed architectural coves and soft perimeter lighting',
      'Honed Roman travertine bookmatched vertical stone cladding with precision shadow reveals',
      'Custom organic curved sofa designed for 360-degree panoramic conversation',
      'Mezzanine gallery overlook with bronze glass and smoked timber acoustic cladding',
    ],
  },
  {
    id: 'culinary-studio-satellite',
    title: 'Fluted Oak & Quartzite Kitchen',
    category: 'Kitchens',
    subtitle: 'Sculptural Waterfall Island & Tactile Vertical Millwork',
    location: 'Satellite, Ahmedabad',
    heroImage: '/images/project-kitchen.jpg',
    gallery: [
      '/images/project-kitchen.jpg',
      '/images/project-dining.jpg',
    ],
    summary: 'A bespoke culinary space designed as an extension of the living architecture, marrying tactile fluted oak joinery with a monolithic quartzite waterfall island.',
    scope: 'Modular kitchen architecture, custom vertical fluted natural oak cabinetry, seamless Calacatta quartzite waterfall island, integrated matte bronze fixtures, concealed pantry access.',
    palette: ['Natural Fluted Oak', 'Veined Quartzite', 'Champagne Bronze', 'Limestone Floor', 'Warm Alabaster'],
    highlights: [
      'Monolithic quartzite waterfall island with ergonomic counter seating for four',
      'Full-height vertical fluted timber cabinetry with concealed touch-to-open latches',
      'Architectural pendant lighting in mouth-blown tinted glass casting warm evening illumination',
      'Integrated flush appliances and concealed pantry doors matching surrounding joinery',
    ],
  },
  {
    id: 'courtyard-dining-sanctuary',
    title: 'The Courtyard Dining Pavilion',
    category: 'Dining Spaces',
    subtitle: 'Live-Edge Walnut Table & Textured Limewash Horizon',
    location: 'Ahmedabad',
    heroImage: '/images/project-dining.jpg',
    gallery: [
      '/images/project-dining.jpg',
      '/images/project-lounge.jpg',
    ],
    summary: 'An intimate architectural dining environment framed by sheer linen drapery, hand-applied limewash, and an unhurried visual connection to the garden.',
    scope: 'Dining room spatial design, custom 8-seat live-edge natural walnut dining table, textured limewash accent wall, minimalist linear bronze chandelier, floor-to-ceiling glass integration.',
    palette: ['Natural Walnut', 'Bouclé Sand', 'Hand-applied Limewash', 'Architectural Bronze', 'Natural Sheer Linen'],
    highlights: [
      'Single-slab live-edge walnut dining table crafted to anchor family gatherings and entertaining',
      'Hand-troweled limewash finish bringing tactile organic depth to the walls',
      'Bespoke linear LED chandelier with both downlight illumination and soft ceiling wash',
      'Zero-threshold sightlines into private courtyard greenery and evening water reflections',
    ],
  },
  {
    id: 'courtyard-formal-lounge',
    title: 'The Courtyard Formal Lounge',
    category: 'Living Spaces',
    subtitle: 'Ribbed Travertine Wall & Quiet Architectural Stillness',
    location: 'Ahmedabad',
    heroImage: '/images/project-lounge.jpg',
    gallery: [
      '/images/project-lounge.jpg',
      '/images/hero-penthouse.jpg',
    ],
    summary: 'A serene ground-level formal lounge opening directly onto a reflecting pool courtyard, framed by fluted stone surfaces and low-slung linen seating.',
    scope: 'Ground-level lounge architecture, full-height ribbed travertine stone feature wall, low-profile modular seating, flush sliding glass facade overlooking water feature.',
    palette: ['Ribbed Travertine', 'Polished Terrazzo', 'Deep Olive', 'Champagne Bronze', 'Textured Linen'],
    highlights: [
      'Full-length ribbed travertine wall with continuous graze lighting from above',
      'Zero-threshold transition into external reflecting pool and garden courtyard',
      'Low-slung modular seating promoting relaxed conversation and spatial calm',
      'Smoked oak coffee tables with subtle brushed bronze rim detailing',
    ],
  },
];

export const servicesData: Service[] = [
  {
    id: 'residential-interiors',
    title: 'Residential Interior Architecture',
    tagline: 'Complete spatial transformation for modern living',
    description: 'We conceive residential interiors as complete spatial environments, balancing natural daylight, sightlines, thermal comfort, and effortless day-to-day functionality.',
    image: '/images/hero-penthouse.jpg',
    deliverables: [
      'Comprehensive 2D spatial layouts and circulation planning',
      'Detailed 3D architectural visualizations and walk-throughs',
      'Full material specifications: natural stone, veneers, metals, fabrics',
      'Integrated architectural lighting, HVAC, and electrical schematics',
      'On-site technical coordination with specialized artisans',
    ],
    suitableFor: 'Villas, Penthouses, 3BHK & 4BHK Luxury Residences',
  },
  {
    id: 'modular-kitchens',
    title: 'Bespoke Modular Kitchens',
    tagline: 'Precision culinary engineering meets tactile luxury',
    description: 'Custom culinary spaces designed around your cooking rituals. We blend German engineering hardware, seamless quartzite countertops, and bespoke fluted timber joinery.',
    image: '/images/project-kitchen.jpg',
    deliverables: [
      'Ergonomic workflow planning (prep, cook, wash, store zones)',
      'Custom fluted or flat veneer cabinetry with concealed shadow gaps',
      'Monolithic waterfall island design in quartzite, granite, or marble',
      'Soft-close Blum/Hettich luxury drawer mechanisms and pantry towers',
      'Integrated appliance specifications and architectural task lighting',
    ],
    suitableFor: 'Modern apartments and standalone homes seeking bespoke culinary solutions',
  },
  {
    id: 'bedroom-suites',
    title: 'Master Suites & Custom Wardrobes',
    tagline: 'Sanctuaries designed for genuine rest and restoration',
    description: 'Master bedrooms and walk-in dressing suites designed as tranquil sanctuaries. We integrate acoustic fluting, upholstered headboards, ambient lighting, and bespoke glass wardrobes.',
    image: '/images/project-suite-wide.png',
    deliverables: [
      'Acoustic wall paneling and custom upholstered headboards',
      'Walk-in dressing rooms with reeded glass doors and warm interior lighting',
      'Curated bedside lighting, reading sconces, and nighttime path illumination',
      'Floating bedside cabinetry and integrated vanity dressing tables',
      'Sheer drapery planning for soft diffused morning light',
    ],
    suitableFor: 'Master suites, guest bedrooms, and luxury dressing rooms',
  },
  {
    id: 'living-dining-spaces',
    title: 'Living & Dining Spatial Architecture',
    tagline: 'Gathering spaces anchored in light, stone, and proportion',
    description: 'The social core of your home. We craft living and dining rooms with custom TV feature walls, travertine claddings, linear chandeliers, and seamless connections to outdoor terraces.',
    image: '/images/project-dining.jpg',
    deliverables: [
      'Focal feature walls in travertine, bookmatched marble, or fluted timber',
      'Curated furniture compositions with custom curved sofas and live-edge tables',
      'Media integration with concealed cabling and floating display shelving',
      'Architectural lighting scenes (Morning, Entertaining, Evening Cinema)',
      'Terrace and courtyard visual alignment for spatial expansion',
    ],
    suitableFor: 'Formal living areas, family lounges, and open-plan dining rooms',
  },
  {
    id: 'material-curation',
    title: 'Material Curation & Bespoke Joinery',
    tagline: 'Authentic materials curated for tactile longevity',
    description: 'Every surface in your space matters. We guide you through handpicking genuine natural stones, sustainable hardwoods, acoustic textiles, and architectural metal accents.',
    image: '/images/project-headboard-detail.png',
    deliverables: [
      'Tactile mood boards with physical stone, veneer, and textile swatches',
      'Custom millwork shop drawings down to the millimeter',
      'Direct selection support at premium stone yards and veneer galleries',
      'Hardware curation in brushed bronze, champagne brass, and matte graphite',
      'Quality assurance inspections across all carpentry and stone fabrication',
    ],
    suitableFor: 'Clients who value craftsmanship, tactile authenticity, and custom details',
  },
  {
    id: 'turnkey-execution',
    title: 'Turnkey Interior Execution',
    tagline: 'Seamless realization from initial drawing to handover',
    description: 'A single point of accountability for your entire interior project. We manage specialized contractors, site execution, quality benchmarks, and final white-glove styling.',
    image: '/images/project-wardrobe-tv.png',
    deliverables: [
      'Dedicated project schedule with transparent milestone tracking',
      'Rigorous site supervision ensuring drawings are built to exact tolerance',
      'Coordination across civil, plumbing, electrical, carpentry, and painting',
      'Defect rectification and final deep cleaning prior to occupancy',
      'Comprehensive handover documentation and maintenance guidance',
    ],
    suitableFor: 'Complete residential renovations and new home interior fit-outs',
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Spatial Dialogue',
    subtitle: 'Understanding the way you live',
    description: 'We begin with an in-depth consultation exploring your routines, aesthetic instincts, storage requirements, and spatial aspirations for your Ahmedabad residence.',
    deliverables: ['Lifestyle & spatial requirement brief', 'Site dimension assessment & architectural review', 'Initial design direction and mood boards'],
  },
  {
    step: '02',
    title: 'Concept & Spatial Planning',
    subtitle: 'Shaping light, volume, and movement',
    description: 'We develop optimized 2D space planning layouts to maximize circulation, natural daylight capture, ventilation, and ergonomic ease across every room.',
    deliverables: ['Detailed 2D floor plans with furniture layouts', 'Spatial zoning and sightline studies', 'Preliminary material and texture palettes'],
  },
  {
    step: '03',
    title: '3D Visualization & Material Curation',
    subtitle: 'Experiencing your space before construction',
    description: 'We translate the spatial plans into photorealistic 3D interior views and curated physical material palettes, allowing you to walk through and refine every finish.',
    deliverables: ['Photorealistic 3D renders from multiple vantage points', 'Physical material sample board (stone, timber, fabrics)', 'Lighting scene design and fixture selection'],
  },
  {
    step: '04',
    title: 'Technical Joinery & Engineering',
    subtitle: 'Millimeter-precise documentation',
    description: 'Before a single cut is made on site, every cabinet, fluted panel, electrical outlet, and ceiling reveal is meticulously documented in technical working drawings.',
    deliverables: ['Millwork and bespoke joinery shop drawings', 'Electrical, lighting, and plumbing schematics', 'Bill of quantities and itemized specifications'],
  },
  {
    step: '05',
    title: 'Execution & White-Glove Handover',
    subtitle: 'Bringing the architecture to life',
    description: 'Our team oversees fabrication, on-site installation, and final detailing to ensure the completed interior matches the design intent down to the finest shadow reveal.',
    deliverables: ['On-site quality supervision throughout installation', 'Pre-handover snagging and precision adjustments', 'Final styling and white-glove space handover'],
  },
];

export const philosophyPrinciples: PhilosophyPrinciple[] = [
  {
    number: '01',
    title: 'Spatial Fluidity',
    statement: 'A well-designed room gives you room to breathe.',
    description: 'We prioritize intuitive circulation, unobstructed sightlines, and generous breathing room. Luxury is not packing a space with ornamentation, but composing it with architectural poise.',
  },
  {
    number: '02',
    title: 'Material Authenticity',
    statement: 'Honest materials develop character with age.',
    description: 'We favor genuine travertine, natural ribbed oak, quartzite, linen, and patinated bronze over synthetic imitations. Natural materials age gracefully and impart quiet permanence.',
  },
  {
    number: '03',
    title: 'Lighting as Architecture',
    statement: 'Light defines the emotional register of a room.',
    description: 'We layer architectural lighting: soft morning daylight through sheer linen, concealed perimeter cove washes, and intimate warm focal pools for evening contemplation.',
  },
  {
    number: '04',
    title: 'Tactile Warmth',
    statement: 'Interiors should invite touch and soothe the senses.',
    description: 'From ribbed acoustic wall slats to plush bouclé upholstery and honed stone, our palette is calibrated to create a calming, tactile cocoon away from urban pace.',
  },
  {
    number: '05',
    title: 'Ahmedabad Climate Sensibility',
    statement: 'Designs tuned to local light and temperature.',
    description: 'Deep reveals that shield strong afternoon western sun, cross-ventilation corridors, and materials that remain cool underfoot honor the climate of Gujarat.',
  },
  {
    number: '06',
    title: 'Personal Expression',
    statement: '“Spaces that feel like you.”',
    description: 'We reject generic design templates. Every home is a bespoke portrait of the individuals who inhabit it, shaped around your daily rituals, memories, and aspirations.',
  },
];

export const studioCommitments = [
  {
    title: 'Transparent Collaboration',
    description: 'Clear scope definition, transparent material specifications, and regular milestone reviews so you are always in complete control.',
  },
  {
    title: '3D Spatial Clarity',
    description: 'Comprehensive 3D visualizations and tactile physical samples before construction begins, eliminating guesswork and surprises.',
  },
  {
    title: 'Precision Craftsmanship',
    description: 'Meticulous millwork tolerances, seamless joints, and high-standard fabrication supervised by experienced interior specialists.',
  },
  {
    title: 'Local Ahmedabad Presence',
    description: 'Based directly in Satellite, Ahmedabad, enabling frequent site visits, immediate artisan coordination, and responsive local service.',
  },
];
