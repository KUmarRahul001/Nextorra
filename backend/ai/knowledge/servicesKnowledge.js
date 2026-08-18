/**
 * Comprehensive Knowledge Base for RahBot
 * Extracted directly from Rahnoxa's authentic service pages, technical specifications, and delivery models.
 */

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
      'Enterprise resource planning modules and internal operational platforms designed to support complex business workflows at scale.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Go', 'PostgreSQL', 'Redis', 'Docker'],
    benefits: [
      'Centralized data across departments (Inventory, Accounts, HR, Logistics)',
      'Drastically reduced manual process overhead with automated workflows',
      'Granular Role-Based Access Control (RBAC) and immutable audit logging',
      'High-concurrency architecture built for growing teams with sub-100ms sync',
      'Seamless API integration with existing legacy tools and third-party CRMs',
      'Role-specific dashboards and automated executive reporting',
    ],
    features: [
      'Workflow Automation: Automate approvals, invoice generations, notifications, and status tracking.',
      'Multi-Module Architecture: Finance, HRMS, Inventory, Procurement, and Supply Chain built incrementally.',
      'Custom Reporting & Dashboards: Real-time visibility into operational metrics with exportable analytics.',
      'Role-Based Access Control: Multi-level permission hierarchies ensure strict data governance.',
      'Third-Party Integrations: Connect ERP with banking APIs, accounting software, and CRMs.',
      'Flexible Deployment: Cloud-hosted, on-premise, or hybrid deployment models.',
    ],
    pricing: 'Custom milestone-based pricing tailored to modules and user throughput.',
    sla: 'Architectural discovery & project estimate delivered within 24 to 48 hours.',
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
      'End-to-end web application development — customer self-service portals, administrative dashboards, client collaboration suites, and high-concurrency platforms.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Supabase', 'REST / GraphQL'],
    benefits: [
      'High-performance, scalable web architecture built for 100k+ monthly active users',
      'Enterprise-grade security, session management, and encrypted data handling',
      'Real-time capabilities using WebSockets and Supabase Realtime',
      'Responsive, accessible cross-device experience across desktop, tablet, and mobile',
      'Full CI/CD automated deployment with zero-downtime releases',
    ],
    features: [
      'Frontend Development: Modern, responsive user interfaces with Tailwind CSS and Framer Motion.',
      'Backend Microservices: Resilient server-side applications built with Node.js and Express.',
      'Database Architecture: Efficient normalized schemas with PostgreSQL and Redis caching.',
      'API Engineering: Clean RESTful and GraphQL endpoints with automated OpenAPI documentation.',
    ],
    pricing: 'Starting at ₹50,000 for Starter, ₹150,000 for Professional, and ₹500,000+ for Enterprise tiers.',
    sla: 'Full requirement scoping and technical blueprint delivered within 24 to 48 hours.',
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
      'Multi-user, subscription-based cloud software platforms built with multi-tenant data isolation, automated billing pipelines, and scalable cloud infrastructure.',
    technologies: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'Paddle', 'Supabase'],
    benefits: [
      'Multi-tenant architecture from day one with strict tenant isolation',
      'Automated user onboarding, self-serve sign-ups, and subscription tier upgrades',
      'Autoscaling cloud infrastructure designed for high concurrency',
      'Comprehensive admin monitoring panels for usage metrics and customer support',
      'API-first design allowing mobile clients and third-party extensions',
    ],
    features: [
      'Multi-Tenant Data Architecture: Logical/physical database isolation per customer organization.',
      'Auth & User Management: Multi-role authentication, team invites, and passwordless login.',
      'Billing & Subscriptions: Webhook-driven Stripe and Paddle recurring payments, coupons, and invoicing.',
      'Admin Telemetry: Live operational dashboards tracking MRR, churn, active sessions, and errors.',
    ],
    pricing: 'Custom milestone-based packages based on MVP scope and tenant scalability requirements.',
    sla: 'SaaS architectural review provided within 24 to 48 hours.',
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
      'Bespoke business software, workflow automation, and custom API pipelines that unify disparate business tools into a single source of truth.',
    technologies: ['Node.js', 'Python', 'Go', 'REST', 'GraphQL', 'Webhooks', 'gRPC', 'PostgreSQL'],
    benefits: [
      'Software built strictly around your authentic operational workflows',
      'Eliminates manual double-entry between accounting, CRM, and inventory systems',
      'Single source of truth with automated conflict resolution across connected tools',
      'Event-driven webhook listeners for instantaneous cross-platform synchronization',
      'Modern API wrappers extending legacy systems without risky full replacements',
    ],
    features: [
      'Bespoke Business Software: Tailored tools for unique operational needs that commercial SaaS cannot fulfill.',
      'API Integration: Integrations with Salesforce, HubSpot, Stripe, Razorpay, QuickBooks, and shipping APIs.',
      'Data Pipelines & ETL: Reliable data transformation pipelines moving millions of records automatically.',
      'Legacy System Modernization: REST/GraphQL API wrappers for on-premise and legacy databases.',
    ],
    pricing: 'Custom milestone pricing based on integration endpoints and data volume.',
    sla: 'Technical API review and scoping response within 24 to 48 hours.',
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
    pricing: 'Starting at ₹75,000 for Basic, ₹200,000 for Professional, and ₹500,000+ for Enterprise mobile platforms.',
    sla: 'Mobile architecture scoping and wireframe consult within 24 to 48 hours.',
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
      'Cross-platform desktop software for Windows, macOS, and Linux for internal business operations, offline data processing, and hardware interfacing.',
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
    pricing: 'Custom pricing based on platform targets and peripheral hardware requirements.',
    sla: 'Technical desktop feasibility review within 24 to 48 hours.',
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
      'Bespoke dark glassmorphism and subtle micro-interactions that elevate brand credibility',
    ],
    features: [
      'Custom Brand Design: Bespoke layouts crafted specifically for your industry without generic templates.',
      'Mobile-First Development: Responsive touch-optimized navigation and fluid grids.',
      'Automated SEO: OpenGraph social previews, dynamic meta tags, and structured JSON-LD data.',
      'Lead Capture Integration: Instant form routing to email, CRM, and WhatsApp alerts.',
    ],
    pricing: 'Packages: Basic (₹15,000 for 5 pages), Professional (₹45,000 for 10 pages + Blog), Enterprise (₹125,000 for custom web systems).',
    sla: 'Design concept & quote delivered within 24 to 48 hours.',
  },

  // ─── 8. B2B Lead Generation & Outreach ───────────────────────────────────────
  {
    id: 'service-lead-gen',
    slug: 'lead-generation',
    name: 'B2B Lead Generation',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    route: '/services/lead-generation',
    summary:
      'Data-driven prospect discovery, multi-channel outreach campaigns, and conversion landing pages to fill your sales pipeline with qualified B2B leads.',
    technologies: ['CRM Integration', 'Outreach Automation', 'Lead Scoring', 'Analytics Pipelines'],
    benefits: [
      'Qualified B2B leads that match your exact ideal customer profile (ICP)',
      'Lower cost per customer acquisition through automated multi-channel sequences',
      'Real-time lead scoring prioritizing high-intent decision makers',
      'Direct synchronization into HubSpot, Zoho, Salesforce, or custom CRMs',
    ],
    features: [
      'Landing Page Optimization: High-converting landing pages designed to capture and qualify leads.',
      'Multi-Channel Campaigns: Synchronized campaigns across search, LinkedIn, and cold email.',
      'Lead Scoring & Qualification: Intelligent scoring filters out spam and flags hot prospects.',
      'Analytics & Reporting: Real-time dashboards on conversion rates and ROI per lead channel.',
    ],
    pricing: 'Starter (₹8,000/mo), Growth (₹24,000/mo with CRM sync), Enterprise (₹75,000/mo with dedicated manager).',
    sla: 'Lead generation strategy proposal within 24 to 48 hours.',
  },

  // ─── 9. Social Media Marketing ───────────────────────────────────────────────
  {
    id: 'service-social-media',
    slug: 'social-media-marketing',
    name: 'Social Media Marketing',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    route: '/services/social-media-marketing',
    summary:
      'Strategic brand positioning, technical thought leadership content, and audience engagement campaigns across LinkedIn, Twitter/X, Instagram, and Facebook.',
    technologies: ['Content Creation', 'Paid Ad Platforms', 'Audience Analytics', 'Brand Strategy'],
    benefits: [
      'Establishes authentic technical authority and brand recognition in your industry',
      'Targeted paid advertising maximizing reach and qualified inbound inquiries',
      'Consistent, high-quality creative assets and editorial copywriting',
    ],
    features: [
      'Content Calendar & Creation: Custom graphic assets, carousel infographics, and technical posts.',
      'Paid Campaign Management: Retargeting ads and conversion-optimized sponsored campaigns.',
      'Community Management: Active response handling and follower relationship building.',
    ],
    pricing: 'Starting at ₹12,000/mo for Starter, ₹35,000/mo for Growth, and ₹80,000/mo for Enterprise campaigns.',
    sla: 'Social media audit and proposal within 24 to 48 hours.',
  },

  // ─── 10. Email Marketing & Automation ────────────────────────────────────────
  {
    id: 'service-email',
    slug: 'email-marketing',
    name: 'Email Marketing & Lifecycle Automation',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    route: '/services/email-marketing',
    summary:
      'Automated email sequences, customer onboarding drip funnels, transactional deliverability tuning, and newsletter campaigns that convert.',
    technologies: ['SendGrid', 'Postmark', 'Mailchimp', 'Brevo', 'SMTP Optimization'],
    benefits: [
      'High inbox deliverability with automated SPF, DKIM, and DMARC configuration',
      'Automated customer lifecycle workflows nurturing sign-ups into paid subscribers',
      'Audience segmentation ensuring tailored messaging based on user behavior',
    ],
    features: [
      'Drip Sequence Automation: Welcome series, re-engagement funnels, and upgrade prompts.',
      'HTML Template Design: Dark/light responsive email layouts tested across all email clients.',
      'Deliverability Monitoring: Bounce rate suppression, spam trap prevention, and reputation protection.',
    ],
    pricing: 'Custom packages starting at ₹6,000/mo based on subscriber list size and sequence volume.',
    sla: 'Campaign audit and workflow plan delivered within 24 to 48 hours.',
  },

  // ─── 11. SMS Marketing & Direct SMPP ─────────────────────────────────────────
  {
    id: 'service-sms',
    slug: 'sms-marketing',
    name: 'SMS Marketing & Transactional Alerts',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    route: '/services/sms-marketing',
    summary:
      'High-throughput bulk promotional SMS, automated transactional alerts, and direct SMPP integration with 98% open rates.',
    technologies: ['SMPP Protocol', 'Telecom Gateways', 'OTP Verification', 'DLT Compliance'],
    benefits: [
      'Immediate customer reach with 98% open rates within 3 minutes of dispatch',
      'Sub-second transactional OTP and order status alerts',
      'Full telecom regulatory compliance (DLT registration & template approval in India)',
    ],
    features: [
      'High-Speed Dispatch: Capable of sending 100,000+ messages per hour with real-time delivery reports.',
      'API & Webhook Triggering: Trigger SMS alerts directly from your website or ERP backend.',
      'Two-Way Messaging: Inbound SMS keyword routing and automated reply triggers.',
    ],
    pricing: 'Tiered volume-based pricing per SMS (Promotional & Transactional routes).',
    sla: 'SMS gateway integration setup within 24 to 48 hours.',
  },

  // ─── 12. Voice Call & Cloud IVR Solutions ────────────────────────────────────
  {
    id: 'service-voice',
    slug: 'voice-call-services',
    name: 'Voice Call & IVR Solutions',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    route: '/services/voice-call-services',
    summary:
      'Automated outbound voice broadcasting, cloud IVR call routing, and interactive telephony workflows for customer announcements and surveys.',
    technologies: ['Cloud Telephony', 'IVR Flow Builder', 'Text-to-Speech', 'Call Analytics'],
    benefits: [
      'Engage mass audiences simultaneously with pre-recorded or dynamic voice announcements',
      'Multi-level IVR menus routing callers to appropriate department squads automatically',
      'Detailed call logs, duration analytics, and DTMF keypress capture',
    ],
    features: [
      'Voice Broadcasting: Mass dispatch of transactional alerts, event reminders, or payment notices.',
      'Interactive IVR: Keypress menus (e.g. "Press 1 for Sales, Press 2 for Support") with CRM sync.',
      'Call Recording & Analytics: Audio recording archives and operator quality audits.',
    ],
    pricing: 'Volume-based call pulse rates with dedicated cloud virtual numbers.',
    sla: 'Telephony flow setup and number provisioning within 24 to 48 hours.',
  },

  // ─── 13. Missed Call Alert Services ──────────────────────────────────────────
  {
    id: 'service-missed-call',
    slug: 'missed-call-service',
    name: 'Missed Call Alert Service',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    route: '/services/missed-call-service',
    summary:
      'Zero-cost customer verification, lead registration via missed call triggers, and instant automated SMS / WhatsApp callback workflows.',
    technologies: ['Virtual Toll-Free Numbers', 'Webhook Triggers', 'Automated SMS Auto-Reply'],
    benefits: [
      'Zero call charges for customers — they simply dial and the system disconnects automatically',
      'Instant lead capture with 100% accurate caller ID logging',
      'Automates instant SMS / WhatsApp response with product links or coupons',
    ],
    features: [
      'Toll-Free & Virtual Numbers: Dedicated 10-digit numbers for marketing campaigns.',
      'Real-Time Webhook Forwarding: Instantly forward incoming missed calls to your CRM or backend.',
      'Automated Multi-Channel Reply: Send SMS confirmation, download link, or trigger agent callback.',
    ],
    pricing: 'Monthly plan starting at ₹3,500/mo including dedicated virtual number and unlimited incoming calls.',
    sla: 'Number activation and webhook configuration within 24 to 48 hours.',
  },

  // ─── 14. Brand & UI/UX Graphic Design ────────────────────────────────────────
  {
    id: 'service-design',
    slug: 'graphic-design',
    name: 'Brand & Graphic Design',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    route: '/services/graphic-design',
    summary:
      'Visual brand identities, logo systems, Figma UI/UX interface design, design tokens, marketing collateral, and vector illustration libraries.',
    technologies: ['Figma', 'Adobe Creative Suite', 'Design Tokens', 'Tailwind Design Systems'],
    benefits: [
      'Cohesive visual language that establishes trust and market authority',
      'Production-ready Figma component systems tailored for direct React/Tailwind implementation',
      'High-resolution vector assets for print, web, mobile, and outdoor marketing',
    ],
    features: [
      'Logo & Brand Identity: Complete brand guides including color tokens, typography, and logo usage.',
      'UI/UX Product Design: High-fidelity screen wireframes, clickable prototypes, and design systems.',
      'Marketing Collateral: Brochures, pitch decks, business cards, banner ads, and social media kits.',
    ],
    pricing: 'Starter (₹10,000), Professional Brand Kit (₹30,000), Full Product UI/UX Design (₹75,000+).',
    sla: 'Initial design moodboard and concepts delivered within 24 to 48 hours.',
  },

  // ─── 15. Engineering Internships (Talent Program) ─────────────────────────────
  {
    id: 'program-internship',
    slug: 'internship',
    name: 'Engineering Internships',
    tier: 'primary',
    category: 'Company & Career',
    route: '/internship',
    summary:
      'Hands-on engineering tracks in Full-Stack Web, Mobile App Development, AI & Machine Learning, Python, and Data Science under senior engineering mentorship on real production codebases.',
    technologies: ['React', 'Node.js', 'React Native', 'Flutter', 'Python', 'Machine Learning', 'PostgreSQL'],
    benefits: [
      'Work on live production modules and shipping software rather than toy tutorials',
      '1-on-1 code reviews and architectural mentorship from senior technical leads',
      'Verified Certificate of Completion and Letter of Recommendation upon successful delivery',
      'Direct pathway to full-time engineering squad placement at Rahnoxa',
    ],
    features: [
      'Web Development Track: React, TypeScript, Next.js, Node.js, and Supabase.',
      'Mobile Development Track: React Native and Flutter mobile applications.',
      'AI & Machine Learning Track: Python, LLM prompts, LangChain, PyTorch, and Data Science.',
      'Hands-on Capstone Projects: Deploy real cloud features and microservices.',
    ],
    pricing: 'Free merit-based application. Review eligibility at /internship.',
    sla: 'Application review and technical screening response within 24 to 48 hours.',
  },
];
