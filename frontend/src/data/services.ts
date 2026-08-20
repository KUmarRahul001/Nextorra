/**
 * SINGLE SOURCE OF TRUTH — Rahnoxa Services & Commercial Pricing Model
 *
 * All service navigation, listings, contact selectors, route generation,
 * pricing pages, ServiceTemplate views, SEO schema, and RahBot knowledge
 * must consume this file directly or its canonical backend sync.
 *
 * Engineering Capacity Calibration:
 * - Solo Senior Developer (18 dedicated freelance engineering hrs/week: Mon–Sat 7PM–10PM, Sunday OFF).
 * - Fast tasks (10–18 hrs): 5–7 Business Days.
 * - Medium builds (35–50 hrs): 2–3 Weeks (Phased Sprints).
 * - Complex platforms (70–120 hrs): 4–6 Weeks (Milestone Sprints).
 * - 30-Day Post-Launch Technical Bug Fix Warranty included across all services.
 */

export type ServiceTier = 'primary' | 'secondary' | 'rescue';
export type PricingModel = 'fixed' | 'starting_from' | 'monthly' | 'custom';

export interface ServicePackage {
  name: string;
  price: string;
  amount?: number;
  delivery: string;
  recommended?: boolean;
  features: string[];
}

export interface ServicePricing {
  model: PricingModel;
  currency: 'INR';
  startingAt: string;
  startingAmount?: number;
  recommendedPrice?: string;
  packages: ServicePackage[];
  fastPrice?: string;
  expressPrice?: string;
  emergencyPrice?: string;
  monthlyRetainer?: string;
  gstNote: string;
  thirdPartyNote: string;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  tier: ServiceTier;
  category: string;
  description: string;
  shortDescription: string;
  route: string;
  featured: boolean;
  available: boolean;
  delivery: string;
  targetCustomer: string;
  benefits: string[];
  features: Array<{ title: string; description: string }>;
  included: string[];
  excluded: string[];
  revisions: string;
  warranty: string;
  thirdPartyCosts: string[];
  pricing: ServicePricing;
  image: string;
}

// ---------------------------------------------------------------------------
// TIER 1 — Software & Engineering
// ---------------------------------------------------------------------------

export const tier1Services: Service[] = [
  {
    id: 'service-web-dev',
    slug: 'web-development',
    name: 'Modern Website Design & Engineering',
    shortName: 'Website Design',
    tier: 'primary',
    category: 'Software & Engineering',
    description:
      'High-performance, mobile-first business websites and corporate digital presence engineered with modern frameworks, fast load times, and conversion-focused layouts.',
    shortDescription: 'Modern business websites and high-conversion landing pages.',
    route: '/services/web-development',
    featured: true,
    available: true,
    delivery: '5–7 Business Days (Express 48h available)',
    targetCustomer: 'Local businesses, clinics, retail shops, solo founders, consultancies, and growing SMEs.',
    benefits: [
      'Sub-second loading speed with 95+ Google Core Web Vitals score',
      'Mobile-first responsive UX across smartphones, tablets, and desktops',
      'Built-in technical SEO schema for superior Google local rankings',
      'Direct WhatsApp click-to-chat & automated lead alert integration',
      '100% Client Ownership: No vendor lock-in or recurring theme license fees',
      'Clean modern design with zero visual clutter',
    ],
    features: [
      {
        title: 'Componentized UI Architecture',
        description: 'Built with React, Vite, and Tailwind CSS for instant rendering and maximum maintainability.',
      },
      {
        title: 'Technical Search Engine Optimization',
        description: 'Structured metadata, OpenGraph cards, XML sitemaps, and robots.txt pre-configured.',
      },
      {
        title: 'Lead Capture & Automation',
        description: 'Spam-protected contact forms with instant email notifications and optional CRM webhooks.',
      },
      {
        title: 'Performance & Security Hardening',
        description: 'Free automated SSL certificate setup, asset compression, and Cloudflare CDN integration.',
      },
    ],
    included: [
      'Complete custom UI/UX design matching brand colors',
      'Mobile, tablet, and desktop responsive layouts',
      'Contact form with email notification and WhatsApp button',
      'On-page technical SEO and Google Search Console submission',
      'Deployment to Vercel, Netlify, or Cloudflare Pages',
    ],
    excluded: [
      'Domain registration fee (₹800–₹1,200/yr paid directly to registrar)',
      'Custom copywriting / content generation (available as add-on)',
      'E-commerce payment gateway logic (see E-Commerce service)',
    ],
    revisions: '3 Revision rounds included in standard sprint',
    warranty: '30-day post-launch technical warranty for bug fixes',
    thirdPartyCosts: ['Domain registration (~₹900/yr)', 'Google Workspace Email (~₹140/mo per user if needed)'],
    pricing: {
      model: 'starting_from',
      currency: 'INR',
      startingAt: '₹4,999',
      startingAmount: 4999,
      recommendedPrice: '₹11,999',
      packages: [
        {
          name: 'Starter Landing Page',
          price: '₹4,999',
          amount: 4999,
          delivery: '5–7 Business Days',
          features: [
            'Single High-Conversion Page',
            'Mobile-First Responsive Layout',
            'WhatsApp Chat & Lead Form',
            'Basic Technical SEO & Social Cards',
            'Cloud Hosting Setup & SSL',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Growth Business Site',
          price: '₹11,999',
          amount: 11999,
          delivery: '2–3 Weeks (Phased Sprints)',
          recommended: true,
          features: [
            'Up to 5 Custom Pages (Home, About, Services, Gallery, Contact)',
            'Week 1: UI layout, typography, responsive styling & Home/About pages (18 hrs)',
            'Week 2: Services, Catalog/Showcase, Contact form + WhatsApp integration (18 hrs)',
            'Week 3: Feedback revisions, on-page SEO, speed optimization & live launch (18 hrs)',
            'Dynamic Showcase / Catalog Section',
            'Full On-Page SEO & Schema Markup',
            'Google Maps & Analytics Integration',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Pro Corporate Portal',
          price: '₹18,999',
          amount: 18999,
          delivery: '3–4 Weeks (Phased Sprints)',
          features: [
            'Up to 10 Pages + Dynamic Blog / Article Engine',
            'Week 1: Architecture, component library setup, global navigation & core pages (18 hrs)',
            'Week 2: Sub-pages, dynamic blog engine/catalog filters & CRM lead routing (18 hrs)',
            'Week 3: Form validation, responsive edge-cases & Search Console setup (18 hrs)',
            'Week 4: Client review, final polish, cross-browser QA & domain live launch (18 hrs)',
            'Advanced Interactive Components & Filters',
            'CRM & Google Sheets Lead Routing',
            'Custom Domain & Mail Server Setup',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
      ],
      fastPrice: '₹14,999 (3–4 Days)',
      expressPrice: '₹17,999 (48 Hours Sprint)',
      emergencyPrice: '₹7,499 (48h Landing Page Launch)',
      monthlyRetainer: '₹1,499/mo (Care Plan)',
      gstNote: 'All prices exclude 18% GST where applicable.',
      thirdPartyNote: 'Domain & third-party SaaS subscriptions are billed directly by respective providers.',
    },
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'service-web-apps',
    slug: 'full-stack-web-apps',
    name: 'Full Stack Web Apps',
    shortName: 'Web Apps',
    tier: 'primary',
    category: 'Software & Engineering',
    description:
      'End-to-end web application development — customer self-service portals, administrative dashboards, client collaboration suites, and high-concurrency business platforms.',
    shortDescription: 'Dashboards, customer portals, and bespoke web platforms.',
    route: '/services/full-stack-web-apps',
    featured: true,
    available: true,
    delivery: '2–4 Weeks (Modular Phased Milestones)',
    targetCustomer: 'Growing startups, B2B companies, service agencies, and organizations needing tailored digital workflows.',
    benefits: [
      'Tailored business logic built specifically around your actual operational workflows',
      'High-performance React & Node.js architecture engineered for 100k+ active users',
      'Secure authentication, session management, and encrypted data isolation',
      'Real-time data synchronization using WebSockets and Supabase Realtime',
      'Exportable analytics, automated PDF report generation, and audit logging',
    ],
    features: [
      {
        title: 'Frontend Application Architecture',
        description: 'Modern, responsive user interfaces built with React, TypeScript, and Tailwind CSS.',
      },
      {
        title: 'Backend Microservices & APIs',
        description: 'Resilient server-side applications with Node.js, Express, and structured REST endpoints.',
      },
      {
        title: 'Relational Database Engineering',
        description: 'Normalized PostgreSQL schemas, foreign key constraints, and Redis caching layers.',
      },
      {
        title: 'Role-Based Access Governance',
        description: 'Multi-role authentication (Admin, Manager, Customer) with secure JWT tokens.',
      },
    ],
    included: [
      'Complete frontend UI + backend API implementation',
      'Database modeling and secure authentication setup',
      'Role-based permission controls and admin dashboard',
      'Staging environment testing and final production deployment',
    ],
    excluded: [
      'Dedicated cloud server hosting fees (e.g. AWS/Render/DigitalOcean at cost)',
      'Third-party SMS/WhatsApp API usage credits',
    ],
    revisions: 'Milestone-based sprint reviews with continuous iteration',
    warranty: '30-day post-launch technical warranty for bug fixes',
    thirdPartyCosts: ['Cloud Server VPS (from ₹500–₹1,500/mo)', 'Database Hosting (Supabase Free or $25/mo)'],
    pricing: {
      model: 'starting_from',
      currency: 'INR',
      startingAt: '₹34,999',
      startingAmount: 34999,
      recommendedPrice: '₹64,999',
      packages: [
        {
          name: 'Starter MVP Web App',
          price: '₹34,999',
          amount: 34999,
          delivery: '2–3 Weeks (Phased Sprints)',
          features: [
            'User Auth (Login/Signup/Password Reset)',
            'Single Role Customer Dashboard',
            'CRUD Data Management (Up to 4 entities)',
            'PostgreSQL / Supabase Database Setup',
            'REST API Layer with Error Logging',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Growth Business Platform',
          price: '₹64,999',
          amount: 64999,
          delivery: '4–5 Weeks (Milestone Sprints)',
          recommended: true,
          features: [
            'Multi-Role Access Control (Admin, Staff, Client)',
            'Advanced Data Visualizations & KPI Charts',
            'Payment Gateway & Automated PDF Invoicing',
            'Automated Email & WhatsApp Notifications',
            'Staging Environment & CI/CD Pipeline',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Pro Custom Architecture',
          price: '₹99,999',
          amount: 99999,
          delivery: '6–8 Weeks (Milestone Sprints)',
          features: [
            'High-Concurrency Architecture & Redis Caching',
            'Complex Workflow Automations & Third-Party APIs',
            'Full Audit Logging & Security Hardening',
            'Automated Backup Pipeline & Failover Monitoring',
            'Dedicated Sprint Communication SLA',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
      ],
      fastPrice: 'Priority Sprint (+25%)',
      expressPrice: 'Phased Fast-Track Milestone',
      emergencyPrice: 'N/A (Multi-week delivery)',
      monthlyRetainer: '₹3,999/mo (Growth Care)',
      gstNote: 'All prices exclude 18% GST where applicable.',
      thirdPartyNote: 'Cloud hosting (Render/AWS/Supabase) is set up under client accounts.',
    },
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'service-app-dev',
    slug: 'app-development',
    name: 'Mobile App Development',
    shortName: 'Mobile Apps',
    tier: 'primary',
    category: 'Software & Engineering',
    description:
      'Cross-platform and native mobile applications for iOS and Android built with React Native and Flutter, delivering smooth 60fps performance and reliable offline caching.',
    shortDescription: 'Android, iOS, and cross-platform mobile apps.',
    route: '/services/app-development',
    featured: true,
    available: true,
    delivery: '3–6 Weeks (Modular Phased Milestones)',
    targetCustomer: 'D2C brands, service marketplaces, booking providers, and startups expanding to mobile.',
    benefits: [
      'Single maintainable codebase powering both Android and iOS simultaneously',
      'Smooth native-like gestures and responsive UI components',
      'Push notification pipelines for customer engagement and retention',
      'Secure token-based authentication and biometric login support',
      'Full assistance with Google Play Store & Apple App Store submission',
    ],
    features: [
      {
        title: 'Cross-Platform Frameworks',
        description: 'Engineered with React Native / Flutter for optimal speed, cost efficiency, and performance.',
      },
      {
        title: 'Push Notification Engine',
        description: 'Firebase Cloud Messaging (FCM) integration for targeted transactional and marketing alerts.',
      },
      {
        title: 'Offline Storage & Sync',
        description: 'Local caching and asynchronous background sync for reliable offline usage.',
      },
      {
        title: 'Payment SDK Integration',
        description: 'Native Razorpay, Cashfree, or Apple/Google In-App Purchase integration.',
      },
    ],
    included: [
      'UI/UX mobile screen design in Figma',
      'React Native / Flutter app codebase',
      'Backend API endpoints & database connection',
      'Google Play & Apple App Store build packaging',
    ],
    excluded: [
      'Apple Developer Account ($99/yr) & Google Play Console ($25 one-time) fees',
    ],
    revisions: 'Sprint-based milestone reviews',
    warranty: '30-day post-launch technical warranty for bug fixes',
    thirdPartyCosts: ['Google Play Account ($25 one-time)', 'Apple Developer Account ($99/yr)'],
    pricing: {
      model: 'starting_from',
      currency: 'INR',
      startingAt: '₹39,999',
      startingAmount: 39999,
      recommendedPrice: '₹69,999',
      packages: [
        {
          name: 'Starter Android App',
          price: '₹39,999',
          amount: 39999,
          delivery: '2–3 Weeks (Phased Sprints)',
          features: [
            'Android App (React Native / Flutter)',
            'User Authentication & Profile Screen',
            'Core Workflow (Up to 5 main screens)',
            'Push Notifications via Firebase',
            'Google Play Store Release Packaging',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Cross-Platform App (iOS + Android)',
          price: '₹69,999',
          amount: 69999,
          delivery: '4–6 Weeks (Milestone Sprints)',
          recommended: true,
          features: [
            'Unified Android & iOS Codebase',
            'Complete Workflow (Up to 10 screens)',
            'Payment Gateway & In-App Alerts',
            'Offline Caching & Biometric Login',
            'App Store & Play Store Publishing Support',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Pro Marketplace / Real-Time App',
          price: '₹1,19,999',
          amount: 119999,
          delivery: '6–8 Weeks (Milestone Sprints)',
          features: [
            'Multi-User Marketplace / Driver / Customer Roles',
            'Live GPS Tracking & Google Maps Routing',
            'In-App Chat & WebSocket Sync',
            'Custom Admin Management Dashboard',
            'Priority Performance SLA',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
      ],
      fastPrice: 'Priority Milestone (+25%)',
      expressPrice: 'Custom Scoping',
      emergencyPrice: 'N/A (Multi-week delivery)',
      monthlyRetainer: '₹4,999/mo (Mobile Care)',
      gstNote: 'All prices exclude 18% GST where applicable.',
      thirdPartyNote: 'App store developer account fees are paid directly to Apple and Google.',
    },
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'service-custom-api',
    slug: 'custom-software-api-integration',
    name: 'Custom Software & API Integration',
    shortName: 'API & Integrations',
    tier: 'primary',
    category: 'Software & Engineering',
    description:
      'Bespoke business software, workflow automation, and custom API integrations connecting payment gateways, WhatsApp, CRMs, ERPs, and accounting tools.',
    shortDescription: 'Bespoke software, automation, and API integrations.',
    route: '/services/custom-software-api-integration',
    featured: true,
    available: true,
    delivery: '3–5 Business Days (Express 24h available)',
    targetCustomer: 'Companies struggling with manual data entry, disconnected business tools, or legacy software.',
    benefits: [
      'Eliminates duplicate manual data entry between spreadsheets and business software',
      'Automates end-to-end customer notification pipelines via WhatsApp, SMS, and Email',
      'Reliable webhook receiver architecture with retry mechanisms and error alerts',
      'Seamless synchronization with Zoho, Tally, Google Sheets, and Razorpay',
      'Self-hosted n8n workflows that eliminate expensive Zapier subscription fees',
    ],
    features: [
      {
        title: 'REST API & Webhook Engineering',
        description: 'Secure, token-authenticated RESTful endpoints with automated documentation.',
      },
      {
        title: 'Payment Gateway Workflows',
        description: 'Robust Razorpay, Cashfree, and Stripe webhook handling with zero dropped transactions.',
      },
      {
        title: 'WhatsApp Cloud API Automations',
        description: 'Official Meta Cloud API integration for interactive chatbots and automated receipts.',
      },
      {
        title: 'Third-Party CRM & Accounting Sync',
        description: 'Bi-directional data bridges between websites, Google Sheets, Zoho, and accounting databases.',
      },
    ],
    included: [
      'Complete webhook receiver and sender logic',
      'Error handling, retry queues, and automated failure alerts',
      'Data mapping, format transformation, and validation',
      'Deployment on secure cloud infrastructure with documentation',
    ],
    excluded: [
      'Third-party API subscription costs (e.g. Meta message fees, SMS credits)',
    ],
    revisions: '2 Iteration rounds on mapping specifications',
    warranty: '30-day post-launch technical warranty for bug fixes',
    thirdPartyCosts: ['Third-party API plan fees (billed directly by respective services)'],
    pricing: {
      model: 'starting_from',
      currency: 'INR',
      startingAt: '₹1,999',
      startingAmount: 1999,
      recommendedPrice: '₹4,999',
      packages: [
        {
          name: 'Single API / Gateway Setup',
          price: '₹1,999',
          amount: 1999,
          delivery: '3–5 Business Days (Express 24h available)',
          features: [
            'Payment Gateway Webhook (Razorpay/Cashfree)',
            'Order Status Sync & Email Receipts',
            'Secure Signature Verification',
            'Production Testing & Verification',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Standard Automation Bridge',
          price: '₹4,999',
          amount: 4999,
          delivery: '5–7 Business Days',
          recommended: true,
          features: [
            'Connect Website Forms → Google Sheets → CRM',
            'WhatsApp Automated Lead Alert to Sales Team',
            'Data Validation & Error Retry Queue',
            'Self-Hosted n8n / Node.js Engine (No Zapier fees)',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Pro Multi-System Sync',
          price: '₹11,999',
          amount: 11999,
          delivery: '2–3 Weeks (Phased Sprints)',
          features: [
            'Complex Bi-Directional Synchronization',
            'Custom Middleware & Database Transform Logic',
            'Automated Error Monitoring & Admin Alerts',
            'High-Volume Webhook Queue Handling',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
      ],
      fastPrice: '₹3,499 (48 Hours)',
      expressPrice: '₹4,999 (24 Hours)',
      emergencyPrice: '₹2,999 (Emergency Webhook / Payment Fix in 24h)',
      monthlyRetainer: '₹1,999/mo (API & Integration Care)',
      gstNote: 'All prices exclude 18% GST where applicable.',
      thirdPartyNote: 'Direct Meta/gateway messaging fees are paid directly to providers.',
    },
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'service-erp',
    slug: 'erp-enterprise-applications',
    name: 'ERP & Enterprise Applications',
    shortName: 'ERP Systems',
    tier: 'primary',
    category: 'Software & Engineering',
    description:
      'Enterprise resource planning modules and internal operational platforms designed to support complex business workflows, inventory, HRMS, and multi-branch operations at scale.',
    shortDescription: 'ERP modules and enterprise operational platforms.',
    route: '/services/erp-enterprise-applications',
    featured: true,
    available: true,
    delivery: '4–8 Weeks (Modular Phased Milestones)',
    targetCustomer: 'Manufacturers, wholesale distributors, hospitals, educational institutions, and multi-branch companies.',
    benefits: [
      'Centralized operational database eliminating fragmented spreadsheets and manual registers',
      'Granular Role-Based Access Control (RBAC) with tamper-evident audit logs',
      'Sub-100ms multi-branch synchronization on PostgreSQL and Redis architecture',
      'Modular architecture: deploy Inventory first, then expand to HRMS, Accounts, and CRM',
      '100% Client Ownership of code and database schemas with zero recurring per-user seat fees',
    ],
    features: [
      {
        title: 'Modular Domain Architecture',
        description: 'Domain-isolated modules for Inventory, Supply Chain, HRMS, Finance, and Procurement.',
      },
      {
        title: 'Role-Based Access Governance',
        description: 'Multi-level permission hierarchies ensuring strict data governance per branch and role.',
      },
      {
        title: 'Real-Time Operational Telemetry',
        description: 'Live executive dashboards tracking stock levels, pending dispatches, and receivables.',
      },
      {
        title: 'Zero-Downtime Phased Migration',
        description: 'Safe, structured data import from legacy Excel sheets with automated validation.',
      },
    ],
    included: [
      'Comprehensive technical discovery and database schema modeling',
      'Custom frontend interface with responsive desktop and tablet support',
      'Backend business logic, validation rules, and exportable reports',
      'Staff training documentation and staging environment verification',
    ],
    excluded: [
      'Cloud hosting server / on-premise hardware costs (billed at cost)',
    ],
    revisions: 'Sprint-based milestone sign-offs per module',
    warranty: '30-day post-launch technical warranty for bug fixes',
    thirdPartyCosts: ['Dedicated Cloud Server VPS (from ₹2,500/mo depending on user throughput)'],
    pricing: {
      model: 'starting_from',
      currency: 'INR',
      startingAt: '₹59,999',
      startingAmount: 59999,
      recommendedPrice: '₹1,19,999',
      packages: [
        {
          name: 'Starter Modular ERP (Single Module)',
          price: '₹59,999',
          amount: 59999,
          delivery: '3–5 Weeks (Milestone Sprints)',
          features: [
            'Choose 1 Core Module (Inventory / HRMS / Billing)',
            'Multi-User Roles (Admin, Manager, Staff)',
            'PostgreSQL Normalized Schema & Backups',
            'PDF Invoice & Barcode Generation',
            'Staff Training & Onboarding Walkthrough',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Growth Multi-Module ERP',
          price: '₹1,19,999',
          amount: 119999,
          delivery: '6–8 Weeks (Milestone Sprints)',
          recommended: true,
          features: [
            'Up to 3 Integrated Modules (e.g. Inventory + Accounts + HRMS)',
            'Multi-Branch Synchronization & Audit Logging',
            'Custom Executive Dashboards & Analytics',
            'Automated WhatsApp/Email Low-Stock & Payment Alerts',
            'Comprehensive Data Migration from Spreadsheets',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Pro Enterprise Custom Suite',
          price: '₹2,25,000+',
          amount: 225000,
          delivery: '8–12 Weeks (Milestone Sprints)',
          features: [
            'Complete Enterprise Scope (Custom Operations + CRM + ERP)',
            'High-Concurrency Cluster Architecture',
            'Third-Party Banking & Tally Bridge Integrations',
            'Dedicated Lead Architect & Staging Deployment Support',
            'Priority SLA Technical Support Retainer',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
      ],
      fastPrice: 'Accelerated Sprint (+25%)',
      expressPrice: 'Phased Milestone Scoping',
      emergencyPrice: 'N/A (Enterprise scope)',
      monthlyRetainer: '₹7,999/mo (Command Retainer)',
      gstNote: 'All prices exclude 18% GST where applicable.',
      thirdPartyNote: 'Zero recurring software license fees — you own 100% of the software.',
    },
    image: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'service-saas',
    slug: 'saas-products',
    name: 'SaaS Products',
    shortName: 'SaaS Platforms',
    tier: 'primary',
    category: 'Software & Engineering',
    description:
      'Multi-user, subscription-based cloud software platforms engineered with tenant isolation, automated billing pipelines, team seat management, and scalable cloud infrastructure.',
    shortDescription: 'Subscription-based multi-tenant software platforms.',
    route: '/services/saas-products',
    featured: true,
    available: true,
    delivery: '4–8 Weeks (Modular Phased Milestones)',
    targetCustomer: 'Software entrepreneurs, B2B product founders, and companies transitioning service models into recurring cloud software.',
    benefits: [
      'Multi-tenant database isolation ensuring absolute tenant data security and privacy',
      'Self-serve automated onboarding, email verification, and passwordless authentication',
      'Webhook-driven recurring subscription billing supporting Stripe, Razorpay, and Paddle',
      'Comprehensive admin monitoring panels tracking active sessions, MRR, and error telemetry',
      'API-first architecture ready for mobile apps, browser extensions, and integrations',
    ],
    features: [
      {
        title: 'Multi-Tenant Architecture',
        description: 'Strict logical/physical tenant separation with shared operational efficiency.',
      },
      {
        title: 'Subscription & Billing Engine',
        description: 'Automated recurring billing, plan upgrades, usage metering, and invoice generation.',
      },
      {
        title: 'Team Invitations & RBAC',
        description: 'Owner, Admin, and Member permission hierarchies with seat allocation controls.',
      },
      {
        title: 'Operational Analytics Dashboard',
        description: 'Real-time telemetry tracking Monthly Recurring Revenue (MRR), user churn, and API traffic.',
      },
    ],
    included: [
      'Complete multi-tenant frontend & backend codebase',
      'Subscription gateway integration and webhook handlers',
      'Super-admin panel for platform metrics and user moderation',
      'Automated CI/CD deployment pipeline with staging environment',
    ],
    excluded: [
      'Payment gateway transaction fees (standard 2%–3%)',
      'Cloud hosting infrastructure fees (billed at cost to cloud provider)',
    ],
    revisions: 'Sprint-based milestone deliverables',
    warranty: '30-day post-launch technical warranty for bug fixes',
    thirdPartyCosts: ['Cloud Hosting (AWS/Render/Supabase)', 'Stripe/Razorpay transaction fees'],
    pricing: {
      model: 'starting_from',
      currency: 'INR',
      startingAt: '₹49,999',
      startingAmount: 49999,
      recommendedPrice: '₹99,999',
      packages: [
        {
          name: 'Starter SaaS MVP',
          price: '₹49,999',
          amount: 49999,
          delivery: '3–5 Weeks (Milestone Sprints)',
          features: [
            'Multi-Tenant Auth & User Management',
            'Core Product Feature Workflow (1 primary module)',
            'Subscription Billing (Stripe / Razorpay Recurring)',
            'Basic Admin Metrics Dashboard',
            'PostgreSQL & Supabase Architecture',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Growth SaaS Platform',
          price: '₹99,999',
          amount: 99999,
          delivery: '5–8 Weeks (Milestone Sprints)',
          recommended: true,
          features: [
            'Multi-Tier Pricing Plans & Metered Usage Hooks',
            'Team Invitations & Role-Based Permissions',
            'Automated Email Onboarding & Webhook Integrations',
            'Comprehensive Super-Admin Analytics Panel',
            'Staging Environment & CI/CD Pipeline',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Scale SaaS Foundation',
          price: '₹1,79,999+',
          amount: 179999,
          delivery: '8–12 Weeks (Milestone Sprints)',
          features: [
            'High-Concurrency Cluster Architecture & Redis Caching',
            'Public API Layer with Developer Key Management',
            'Custom Domain Routing per Tenant',
            'Enterprise Security Auditing & SOC2 Preparation',
            'Dedicated Engineering Sprint Support',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
      ],
      fastPrice: 'Priority Milestone (+25%)',
      expressPrice: 'Custom Scoping',
      emergencyPrice: 'N/A (Multi-week delivery)',
      monthlyRetainer: '₹5,999/mo (SaaS Infra Care)',
      gstNote: 'All prices exclude 18% GST where applicable.',
      thirdPartyNote: 'Payment gateways and cloud server hosting are owned directly by the client.',
    },
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'service-desktop',
    slug: 'desktop-applications',
    name: 'Desktop Applications',
    shortName: 'Desktop Apps',
    tier: 'primary',
    category: 'Software & Engineering',
    description:
      'Windows, Linux, and macOS business software for offline data processing, hardware device integration, local POS billing, and secure desktop tooling.',
    shortDescription: 'Windows, Linux, and macOS business desktop software.',
    route: '/services/desktop-applications',
    featured: false,
    available: true,
    delivery: '2–4 Weeks (Modular Phased Milestones)',
    targetCustomer: 'Retail counters, laboratories, local manufacturing units, and businesses requiring secure offline operations.',
    benefits: [
      'Runs 100% offline without relying on continuous internet connectivity',
      'Direct communication with local hardware (thermal printers, barcode scanners, weigh scales)',
      'Cross-platform distribution on Windows, macOS, and Linux with automated installers',
      'Fast local SQLite / embedded database with encrypted local backups',
      'Optional cloud sync whenever internet connection is available',
    ],
    features: [
      {
        title: 'Electron / Native Frameworks',
        description: 'Built with modern TypeScript and Electron for reliable cross-platform execution.',
      },
      {
        title: 'Hardware Peripheral Communication',
        description: 'Direct serial port, USB, and network socket communication with printers and scanners.',
      },
      {
        title: 'Encrypted Local Storage',
        description: 'Secure local SQLite / DuckDB storage with automated background cloud backups.',
      },
      {
        title: 'Automated Installer & Updates',
        description: 'One-click executable installers (.exe, .dmg, .deb) with seamless in-app auto-updates.',
      },
    ],
    included: [
      'Desktop UI/UX layout optimized for keyboard shortcuts',
      'Local database setup and peripheral driver integration',
      'Compiled executable installers for target operating systems',
      'Documentation and deployment walkthrough',
    ],
    excluded: [
      'Code signing certificate fees (e.g. Microsoft Windows EV certificate if required)',
    ],
    revisions: '2 Iteration rounds on peripheral workflows',
    warranty: '30-day post-launch technical warranty for bug fixes',
    thirdPartyCosts: ['Optional Code Signing Certificate (~₹15,000/yr if public commercial download)'],
    pricing: {
      model: 'starting_from',
      currency: 'INR',
      startingAt: '₹29,999',
      startingAmount: 29999,
      recommendedPrice: '₹54,999',
      packages: [
        {
          name: 'Starter Desktop Utility',
          price: '₹29,999',
          amount: 29999,
          delivery: '2–3 Weeks (Phased Sprints)',
          features: [
            'Single OS Target (Windows or macOS)',
            'Offline SQLite Database Storage',
            'Core Operational Workflow (Up to 4 screens)',
            'Local File Export (PDF / Excel)',
            'Compiled Executable Installer',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Growth POS & Hardware App',
          price: '₹54,999',
          amount: 54999,
          delivery: '3–5 Weeks (Milestone Sprints)',
          recommended: true,
          features: [
            'Cross-Platform (Windows + macOS + Linux)',
            'Hardware Peripheral Sync (Thermal Printer & Scanner)',
            'Barcode Generation & POS Billing Flow',
            'Hybrid Cloud Backup Sync',
            'Automated Auto-Update Pipeline',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Pro High-Performance Tool',
          price: '₹89,999',
          amount: 89999,
          delivery: '5–8 Weeks (Milestone Sprints)',
          features: [
            'High-Throughput Offline Data Processing',
            'Multi-Threaded Native C++ / Rust Bindings',
            'Encrypted Local Storage & Audit Governance',
            'Dedicated Peripheral Driver Customization',
            'Priority Support SLA',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
      ],
      fastPrice: 'Priority Sprint (+25%)',
      expressPrice: 'Custom Scoping',
      emergencyPrice: 'N/A (Multi-week delivery)',
      monthlyRetainer: '₹2,499/mo (Desktop Care)',
      gstNote: 'All prices exclude 18% GST where applicable.',
      thirdPartyNote: 'Public app store / certificate fees are paid directly to Microsoft/Apple.',
    },
    image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

// ---------------------------------------------------------------------------
// TIER 2 — Marketing & Business Support
// ---------------------------------------------------------------------------

export const tier2Services: Service[] = [
  {
    id: 'service-lead-gen',
    slug: 'lead-generation',
    name: 'B2B Lead Generation & Local Dominance',
    shortName: 'Lead Generation',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    description:
      'Targeted lead capture funnels, Google Business Profile local dominance, and automated lead qualification pipelines that connect prospects directly with your sales team.',
    shortDescription: 'Qualified lead capture and local Google dominance.',
    route: '/services/lead-generation',
    featured: false,
    available: true,
    delivery: '5–7 Business Days (Express 48h available)',
    targetCustomer: 'Clinics, lawyers, local retailers, real estate agents, B2B services, and contractors.',
    benefits: [
      'High-converting landing funnel capturing high-intent prospects without leakage',
      'Google Business Profile top-3 map pack ranking optimization for local search queries',
      'Instant WhatsApp notification directly to the business owner when a lead fills a form',
      'Zero reliance on shared, low-quality lead lists that get spammed by 10 competitors',
      'Clear transparent tracking: see exactly which source generated which client',
    ],
    features: [
      {
        title: 'Local Google Map Pack Optimization',
        description: 'Category selection, geo-tagged image uploads, and review capture QR codes.',
      },
      {
        title: 'High-Conversion Funnel Design',
        description: 'Mobile-first landing page with qualification questions and trust proof.',
      },
      {
        title: 'Instant Lead Notification Bridge',
        description: 'Automated WhatsApp, SMS, and Email alert sent to sales staff in under 10 seconds.',
      },
      {
        title: 'Review Generation Strategy',
        description: 'Automated customer review request flows to boost local 5-star Google ratings.',
      },
    ],
    included: [
      'Google Business Profile complete audit and optimization',
      'Lead capture form with instant WhatsApp notification bridge',
      'Local citation submission guide and review booster QR asset',
    ],
    excluded: [
      'Ad budget (if running Meta/Google Ads, budget is paid directly to ad platforms)',
    ],
    revisions: '2 Iteration rounds on profile and form assets',
    warranty: '30-day post-launch technical warranty for bug fixes',
    thirdPartyCosts: ['Optional Meta/Google Ad Spend (client budget)', 'SMS Gateway credits if used'],
    pricing: {
      model: 'starting_from',
      currency: 'INR',
      startingAt: '₹2,499',
      startingAmount: 2499,
      recommendedPrice: '₹4,499',
      packages: [
        {
          name: 'GBP Setup & Verification Starter',
          price: '₹2,499',
          amount: 2499,
          delivery: '5–7 Business Days',
          features: [
            'Google Business Profile Claim & Setup',
            'Accurate Category & Service Tagging',
            'Business Description & Keyword Optimization',
            'Review Link & QR Code Generation',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Local Map Domination & Funnel',
          price: '₹4,499',
          amount: 4499,
          delivery: '5–7 Business Days',
          recommended: true,
          features: [
            'Full Google Business Profile Overhaul',
            '10 Geo-Tagged Business Photos & Menu Setup',
            'High-Conversion Mobile Lead Form Setup',
            'Instant WhatsApp Lead Alert to Owner',
            'Local Citation Strategy Blueprint',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Monthly Local Dominance Retainer',
          price: '₹3,499/mo',
          amount: 3499,
          delivery: 'Ongoing Monthly Sprint',
          features: [
            'Weekly Google Business Profile Updates & Posts',
            'Review Monitoring & Professional Responses',
            'Monthly Map Ranking & Keyword Report',
            'Continuous Local Competitor Tracking',
            'Priority Support SLA',
            '30-Day Technical Maintenance Warranty',
          ],
        },
      ],
      fastPrice: '₹3,499 (48 Hours)',
      expressPrice: '₹4,499 (24 Hours GBP Fix)',
      emergencyPrice: '₹1,999 (GBP Suspension / Appeal Assist in 24h)',
      monthlyRetainer: '₹3,499/mo (Local Dominance)',
      gstNote: 'All prices exclude 18% GST where applicable.',
      thirdPartyNote: 'Ad spend is paid directly by the client to Google/Meta.',
    },
    image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'service-social-media',
    slug: 'social-media-marketing',
    name: 'Social Media Marketing & Creatives',
    shortName: 'Social Media',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    description:
      'Brand-aligned social media creatives, structured posting calendars, and targeted Meta advertising campaigns designed to build credibility and drive engagement.',
    shortDescription: 'Social media creatives, management, and paid ad funnels.',
    route: '/services/social-media-marketing',
    featured: false,
    available: true,
    delivery: '5–7 Business Days (Monthly Retainers active immediately)',
    targetCustomer: 'Brands, restaurants, clinics, local stores, and founders wanting a polished visual social presence.',
    benefits: [
      'Original, bespoke graphic designs matching your exact brand identity',
      'Consistent posting schedule that establishes authority and social proof',
      'Conversion-focused ad creatives engineered to stop the scroll on Instagram and Facebook',
      'Clear, transparent monthly reporting: see reach, engagement, and click-through metrics',
      'Full source file delivery (Figma/Canva) allowing your team full asset reusability',
    ],
    features: [
      {
        title: 'Custom Brand Creative Packs',
        description: 'Engaging feed posts, carousel graphics, and story templates created in Figma.',
      },
      {
        title: 'Content Strategy & Copywriting',
        description: 'Captions, hashtags, and call-to-action hooks tailored to Indian consumer audiences.',
      },
      {
        title: 'Meta Paid Ad Campaign Setup',
        description: 'Targeted Instagram and Facebook ad setup with pixel tracking and audience retargeting.',
      },
      {
        title: 'Monthly Performance Analytics',
        description: 'Concise monthly review showing top-performing posts and return on investment.',
      },
    ],
    included: [
      'Custom graphic design assets in high-resolution PNG & editable Figma format',
      'Copywriting for all post captions and targeted hashtags',
      'Publishing calendar and optimal timing schedule',
    ],
    excluded: [
      'Meta Ad Budget (paid directly by client to Meta Ads Manager)',
    ],
    revisions: '2 Revision rounds per creative batch',
    warranty: '30-day post-launch technical warranty for bug fixes',
    thirdPartyCosts: ['Meta Ads budget (optional client spend)'],
    pricing: {
      model: 'starting_from',
      currency: 'INR',
      startingAt: '₹2,499',
      startingAmount: 2499,
      recommendedPrice: '₹5,999/mo',
      packages: [
        {
          name: 'Starter Creative Pack (10 Posts)',
          price: '₹2,499',
          amount: 2499,
          delivery: '5–7 Business Days',
          features: [
            '10 Custom Branded Feed Posts',
            'Story & Reel Cover Formats Included',
            'Figma / Canva Editable Template Files',
            'Copywritten Captions & Targeted Hashtags',
            '2 Iteration Rounds',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Growth Social Retainer (16 Posts/mo)',
          price: '₹5,999/mo',
          amount: 5999,
          delivery: 'Weekly Batches (4 Posts/wk)',
          recommended: true,
          features: [
            '16 Custom Branded Creatives per Month (4 per week)',
            'Instagram & Facebook Publishing & Scheduling',
            'Story Graphics & Festival Special Posts',
            '1 Meta Ad Campaign Setup & Optimization',
            'Monthly Reach & Growth Analytics Report',
            '30-Day Technical Maintenance Warranty',
          ],
        },
        {
          name: 'Pro Brand Dominance Retainer',
          price: '₹11,999/mo',
          amount: 11999,
          delivery: 'Weekly Batches (6 Posts + 1 Reel/wk)',
          features: [
            '24 High-Quality Creatives + 4 Short Video/Reel Edits',
            'Multi-Platform Management (Instagram, LinkedIn, FB)',
            'Full Meta Ad Funnel Management (Retargeting + Lookalikes)',
            'Community Comment & DM Notification Triage',
            'Dedicated Account Strategist',
            '30-Day Technical Maintenance Warranty',
          ],
        },
      ],
      fastPrice: '₹3,499 (Creative Pack in 48h)',
      expressPrice: '₹4,999 (Urgent Campaign Pack in 24h)',
      emergencyPrice: '₹1,999 (Same-day Event Creative Pack of 3)',
      monthlyRetainer: '₹5,999/mo (Growth Social)',
      gstNote: 'All prices exclude 18% GST where applicable.',
      thirdPartyNote: 'Meta ad spend is paid directly by client to Meta Ads Manager.',
    },
    image: 'https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'service-graphic-design',
    slug: 'graphic-design',
    name: 'Brand & Graphic Design',
    shortName: 'Brand Design',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    description:
      'Visual identity design, vector logos, business stationery, marketing brochures, pitch decks, and digital banners that communicate credibility and professionalism.',
    shortDescription: 'Branding, logos, pitch decks, and digital graphics.',
    route: '/services/graphic-design',
    featured: false,
    available: true,
    delivery: '5–7 Business Days (Express 48h available for Logo)',
    targetCustomer: 'New businesses, rebranding companies, and founders preparing investor presentations.',
    benefits: [
      'Original, vector-first logos ready for printing, signboards, websites, and trademarking',
      'Comprehensive brand kit: typography pairings, color codes (HEX/RGB/CMYK), and usage rules',
      'Print-ready high-resolution PDFs with bleed margins for error-free local printing',
      'Investor-ready pitch presentations with crisp typography and data visualization',
      '100% commercial copyright ownership with all master source files (AI, SVG, PDF, PNG)',
    ],
    features: [
      {
        title: 'Vector Logo Design & Identity',
        description: 'Original concept sketches, digital vectorization, and brand mark variants.',
      },
      {
        title: 'Business Stationery Suite',
        description: 'Matching digital business cards, letterheads, and envelope mockups.',
      },
      {
        title: 'Investor Pitch Decks',
        description: '12–15 slide data-driven presentations in PowerPoint / Google Slides / PDF.',
      },
      {
        title: 'Marketing Collateral',
        description: 'Brochures, flyers, digital banners, roll-up standees, and catalog covers.',
      },
    ],
    included: [
      'Original concept drafts and structured iteration rounds',
      'Full master vector source files (AI, EPS, SVG, PDF, PNG)',
      'Brand color palette and typography guideline document',
    ],
    excluded: [
      'Physical printing and delivery costs (print-ready files provided)',
    ],
    revisions: '3 Revision rounds included in all packages',
    warranty: '30-day post-launch technical warranty for bug fixes',
    thirdPartyCosts: ['Physical printing costs (handled locally by client)'],
    pricing: {
      model: 'starting_from',
      currency: 'INR',
      startingAt: '₹2,499',
      startingAmount: 2499,
      recommendedPrice: '₹4,499',
      packages: [
        {
          name: 'Fast-Track Logo Starter',
          price: '₹2,499',
          amount: 2499,
          delivery: '5–7 Business Days (Express 48h available)',
          features: [
            '2 Original Logo Concept Options',
            'High-Res PNG, JPG, and Favicon Pack',
            'Full Vector Source Files (AI, SVG, EPS)',
            'Brand Color Codes (HEX, RGB, CMYK)',
            '2 Revision Rounds',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Complete Brand Identity Suite',
          price: '₹4,499',
          amount: 4499,
          delivery: '5–7 Business Days',
          recommended: true,
          features: [
            '3 Distinct Logo Concept Options',
            'Complete Vector Source Files & Favicons',
            'Digital Business Card & Letterhead Design',
            'Social Media Profile & Banner Graphics',
            'Brand Guidelines Cheat-Sheet',
            '3 Revision Rounds',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Investor Pitch Deck & Corporate Kit',
          price: '₹8,999',
          amount: 8999,
          delivery: '2–3 Weeks (Phased Sprints)',
          features: [
            '12–15 Slide Custom Investor / Sales Deck',
            'Editable PowerPoint / Google Slides & PDF',
            'Custom Iconography & Financial Data Charts',
            'Printable Tri-Fold Brochure / Company Profile',
            'Priority Turnaround SLA',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
      ],
      fastPrice: '₹3,499 (Logo in 48h)',
      expressPrice: '₹5,499 (Complete Kit in 3 Days)',
      emergencyPrice: '₹2,499 (Urgent Banner / Flyer in 24h)',
      monthlyRetainer: '₹3,499/mo (Creative Design Support)',
      gstNote: 'All prices exclude 18% GST where applicable.',
      thirdPartyNote: 'Printing is arranged locally by client using print-ready vector files.',
    },
    image: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'service-email-marketing',
    slug: 'email-marketing',
    name: 'Email Marketing & Lifecycle Automation',
    shortName: 'Email Marketing',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    description:
      'Targeted email campaigns, automated customer onboarding sequences, newsletter templates, and DNS deliverability configuration ensuring emails land in the inbox, not spam.',
    shortDescription: 'Email campaigns, automation, and deliverability.',
    route: '/services/email-marketing',
    featured: false,
    available: true,
    delivery: '3–5 Business Days (Express 24h available for DNS fix)',
    targetCustomer: 'E-commerce stores, B2B services, course creators, and subscription platforms.',
    benefits: [
      'DNS deliverability setup (SPF, DKIM, DMARC) preventing emails from landing in spam',
      'Automated customer welcome and abandoned cart sequences that generate passive revenue',
      'Mobile-responsive HTML email templates compatible with Gmail, Outlook, and Apple Mail',
      'Integration with Mailchimp, Brevo (Sendinblue), Amazon SES, or custom SMTP servers',
      'Clear analytics tracking open rates, click-through rates, and unsubscribes',
    ],
    features: [
      {
        title: 'DNS Deliverability Hardening',
        description: 'Configuration of SPF, DKIM, DMARC, and custom sending domain records.',
      },
      {
        title: 'Lifecycle Automation Workflows',
        description: 'Multi-step welcome series, lead nurture drips, and post-purchase sequences.',
      },
      {
        title: 'Responsive Template Design',
        description: 'Clean branded email templates tested across major email clients.',
      },
      {
        title: 'Audience Segmentation & Hygiene',
        description: 'List cleaning to remove inactive subscribers and maintain high sender reputation.',
      },
    ],
    included: [
      'DNS records audit and configuration (SPF/DKIM/DMARC)',
      'HTML email template design with responsive formatting',
      'Automation workflow configuration in your email platform',
    ],
    excluded: [
      'Email platform subscription fees (e.g. Brevo/Mailchimp plans paid directly to provider)',
    ],
    revisions: '2 Iteration rounds on copy and template design',
    warranty: '30-day post-launch technical warranty for bug fixes',
    thirdPartyCosts: ['Email Service Provider plan (Brevo has free 300 emails/day; paid plans ~₹1,500/mo)'],
    pricing: {
      model: 'starting_from',
      currency: 'INR',
      startingAt: '₹1,999',
      startingAmount: 1999,
      recommendedPrice: '₹3,999',
      packages: [
        {
          name: 'Deliverability & SPF/DKIM Rescue',
          price: '₹1,999',
          amount: 1999,
          delivery: '3–5 Business Days (Express 24h available)',
          features: [
            'SPF, DKIM, and DMARC DNS Record Setup',
            'Fix Bouncing & Spam Filter Flags',
            'Google Postmaster Tools Configuration',
            'Inbox Placement Verification Test',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Automation & Template Setup',
          price: '₹3,999',
          amount: 3999,
          delivery: '5–7 Business Days',
          recommended: true,
          features: [
            'Everything in Deliverability Setup',
            '2 Custom Branded Responsive Email Templates',
            '3-Step Automated Welcome / Nurture Sequence',
            'Form Integration with Website',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Monthly Email Campaign Management',
          price: '₹4,999/mo',
          amount: 4999,
          delivery: 'Weekly Scheduled Broadcasts',
          features: [
            '4 Custom Designed Newsletter Broadcasts / mo',
            'A/B Subject Line Testing & Copywriting',
            'List Segmentation & Inactive Cleaning',
            'Detailed Monthly Performance & ROI Analytics',
            'Priority Support SLA',
            '30-Day Technical Maintenance Warranty',
          ],
        },
      ],
      fastPrice: '₹2,999 (Deliverability in 24h)',
      expressPrice: '₹4,999 (Full Setup in 48h)',
      emergencyPrice: '₹1,999 (Emergency Spam Trap / DNS Fix in 24h)',
      monthlyRetainer: '₹4,999/mo (Email Management)',
      gstNote: 'All prices exclude 18% GST where applicable.',
      thirdPartyNote: 'Email provider plans (Brevo, Mailchimp, SES) are billed directly by provider.',
    },
    image: 'https://images.pexels.com/photos/193003/pexels-photo-193003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'service-sms-marketing',
    slug: 'sms-marketing',
    name: 'SMS Marketing & Transactional Alerts',
    shortName: 'SMS Marketing',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    description:
      'Bulk promotional SMS campaigns, automated OTP/transactional alert integrations, DLT registration assistance, and SMPP gateway connections with instant 98%+ open rates.',
    shortDescription: 'Bulk SMS campaigns, OTPs, and DLT registration.',
    route: '/services/sms-marketing',
    featured: false,
    available: true,
    delivery: '3–5 Business Days (Express 24h available for single API)',
    targetCustomer: 'Retailers, schools, clinics, delivery services, and platforms requiring instant mobile text alerts.',
    benefits: [
      'High open rates: over 95% of SMS messages are read within 3 minutes in India',
      'Assistance with mandatory TRAI DLT portal entity and header/template registration',
      'Clean REST API and webhook integration with websites, CRM, and billing software',
      'Dedicated transactional route for critical OTPs, order updates, and appointment reminders',
      'Zero monthly platform fee: you only pay for the actual SMS credits you consume',
    ],
    features: [
      {
        title: 'TRAI DLT Portal Registration Support',
        description: 'Guidance through mandatory regulatory entity, header, and SMS template approvals.',
      },
      {
        title: 'Transactional OTP API Integration',
        description: 'Sub-3 second delivery of authentication codes and transactional receipts.',
      },
      {
        title: 'Promotional Campaign Broadcasting',
        description: 'Targeted broadcast campaigns to customer lists with detailed delivery logs.',
      },
      {
        title: 'Automated CRM Triggers',
        description: 'Automatic SMS sent when a new appointment is booked or invoice is created.',
      },
    ],
    included: [
      'DLT regulatory registration walkthrough and template submission',
      'REST API webhook integration with website or backend',
      'Portal dashboard configuration and testing',
    ],
    excluded: [
      'SMS message pack credits (standard Indian carrier cost ~15–20 paise per SMS)',
    ],
    revisions: '2 Iteration rounds on templates',
    warranty: '30-day post-launch technical warranty for bug fixes',
    thirdPartyCosts: ['SMS Gateway Credits (~₹0.15–₹0.20 per SMS bought in packages)'],
    pricing: {
      model: 'starting_from',
      currency: 'INR',
      startingAt: '₹1,999',
      startingAmount: 1999,
      recommendedPrice: '₹3,499',
      packages: [
        {
          name: 'SMS Gateway API Integration',
          price: '₹1,999',
          amount: 1999,
          delivery: '3–5 Business Days (Express 24h available)',
          features: [
            'Integrate SMS API with Website / Contact Form',
            'Automated Lead Notification to Owner via SMS',
            'Customer Confirmation SMS Workflow',
            'Delivery Callback & Error Logging',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'DLT Registration & Automation Suite',
          price: '₹3,499',
          amount: 3499,
          delivery: '5–7 Business Days (subject to TRAI approval)',
          recommended: true,
          features: [
            'TRAI DLT Entity & Header Registration Support',
            'Up to 5 Approved Transactional SMS Templates',
            'Full Website / CRM Integration',
            'Broadcast Campaign Panel Setup',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Pro Custom Messaging Engine',
          price: '₹6,999',
          amount: 6999,
          delivery: '2–3 Weeks (Phased Sprints)',
          features: [
            'Multi-Provider Failover Gateway (Fast2SMS / Msg91)',
            'Automated OTP & 2FA Security Pipeline',
            'Scheduled Batch Campaigns & Opt-Out Filters',
            'Custom Webhook Telemetry & Analytics Dashboard',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
      ],
      fastPrice: '₹2,999 (48 Hours)',
      expressPrice: '₹4,499 (24 Hours Gateway Setup)',
      emergencyPrice: '₹1,999 (API Gateway Fix in 24h)',
      monthlyRetainer: '₹1,499/mo (Messaging Maintenance)',
      gstNote: 'All prices exclude 18% GST where applicable.',
      thirdPartyNote: 'SMS credits are purchased directly from gateway providers at wholesale rates.',
    },
    image: 'https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'service-missed-call',
    slug: 'missed-call-service',
    name: 'Missed Call Alert Service',
    shortName: 'Missed Call Alerts',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    description:
      'Zero-cost lead capture for Indian callers — customers give a missed call to receive automated SMS receipts, WhatsApp catalogs, or callback registrations without phone bill costs.',
    shortDescription: 'Zero-cost lead capture via automated missed call triggers.',
    route: '/services/missed-call-service',
    featured: false,
    available: true,
    delivery: '5–7 Business Days (Express 48h available)',
    targetCustomer: 'Political campaigns, retail promos, verification systems, and mass-market Indian consumer campaigns.',
    benefits: [
      'Zero friction for Indian consumers: no mobile call charges for the caller',
      'Instant automated response sent back via WhatsApp or SMS in real-time',
      'Real-time caller number capture to Google Sheets, CRM, or sales dashboard',
      'High conversion rate for local advertising, newspaper ads, and outdoor banners',
      'Reliable cloud telephony infrastructure with 99.9% uptime and zero busy signals',
    ],
    features: [
      {
        title: 'Virtual Dedicated Number Setup',
        description: '10-digit virtual mobile number or toll-free missed call configuration.',
      },
      {
        title: 'Automated Instant Callback / SMS',
        description: 'Automatic SMS or WhatsApp brochure sent immediately upon disconnection.',
      },
      {
        title: 'Real-Time CRM & Sheet Sync',
        description: 'Every caller timestamp, phone number, and location logged in Google Sheets.',
      },
      {
        title: 'Duplicate Caller Filtering',
        description: 'Intelligent rules to avoid sending duplicate auto-replies to repeat callers.',
      },
    ],
    included: [
      'Virtual number cloud telephony setup',
      'Automated SMS/WhatsApp auto-response webhook trigger',
      'Google Sheets / CRM synchronization',
      'Dashboard configuration and test verification',
    ],
    excluded: [
      'Virtual phone number rental fee (carrier cost ~₹800–₹1,200/month)',
      'Outgoing SMS/WhatsApp message credit charges',
    ],
    revisions: '2 Iteration rounds on auto-reply content',
    warranty: '30-day post-launch technical warranty for bug fixes',
    thirdPartyCosts: ['Virtual Number Monthly Rental (~₹800–₹1,200/mo paid to telephony provider)'],
    pricing: {
      model: 'starting_from',
      currency: 'INR',
      startingAt: '₹2,499',
      startingAmount: 2499,
      recommendedPrice: '₹4,499',
      packages: [
        {
          name: 'Starter Missed Call Lead Capture',
          price: '₹2,499',
          amount: 2499,
          delivery: '5–7 Business Days (Express 48h available)',
          features: [
            'Virtual 10-Digit Number Setup',
            'Auto-Log Caller Numbers to Google Sheet',
            'Single Instant SMS Auto-Reply Trigger',
            'Real-Time Webhook Alert to Business Owner',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Growth WhatsApp Callback Suite',
          price: '₹4,499',
          amount: 4499,
          delivery: '5–7 Business Days',
          recommended: true,
          features: [
            'Virtual Number Setup + WhatsApp Bot Bridge',
            'Instant WhatsApp Catalog / PDF Brochure Auto-Reply',
            'CRM Integration & Sales Team WhatsApp Notification',
            'Duplicate Caller Suppression Rules',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Pro Campaign & Analytics Suite',
          price: '₹7,999',
          amount: 7999,
          delivery: '2–3 Weeks (Phased Sprints)',
          features: [
            'Multi-Channel Response (WhatsApp + SMS + Voice Call)',
            'Custom Lead Qualification Questions via WhatsApp',
            'Live Analytics Dashboard Tracking Peak Call Hours',
            'High-Capacity Concurrency for Outdoor Media Campaigns',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
      ],
      fastPrice: '₹3,499 (48 Hours)',
      expressPrice: '₹5,499 (24–48 Hours)',
      emergencyPrice: '₹1,999 (Telephony Webhook Fix in 24h)',
      monthlyRetainer: '₹1,499/mo (Telephony Care)',
      gstNote: 'All prices exclude 18% GST where applicable.',
      thirdPartyNote: 'Carrier number rental and outbound SMS credits are billed at wholesale rates.',
    },
    image: 'https://images.pexels.com/photos/33999/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'service-voice-call',
    slug: 'voice-call-services',
    name: 'Voice Call & IVR Solutions',
    shortName: 'Voice & IVR',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    description:
      'Automated outbound voice broadcasting (OBD), custom Interactive Voice Response (IVR) phone menus, and virtual office reception systems that handle customer inquiries professionally.',
    shortDescription: 'Automated voice broadcasting and multi-level IVR menus.',
    route: '/services/voice-call-services',
    featured: false,
    available: true,
    delivery: '5–7 Business Days (Express 48h available for broadcast)',
    targetCustomer: 'Educational institutions, event management, healthcare clinics, and customer support centers.',
    benefits: [
      'Professional virtual receptionist: "Press 1 for Sales, 2 for Support, 3 for Clinic Hours"',
      'Automated voice reminders for upcoming appointments, pending fees, and event announcements',
      'Smart call routing to staff mobile phones without exposing personal phone numbers',
      'Call recording and analytics tracking staff response times and customer query volume',
      'High-concurrency cloud telephony capable of dialing thousands of announcements simultaneously',
    ],
    features: [
      {
        title: 'Interactive Voice Response (IVR) Flow',
        description: 'Multi-level press-button phone menu with customized greetings and routing.',
      },
      {
        title: 'Smart Agent Call Forwarding',
        description: 'Parallel or sequential ringing on staff mobile phones with business caller ID.',
      },
      {
        title: 'Outbound Voice Broadcasting (OBD)',
        description: 'Automated pre-recorded voice calls delivered to student / customer lists.',
      },
      {
        title: 'Call Recording & Telemetry',
        description: 'Cloud recording, call duration logs, and missed-call notification to management.',
      },
    ],
    included: [
      'IVR workflow architectural design and script review',
      'Virtual telephony PBX configuration and agent routing rules',
      'Testing and verification across all major telecom networks',
    ],
    excluded: [
      'Virtual number monthly line rental (~₹1,000–₹1,500/mo)',
      'Per-minute voice call carrier consumption charges (~30–40 paise/min)',
    ],
    revisions: '2 Iteration rounds on IVR voice tree',
    warranty: '30-day post-launch technical warranty for bug fixes',
    thirdPartyCosts: ['Virtual Number Rental (~₹1,200/mo) + Voice Pulse Credits (~₹0.35/min)'],
    pricing: {
      model: 'starting_from',
      currency: 'INR',
      startingAt: '₹3,499',
      startingAmount: 3499,
      recommendedPrice: '₹6,499',
      packages: [
        {
          name: 'Starter Voice Broadcast (OBD)',
          price: '₹3,499',
          amount: 3499,
          delivery: '5–7 Business Days (Express 48h available)',
          features: [
            'Outbound Voice Call Campaign Setup',
            'Pre-Recorded Audio File Upload & Quality Tuning',
            'Contact List Import & DND Scrubbing',
            'Campaign Delivery Report (Answered vs Unanswered)',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Growth Virtual IVR Receptionist',
          price: '₹6,499',
          amount: 6499,
          delivery: '5–7 Business Days',
          recommended: true,
          features: [
            'Single-Level IVR Menu (e.g. Press 1 for Sales, 2 for Support)',
            'Call Forwarding to up to 3 Staff Mobile Phones',
            'Custom Professional Greeting Audio Setup',
            'Call Recording & Missed Call Email/WhatsApp Alert',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
        {
          name: 'Pro Multi-Level Cloud PBX',
          price: '₹11,999',
          amount: 11999,
          delivery: '2–3 Weeks (Phased Sprints)',
          features: [
            'Multi-Level Nested IVR Menus & Department Routing',
            'Working Hours / Holiday Auto-Attendant Logic',
            'CRM Integration: Caller Pop-Up on Staff Dashboard',
            'Advanced Call Analytics & Staff Performance Telemetry',
            '30-Day Post-Launch Bug Fix Warranty',
          ],
        },
      ],
      fastPrice: '₹4,999 (48 Hours)',
      expressPrice: '₹7,999 (Urgent Campaign Setup)',
      emergencyPrice: '₹2,499 (IVR Forwarding / Line Fix in 24h)',
      monthlyRetainer: '₹1,999/mo (Telephony & IVR Care)',
      gstNote: 'All prices exclude 18% GST where applicable.',
      thirdPartyNote: 'Telecom line rentals and call minutes are billed directly at carrier wholesale rates.',
    },
    image: 'https://images.pexels.com/photos/7682340/pexels-photo-7682340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

// ---------------------------------------------------------------------------
// Combined Exports & Helper Utilities
// ---------------------------------------------------------------------------

/** All services in canonical tier order — Tier 1 first, Tier 2 second. */
export const allServices: Service[] = [...tier1Services, ...tier2Services];

/**
 * Flat name list for the contact form service selector.
 * Each entry contains the display name, starting price, and category group.
 */
export const serviceSelectOptions = allServices
  .filter((s) => s.available)
  .map((s) => ({
    name: s.name,
    category: s.category,
    tier: s.tier,
    startingAt: s.pricing.startingAt,
  }));

/**
 * Helper: look up a service by its slug.
 */
export function getServiceBySlug(slug: string): Service | undefined {
  return allServices.find((s) => s.slug === slug);
}
