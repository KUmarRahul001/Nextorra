import { db } from '../../database/supabase.js';

export const STATIC_KNOWLEDGE_BASE = [
  {
    title: 'Custom ERP & Enterprise Applications',
    category: 'Engineering',
    tags: 'erp enterprise custom software modular rbac inventory accounting billing hrms',
    content:
      'Rahnoxa engineers bespoke modular ERP systems designed for real operational workflows. Features include role-based access control (RBAC), multi-branch inventory tracking, automated billing/invoicing, HRMS, and legacy database migration. Built with React, Node.js, and PostgreSQL.',
    url: '/services/erp-enterprise-applications',
  },
  {
    title: 'Full-Stack Web Applications',
    category: 'Engineering',
    tags: 'web apps full stack react node typescript postgresql frontend backend portals dashboards',
    content:
      'We build high-concurrency web applications, customer portals, and internal management platforms using React, TypeScript, Next.js, Node.js, Express, and PostgreSQL.',
    url: '/services/full-stack-web-apps',
  },
  {
    title: 'SaaS Product Engineering',
    category: 'Engineering',
    tags: 'saas multi-tenant cloud subscriptions stripe paddle billing telemetry',
    content:
      'End-to-end SaaS development featuring multi-tenant database isolation, automated recurring billing, user onboarding funnels, and enterprise telemetry.',
    url: '/services/saas-products',
  },
  {
    title: 'Custom Software & API Integration',
    category: 'Engineering',
    tags: 'api integration microservices rest graphql webhooks middleware crm payments',
    content:
      'Custom microservices, REST/GraphQL API design, webhook pipelines, payment gateway integrations, and middleware connecting disparate software systems.',
    url: '/services/custom-software-api-integration',
  },
  {
    title: 'Mobile App Development',
    category: 'Engineering',
    tags: 'mobile app android ios react native flutter biometric offline push notifications',
    content:
      'High-performance cross-platform mobile apps for iOS and Android using React Native and Flutter, with offline SQLite synchronization and biometric security.',
    url: '/services/app-development',
  },
  {
    title: 'Native Desktop Applications',
    category: 'Engineering',
    tags: 'desktop electron tauri windows macos linux offline hardware',
    content:
      'Cross-platform desktop software for Windows, macOS, and Linux for offline processing, local computing, and hardware interfacing.',
    url: '/services/desktop-applications',
  },
  {
    title: 'Modern Website Design',
    category: 'Engineering',
    tags: 'website design corporate landing page seo vite react framer motion responsive',
    content:
      'Modern, conversion-focused corporate websites built with ultra-fast page load speeds, semantic SEO, and subtle animations.',
    url: '/services/web-development',
  },
  {
    title: 'B2B Lead Generation & Outreach',
    category: 'Marketing',
    tags: 'lead generation b2b prospecting cold outreach sales pipeline crm',
    content:
      'Targeted B2B prospect identification, qualified pipeline development, and automated lead routing into your CRM.',
    url: '/services/lead-generation',
  },
  {
    title: 'Social Media Marketing',
    category: 'Marketing',
    tags: 'social media branding content marketing b2b linkedin campaigns',
    content:
      'Strategic brand positioning, technical thought leadership content, and audience engagement campaigns.',
    url: '/services/social-media-marketing',
  },
  {
    title: 'Email & SMS Marketing',
    category: 'Marketing',
    tags: 'email marketing sms marketing drip sequences automated onboarding newsletters',
    content:
      'Automated email nurture sequences, high-deliverability transactional messaging, and broadcast SMS campaigns.',
    url: '/services/email-marketing',
  },
  {
    title: 'Voice Call & Missed Call Solutions',
    category: 'Marketing',
    tags: 'voice ivr missed call telephony cloud calling callback',
    content:
      'Interactive voice response (IVR) systems, automated voice notifications, and zero-cost missed call verification workflows.',
    url: '/services/voice-call-services',
  },
  {
    title: 'Brand & Graphic Design',
    category: 'Design',
    tags: 'design graphic logo ui ux figma design system branding',
    content:
      'Full visual brand identities, logo systems, UI/UX interface design, and cohesive Figma component libraries.',
    url: '/services/graphic-design',
  },
  {
    title: 'Engineering Internships',
    category: 'Company',
    tags: 'internship student training web mobile ai python career job',
    content:
      'Rahnoxa offers engineering internship programs in Web, Mobile, AI/ML, and Data Science with senior engineering mentorship on real client modules.',
    url: '/internship',
  },
  {
    title: 'Response SLA & Contact Channels',
    category: 'Company',
    tags: 'contact email phone whatsapp turnaround sla 24-48 hours quote inquiry',
    content:
      'Direct Contact: contact.rahnoxa@protonmail.com | +91 8434237052 / +91 8434237049. All submitted project enquiries receive an architect review within 24 to 48 hours.',
    url: '/get-started',
  },
];

/**
 * Retrieve relevant knowledge items based on query keywords and domain category
 */
export async function retrieveRelevantKnowledge(query, category) {
  let allItems = STATIC_KNOWLEDGE_BASE;

  try {
    const dbItems = await db.getKnowledgeItems(category);
    if (Array.isArray(dbItems) && dbItems.length > 0) {
      allItems = [...STATIC_KNOWLEDGE_BASE, ...dbItems];
    }
  } catch {
    // Fallback gracefully to static knowledge base if DB is offline
  }

  const lowerQuery = query.toLowerCase().trim();
  const queryTokens = lowerQuery.split(/\s+/).filter((w) => w.length > 2);

  const scored = allItems.map((item) => {
    let score = 0;
    const titleLower = (item.title || '').toLowerCase();
    const contentLower = (item.content || '').toLowerCase();
    const tagsLower = (item.tags || '').toLowerCase();

    for (const token of queryTokens) {
      if (titleLower.includes(token)) score += 6;
      if (tagsLower.includes(token)) score += 4;
      if (contentLower.includes(token)) score += 2;
    }

    if (category && item.category === category) score += 3;

    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const topItems = scored.filter((s) => s.score > 0).map((s) => s.item);

  return topItems.length > 0 ? topItems.slice(0, 4) : allItems.slice(0, 3);
}
