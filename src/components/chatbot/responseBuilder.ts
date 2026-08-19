/**
 * RahBot Response Builder
 * Composes precise, professional, and authentic markdown replies strictly derived from the knowledge base.
 */

import { BotDecision, ConversationContext, ResolvedService } from './types';
import { decideCTA } from './ctaEngine';
import { detectIntent } from './intentDetector';
import { SERVICES_KNOWLEDGE_BASE } from './knowledge';

export function buildBotDecision(
  message: string,
  resolvedService: ResolvedService,
  context: ConversationContext
): BotDecision {
  const { intent } = detectIntent(message, resolvedService, context);
  const service = resolvedService.service;
  const cta = decideCTA(intent, resolvedService);

  let reply = '';
  let shouldOpenForm = false;

  switch (intent) {
    // ── 1. Greeting ─────────────────────────────────────────────────────────────
    case 'greeting':
      reply =
        'Hello! I am **RahBot**, the AI Business Assistant for **Rahnoxa**.\n\n' +
        'I can help you explore our software engineering services (Custom ERP, Full-Stack Web, Mobile Apps, SaaS, API Integrations), view transparent Indian pricing starting from ₹1,499–₹4,999, or prepare an emergency rescue request.\n\n' +
        'How can I help you today?';
      break;

    // ── 2. Thanks ───────────────────────────────────────────────────────────────
    case 'thanks':
      reply =
        "You're very welcome! If you have any further questions about our tech stack, pricing tiers, or need an engineering review for your project, feel free to ask anytime.";
      break;

    // ── 3. Goodbye ──────────────────────────────────────────────────────────────
    case 'goodbye':
      reply =
        'Thank you for reaching out to Rahnoxa. Have a great day ahead! If you ever need engineering support or want to start a project, we are right here.';
      break;

    // ── 4. Service Discovery (Broad Catalog) ────────────────────────────────────
    case 'service_discovery':
      reply =
        'Rahnoxa provides transparent, affordable software engineering & digital services across India:\n\n' +
        '### **Core Software Engineering (Tier 1)**\n' +
        '- [Modern Website Design](/services/web-development) — *Starts at ₹4,999*\n' +
        '- [Full-Stack Web Applications](/services/full-stack-web-apps) — *Starts at ₹39,999*\n' +
        '- [Mobile App Development](/services/app-development) — *Starts at ₹44,999*\n' +
        '- [Custom Software & API Integration](/services/custom-software-api-integration) — *Starts at ₹1,999*\n' +
        '- [Custom ERP Systems](/services/erp-enterprise-applications) — *Starts at ₹75,000*\n' +
        '- [Multi-Tenant SaaS Products](/services/saas-products) — *Starts at ₹64,999*\n' +
        '- [Desktop Applications](/services/desktop-applications) — *Starts at ₹34,999*\n\n' +
        '### **Business Growth & Marketing (Tier 2)**\n' +
        '- [B2B Lead Generation & GBP](/services/lead-generation) — *Starts at ₹2,499*\n' +
        '- [Social Media Marketing & Creatives](/services/social-media-marketing) — *Starts at ₹2,499*\n' +
        '- [Brand & Graphic Design](/services/graphic-design) — *Starts at ₹2,499*\n' +
        '- [Email Deliverability & Marketing](/services/email-marketing) — *Starts at ₹1,999*\n' +
        '- [SMS & Transactional OTPs](/services/sms-marketing) — *Starts at ₹1,999*\n\n' +
        '### **Emergency Rescue Tiers 🚨**\n' +
        '- **Website Crash Fix**: *₹2,999 (4–8h SLA)* | **DNS/SSL Fix**: *₹1,499 (2–4h SLA)*\n' +
        '- **Spam Email / SPF Fix**: *₹1,999 (2–4h SLA)* | **24h Express Launch**: *₹7,499*\n\n' +
        'Which service or package would you like to explore?';
      break;

    // ── 5. Service Information ──────────────────────────────────────────────────
    case 'service_information':
      if (service) {
        reply =
          `Yes! **${service.name}** is one of Rahnoxa's core capabilities.\n\n` +
          `### Overview:\n${service.summary}\n\n` +
          `### Pricing & Turnaround:\n` +
          `- **Pricing**: ${service.pricing}\n` +
          `- **Delivery**: Discovery & quote SLA within **24 to 48 hours**.\n\n` +
          `### Core Capabilities:\n` +
          service.features.map((f) => `- **${f.split(':')[0]}**: ${f.split(':')[1] || ''}`).join('\n') +
          `\n\n### Tech Stack:\n- ${service.technologies.join(', ')}\n\n` +
          `Explore our [${service.name} Service Page](${service.route}) for complete package specifications.`;
      } else {
        reply =
          'We engineer custom software systems across ERP, Web, Mobile, and Cloud platforms with transparent pricing starting at ₹4,999. Which specific domain would you like to explore?';
      }
      break;

    // ── 6. Service Features ─────────────────────────────────────────────────────
    case 'service_features':
      if (service) {
        reply =
          `### Features of ${service.name}:\n` +
          service.features.map((f) => `- **${f.split(':')[0]}**: ${f.split(':')[1] || ''}`).join('\n') +
          `\n\n### Architecture Benefits:\n` +
          service.benefits.map((b) => `- ${b}`).join('\n') +
          `\n\nLearn more at [${service.name}](${service.route}).`;
      } else {
        reply =
          'Could you clarify which service you are asking about (e.g. ERP, Web Apps, Mobile, SaaS, or API Integration)?';
      }
      break;

    // ── 7. Technology Stack ─────────────────────────────────────────────────────
    case 'technology_stack':
      if (service) {
        reply =
          `### Technology Stack for ${service.name}:\n` +
          `- **Core Technologies**: ${service.technologies.join(', ')}\n\n` +
          `### Engineering Standards:\n` +
          service.benefits.slice(0, 3).map((b) => `- ${b}`).join('\n') +
          `\n\nCheck out [${service.name}](${service.route}) for comprehensive architecture details.`;
      } else {
        reply =
          'Rahnoxa uses modern production stacks including React, TypeScript, Next.js, Node.js, Go, Python, React Native, Flutter, PostgreSQL, and Redis.\n\nWhich service or platform stack are you interested in?';
      }
      break;

    // ── 8. Pricing & Packages ───────────────────────────────────────────────────
    case 'pricing':
    case 'package_information':
      if (service) {
        reply =
          `### Official Transparent Pricing for ${service.name}:\n` +
          `- **Pricing Structure**: ${service.pricing}\n` +
          `- **Review & Discovery SLA**: ${service.sla}\n` +
          `- **Tax Policy**: Excludes 18% GST where applicable.\n` +
          `- **Asset Ownership**: 100% Client Ownership of domain, code, and tokens.\n\n` +
          `You can view package inclusions and choose a plan at [${service.name}](${service.route}).`;
      } else {
        reply =
          '### Rahnoxa Commercial Pricing Overview (INR):\n\n' +
          '1. **Modern Websites**: ₹4,999 (Starter) · **₹11,999 (Growth - Recommended)** · ₹18,999 (Pro)\n' +
          '2. **Full-Stack Web Apps**: ₹39,999 (MVP) · **₹69,999 (Growth)** · ₹1,19,999 (Pro)\n' +
          '3. **Mobile Apps (iOS + Android)**: ₹44,999 (Android) · **₹79,999 (Cross-Platform)**\n' +
          '4. **Custom API / Automations**: ₹1,999 (Gateway) · **₹5,999 (Bridge)**\n' +
          '5. **Monthly Maintenance Retainers**: ₹1,499/mo (Care) · **₹3,999/mo (Growth)**\n' +
          '6. **Emergency Rescue**: Crash Fix (₹2,999) · DNS/SSL Fix (₹1,499) · 24h Launch (₹7,499)\n\n' +
          'Which service would you like detailed package inclusions for?';
      }
      break;

    // ── 9. Comparisons (e.g. ERP vs SaaS, React vs Flutter) ─────────────────────
    case 'comparison':
      const lower = message.toLowerCase();
      if (lower.includes('erp') && lower.includes('saas')) {
        reply =
          '### Custom ERP vs. SaaS Product:\n\n' +
          '- **Custom ERP**: Built exclusively for your internal business operations (Inventory, HRMS, multi-branch operations, custom workflows). You own 100% of the IP, schema, and internal rules with zero per-user fees.\n' +
          '- **SaaS Product**: Built for multiple external subscribing customers with tenant database isolation, self-serve sign-ups, and recurring billing pipelines.\n\n' +
          'At Rahnoxa, we engineer both [Custom ERPs](/services/erp-enterprise-applications) and [SaaS Products](/services/saas-products).';
      } else if (lower.includes('react') && lower.includes('flutter')) {
        reply =
          '### React Native vs. Flutter for Mobile Apps:\n\n' +
          '- **React Native**: Excellent for teams with web React ecosystems, offering native bridge rendering and wide JavaScript library support.\n' +
          '- **Flutter**: Superb canvas rendering with Dart, delivering pixel-identical UI across older and newer iOS/Android devices.\n\n' +
          'We build in both frameworks based on your product roadmap. Explore our [Mobile App Development Services](/services/app-development).';
      } else if (lower.includes('website') && lower.includes('web app')) {
        reply =
          '### Modern Website vs. Full-Stack Web Application:\n\n' +
          '- **Modern Website (Starts ₹4,999)**: Fast, editorial marketing pages optimized for SEO, brand authority, and lead capture.\n' +
          '- **Web Application (Starts ₹39,999)**: Interactive software containing user authentication, complex databases, real-time dashboards, and business logic.\n\n' +
          'Explore our [Website Design](/services/web-development) or [Full-Stack Web Apps](/services/full-stack-web-apps).';
      } else {
        reply =
          'I can explain the architectural trade-offs between those options. Please specify your system requirements or target platforms so I can give you a tailored breakdown.';
      }
      break;

    // ── 10. Explicit Project Requirements ───────────────────────────────────────
    case 'project_requirement':
      const serviceName = service ? service.name : 'Custom Software';
      reply =
        `That sounds like a **${serviceName}** project!\n\n` +
        `Based on your scope, our engineering team can design modular architecture, setup scalable database schemas, and deliver clean APIs with sub-100ms response times.\n\n` +
        `When you are ready, you can submit your requirements through our Project Enquiry form for an architect review within **24 to 48 hours**.`;
      break;

    // ── 11. Explicit Submit Enquiry ─────────────────────────────────────────────
    case 'submit_enquiry':
      shouldOpenForm = true;
      reply =
        "I have opened our **Project Enquiry Form** below. Please enter your project details and specifications. Our senior engineering leadership team will review your requirements and reach out within **24 to 48 hours**.";
      break;

    // ── 12. Consultation / Human Handoff ────────────────────────────────────────
    case 'consultation':
      reply =
        "You can reach the Rahnoxa engineering leadership team directly via:\n\n" +
        "- **Email**: `contact.rahnoxa@protonmail.com`\n" +
        "- **Phone / WhatsApp**: `+91 8434237052` / `+91 8434237049`\n" +
        "- **Location**: Jharkhand, India (Remote Engineering Worldwide)\n" +
        "- **Response SLA**: We reply to all technical inquiries within **24 to 48 hours**.\n\n" +
        "You can also use the Project Enquiry form below to submit your architecture specifications.";
      break;

    // ── 13. Internship ──────────────────────────────────────────────────────────
    case 'internship':
      const intern = SERVICES_KNOWLEDGE_BASE.find((s) => s.id === 'talent-internships');
      reply =
        `Rahnoxa offers hands-on **${intern?.name || 'Engineering Internships'}** for aspiring developers.\n\n` +
        `### Tracks Available:\n` +
        `- **Web Development**: React, TypeScript, Next.js, Node.js, Express, PostgreSQL\n` +
        `- **Mobile Development**: React Native & Flutter for iOS/Android\n` +
        `- **AI & Machine Learning**: Python, LLM prompts, LangChain, Data Science\n\n` +
        `### Key Benefits:\n` +
        (intern?.benefits || []).map((b) => `- ${b}`).join('\n') +
        `\n\nTo apply, visit our [Engineering Internship Track](/internship).`;
      break;

    // ── 14. Fallback ────────────────────────────────────────────────────────────
    default:
      reply =
        "I'm here to help you explore Rahnoxa's software development services, transparent pricing starting at ₹1,499–₹4,999, or submit a technical project enquiry.\n\n" +
        'Could you tell me a little more about what your company is looking to build?';
      break;
  }

  return {
    reply,
    cta,
    shouldOpenForm,
  };
}
