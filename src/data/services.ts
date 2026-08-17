/**
 * SINGLE SOURCE OF TRUTH — Nextorra Services
 *
 * All service navigation, listings, contact selectors, and route generation
 * must consume this file. Do NOT maintain separate services[] arrays elsewhere.
 *
 * Tier 1 (primary):   Software & Engineering services — Nextorra's core offering
 * Tier 2 (secondary): Marketing & Business Support — add-on services
 */

export type ServiceTier = 'primary' | 'secondary';

export interface Service {
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
}

// ---------------------------------------------------------------------------
// TIER 1 — Software & Engineering
// ---------------------------------------------------------------------------

export const tier1Services: Service[] = [
  {
    slug: 'web-development',
    name: 'Web Development',
    shortName: 'Web Dev',
    tier: 'primary',
    category: 'Software & Engineering',
    description:
      'Custom business websites, corporate platforms, and high-performance web presence built to your specifications.',
    shortDescription: 'Custom websites and corporate web platforms.',
    route: '/services/web-development',
    featured: true,
    available: true,
  },
  {
    slug: 'full-stack-web-apps',
    name: 'Full Stack Web Apps',
    shortName: 'Web Apps',
    tier: 'primary',
    category: 'Software & Engineering',
    description:
      'End-to-end web application development — dashboards, portals, client platforms, and business applications built with modern frameworks.',
    shortDescription: 'Dashboards, portals, and business web applications.',
    route: '/services/full-stack-web-apps',
    featured: true,
    available: true,
  },
  {
    slug: 'app-development',
    name: 'App Development',
    shortName: 'Mobile Apps',
    tier: 'primary',
    category: 'Software & Engineering',
    description:
      'Native and cross-platform mobile applications for Android and iOS, built for reliability and a quality user experience.',
    shortDescription: 'Android, iOS, and cross-platform mobile apps.',
    route: '/services/app-development',
    featured: true,
    available: true,
  },
  {
    slug: 'custom-software-api-integration',
    name: 'Custom Software & API Integration',
    shortName: 'Custom Software',
    tier: 'primary',
    category: 'Software & Engineering',
    description:
      'Bespoke business software, workflow automation, and API integrations that connect your tools and processes into a unified system.',
    shortDescription: 'Bespoke software, automation, and API integrations.',
    route: '/services/custom-software-api-integration',
    featured: true,
    available: true,
  },
  {
    slug: 'erp-enterprise-applications',
    name: 'ERP & Enterprise Applications',
    shortName: 'ERP',
    tier: 'primary',
    category: 'Software & Engineering',
    description:
      'Enterprise resource planning modules and internal operational platforms designed to support business processes at scale.',
    shortDescription: 'ERP modules and enterprise operational platforms.',
    route: '/services/erp-enterprise-applications',
    featured: true,
    available: true,
  },
  {
    slug: 'saas-products',
    name: 'SaaS Products',
    shortName: 'SaaS',
    tier: 'primary',
    category: 'Software & Engineering',
    description:
      'Multi-user, subscription-based software platforms built with tenant isolation, user management, and scalable infrastructure in mind.',
    shortDescription: 'Subscription-based multi-tenant software platforms.',
    route: '/services/saas-products',
    featured: true,
    available: true,
  },
  {
    slug: 'desktop-applications',
    name: 'Desktop Applications',
    shortName: 'Desktop Apps',
    tier: 'primary',
    category: 'Software & Engineering',
    description:
      'Windows, Linux, and macOS desktop software for internal business operations, data management, and operational tooling.',
    shortDescription: 'Windows, Linux, and macOS business desktop software.',
    route: '/services/desktop-applications',
    featured: false,
    available: true,
  },
];

// ---------------------------------------------------------------------------
// TIER 2 — Marketing & Business Support
// ---------------------------------------------------------------------------

export const tier2Services: Service[] = [
  {
    slug: 'lead-generation',
    name: 'Lead Generation',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    description:
      'Data-driven campaigns and landing pages to capture qualified leads and move prospects through your sales pipeline.',
    shortDescription: 'Qualified lead capture and conversion strategies.',
    route: '/services/lead-generation',
    featured: false,
    available: true,
  },
  {
    slug: 'sms-marketing',
    name: 'SMS Marketing & SMPP',
    shortName: 'SMS Marketing',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    description:
      'Bulk SMS campaigns and SMPP integration for direct, high-open-rate communication with your audience.',
    shortDescription: 'Bulk SMS campaigns and SMPP integration.',
    route: '/services/sms-marketing',
    featured: false,
    available: true,
  },
  {
    slug: 'missed-call-service',
    name: 'Missed Call Service & IVR',
    shortName: 'Missed Call & IVR',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    description:
      'Automated missed call services and IVR systems for lead capture and customer engagement without requiring a live agent.',
    shortDescription: 'Automated missed call and IVR lead capture.',
    route: '/services/missed-call-service',
    featured: false,
    available: true,
  },
  {
    slug: 'voice-call-services',
    name: 'Voice Call Services',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    description:
      'Automated voice broadcasting and outbound calling solutions for marketing campaigns and customer notifications.',
    shortDescription: 'Automated voice broadcasting and outbound calls.',
    route: '/services/voice-call-services',
    featured: false,
    available: true,
  },
  {
    slug: 'social-media-marketing',
    name: 'Social Media Marketing',
    shortName: 'Social Media',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    description:
      'Strategic social media management and paid campaigns across major platforms to build audience and drive engagement.',
    shortDescription: 'Social media management and paid campaigns.',
    route: '/services/social-media-marketing',
    featured: false,
    available: true,
  },
  {
    slug: 'email-marketing',
    name: 'Email Marketing',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    description:
      'Targeted email campaigns, automation sequences, and deliverability management to nurture leads and retain customers.',
    shortDescription: 'Email campaigns, automation, and nurture sequences.',
    route: '/services/email-marketing',
    featured: false,
    available: true,
  },
  {
    slug: 'graphic-design',
    name: 'Graphic Design',
    tier: 'secondary',
    category: 'Marketing & Business Support',
    description:
      'Brand identity, marketing materials, and digital graphics that communicate your message clearly and consistently.',
    shortDescription: 'Branding, marketing materials, and digital graphics.',
    route: '/services/graphic-design',
    featured: false,
    available: true,
  },
];

// ---------------------------------------------------------------------------
// Combined exports
// ---------------------------------------------------------------------------

/** All services in tier order — Tier 1 first, Tier 2 second. */
export const allServices: Service[] = [...tier1Services, ...tier2Services];

/**
 * Flat name list for the contact form service selector.
 * Each entry contains the display name and category group for grouping.
 */
export const serviceSelectOptions = allServices
  .filter((s) => s.available)
  .map((s) => ({ name: s.name, category: s.category, tier: s.tier }));

/**
 * Helper: look up a service by its slug.
 */
export function getServiceBySlug(slug: string): Service | undefined {
  return allServices.find((s) => s.slug === slug);
}
