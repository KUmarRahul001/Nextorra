/**
 * Rahnoxa Native Local AI Provider
 * High-performance deterministic & semantic intent engine covering all 14 Rahnoxa services.
 */

import { RAHNOXA_SERVICES_KNOWLEDGE } from '../knowledge/servicesKnowledge.js';

export class RahnoxaLocalProvider {
  constructor() {
    this.name = 'rahnoxa_local';
  }

  async chat({ message, contextKnowledge, systemPrompt }) {
    const lower = message.toLowerCase().trim();

    // 0. Greetings & Identity (supports "hi", "hii", "hiii", "heyyy", "hellooo", etc.)
    if (
      /^(hi+|hello+|hey+|greetings|good\s+(morning|afternoon|evening)|namaste|howdy|who are you|are you there)\b/i.test(lower) ||
      lower === 'hi' ||
      lower === 'hello' ||
      lower === 'hey' ||
      /^h+i+$/i.test(lower) ||
      /^h+e+y+$/i.test(lower) ||
      /^h+e+l+o+$/i.test(lower) ||
      lower.includes('hi rahbot') ||
      lower.includes('hello rahbot') ||
      lower.includes('hey rahbot')
    ) {
      return {
        reply:
          "Hi! I'm **RahBot**, Rahnoxa's AI engineering assistant.\n\nI can help you explore our software development services, transparent pricing, technology stacks, internships, or project specifications.\n\nWhat would you like to know?",
        intent: 'greeting',
      };
    }

    // 0.1 Thanks & Appreciation
    if (/^(thanks|thank\s+you|thx|appreciate\s+it)\b/i.test(lower)) {
      return {
        reply: "You're very welcome! If you have any further questions about our tech stack, pricing tiers, or need an engineering review, feel free to ask anytime.",
        intent: 'thanks',
      };
    }

    // 0.2 Goodbye & Closing
    if (/^(bye|goodbye|see\s+you|that'?s\s+all)\b/i.test(lower)) {
      return {
        reply: 'Thank you for reaching out to Rahnoxa. Have a great day ahead! If you ever need engineering support or want to start a project, we are right here.',
        intent: 'goodbye',
      };
    }

    // 1. Direct Contact / Leadership reach
    if (
      lower.includes('speak to human') ||
      lower.includes('talk to a person') ||
      lower.includes('human agent') ||
      lower.includes('call me') ||
      lower.includes('contact rahnoxa') ||
      lower.includes('email') ||
      lower.includes('phone') ||
      lower.includes('whatsapp')
    ) {
      return {
        reply:
          "You can reach the Rahnoxa engineering leadership team directly via:\n\n- **Email**: `contact.rahnoxa@protonmail.com`\n- **Phone / WhatsApp**: `+91 8434237052` / `+91 8434237049`\n- **Location**: Jharkhand, India (Remote Engineering Worldwide)\n- **Turnaround SLA**: We respond to all technical enquiries within **24 to 48 hours**.\n\nYou can also submit your project requirements directly through our in-chat enquiry form or [Start a Project Online](/get-started).",
        intent: 'human_handoff',
      };
    }

    // 2. Custom ERP & Enterprise Applications
    if (
      lower.includes('erp') ||
      lower.includes('enterprise application') ||
      lower.includes('enterprise software') ||
      lower.includes('inventory') ||
      lower.includes('hrms') ||
      lower.includes('warehouse') ||
      lower.includes('supply chain') ||
      lower.includes('billing system')
    ) {
      const erp = RAHNOXA_SERVICES_KNOWLEDGE.find((s) => s.id === 'service-erp') || {
        name: 'Custom ERP & Enterprise Applications',
        route: '/services/erp-enterprise-applications',
        features: ['Modular Architecture: Inventory, HRMS, Accounts', 'Role-Based Access: RBAC & Audit Trails'],
        technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
        benefits: ['Eliminates spreadsheets', 'Sub-100ms multi-branch sync'],
      };
      return {
        reply:
          `Yes! **${erp.name}** is one of Rahnoxa's core capabilities.\n\n` +
          `### What We Build for Custom ERPs:\n` +
          (erp.features || []).map((f) => `- **${f.split(':')[0]}**: ${f.split(':')[1] || ''}`).join('\n') +
          `\n\n### Tech Stack:\n- ${(erp.technologies || []).join(', ')}\n\n` +
          `### Key Benefits:\n` +
          (erp.benefits || []).slice(0, 3).map((b) => `- ${b}`).join('\n') +
          `\n\nExplore our [Custom ERP Services](${erp.route}) or submit your workflow requirements in the enquiry form below. Our engineering team will review your specifications and contact you within **24 to 48 hours**.`,
        intent: 'erp_query',
      };
    }

    // 3. Full-Stack Web Applications & Portals
    if (
      lower.includes('web app') ||
      lower.includes('web application') ||
      lower.includes('portal') ||
      lower.includes('dashboard') ||
      lower.includes('full stack') ||
      (lower.includes('react') && !lower.includes('react native')) ||
      lower.includes('node')
    ) {
      const web = RAHNOXA_SERVICES_KNOWLEDGE.find((s) => s.id === 'service-web-apps') || {
        name: 'Full Stack Web Apps',
        route: '/services/full-stack-web-apps',
        features: ['Single-Page Applications: Fast React & Next.js', 'Secure Backend: Node.js & PostgreSQL'],
        technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
        pricing: 'Starting at ₹34,999',
      };
      return {
        reply:
          `Rahnoxa engineers scalable **${web.name}** tailored to your business scale.\n\n` +
          `### Key Web Capabilities:\n` +
          (web.features || []).map((f) => `- **${f.split(':')[0]}**: ${f.split(':')[1] || ''}`).join('\n') +
          `\n\n### Tech Stack:\n- ${(web.technologies || []).join(', ')}\n\n` +
          `### Packages & Pricing:\n- ${web.pricing || 'Starting at ₹34,999'}\n\n` +
          `Explore our [Full-Stack Web App Services](${web.route}) or fill out the enquiry form below for an engineering review within **24 to 48 hours**.`,
        intent: 'web_app_query',
      };
    }

    // 4. SaaS Product Engineering
    if (
      lower.includes('saas') ||
      lower.includes('multi-tenant') ||
      lower.includes('software as a service') ||
      lower.includes('subscription')
    ) {
      const saas = RAHNOXA_SERVICES_KNOWLEDGE.find((s) => s.id === 'service-saas') || {
        name: 'Multi-Tenant SaaS Products',
        route: '/services/saas-products',
        features: ['Tenant Isolation: Schema-level isolation', 'Subscription Billing: Stripe & Razorpay'],
        technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      };
      return {
        reply:
          `We engineer complete **${saas.name}** built for tenant isolation, recurring billing, and scalable growth.\n\n` +
          `### Our SaaS Engineering Capabilities:\n` +
          (saas.features || []).map((f) => `- **${f.split(':')[0]}**: ${f.split(':')[1] || ''}`).join('\n') +
          `\n\n### Tech Stack:\n- ${(saas.technologies || []).join(', ')}\n\n` +
          `Explore our [SaaS Engineering Services](${saas.route}) or submit your project requirements below. Our architects will reply within **24 to 48 hours**.`,
        intent: 'saas_query',
      };
    }

    // 5. Custom Software & API Integration
    if (
      lower.includes('api') ||
      lower.includes('integration') ||
      lower.includes('microservice') ||
      lower.includes('webhook') ||
      lower.includes('middleware') ||
      lower.includes('payment gateway')
    ) {
      const api = RAHNOXA_SERVICES_KNOWLEDGE.find((s) => s.id === 'service-custom-api') || {
        name: 'Custom Software & API Integration',
        route: '/services/custom-software-api-integration',
        features: ['Custom REST & GraphQL APIs', 'Webhook Processing: Resilient queue workers'],
        technologies: ['Node.js', 'Go', 'PostgreSQL', 'Redis'],
      };
      return {
        reply:
          `We build **${api.name}** that connect your internal tools into a single source of truth.\n\n` +
          `### Integration Capabilities:\n` +
          (api.features || []).map((f) => `- **${f.split(':')[0]}**: ${f.split(':')[1] || ''}`).join('\n') +
          `\n\n### Tech Stack:\n- ${(api.technologies || []).join(', ')}\n\n` +
          `Explore our [API Integration Services](${api.route}) or tell us which systems you need to connect! Our team reviews all scopes within **24 to 48 hours**.`,
        intent: 'api_query',
      };
    }

    // 6. Mobile App Development
    if (
      lower.includes('mobile app') ||
      lower.includes('android') ||
      lower.includes('ios') ||
      lower.includes('flutter') ||
      lower.includes('react native') ||
      lower.includes('mobile')
    ) {
      const mobile = RAHNOXA_SERVICES_KNOWLEDGE.find((s) => s.id === 'service-mobile') || {
        name: 'Mobile App Development',
        route: '/services/app-development',
        features: ['Cross-Platform Apps: React Native & Flutter', 'Offline First: SQLite & encrypted storage'],
        technologies: ['React Native', 'Flutter', 'Node.js', 'PostgreSQL'],
      };
      return {
        reply:
          `We develop high-performance **${mobile.name}** for iOS and Android using React Native and Flutter.\n\n` +
          `### Mobile Features:\n` +
          (mobile.features || []).map((f) => `- **${f.split(':')[0]}**: ${f.split(':')[1] || ''}`).join('\n') +
          `\n\n### Key Benefits:\n` +
          (mobile.benefits || []).slice(0, 3).map((b) => `- ${b}`).join('\n') +
          `\n\n### Pricing:\n- ${mobile.pricing || 'Custom Quote'}\n\n` +
          `Check out our [Mobile Development Services](${mobile.route}) or share your target features in the form below for a review within **24 to 48 hours**.`,
        intent: 'mobile_query',
      };
    }

    // 7. Native Desktop Applications
    if (
      lower.includes('desktop') ||
      lower.includes('electron') ||
      lower.includes('tauri') ||
      lower.includes('windows app') ||
      lower.includes('mac app') ||
      lower.includes('linux app')
    ) {
      const desktop = RAHNOXA_SERVICES_KNOWLEDGE.find((s) => s.id === 'service-desktop') || {
        name: 'Desktop Applications',
        route: '/services/desktop-applications',
        features: ['Cross-Platform: Windows, macOS, Linux', 'Offline First Architecture'],
        technologies: ['Electron', 'Tauri', 'React', 'TypeScript'],
      };
      return {
        reply:
          `Rahnoxa builds cross-platform **${desktop.name}** for Windows, macOS, and Linux using Electron, Tauri, and native toolchains.\n\n` +
          `### Desktop Capabilities:\n` +
          (desktop.features || []).map((f) => `- **${f.split(':')[0]}**: ${f.split(':')[1] || ''}`).join('\n') +
          `\n\nIdeal for offline data processing, local hardware peripherals, and specialized enterprise tooling. Learn more at [Desktop Applications](${desktop.route}).`,
        intent: 'desktop_query',
      };
    }

    // 8. Modern Website Design & Development
    if (
      lower.includes('website') ||
      lower.includes('landing page') ||
      lower.includes('web design') ||
      lower.includes('redesign')
    ) {
      const webDesign = RAHNOXA_SERVICES_KNOWLEDGE.find((s) => s.id === 'service-web-design') || {
        name: 'Modern Website Design & Engineering',
        route: '/services/web-development',
        features: ['Responsive UI: Tailwind CSS & React', 'High Core Web Vitals (95+ score)'],
      };
      return {
        reply:
          `We design and code **${webDesign.name}** combining editorial typography, smooth animations, and top-tier SEO.\n\n` +
          `### Key Highlights:\n` +
          (webDesign.benefits || []).slice(0, 3).map((b) => `- ${b}`).join('\n') +
          `\n\n### Packages:\n- ${webDesign.pricing || 'Custom Quote'}\n\n` +
          `Explore our [Website Design Services](${webDesign.route}) or submit your project details below!`,
        intent: 'website_query',
      };
    }

    // 9. Lead Generation
    if (lower.includes('lead gen') || lower.includes('lead generation') || lower.includes('prospect')) {
      const leadGen = RAHNOXA_SERVICES_KNOWLEDGE.find((s) => s.id === 'service-lead-gen') || {
        name: 'B2B Lead Generation',
        route: '/services/lead-generation',
        features: ['Verified Prospect Lists', 'Multichannel Outreach'],
      };
      return {
        reply:
          `Rahnoxa provides **${leadGen.name}** to fill your pipeline with high-intent decision makers.\n\n` +
          `### Capabilities:\n` +
          (leadGen.features || []).map((f) => `- **${f.split(':')[0]}**: ${f.split(':')[1] || ''}`).join('\n') +
          `\n\n### Packages:\n- ${leadGen.pricing || 'Custom Quote'}\n\n` +
          `Learn more at our [Lead Generation Page](${leadGen.route}) or fill out the enquiry form below for a campaign consult within **24 to 48 hours**.`,
        intent: 'lead_gen_query',
      };
    }

    // 10. SMS Marketing, Voice & Telephony
    if (
      lower.includes('sms') ||
      lower.includes('voice call') ||
      lower.includes('missed call') ||
      lower.includes('ivr') ||
      lower.includes('telephony')
    ) {
      return {
        reply:
          "Rahnoxa provides comprehensive direct customer communication channels:\n\n- **SMS Marketing & SMPP**: Bulk SMS, OTP alerts, and DLT compliance. ([Learn More](/services/sms-marketing))\n- **Voice Call & IVR Solutions**: Automated voice broadcasts and cloud IVR routing. ([Learn More](/services/voice-call-services))\n- **Missed Call Alert Service**: Zero-cost lead capture with instant callback. ([Learn More](/services/missed-call-service))\n\nWhich telephony channel would you like to set up?",
        intent: 'telephony_query',
      };
    }

    // 11. Graphic Design & Brand Identity
    if (
      lower.includes('graphic design') ||
      lower.includes('logo') ||
      lower.includes('branding') ||
      lower.includes('figma') ||
      lower.includes('ui/ux')
    ) {
      const design = RAHNOXA_SERVICES_KNOWLEDGE.find((s) => s.id === 'service-design');
      return {
        reply:
          `We deliver **${design.name}** for tech products, marketing collateral, and brand systems.\n\n` +
          `### Offerings:\n` +
          design.features.map((f) => `- **${f.split(':')[0]}**: ${f.split(':')[1] || ''}`).join('\n') +
          `\n\n### Packages:\n- ${design.pricing}\n\n` +
          `Explore our [Graphic Design Services](${design.route}) or share your branding requirements!`,
        intent: 'design_query',
      };
    }

    // 12. Email Marketing
    if (lower.includes('email marketing') || lower.includes('newsletter') || lower.includes('drip sequence')) {
      const email = RAHNOXA_SERVICES_KNOWLEDGE.find((s) => s.id === 'service-email');
      return {
        reply:
          `Rahnoxa offers **${email.name}** to nurture leads and automate customer onboarding.\n\n` +
          `### Key Features:\n` +
          email.features.map((f) => `- **${f.split(':')[0]}**: ${f.split(':')[1] || ''}`).join('\n') +
          `\n\n### Packages:\n- ${email.pricing}\n\n` +
          `Learn more at our [Email Marketing Page](${email.route}).`,
        intent: 'email_query',
      };
    }

    // 13. Internships & Careers
    if (
      lower.includes('internship') ||
      lower.includes('intern') ||
      lower.includes('training') ||
      lower.includes('student') ||
      lower.includes('apply') ||
      lower.includes('career')
    ) {
      const intern = RAHNOXA_SERVICES_KNOWLEDGE.find((s) => s.id === 'talent-internships') || {
        name: 'Engineering Internship Tracks',
        route: '/internship',
        benefits: [
          'Direct contribution to production codebases and real business client projects',
          '1-on-1 weekly code reviews and architectural mentorship directly from the lead software engineer',
          'Verifiable completion certificate and Letter of Recommendation (LOR) upon milestone completion',
          'Pre-placement offer (PPO) opportunities for exceptional engineering contributors',
        ],
      };
      return {
        reply:
          `Rahnoxa offers hands-on **${intern.name}** across Web Dev, Mobile Apps, AI/Machine Learning, and Data Science.\n\n` +
          `### Highlights:\n` +
          intern.benefits.map((b) => `- ${b}`).join('\n') +
          `\n\nInterns work on real client modules under senior engineering mentorship. You can review details and apply at our [Internships Page](${intern.route}).`,
        intent: 'internship_query',
      };
    }

    // 14. Pricing, Estimates & Engagement Models
    if (
      lower.includes('cost') ||
      lower.includes('price') ||
      lower.includes('pricing') ||
      lower.includes('how much') ||
      lower.includes('quote') ||
      lower.includes('budget') ||
      lower.includes('rate')
    ) {
      return {
        reply:
          "We offer three structured engagement models tailored to your project scope:\n\n1. **Milestone-Based Fixed Scope**: Best for defined web apps, MVPs, and ERP modules with agreed timelines.\n2. **Dedicated Sprint Capacity**: Full-stack engineering squads on agile monthly sprints.\n3. **Support & SLA Maintenance**: Ongoing security patching, server monitoring, and continuous iterations.\n\n### Sample Service Starting Rates:\n- **Modern Websites**: ₹15,000 to ₹125,000\n- **Full-Stack Web Apps**: ₹50,000 to ₹500,000+\n- **Mobile Apps (iOS/Android)**: ₹75,000 to ₹500,000+\n- **Custom ERP & SaaS**: Milestone-based custom quote\n\nPlease share your project summary in the form below or [Schedule a Discovery Call](/get-started). Our engineering team will review your scope and get back to you within **24 to 48 hours**.",
        intent: 'pricing_query',
      };
    }

    // 15. All Services Overview
    if (
      lower.includes('services') ||
      lower.includes('what do you do') ||
      lower.includes('what can you build') ||
      lower.includes('help')
    ) {
      return {
        reply:
          "Rahnoxa is a specialized technology engineering company. Here is our complete service spectrum:\n\n### **Core Software Engineering (Tier 1)**\n- [Custom ERP & Enterprise Applications](/services/erp-enterprise-applications)\n- [Full-Stack Web Applications](/services/full-stack-web-apps)\n- [Multi-Tenant SaaS Products](/services/saas-products)\n- [Mobile App Development](/services/app-development)\n- [Custom Software & API Integration](/services/custom-software-api-integration)\n- [Desktop Applications](/services/desktop-applications)\n- [Modern Website Design](/services/web-development)\n\n### **Business Growth & Marketing (Tier 2)**\n- [Lead Generation](/services/lead-generation) | [Social Media Marketing](/services/social-media-marketing)\n- [Email Marketing](/services/email-marketing) | [SMS Marketing](/services/sms-marketing)\n- [Voice Call Services](/services/voice-call-services) | [Missed Call Service](/services/missed-call-service)\n- [Brand & Graphic Design](/services/graphic-design)\n\nFeel free to ask specific questions about any service or fill out the enquiry form below to get an architect review within **24 to 48 hours**!",
        intent: 'services_overview',
      };
    }

    // 16. Fallback for Unknown Questions -> Informative Assistance
    return {
      reply:
        "I don't have that specific detail in my configured Rahnoxa knowledge base.\n\nI can help you with our custom software services (ERP, Web Apps, Mobile, SaaS, API Integrations), transparent pricing packages, technology stacks, internships, or project specifications. What would you like to explore?",
      intent: 'general_help',
    };
  }

  async generateArticle({ topic, keyword, category }) {
    const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const title = topic;
    const excerpt = `A deep dive into ${keyword} covering production patterns, performance trade-offs, and enterprise engineering best practices.`;

    const content = `## Architectural Fundamentals of ${topic}\n\nIn modern enterprise software engineering, selecting the right architectural boundaries for ${keyword} determines system maintainability and scalability under high concurrency.\n\n### Key Architectural Pillars\n\n1. **Modular Domain Boundaries**: Decouple high-frequency state transitions using clean internal API interfaces.\n2. **Defensive Error Handling & Observability**: Incorporate structured logging, distributed tracing, and automated retries.\n3. **Scalable Data Partitioning**: Optimize database indexing and connection pooling for sustained sub-100ms response latencies.\n\n### Practical Implementation Strategy\n\nWhen deploying solutions in this domain, teams should enforce comprehensive automated testing and continuous validation.\n\nAt Rahnoxa, we engineer tailored software systems aligned with authentic operational workflows. Explore our [Full-Stack Web Services](/services/full-stack-web-apps) or [Start a Project](/get-started) to discuss your system architecture.`;

    return {
      title,
      slug,
      excerpt,
      content,
      category: category || 'Software Engineering',
      tags: [category || 'Software Engineering', 'Architecture', 'Cloud', 'Best Practices'],
      reading_time: '6 min read',
      ai_seo_score: 94,
    };
  }
}
