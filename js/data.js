/* =========================================================
   YOUR CONTENT LIVES HERE — edit this file, nothing else.
   Add / remove / reorder entries freely; the site rebuilds
   the gallery, the filter chips and their counts at runtime.
   ========================================================= */

/* ---------------------------------------------------------
   WORK SAMPLES
   category : 'wordpress' | 'shopify' | 'nextjs' | 'react' | 'custom'
   img      : screenshots in assets/work/
              missing file = graceful gradient placeholder
   url      : live link.   '' hides the Visit button.
   repo     : source link. '' hides the Code button.
   --------------------------------------------------------- */
const WORK = [

  /* ---------- Shopify (client work) ---------- */
  {
    title: 'Luxeberry',
    category: 'shopify',
    desc: 'Premium Shopify store for handcrafted contemporary jewellery — luxury aesthetic, seamless checkout flow and conversion-optimised product pages.',
    tags: ['Liquid', 'Jewellery', 'CRO'],
    img: 'assets/work/luxeberry.png',
    url: 'https://luxeberry.in/',
    repo: ''
  },
  {
    title: 'Moonburst Jewellery',
    category: 'shopify',
    desc: 'Elegant storefront for fine jewellery with curated collections, polished product photography and a mobile-first shopping experience built to scale.',
    tags: ['Liquid', 'Mobile-first', 'Collections'],
    img: 'assets/work/moonburst.png',
    url: 'https://moonburstjewellery.com/',
    repo: ''
  },

  /* ---------- WordPress (client work) ---------- */
  {
    title: 'Amino Dutch',
    category: 'wordpress',
    desc: 'Health and fitness brand site for amino acid supplements and sports nutrition — clean product showcases, trust-building content and an SEO-optimised structure.',
    tags: ['Custom Theme', 'Health & Fitness', 'SEO'],
    img: 'assets/work/aminodutch.png',
    url: 'https://www.aminodutch.com/',
    repo: ''
  },
  {
    title: 'Grain Farm',
    category: 'wordpress',
    desc: 'Organic grain and agriculture brand showcasing farm-fresh products and sustainable practices, with direct-to-consumer ordering on an SEO-friendly layout.',
    tags: ['Custom Theme', 'Agriculture', 'D2C'],
    img: 'assets/work/grainfarm.png',
    url: 'https://www.grainfarm.in/',
    repo: ''
  },
  {
    title: 'Sage Bros',
    category: 'wordpress',
    desc: 'Business site presenting services, team and portfolio in a conversion-focused design — fully responsive, with optimised performance and structured data.',
    tags: ['Business', 'Responsive', 'Schema'],
    img: 'assets/work/sagebros.png',
    url: 'https://sagebros.in/',
    repo: ''
  },
  {
    title: 'Growth With Abhishek',
    category: 'wordpress',
    desc: 'Personal-brand site for a digital marketing coach — course offerings, testimonials and lead-generation funnels tuned for conversion.',
    tags: ['Personal Brand', 'Funnels', 'Marketing'],
    img: 'assets/work/abhishek.png',
    url: 'https://growthwithabhishek.com/',
    repo: ''
  },
  {
    title: 'Ecom Xpert Studio',
    category: 'wordpress',
    desc: 'Site for an e-commerce consulting agency — services, case studies and expertise in building high-converting stores, in an authority-building aesthetic.',
    tags: ['Agency', 'Case Studies', 'E-Commerce'],
    img: 'assets/work/exomxperts.png',
    url: 'https://ecomxpertstudio.in/',
    repo: ''
  },

  /* ---------- Custom build (client work) ---------- */
  {
    title: 'Monika Garg — Portfolio',
    category: 'custom',
    desc: 'Sleek personal portfolio showcasing creative work and professional journey — smooth animations, clean typography and a fully responsive layout.',
    tags: ['Portfolio', 'Animation', 'Netlify'],
    img: 'assets/work/monikaportfolio.png',
    url: 'https://monikagarg.netlify.app/',
    repo: ''
  },

  /* ---------- Next.js (projects) ---------- */
  {
    title: 'Vayu-WARN',
    category: 'nextjs',
    desc: 'Real-time disaster alert app aggregating live emergency data, with role-based access control, serverless data-quality checks and interactive Leaflet maps.',
    tags: ['Next.js', 'Firebase', 'Leaflet.js', 'TypeScript'],
    img: 'assets/work/vayuwarn.png',
    url: 'https://vayu-warn.vercel.app/',
    repo: 'https://github.com/chiragkashyap267/vayu-warn'
  },
  {
    title: 'Mockly AI',
    category: 'nextjs',
    desc: 'Voice-to-voice AI mock interview platform with real-time interaction, response analysis and instant structured feedback.',
    tags: ['Next.js', 'Voice AI', 'Tailwind', 'TypeScript'],
    img: 'assets/work/mocklyai.png',
    url: 'https://mocklyai.vercel.app/',
    repo: 'https://github.com/chiragkashyap267/mocklyAI'
  },
  {
    title: 'CampusVault',
    category: 'nextjs',
    desc: 'Centralised academic resource hub for GBPIET students — course materials, notes, previous-year papers and announcements on a Firebase backend.',
    tags: ['Next.js', 'Firebase', 'Tailwind'],
    img: 'assets/work/campusvault.png',
    url: 'https://campusvaultgbpiet.vercel.app/',
    repo: 'https://github.com/chiragkashyap267/campusvault'
  },
  {
    title: 'Graphixa',
    category: 'nextjs',
    desc: 'Full-stack digital products store — public storefront, secure admin dashboard, digital file delivery and cloud-based asset management.',
    tags: ['Next.js 14', 'Firebase', 'Cloudinary', 'Framer Motion'],
    img: 'assets/work/graphixa.png',
    url: 'https://graphixa.vercel.app/',
    repo: 'https://github.com/chiragkashyap267/graphixa'
  },

  /* ---------- React (projects) ---------- */
  {
    title: 'GBPIETsync',
    category: 'react',
    desc: 'Attendance management system for faculty — create classes, mark attendance dynamically, analyse student records and generate PDF reports.',
    tags: ['React.js', 'Firebase', 'jsPDF', 'Bootstrap'],
    img: 'assets/work/gbpietsync.png',
    url: 'https://gbpietsync.vercel.app/',
    repo: 'https://github.com/chiragkashyap267/gbpietsync'
  },
  {
    title: 'Forecastly',
    category: 'react',
    desc: 'Responsive weather app serving real-time conditions for any location worldwide, pulling live data from a trusted forecasting API.',
    tags: ['React.js', 'Axios', 'REST API', 'Bootstrap'],
    img: 'assets/work/forecastly.png',
    url: 'https://weatherapp-sepia-beta.vercel.app/',
    repo: 'https://github.com/chiragkashyap267/weatherapp'
  },
  {
    title: 'WordWise',
    category: 'react',
    desc: 'API-driven dictionary app delivering real-time word definitions, phonetics and usage examples from a public dictionary API.',
    tags: ['React.js', 'Axios', 'REST API'],
    img: 'assets/work/wordwise.png',
    url: 'https://chiragkashyap267.github.io/front-end-projects/',
    repo: 'https://github.com/chiragkashyap267/front-end-projects'
  }
];

/* ---------------------------------------------------------
   CATEGORY LABELS  (shown on the filter chips + card badges)
   --------------------------------------------------------- */
const CATEGORIES = {
  wordpress: 'WordPress',
  shopify:   'Shopify',
  nextjs:    'Next.js',
  react:     'React',
  custom:    'Custom'
};

/* ---------------------------------------------------------
   CERTIFICATES
   img  : scans/screenshots in assets/certificates/
          (any ratio — cards crop to 4:3, lightbox shows full)
   link : public verification URL. '' hides the Verify link.
   --------------------------------------------------------- */
const CERTIFICATES = [
  {
    title:  '5-Day AI Agents Intensive',
    issuer: 'Google × Kaggle',
    note:   'Intensive on building and orchestrating AI agents.',
    img:    'assets/certificates/kaggle.png',
    link:   'https://www.kaggle.com/certification/badges/chirag267/105'
  },
  {
    title:  'Frontend Web Developer Intern',
    issuer: 'Prodesk IT',
    note:   'Built responsive landing pages and reusable UI elements.',
    img:    'assets/certificates/prodesk.jpg',
    link:   'https://www.linkedin.com/feed/update/urn:li:activity:7355992814448431104/'
  },
  {
    title:  'Digital Marketing Trivia',
    issuer: 'Vijesha IT Services LLP',
    note:   'Competitive assessment on digital marketing fundamentals.',
    img:    'assets/certificates/vijesha.jpg',
    link:   'https://www.linkedin.com/feed/update/urn:li:activity:7390418638333190144/'
  },

  /* --- no scan yet: drop the file in and the card fills itself --- */
  {
    title:  'Agentic AI Hackathon',
    issuer: 'Product Space × Twinmind',
    note:   'Built a prototype modelled on the Twinmind extension.',
    img:    'assets/certificates/twinmind.jpg',
    link:   ''
  },
  {
    title:  'Web Developer',
    issuer: 'Elem Consumer Tech',
    note:   'Managed website creative and custom UI elements.',
    img:    'assets/certificates/elem.jpg',
    link:   ''
  },
  {
    title:  'Advanced Diploma in IT',
    issuer: 'Basic Computer Course',
    note:   'Foundations in computing, tooling and IT fundamentals.',
    img:    'assets/certificates/diploma.jpg',
    link:   ''
  }
];
