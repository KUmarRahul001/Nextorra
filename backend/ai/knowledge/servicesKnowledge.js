/**
 * Authoritative Central Service Knowledge Base for RahBot & Backend AI Gateway
 * Synchronized with canonical commercial pricing matrix (src/data/services.ts & projects.ts).
 */

export const RAHNOXA_COMPANY_KNOWLEDGE = {
  name: 'Rahnoxa',
  legalName: 'Rahnoxa Software & Cloud Technologies',
  tagline: 'Bespoke Software Engineering for High-Growth Businesses',
  foundedLocation: 'Jharkhand, India',
  deliveryMode: 'Remote & Distributed Worldwide',
  contact: {
    email: 'contact.rahnoxa@protonmail.com',
    phones: ['+91 8434237052', '+91 8434237049'],
    hours: 'Mon–Sat: 9:00 AM – 8:00 PM IST',
    sla: '24 to 48 hours for architectural reviews and quotes',
  },
  guarantees: [
    '100% Client Code & Database Ownership (No recurring per-user seat licenses)',
    '30-Day Post-Launch Technical Bug Fix Warranty included across all contracts',
    'Milestone-Based Sprints with direct Git repository access & staging deployments',
    '50% Milestone Start / 50% Final Production Handover commercial model',
  ],
  stack: [
    'React 18 & Vite', 'TypeScript', 'Node.js & Express', 'Next.js', 'Go', 'Python',
    'PostgreSQL', 'Supabase', 'Redis', 'React Native & Flutter', 'Cloudflare CDN & Edge',
  ],
};

export const RAHNOXA_SERVICES_KNOWLEDGE = [
  // ─── 1. Custom ERP & Enterprise Applications ──────────────────────────────────
  {
    id: 'service-erp',
    slug: 'erp-enterprise-applications',
    name: 'ERP & Enterprise Applications',
    tier: 'primary',
    category: 'Software & Engineering',
    route: '/services/erp-enterprise-applications',
    summary:
      'Enterprise resource planning modules and internal operational platforms designed to support complex business workflows, inventory, HRMS, and multi-branch operations at scale.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Go', 'PostgreSQL', 'Redis', 'Docker'],
    benefits: [
      'Centralized operational database eliminating fragmented spreadsheets and manual registers',
      'Granular Role-Based Access Control (RBAC) with tamper-evident audit logs',
      'Sub-100ms multi-branch synchronization on PostgreSQL and Redis architecture',
      'Modular architecture: deploy Inventory first, then expand to HRMS, Accounts, and CRM',
      '100% Client Ownership of code and database schemas with zero recurring per-user seat fees',
      'Custom dashboards and automated executive reporting',
    ],
    features: [
      'Workflow Automation: Automate approvals, invoice generations, notifications, and status tracking.',
      'Multi-Module Architecture: Finance, HRMS, Inventory, Procurement, and Supply Chain built incrementally.',
      'Custom Reporting & Dashboards: Real-time visibility into operational metrics with exportable analytics.',
      'Role-Based Access Control: Multi-level permission hierarchies ensure strict data governance.',
      'Third-Party Integrations: Connect ERP with banking APIs, accounting software, and CRMs.',
      'Flexible Deployment: Cloud-hosted, on-premise, or hybrid deployment models.',
    ],
    pricing: 'Starting at ₹59,999 for Starter (Single Module, 3–5 Wks), ₹1,19,999 for Growth (3 Modules, 6–8 Wks - Recommended), and ₹2,25,000+ for Pro Enterprise Suite.',
    sla: 'Architectural discovery & project estimate delivered within 24 to 48 hours. Includes 30-Day Technical Bug Fix Warranty.',
  },

  // ─── 2. Full-Stack Web Applications ──────────────────────────────────────────
  {
    id: 'service-web-apps',
    slug: 'full-stack-web-apps',
    name: 'Full Stack Web Apps',
    tier: 'primary',
    category: 'Software & Engineering',
    route: '/services/full-stack-web-apps',
    summary:
      'End-to-end web application development — customer self-service portals, administrative dashboards, client collaboration suites, and high-concurrency business platforms.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Supabase', 'REST / GraphQL'],
    benefits: [
      'Tailored business logic built specifically around your actual operational workflows',
      'High-performance React & Node.js architecture engineered for 100k+ active users',
      'Secure authentication, session management, and encrypted data isolation',
      'Real-time data synchronization using WebSockets and Supabase Realtime',
      'Exportable analytics, automated PDF report generation, and audit logging',
    ],
    features: [
      'Frontend Development: Modern, responsive user interfaces with Tailwind CSS and Framer Motion.',
      'Backend Microservices: Resilient server-side applications built with Node.js and Express.',
      'Database Architecture: Efficient normalized schemas with PostgreSQL and Redis caching.',
      'API Engineering: Clean RESTful and GraphQL endpoints with automated OpenAPI documentation.',
    ],
    pricing: 'Starting at ₹34,999 for Starter MVP (2–3 Weeks), ₹64,999 for Growth Platform (4–5 Weeks - Recommended), and ₹99,999 for Pro Custom Architecture (6–8 Weeks).',
    sla: 'Full requirement scoping and technical blueprint delivered within 24 to 48 hours. Includes 30-Day Technical Bug Fix Warranty.',
  },

  // ─── 3. SaaS Product Engineering ─────────────────────────────────────────────
  {
    id: 'service-saas',
    slug: 'saas-products',
    name: 'SaaS Products',
    tier: 'primary',
    category: 'Software & Engineering',
    route: '/services/saas-products',
    summary:
      'Multi-user, subscription-based cloud software platforms built with multi-tenant data isolation, automated billing pipelines, team seat management, and scalable cloud infrastructure.',
    technologies: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'Razorpay', 'Supabase'],
    benefits: [
      'Multi-tenant database isolation ensuring absolute tenant data security and privacy',
      'Self-serve automated onboarding, email verification, and passwordless authentication',
      'Webhook-driven recurring subscription billing supporting Stripe, Razorpay, and Paddle',
      'Comprehensive admin monitoring panels tracking active sessions, MRR, and error telemetry',
      'API-first architecture ready for mobile apps, browser extensions, and integrations',
    ],
    features: [
      'Multi-Tenant Data Architecture: Logical/physical database isolation per customer organization.',
      'Auth & User Management: Multi-role authentication, team invites, and passwordless login.',
      'Billing & Subscriptions: Webhook-driven recurring payments, coupons, and automated invoicing.',
      'Admin Telemetry: Live operational dashboards tracking MRR, churn, active sessions, and errors.',
    ],
    pricing: 'Starting at ₹49,999 for Starter SaaS MVP (3–5 Weeks), ₹99,999 for Growth SaaS (5–8 Weeks - Recommended), and ₹1,79,999+ for Scale Architecture (8–12 Weeks).',
    sla: 'SaaS architectural review provided within 24 to 48 hours. Includes 30-Day Technical Bug Fix Warranty.',
  },

  // ─── 4. Custom Software & API Integration ────────────────────────────────────
  {
    id: 'service-custom-api',
    slug: 'custom-software-api-integration',
    name: 'Custom Software & API Integration',
    tier: 'primary',
    category: 'Software & Engineering',
    route: '/services/custom-software-api-integration',
    summary:
      'Bespoke business software, workflow automation, and custom API pipelines connecting payment gateways, WhatsApp, CRMs, ERPs, and accounting databases.',
    technologies: ['Node.js', 'Python', 'Go', 'REST', 'GraphQL', 'Webhooks', 'n8n', 'PostgreSQL'],
    benefits: [
      'Software built strictly around your authentic operational workflows',
      'Eliminates manual double-entry between accounting, CRM, and inventory systems',
      'Single source of truth with automated conflict resolution across connected tools',
      'Event-driven webhook listeners for instantaneous cross-platform synchronization',
      'Self-hosted n8n workflows that eliminate expensive Zapier subscription fees',
    ],
    features: [
      'Bespoke Business Software: Tailored tools for unique operational needs that commercial SaaS cannot fulfill.',
      'API Integration: Integrations with Salesforce, HubSpot, Stripe, Razorpay, QuickBooks, and shipping APIs.',
      'Data Pipelines & ETL: Reliable data transformation pipelines moving millions of records automatically.',
      'Legacy System Modernization: REST/GraphQL API wrappers for on-premise and legacy databases.',
    ],
    pricing: 'Starting at ₹1,999 for Single API/Gateway Setup (5–7 Days), ₹5,999 for Standard Automation Bridge (5–7 Days - Recommended), and ₹11,999 for Pro Multi-System Sync (2–3 Weeks). Emergency fix at ₹2,999.',
    sla: 'Technical API review and scoping response within 24 to 48 hours. Includes 30-Day Technical Bug Fix Warranty.',
  },

  // ─── 5. Mobile App Development ───────────────────────────────────────────────
  {
    id: 'service-mobile',
    slug: 'app-development',
    name: 'Mobile App Development',
    tier: 'primary',
    category: 'Software & Engineering',
    route: '/services/app-development',
    summary:
      'High-performance native and cross-platform mobile apps for Android and iOS, built with React Native and Flutter for maximum speed, security, and fluid UX.',
    technologies: ['React Native', 'Flutter', 'iOS (Swift)', 'Android (Kotlin)', 'SQLite', 'Firebase', 'Node.js'],
    benefits: [
      'Native-like 60fps performance on both iOS and Android from a single unified codebase',
      'Offline-first architecture with local SQLite database synchronization',
      'Biometric authentication including FaceID and Fingerprint security',
      'Automated push notifications and real-time activity feeds',
      'Full App Store and Google Play Store submission and approval management',
    ],
    features: [
      'Cross-Platform Development: High-velocity React Native and Flutter engineering.',
      'UI/UX Mobile Design: Native gesture controls, haptic feedback, and sleek dark/light mode.',
      'Backend & Cloud Sync: Low-latency API synchronization with offline queuing.',
      'Analytics & Crash Reporting: Integrated telemetry for crash diagnostics and user journeys.',
    ],
    pricing: 'Starting at ₹44,999 for Starter Android App (3–4 Weeks), ₹79,999 for Cross-Platform iOS+Android (4–6 Weeks - Recommended), and ₹1,39,999 for Pro Marketplace Apps (6–8 Weeks).',
    sla: 'Mobile architecture scoping and wireframe consult within 24 to 48 hours. Includes 30-Day Technical Bug Fix Warranty.',
  },

  // ─── 6. Native Desktop Applications ──────────────────────────────────────────
  {
    id: 'service-desktop',
    slug: 'desktop-applications',
    name: 'Desktop Applications',
    tier: 'primary',
    category: 'Software & Engineering',
    route: '/services/desktop-applications',
    summary:
      'Cross-platform desktop software for Windows, macOS, and Linux for internal business operations, offline data processing, POS billing, and hardware interfacing.',
    technologies: ['Electron', 'Tauri', 'C++', 'Python', 'React', 'SQLite'],
    benefits: [
      'Operates completely offline without requiring internet connectivity',
      'Direct low-level access to local hardware peripherals (printers, barcode scanners, serial devices)',
      'High-speed local computing for data-heavy calculations and media processing',
      'Packaged and distributed as standard MSI, DMG, and AppImage installers with auto-updates',
    ],
    features: [
      'Cross-Platform Packaging: Build for Windows, macOS, and Linux from a single codebase.',
      'Local Data Storage: SQLite-powered local database with background cloud sync when online.',
      'Hardware Peripheral Interfacing: Serial, USB, POS thermal printers, and barcode readers.',
      'Silent Auto-Updater: Background binary delta updates without manual reinstallation.',
    ],
    pricing: 'Starting at ₹34,999 for Starter Utility (2–3 Weeks), ₹59,999 for Growth POS & Hardware (3–5 Weeks - Recommended), and ₹99,999 for Pro High-Performance Tools (5–7 Weeks).',
    sla: 'Technical desktop feasibility review within 24 to 48 hours. Includes 30-Day Technical Bug Fix Warranty.',
  },

  // ─── 7. Modern Website Design ────────────────────────────────────────────────
  {
    id: 'service-web-design',
    slug: 'web-development',
    name: 'Modern Website Design & Engineering',
    tier: 'primary',
    category: 'Software & Engineering',
    route: '/services/web-development',
    summary:
      'Custom corporate websites, conversion-focused landing pages, and editorial digital experiences built with Vite, React, Tailwind CSS, and Framer Motion.',
    technologies: ['Vite', 'React', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'SEO Engine'],
    benefits: [
      'Sub-second page load times with perfect 95+ Google PageSpeed Core Web Vitals',
      'Semantic SEO and automatic sitemap / structured schema markup for top search engine rankings',
      'Fluid responsiveness across ultra-wide monitors, laptops, tablets, and smartphones',
      'Bespoke modern UI and subtle micro-interactions that elevate brand credibility',
    ],
    features: [
      'Custom Brand Design: Bespoke layouts crafted specifically for your industry without generic templates.',
      'Mobile-First Development: Responsive touch-optimized navigation and fluid grids.',
      'Automated SEO: OpenGraph social previews, dynamic meta tags, and structured JSON-LD data.',
      'Lead Capture Integration: Instant form routing to email, CRM, and WhatsApp alerts.',
    ],
    pricing: 'Starting at ₹4,999 for Starter Landing Page (5–7 Days), ₹11,999 for Growth Business Site (2–3 Weeks - Recommended), and ₹18,999 for Pro Corporate Portal (3–4 Weeks). Express 48h available from ₹7,499.',
    sla: 'Website concept outline and quote provided within 24 to 48 hours. Includes 30-Day Technical Bug Fix Warranty.',
  },

  // ─── 8. B2B Lead Generation ──────────────────────────────────────────────────
  {
    id: 'service-lead-gen',
    slug: 'lead-generation',
    name: 'B2B Lead Generation & Local Dominance',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    route: '/services/lead-generation',
    summary:
      'Data-driven outreach, Google Business Profile local dominance, and automated lead capture funnels connecting prospects directly with your sales team.',
    technologies: ['Google Business Profile', 'Meta Ads', 'WhatsApp Automation', 'CRM Integrations'],
    benefits: [
      'Qualified prospects delivered directly into your sales pipeline without cold outreach friction',
      'Google Maps 3-Pack local ranking optimization for local search queries',
      'Multi-channel capture combining landing pages, Google Business Profiles, and WhatsApp bots',
      'Transparent attribution: track exactly which leads convert into paying customers',
    ],
    features: [
      'Google Business Profile Optimization: High-ranking local presence and automated review capture.',
      'Landing Page Funnels: Conversion-optimized lead capture forms with instant WhatsApp routing.',
      'Outreach Pipelines: Compliant B2B email and LinkedIn lead discovery sequences.',
    ],
    pricing: 'Starting at ₹2,499 for GBP Setup & Verification (5–7 Days), ₹4,499 for Local Map Domination & Funnel (5–7 Days - Recommended), and ₹3,499/mo for Ongoing Local Dominance Retainer.',
    sla: 'Lead generation strategy blueprint delivered within 24 to 48 hours.',
  },

  // ─── 9. SMS Marketing & SMPP ─────────────────────────────────────────────────
  {
    id: 'service-sms',
    slug: 'sms-marketing',
    name: 'SMS Marketing & Transactional Alerts',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    route: '/services/sms-marketing',
    summary:
      'High-throughput bulk promotional SMS, automated transactional OTP gateways, DLT registration assistance, and SMPP server connections with 98%+ open rates.',
    technologies: ['SMPP Protocol', 'DLT Portal', 'REST SMS APIs', 'Fast2SMS', 'Msg91'],
    benefits: [
      'Instant 98% open rates with sub-3 second message delivery across all Indian telecom networks',
      'Full regulatory compliance support for TRAI DLT registration and template approval',
      'Direct API integration with your existing CRM, website forms, and billing systems',
      'Detailed real-time delivery logs, click tracking, and automated failure retries',
    ],
    features: [
      'Transactional OTP Gateway: High-priority SMS routes for logins, receipts, and order updates.',
      'Promotional SMS Broadcasts: Scheduled bulk marketing campaigns to verified customer lists.',
      'DLT Registration Support: End-to-end guidance for entity and header/template approvals.',
    ],
    pricing: 'Starting at ₹1,999 for SMS API Gateway Setup (5–7 Days), ₹3,499 for DLT Registration & Automation Suite (5–7 Days - Recommended), and ₹6,999 for Pro Custom Messaging Engines (2–3 Weeks). SMS credits billed at wholesale rates (~₹0.15/SMS).',
    sla: 'SMS campaign setup and API configuration in 24 to 48 hours.',
  },

  // ─── 10. Missed Call Service & IVR ───────────────────────────────────────────
  {
    id: 'service-missed-call',
    slug: 'missed-call-service',
    name: 'Missed Call Alert Service',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    route: '/services/missed-call-service',
    summary:
      'Zero-cost customer lead capture for Indian callers — customers give a missed call to receive automated SMS receipts, WhatsApp catalogs, or callback registrations.',
    technologies: ['Virtual Number PBX', 'Telephony Webhooks', 'WhatsApp Cloud API', 'Google Sheets'],
    benefits: [
      'Zero call charges for your callers, maximizing campaign response rates in India',
      'Instant automated response sent back via WhatsApp or SMS in real-time',
      'Real-time caller number capture to Google Sheets, CRM, or sales dashboard',
      'High conversion rate for local advertising, newspaper ads, and outdoor banners',
    ],
    features: [
      'Virtual Number Setup: 10-digit mobile number or toll-free missed call configuration.',
      'Instant Auto-Responder: Automatic SMS or WhatsApp brochure sent immediately upon disconnection.',
      'CRM Synchronization: Live webhook pushing caller phone numbers into your database.',
    ],
    pricing: 'Starting at ₹2,499 for Starter Missed Call Capture (5–7 Days), ₹4,499 for Growth WhatsApp Callback Suite (5–7 Days - Recommended), and ₹7,999 for Pro Multi-Channel Analytics Suite (2–3 Weeks).',
    sla: 'Virtual number routing and response automation setup within 24 to 48 hours.',
  },

  // ─── 11. Voice Call Services ─────────────────────────────────────────────────
  {
    id: 'service-voice',
    slug: 'voice-call-services',
    name: 'Voice Call & IVR Solutions',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    route: '/services/voice-call-services',
    summary:
      'Automated outbound voice broadcasting (OBD), custom Interactive Voice Response (IVR) phone menus, and virtual office reception systems that handle customer inquiries professionally.',
    technologies: ['Cloud Telephony', 'IVR Flow Engines', 'SIP Trunking', 'TTS Synthesizers'],
    benefits: [
      'Professional virtual receptionist: "Press 1 for Sales, 2 for Support, 3 for Clinic Hours"',
      'Automated voice reminders for upcoming appointments, pending fees, and event announcements',
      'Smart call routing to staff mobile phones without exposing personal phone numbers',
      'Call recording and analytics tracking staff response times and customer query volume',
    ],
    features: [
      'Outbound Voice Broadcasting (OBD): Automated voice announcements to customer lists.',
      'Multi-Level IVR Trees: Custom keypress navigation routing callers to appropriate departments.',
      'Call Recording & Telemetry: Live call duration, recording storage, and missed-call triage.',
    ],
    pricing: 'Starting at ₹3,499 for Voice Broadcasting (5–7 Days), ₹6,499 for Growth Virtual IVR Receptionist (5–7 Days - Recommended), and ₹11,999 for Pro Cloud PBX Systems (2–3 Weeks).',
    sla: 'IVR flow design and telecom setup in 24 to 48 hours.',
  },

  // ─── 12. Social Media Marketing ──────────────────────────────────────────────
  {
    id: 'service-smm',
    slug: 'social-media-marketing',
    name: 'Social Media Marketing & Creatives',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    route: '/services/social-media-marketing',
    summary:
      'Brand-aligned social media creatives, structured posting calendars, and targeted Meta advertising campaigns designed to build credibility and drive engagement.',
    technologies: ['Meta Ads Manager', 'Figma', 'Canva Pro', 'Instagram Graph API'],
    benefits: [
      'Original, bespoke graphic designs matching your exact brand identity',
      'Consistent posting schedule that establishes authority and social proof',
      'Conversion-focused ad creatives engineered to stop the scroll on Instagram and Facebook',
      'Clear, transparent monthly reporting: see reach, engagement, and click-through metrics',
    ],
    features: [
      'Custom Creative Packs: Engaging feed posts, carousel graphics, and story templates created in Figma.',
      'Content Strategy & Copywriting: Captions, hashtags, and call-to-action hooks tailored to Indian audiences.',
      'Paid Ad Management: Targeted Instagram and Facebook ad setup with pixel tracking and retargeting.',
    ],
    pricing: 'Starting at ₹2,499 for Starter Creative Pack (10 Posts), ₹5,999/mo for Growth Social Retainer (16 Posts/mo - Recommended), and ₹11,999/mo for Pro Brand Dominance Retainer.',
    sla: 'Social media strategy review and initial creative batch within 24 to 48 hours.',
  },

  // ─── 13. Email Marketing ─────────────────────────────────────────────────────
  {
    id: 'service-email',
    slug: 'email-marketing',
    name: 'Email Marketing & Lifecycle Automation',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    route: '/services/email-marketing',
    summary:
      'Targeted email campaigns, automated customer onboarding sequences, newsletter templates, and DNS deliverability configuration ensuring emails land in the inbox, not spam.',
    technologies: ['Brevo', 'Mailchimp', 'Amazon SES', 'SPF/DKIM/DMARC Protocols', 'HTML5 Email'],
    benefits: [
      'DNS deliverability setup (SPF, DKIM, DMARC) preventing emails from landing in spam',
      'Automated customer welcome and abandoned cart sequences that generate passive revenue',
      'Mobile-responsive HTML email templates compatible with Gmail, Outlook, and Apple Mail',
      'Clear analytics tracking open rates, click-through rates, and unsubscribes',
    ],
    features: [
      'DNS Deliverability Hardening: Configuration of SPF, DKIM, DMARC, and custom sending domain records.',
      'Lifecycle Automation Workflows: Multi-step welcome series, lead nurture drips, and post-purchase sequences.',
      'Responsive Template Design: Clean branded email templates tested across major email clients.',
    ],
    pricing: 'Starting at ₹1,999 for Deliverability & SPF/DKIM Rescue (2–4 Days), ₹3,999 for Automation & Template Setup (5–7 Days - Recommended), and ₹4,999/mo for Monthly Email Campaign Management.',
    sla: 'Email template design and DNS audit within 24 to 48 hours.',
  },

  // ─── 14. Brand & Graphic Design ──────────────────────────────────────────────
  {
    id: 'service-design',
    slug: 'graphic-design',
    name: 'Brand & Graphic Design',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    route: '/services/graphic-design',
    summary:
      'Visual identity design, vector logos, business stationery, marketing brochures, pitch decks, and digital banners that communicate credibility and professionalism.',
    technologies: ['Adobe Illustrator', 'Figma', 'Photoshop', 'Vector Graphics', 'PDF Standards'],
    benefits: [
      'Original, vector-first logos ready for printing, signboards, websites, and trademarking',
      'Comprehensive brand kit: typography pairings, color codes (HEX/RGB/CMYK), and usage rules',
      'Print-ready high-resolution PDFs with bleed margins for error-free local printing',
      'Investor-ready pitch presentations with crisp typography and data visualization',
      '100% commercial copyright ownership with all master source files (AI, SVG, PDF, PNG)',
    ],
    features: [
      'Vector Logo Design: Original concept sketches, digital vectorization, and brand mark variants.',
      'Business Stationery: Matching digital business cards, letterheads, and envelope mockups.',
      'Investor Pitch Decks: 12–15 slide data-driven presentations in PowerPoint / Google Slides / PDF.',
      'Marketing Collateral: Brochures, flyers, digital banners, roll-up standees, and catalog covers.',
    ],
    pricing: 'Starting at ₹2,499 for Fast-Track Logo Starter (5–7 Days), ₹4,499 for Complete Brand Identity Suite (5–7 Days - Recommended), and ₹8,999 for Investor Pitch Deck & Corporate Kit (2–3 Weeks).',
    sla: 'Initial logo concepts and creative review within 24 to 48 hours. Includes 30-Day Technical Warranty.',
  },

  // ─── 15. Talent Track: Engineering Internships ───────────────────────────────
  {
    id: 'talent-internships',
    slug: 'internship',
    name: 'Engineering Internships & Talent Track',
    tier: 'primary',
    category: 'Talent & Careers',
    route: '/internship',
    summary:
      'Hands-on software engineering and AI internships for students and aspiring developers in India. Work on real production codebases with senior mentors.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Git', 'Cloud Architecture'],
    benefits: [
      'Direct contribution to production codebases and real business client projects',
      '1-on-1 weekly code reviews and architectural mentorship from senior engineers',
      'Verifiable completion certificate and Letter of Recommendation (LOR) upon milestone completion',
      'Pre-placement offer (PPO) opportunities for exceptional engineering contributors',
    ],
    features: [
      'Web Development Track: React, TypeScript, Tailwind CSS, and state management.',
      'Backend & API Track: Node.js, Express, PostgreSQL, Supabase, and REST API design.',
      'AI & Automation Track: RAG pipelines, LLM fine-tuning, deterministic assistants, and n8n.',
    ],
    pricing: 'Merit-based selection and paid stipend for qualified production contributors. Free to apply.',
    sla: 'Application review and technical assessment results within 48 to 72 hours.',
  },
];
