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
        'I can help you explore our software development services (Custom ERP, Full-Stack Web, Mobile Apps, SaaS, API Integrations), estimate project scopes, or prepare an engineering review.\n\n' +
        'How can I help you today?';
      break;

    // ── 2. Thanks ───────────────────────────────────────────────────────────────
    case 'thanks':
      reply =
        "You're very welcome! If you have any further questions about our tech stack, service packages, or need a technical review for your project, feel free to ask anytime.";
      break;

    // ── 3. Goodbye ──────────────────────────────────────────────────────────────
    case 'goodbye':
      reply =
        'Thank you for reaching out to Rahnoxa. Have a great day ahead! If you ever need engineering support or want to start a project, we are right here.';
      break;

    // ── 4. Service Discovery (Broad Catalog) ────────────────────────────────────
    case 'service_discovery':
      reply =
        'Rahnoxa is a specialized technology engineering company. Here is our complete service spectrum:\n\n' +
        '### **Core Software Engineering (Tier 1)**\n' +
        '- [Custom ERP & Enterprise Applications](/services/erp-enterprise-applications)\n' +
        '- [Full-Stack Web Applications](/services/full-stack-web-apps)\n' +
        '- [Multi-Tenant SaaS Products](/services/saas-products)\n' +
        '- [Mobile App Development](/services/app-development)\n' +
        '- [Custom Software & API Integration](/services/custom-software-api-integration)\n' +
        '- [Desktop Applications](/services/desktop-applications)\n' +
        '- [Modern Website Design](/services/web-development)\n\n' +
        '### **Business Growth & Marketing (Tier 2)**\n' +
        '- [B2B Lead Generation](/services/lead-generation) | [Social Media Marketing](/services/social-media-marketing)\n' +
        '- [Email Marketing](/services/email-marketing) | [SMS Marketing & SMPP](/services/sms-marketing)\n' +
        '- [Voice Call Services](/services/voice-call-services) | [Missed Call Service](/services/missed-call-service)\n' +
        '- [Brand & Graphic Design](/services/graphic-design)\n\n' +
        'Feel free to ask for specific details about any service or its technology stack!';
      break;

    // ── 5. Service Information ──────────────────────────────────────────────────
    case 'service_information':
      if (service) {
        reply =
          `Yes! **${service.name}** is one of Rahnoxa's core engineering capabilities.\n\n` +
          `### Overview:\n${service.summary}\n\n` +
          `### Core Capabilities:\n` +
          service.features.map((f) => `- **${f.split(':')[0]}**: ${f.split(':')[1] || ''}`).join('\n') +
          `\n\n### Tech Stack:\n- ${service.technologies.join(', ')}\n\n` +
          `### Key Benefits:\n` +
          service.benefits.slice(0, 3).map((b) => `- ${b}`).join('\n') +
          `\n\nExplore our [${service.name} Services](${service.route}) for in-depth architecture details.`;
      } else {
        reply =
          'We engineer custom software systems across ERP, Web, Mobile, and Cloud platforms. Which specific domain would you like to explore?';
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
          `### Pricing & Engagement for ${service.name}:\n` +
          `- **Model**: ${service.pricing}\n` +
          `- **Review SLA**: ${service.sla}\n\n` +
          `You can review complete tier specifications at [${service.name}](${service.route}).`;
      } else {
        reply =
          'We offer structured engagement models tailored to your project scope:\n\n' +
          '1. **Milestone-Based Fixed Scope**: Defined deliverables with staged sign-offs.\n' +
          '2. **Dedicated Sprint Capacity**: Agile full-stack engineering squads.\n' +
          '3. **Support & SLA Maintenance**: Ongoing security patching and 24/7 monitoring.\n\n' +
          '### Sample Starting Rates:\n' +
          '- **Modern Websites**: ₹15,000 to ₹125,000\n' +
          '- **Full-Stack Web Apps**: ₹50,000 to ₹500,000+\n' +
          '- **Mobile Apps (iOS/Android)**: ₹75,000 to ₹500,000+\n' +
          '- **Custom ERP & SaaS**: Milestone-based custom quote\n\n' +
          'Which service would you like a detailed price estimate for?';
      }
      break;

    // ── 9. Comparisons (e.g. ERP vs SaaS, React vs Flutter) ─────────────────────
    case 'comparison':
      const lower = message.toLowerCase();
      if (lower.includes('erp') && lower.includes('saas')) {
        reply =
          '### Custom ERP vs. SaaS Product:\n\n' +
          '- **Custom ERP**: Built exclusively for your internal business operations (Inventory, HRMS, multi-branch operations, custom workflows). You own 100% of the IP, schema, and internal rules.\n' +
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
          '- **Modern Website**: Fast, editorial marketing pages optimized for SEO, brand authority, and lead capture.\n' +
          '- **Web Application**: Interactive software containing user authentication, complex databases, real-time dashboards, and business logic.\n\n' +
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
      const intern = SERVICES_KNOWLEDGE_BASE.find((s) => s.id === 'program-internship');
      reply =
        `Rahnoxa offers hands-on **${intern?.name || 'Engineering Internships'}** for aspiring developers.\n\n` +
        `### Tracks Available:\n` +
        `- **Web Development**: React, TypeScript, Next.js, Node.js, Express, PostgreSQL\n` +
        `- **Mobile Development**: React Native & Flutter for iOS/Android\n` +
        `- **AI & Machine Learning**: Python, LLM prompts, LangChain, Data Science\n\n` +
        `### Key Benefits:\n` +
        (intern?.benefits || []).map((b) => `- ${b}`).join('\n') +
        `\n\nReview curriculum and submit your application at our [Internships Page](/internship).`;
      break;

    // ── 14. Navigation ──────────────────────────────────────────────────────────
    case 'navigation':
      if (service) {
        reply = `You can explore [${service.name}](${service.route}) for comprehensive specifications, live features, and package tiers.`;
      } else {
        reply = 'You can browse our full catalog at [All Services](/services) or learn more [About Rahnoxa](/about).';
      }
      break;

    // ── 15. Ambiguous Follow-ups ────────────────────────────────────────────────
    case 'ambiguous':
      reply =
        'Which service are you asking about — ERP, Web Applications, Mobile Apps, SaaS, or another service?';
      break;

    // ── 16. Help ────────────────────────────────────────────────────────────────
    case 'help':
      reply =
        'I am **RahBot**, ready to assist you with:\n\n' +
        '1. **Service Specifications**: Ask about ERPs, Web Apps, Mobile Apps, SaaS, APIs, etc.\n' +
        '2. **Tech Stacks**: Inquire about React, Node.js, Flutter, Go, PostgreSQL, etc.\n' +
        '3. **Pricing & Scopes**: Get ballpark tier pricing and delivery SLAs.\n' +
        '4. **Project Enquiries**: Prepare a project specification for our engineering squad.\n' +
        '5. **Engineering Internships**: Learn about student tracks and merit applications.\n\n' +
        'What would you like to explore?';
      break;

    // ── 17. Unknown / Fallback ──────────────────────────────────────────────────
    default:
      reply =
        "I don't have that specific detail in my configured service information.\n\n" +
        "I can help you with our available software services, technology stacks, pricing, or project scoping. Feel free to ask or [Contact our Engineering Team](/contact).";
      break;
  }

  return {
    intent,
    resolvedService,
    reply,
    ctaType: cta.type,
    ctaLabel: cta.label,
    ctaAction: cta.action,
    targetRoute: cta.targetRoute,
    shouldOpenForm,
  };
}
