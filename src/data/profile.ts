// Single source of truth for every word on the site.
// Companies, titles, dates and education mirror the CV exactly; descriptions are rewritten.

export const person = {
  name: 'Sercan Erhan',
  handle: 'sercan.erhan',
  role: 'Chief Product Officer',
  company: 'Basefy Innovation Lab',
  location: 'Istanbul, Türkiye',
  coords: '41.0082°N 28.9784°E',
  email: 'sercanerhan@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sercanerhan',
  github: 'https://github.com/sercanerhan/portfolio',
  status: 'Building AI products · Istanbul',
  headline: ['I build products', 'that find product–market fit.'],
  subline:
    'CPO at Basefy Innovation Lab. 18 years turning complex systems (maps, cities, logistics networks, healthcare and AI) into products people actually use.',
}

export type Metric = { value: number; prefix?: string; suffix?: string; label: string; context: string }

export const impact: Metric[] = [
  { value: 142, prefix: '+', suffix: '%', label: 'key engagement metric', context: 'Medibulut · data-driven UX' },
  { value: 24, label: 'countries live', context: 'Delivery Hero · APAC, MENA, EU, LATAM' },
  { value: 16, suffix: ' mo', label: 'to a 100% exit', context: 'Marketyo → Delivery Hero' },
  { value: 11, prefix: '$', suffix: 'M', label: 'annual savings', context: 'Istanbul Metropolitan Municipality' },
  { value: 40, prefix: '+', suffix: '%', label: 'revenue growth', context: 'Medibulut · new business lines' },
  { value: 52, prefix: '+', suffix: '%', label: 'user base', context: 'Medibulut · product + growth' },
  { value: 101, label: 'departments served', context: 'IMM · web, mobile & desktop' },
]

export type Role = {
  version: string
  period: string
  title: string
  company: string
  note?: string
  era: string
  summary: string
  highlights: string[]
  tags: string[]
}

export const roles: Role[] = [
  {
    version: 'v2025',
    period: '07.2025 – Present',
    title: 'Chief Product Officer (CPO)',
    company: 'Basefy Innovation Lab',
    era: 'AI portfolio',
    summary:
      'Leading product strategy across a portfolio of startups and in-house AI products inside an innovation lab.',
    highlights: [
      'Own product strategy for a portfolio of ventures and proprietary AI products across B2B and B2C.',
      'Set the KPI / OKR system and roadmaps that move each venture toward product–market fit.',
      'Install product operating models that turn founder-led teams into product-driven organisations.',
      'Lead the cross-functional teams that build and ship Basefy’s own AI solutions end to end.',
      'Coach founders and product teams across the lab, balancing portfolio strategy with hands-on execution.',
    ],
    tags: ['AI / LLM', 'Agents', 'Portfolio', 'PMF', 'OKRs'],
  },
  {
    version: 'v2023',
    period: '04.2023 – 04.2025',
    title: 'Head of Product',
    company: 'Medibulut',
    era: 'Healthtech growth',
    summary:
      'Led product for a healthcare technology company with B2B and B2C solutions across the healthcare industry.',
    highlights: [
      'Led product strategy for healthcare and telehealth SaaS.',
      'Lifted the key user engagement metric by 142% through data-driven UX improvements.',
      'Grew the user base 52% through product enhancements paired with targeted campaigns.',
      'Contributed 40% revenue growth by identifying and capturing new business opportunities.',
      'Raised customer satisfaction 70% by turning user research into prioritised fixes.',
      'Launched new products, expanding into the B2B clinic-management vertical.',
      'Built the product analytics framework that made decisions data-driven across teams.',
    ],
    tags: ['Healthtech', 'Telehealth', 'SaaS', 'B2B + B2C', 'Analytics'],
  },
  {
    version: 'v2022',
    period: '02.2022 – 04.2023',
    title: 'Senior Product Manager',
    company: 'Delivery Hero',
    era: 'Global logistics',
    summary:
      'Built a global logistics-as-a-service product across 24 countries in APAC, MENA, EU and LATAM.',
    highlights: [
      'Built and scaled a logistics-as-a-service product across 24 countries in 4 regions.',
      'Launched in 4 new countries across 2 regions, driving 65% QoQ growth.',
      'Orchestrated a product with dependencies on 16 internal services.',
      'Led the analytics setup, integrating tracking tools that sharpened insight and decisions.',
      'Owned roadmap planning and multi-region stakeholder alignment.',
    ],
    tags: ['Logistics', 'Platform', 'Multi-region', 'Analytics'],
  },
  {
    version: 'v2020',
    period: '03.2020 – 02.2022',
    title: 'Head of Product',
    company: 'Marketyo',
    note: 'Acquired by Delivery Hero in July 2021 (100% exit)',
    era: 'Commerce & exit',
    summary:
      'Built the product organisation from scratch and took the full B2C, B2B and B2B2C portfolio to an exit in 16 months.',
    highlights: [
      'Built the product management organisation from zero and hired 5 PMs.',
      'Led cross-functional teams of PMs, data engineers, test-automation engineers and design.',
      'Launched Marketyo’s own grocery marketplace application.',
      'Owned B2B (web, mobile, API), B2C grocery (mobile, web), online payments and route optimization.',
      'Led business and technical workstreams with Delivery Hero and Yemeksepeti through the acquisition.',
      'Led the grocery integration for Yemeksepeti’s Local Shops project.',
    ],
    tags: ['Quick-commerce', 'Marketplace', 'Payments', 'M&A', 'Org building'],
  },
  {
    version: 'v2018',
    period: '04.2018 – 03.2020',
    title: 'Product Manager',
    company: 'Arute Solutions',
    note: 'Formerly PlusoneMinusOne',
    era: 'Optimization SaaS',
    summary:
      'Managed two squads shipping SaaS route optimization and ML-driven location intelligence.',
    highlights: [
      'Launched a SaaS route-optimization product in APAC and EU for banking and parcel delivery.',
      'Built a machine-learning location-intelligence (GIS) product for retail.',
      'Defined product strategy and roadmap; wrote PRDs; ran competitive and gap analysis.',
      'Supported presales for customers in the USA, Thailand and Pakistan.',
      'Managed third-party partnerships for data sourcing; mentored the Cash Optimization squad.',
    ],
    tags: ['Route optimization', 'ML', 'Location intelligence', 'SaaS'],
  },
  {
    version: 'v2013',
    period: '04.2013 – 04.2018',
    title: 'Coordinator, Head of IT Department',
    company: 'ISBAK Istanbul IT and Smart City Technologies',
    note: 'İstanbul Metropolitan Municipality, Directorate of GIS',
    era: 'Smart city',
    summary:
      'Consolidated data and IT services and built products for 101 municipal departments and Istanbul’s citizens.',
    highlights: [
      'Delivered $11M in annual savings by centralising licences, data and app development. $8M came from data consolidation alone.',
      'Led 30+ engineers building web, mobile and desktop products for 101 departments and citizens.',
      'Launched Istanbul’s very first open-data portal and produced the city’s first GTFS transit data.',
      'Shipped a B2C multimodal transportation app for citizens.',
      'Owned work packages in the EU CitySDK ICT PSP project (Lisbon, Barcelona, Rome).',
      'Represented IMM as spokesperson at national and international events.',
    ],
    tags: ['Smart city', 'Open data', 'GTFS', 'GovTech', 'Leadership'],
  },
  {
    version: 'v2011',
    period: '07.2011 – 01.2013',
    title: 'Project Manager',
    company: 'İTÜ National Geographical Information Systems Innovation Center',
    era: 'National standards',
    summary: 'Led 12 engineers developing Turkey’s first national spatial data standards.',
    highlights: [
      'Developed national SDI infrastructure (TUCBS) and urban GIS standards (TRKBİS).',
      'Built a disaster information system on ArcGIS Server, Oracle Spatial and GeoNetwork.',
      'Led workshops for 18 ministries and 3,000 municipalities.',
    ],
    tags: ['GIS', 'Standards', 'Public sector'],
  },
  {
    version: 'v2010',
    period: '07.2010 – 07.2011',
    title: 'Senior GIS Consultant',
    company: 'ESRI Turkey',
    era: 'Mapping the ground',
    summary: 'Solution architect for Esri and open-source GIS integrations.',
    highlights: [
      'Architected Esri and third-party integrations for administrations, municipalities and companies.',
      'Managed a 40+ person team delivering master-data implementation projects.',
      'Presented as Deputy Regional Director in 7 cities and 15 universities.',
    ],
    tags: ['GIS', 'Solution architecture'],
  },
  {
    version: 'v2008',
    period: '07.2008 – 11.2009',
    title: 'GIS Analyst',
    company: 'İŞLEM CBS',
    era: 'Mapping the ground',
    summary: 'Implemented Esri solutions and supported presales.',
    highlights: [
      'Automated GIS workflows with Python (ArcPy).',
      'Built live demos and PoCs for customers.',
      'Taught ArcGIS Desktop and ArcGIS Server courses.',
    ],
    tags: ['Python', 'GIS', 'Presales'],
  },
]

export type CaseStudy = {
  slug: string
  kicker: string
  title: string
  company: string
  period: string
  cover: string
  metrics: { value: string; label: string }[]
  context: string
  challenge: string
  actions: string[]
  outcome: string
  lesson: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'marketyo-exit',
    kicker: 'Zero to exit',
    title: 'Building a product org and selling it in 16 months',
    company: 'Marketyo → Delivery Hero',
    period: '2020 – 2022',
    cover: 'images/case-marketyo.webp',
    metrics: [
      { value: '16 mo', label: 'to acquisition' },
      { value: '100%', label: 'exit' },
      { value: '5', label: 'PMs hired' },
    ],
    context:
      'Marketyo powered online grocery for regional supermarket chains across B2B, B2C and B2B2C, with no product function to speak of.',
    challenge:
      'Turn a services-heavy tech team into a product company fast enough to win a demanding market, while running payments, logistics and a new marketplace in parallel.',
    actions: [
      'Built the product management organisation from scratch and hired five PMs.',
      'Brought data engineering and test automation under product to tighten the build–measure loop.',
      'Launched Marketyo’s own consumer marketplace on top of the white-label platform.',
      'Ran business and technical diligence workstreams with Delivery Hero and Yemeksepeti.',
    ],
    outcome:
      'Delivery Hero acquired 100% of Marketyo in July 2021, 16 months in. I then led the grocery integration into Yemeksepeti’s Local Shops.',
    lesson: 'Org design is product design. The team you build is the roadmap you can actually ship.',
  },
  {
    slug: 'delivery-hero-laas',
    kicker: 'Global scale',
    title: 'Logistics-as-a-service across 24 countries',
    company: 'Delivery Hero',
    period: '2022 – 2023',
    cover: 'images/case-deliveryhero.webp',
    metrics: [
      { value: '24', label: 'countries' },
      { value: '65%', label: 'QoQ growth' },
      { value: '16', label: 'service dependencies' },
    ],
    context:
      'Delivery Hero’s logistics network was a competitive advantage locked inside its own apps. The opportunity: offer it as a service.',
    challenge:
      'One product, four regions, 24 markets, each with its own couriers, regulations and partners, all sitting on 16 internal services owned by other teams.',
    actions: [
      'Shaped a platform product that local teams could launch without re-engineering.',
      'Sequenced launches into 4 new countries across 2 regions.',
      'Set up the analytics foundation so every market reported on the same truth.',
      'Ran roadmap and dependency alignment with 16 internal service owners.',
    ],
    outcome: 'Live in 24 countries across APAC, MENA, EU and LATAM, with 65% QoQ growth after the new launches.',
    lesson: 'At scale, your real product is the set of dependencies you can make boring.',
  },
  {
    slug: 'medibulut-growth',
    kicker: 'Growth engine',
    title: 'Making healthtech habit-forming and profitable',
    company: 'Medibulut',
    period: '2023 – 2025',
    cover: 'images/case-medibulut.webp',
    metrics: [
      { value: '+142%', label: 'engagement' },
      { value: '+52%', label: 'users' },
      { value: '+40%', label: 'revenue' },
      { value: '+70%', label: 'CSAT' },
    ],
    context:
      'Medibulut builds B2B and B2C software across healthcare, from patient-facing telehealth to clinic operations.',
    challenge:
      'Decisions were made on opinion, engagement was flat, and the B2B side had untapped demand for clinic tooling.',
    actions: [
      'Established a product analytics framework so every team could see the same funnel.',
      'Ran user research to find the pain points that mattered, then redesigned key journeys.',
      'Paired product improvements with targeted campaigns to compound acquisition.',
      'Opened a B2B clinic-management vertical with new products.',
    ],
    outcome:
      'Key engagement +142%, user base +52%, revenue +40% and customer satisfaction +70% over two years.',
    lesson: 'Instrument first. You cannot grow what you cannot see, and teams align fastest around shared numbers.',
  },
  {
    slug: 'istanbul-open-data',
    kicker: 'Civic scale',
    title: 'Opening up Istanbul’s data for 101 departments and every citizen',
    company: 'ISBAK · İstanbul Metropolitan Municipality',
    period: '2013 – 2018',
    cover: 'images/case-istanbul.webp',
    metrics: [
      { value: '$11M', label: 'annual savings' },
      { value: '101', label: 'departments' },
      { value: '1st', label: 'open-data portal & GTFS' },
    ],
    context:
      'One of the world’s largest cities ran on siloed data, duplicated licences and disconnected apps.',
    challenge:
      'Consolidate data and IT across 101 departments without stopping a city, and give citizens something useful back.',
    actions: [
      'Centralised software licences, data and app development processes.',
      'Led 30+ engineers building web, mobile and desktop products for departments and citizens.',
      'Produced Istanbul’s first GTFS dataset and launched the first open-data portal.',
      'Shipped a B2C multimodal transportation app and represented IMM in the EU CitySDK project.',
    ],
    outcome: '$11M in annual savings ($8M from data consolidation) and a public data foundation the city still builds on.',
    lesson: 'Data is infrastructure. Make it shared, and products start appearing on top of it.',
  },
]

export const forGood = {
  title: 'AYA · afetharita',
  role: 'Product Manager (volunteer)',
  period: '02.2023 – 04.2023',
  text: 'After the devastating February 2023 earthquakes in Türkiye, a volunteer team built a platform to help authorities and citizens coordinate aid operations. I joined as product manager.',
  cover: 'images/case-aya.webp',
}

export type Showcase = {
  id: string
  label: string
  company: string
  years: string
  title: string
  blurb: string
  points: string[]
}

export const showcase: Showcase[] = [
  {
    id: 'route',
    label: 'Route optimization',
    company: 'Arute Solutions',
    years: '2018 – 2020',
    title: 'Fewer kilometres, same deliveries.',
    blurb: 'SaaS route optimization for banking and parcel delivery in APAC and EU. Drop stops on the map and the solver re-plans the route live.',
    points: ['Nearest-neighbour seed + 2-opt improvement', 'Click to add stops, click a stop to remove it', 'Same idea, at fleet scale, in production'],
  },
  {
    id: 'laas',
    label: 'Logistics-as-a-service',
    company: 'Delivery Hero',
    years: '2022 – 2023',
    title: 'One platform. 24 countries.',
    blurb: 'Delivery Hero’s logistics network, packaged as a product. Hover a region to see its footprint.',
    points: ['APAC · MENA · EU · LATAM', '4 new countries in 2 regions', '65% QoQ growth'],
  },
  {
    id: 'grocery',
    label: 'Grocery marketplace',
    company: 'Marketyo',
    years: '2020 – 2022',
    title: 'From white-label to marketplace.',
    blurb: 'Marketyo’s consumer grocery app on top of its B2B platform. Tap through the core journey.',
    points: ['Browse → basket → checkout → courier', 'Online payments + route optimization', 'Acquired by Delivery Hero'],
  },
  {
    id: 'health',
    label: 'Telehealth & clinics',
    company: 'Medibulut',
    years: '2023 – 2025',
    title: 'Patients and clinics, one product system.',
    blurb: 'A B2C telehealth journey and a B2B clinic-management workspace. Flip between the two sides.',
    points: ['+142% engagement', '+52% users · +40% revenue', 'New B2B clinic vertical'],
  },
  {
    id: 'transit',
    label: 'Istanbul transit data',
    company: 'ISBAK · IMM',
    years: '2013 – 2018',
    title: 'Istanbul’s first GTFS feed.',
    blurb: 'Publishing the city’s transit schedules in an open standard unlocked routing apps for millions. Toggle lines on the map.',
    points: ['First open-data portal', 'First GTFS dataset', 'B2C multimodal transport app'],
  },
  {
    id: 'relief',
    label: 'Disaster relief',
    company: 'AYA · afetharita',
    years: '2023',
    title: 'Matching help to need, fast.',
    blurb: 'A volunteer platform after the 2023 earthquakes. Watch requests move from reported to assigned to delivered.',
    points: ['Built in days, by volunteers', 'Authorities + citizens', 'Operations, not just maps'],
  },
  {
    id: 'agents',
    label: 'AI lab',
    company: 'Basefy Innovation Lab',
    years: '2025 – now',
    title: 'Agents that do product work.',
    blurb: 'Basefy builds proprietary AI products for B2B and B2C. This console sketches the kind of agentic workflow the lab explores.',
    points: ['LLMs, agents & automations', 'Portfolio of ventures', 'PMF as the north star'],
  },
]

export const principles = [
  {
    title: 'Read the terrain first',
    text: 'I started as a geodesy engineer. Before drawing a route, you survey the ground: users, data, constraints.',
    proof: 'Research-led fixes lifted Medibulut CSAT +70%.',
  },
  {
    title: 'Instrument before you scale',
    text: 'Every product I have led got an analytics framework early. Shared numbers end debates.',
    proof: 'Analytics setups at Medibulut and Delivery Hero.',
  },
  {
    title: 'Build the org, not just the product',
    text: 'The team you hire is the roadmap you can ship. Structure, rituals and talent are product decisions.',
    proof: 'Built Marketyo’s PM org from zero → exit in 16 months.',
  },
  {
    title: 'Ship to learn, then compound',
    text: 'Small bets, fast feedback, then double down on what moves the north-star metric.',
    proof: 'Four new countries, two regions, 65% QoQ growth.',
  },
  {
    title: 'Think in portfolios',
    text: 'Today I steer several ventures at once. Allocating attention is the highest-leverage product skill.',
    proof: 'CPO across Basefy’s startups and AI products.',
  },
]

export const toolkit = [
  { group: 'Strategy & discovery', items: ['Product strategy', 'PMF', 'OKRs & KPIs', 'Roadmapping', 'User research', 'GTM', 'Competitive analysis', 'Agile'] },
  { group: 'AI', items: ['LLMs', 'AI agents', 'AI automations', 'Prompt & eval design', 'Claude Code', 'Vibe coding'] },
  { group: 'Data & tools', items: ['SQL', 'Python', 'BI tools', 'Google Analytics', 'Jira', 'Confluence', 'Miro'] },
  { group: 'Domains', items: ['Quick-commerce', 'E-commerce', 'Logistics', 'Healthtech', 'GIS', 'Optimization (MIP, OR)', 'B2B / B2C / B2B2C', 'Smart city'] },
]

export const education = [
  {
    period: '01.2012 – 09.2014',
    school: 'İstanbul Technical University',
    degree: 'Master’s Degree, Informatics Institute, Geographic Information Technologies',
    thesis: 'Determining Approaches for Geo-Data Interoperability on the Web: Transportation Data Theme Example',
  },
  {
    period: '10.2003 – 06.2009',
    school: 'Yıldız Technical University',
    degree: 'Bachelor of Science, Geodesy and Photogrammetry Engineering',
    thesis: 'Analyzing exhaust emission values of vehicles in GIS',
  },
]

export const community = [
  { title: 'İTÜ Seed · Mentor', period: '05.2023 – Present', text: 'Mentoring İTÜ Çekirdek startups toward their GTM and PMF goals.' },
  { title: 'AYA (afetharita) · Product Manager', period: '02.2023 – 04.2023', text: 'Volunteer platform built after the 2023 earthquakes to help authorities and citizens run relief operations.' },
]
