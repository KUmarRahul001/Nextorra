/**
 * RahBot Intent Detector
 * Multi-factor contextual intent classifier enforcing: SERVICE MENTION != ENQUIRY INTENT
 */

import { BotIntent, ConversationContext, ResolvedService } from './types';

export interface IntentDetectionResult {
  intent: BotIntent;
  confidence: number;
  reason: string;
}

export function detectIntent(
  message: string,
  resolvedService: ResolvedService,
  context: ConversationContext
): IntentDetectionResult {
  const lower = message.toLowerCase().trim();
  const clean = lower.replace(/[^\w\s/–-]/g, ' ');

  // 1. Explicit Lead Submission / Hiring
  if (
    lower.includes('submit enquiry') ||
    lower.includes('submit an enquiry') ||
    lower.includes('submit project enquiry') ||
    lower.includes('submit my project') ||
    lower.includes('i want to submit') ||
    lower.includes('fill the form') ||
    lower.includes('fill enquiry form') ||
    lower.includes('open enquiry form') ||
    lower.includes('i want to hire') ||
    lower.includes("let's start my project") ||
    lower.includes('start a project enquiry')
  ) {
    return {
      intent: 'submit_enquiry',
      confidence: 0.98,
      reason: 'Explicit submission or hiring keyword trigger',
    };
  }

  // 2. Consultation / Human Handoff / Discovery Call
  if (
    lower.includes('book a consultation') ||
    lower.includes('schedule a call') ||
    lower.includes('talk to human') ||
    lower.includes('speak to sales') ||
    lower.includes('contact your team') ||
    lower.includes('speak with an engineer') ||
    lower.includes('call me') ||
    lower.includes('discovery call')
  ) {
    return {
      intent: 'consultation',
      confidence: 0.95,
      reason: 'Direct human consultation request',
    };
  }

  // 3. Greeting
  if (
    /^(hi|hello|hey|greetings|good\s+(morning|afternoon|evening)|howdy)\b/i.test(lower) &&
    lower.split(/\s+/).length <= 4
  ) {
    return {
      intent: 'greeting',
      confidence: 0.95,
      reason: 'Standard greeting phrase',
    };
  }

  // 4. Thanks / Appreciation
  if (
    /^(thanks|thank\s+you|appreciate\s+it|thx|awesome\s+thanks)\b/i.test(lower) &&
    lower.split(/\s+/).length <= 5
  ) {
    return {
      intent: 'thanks',
      confidence: 0.95,
      reason: 'User gratitude expression',
    };
  }

  // 5. Goodbye
  if (
    /^(bye|goodbye|see\s+you|that'?s\s+all|have\s+a\s+good\s+day)\b/i.test(lower) &&
    lower.split(/\s+/).length <= 5
  ) {
    return {
      intent: 'goodbye',
      confidence: 0.95,
      reason: 'Conversation closing phrase',
    };
  }

  // 6. Navigation / Page Open Commands
  if (
    /^(open|take me to|navigate to|go to|show page)\b/i.test(lower) ||
    lower.startsWith('/services/') ||
    lower === 'open erp' ||
    lower === 'open internships'
  ) {
    return {
      intent: 'navigation',
      confidence: 0.9,
      reason: 'Explicit navigation command',
    };
  }

  // 7. Comparison Questions (e.g. "ERP vs SaaS", "React vs Flutter")
  if (
    clean.includes(' vs ') ||
    clean.includes(' versus ') ||
    lower.includes('difference between') ||
    lower.includes('compare ')
  ) {
    return {
      intent: 'comparison',
      confidence: 0.9,
      reason: 'Comparative technical inquiry',
    };
  }

  // 8. Internship Questions
  if (
    lower.includes('internship') ||
    lower.includes('intern') ||
    lower.includes('training program') ||
    lower.includes('student')
  ) {
    return {
      intent: 'internship',
      confidence: 0.92,
      reason: 'Talent/internship program inquiry',
    };
  }

  // 9. Pricing, Packages & Cost Questions
  if (
    lower.includes('cost') ||
    lower.includes('price') ||
    lower.includes('pricing') ||
    lower.includes('rate') ||
    lower.includes('rates') ||
    lower.includes('package') ||
    lower.includes('packages') ||
    lower.includes('budget') ||
    lower.includes('how much')
  ) {
    return {
      intent: 'pricing',
      confidence: 0.9,
      reason: 'Service cost or package inquiry',
    };
  }

  // 10. Technology Stack Questions
  if (
    lower.includes('tech stack') ||
    lower.includes('technologies') ||
    lower.includes('technology') ||
    lower.includes('database') ||
    lower.includes('framework') ||
    lower.includes('languages') ||
    lower.includes('what stack')
  ) {
    return {
      intent: 'technology_stack',
      confidence: 0.9,
      reason: 'Technical stack inquiry',
    };
  }

  // 11. Project Requirements with Scoping details (e.g. "I need an ERP for 5 branches with inventory")
  if (
    (lower.startsWith('i need') ||
      lower.startsWith('we need') ||
      lower.startsWith('we are looking to build') ||
      lower.startsWith('i want to build') ||
      lower.startsWith('looking for')) &&
    clean.split(/\s+/).length >= 5
  ) {
    return {
      intent: 'project_requirement',
      confidence: 0.88,
      reason: 'Customer project requirement specification',
    };
  }

  // 12. Service Discovery (Asking what Rahnoxa does broadly)
  if (
    lower.includes('what services') ||
    lower.includes('list of services') ||
    lower.includes('all services') ||
    lower.includes('what do you do') ||
    lower.includes('what can you do') ||
    lower.includes('what can you build') ||
    lower === 'services'
  ) {
    return {
      intent: 'service_discovery',
      confidence: 0.95,
      reason: 'General service catalog discovery',
    };
  }

  // 13. Service Features / Specific Capabilities
  if (
    lower.includes('features') ||
    lower.includes('capabilities') ||
    lower.includes('can your') ||
    lower.includes('can it support') ||
    lower.includes('modules')
  ) {
    return {
      intent: 'service_features',
      confidence: 0.85,
      reason: 'Feature inquiry for specific service',
    };
  }

  // 14. Service Information (e.g. "Can you build a custom ERP system?", "Tell me about Full-Stack Web Apps")
  if (resolvedService.service !== null) {
    return {
      intent: 'service_information',
      confidence: 0.85,
      reason: 'Targeted service inquiry with identified service',
    };
  }

  // 15. Ambiguity Check (e.g. "How much?", "What stack?" when NO service is known)
  if (
    (lower.includes('how much') || lower.includes('cost') || lower.includes('stack')) &&
    resolvedService.service === null &&
    !context.currentServiceId
  ) {
    return {
      intent: 'ambiguous',
      confidence: 0.75,
      reason: 'Follow-up query lacking service context',
    };
  }

  // 16. Help / Instructions
  if (lower === 'help' || lower.includes('how to use') || lower.includes('options')) {
    return {
      intent: 'help',
      confidence: 0.9,
      reason: 'General help query',
    };
  }

  return {
    intent: 'unknown',
    confidence: 0.4,
    reason: 'Unclassified user input',
  };
}
