/**
 * RahBot Chatbot Engine — TypeScript Type Definitions
 */

export type BotIntent =
  | 'greeting'
  | 'general_conversation'
  | 'service_discovery'
  | 'service_information'
  | 'service_features'
  | 'technology_stack'
  | 'pricing'
  | 'package_information'
  | 'comparison'
  | 'project_requirement'
  | 'consultation'
  | 'submit_enquiry'
  | 'internship'
  | 'navigation'
  | 'thanks'
  | 'goodbye'
  | 'help'
  | 'ambiguous'
  | 'unknown';

export type CTAType =
  | 'none'
  | 'view_service'
  | 'view_pricing'
  | 'submit_enquiry'
  | 'consultation'
  | 'navigation'
  | 'view_internships';

export interface ServiceKnowledgeItem {
  id: string;
  slug: string;
  name: string;
  tier: 'primary' | 'secondary';
  category: string;
  route: string;
  summary: string;
  technologies: string[];
  benefits: string[];
  features: string[];
  pricing: string;
  sla: string;
  aliases?: string[];
}

export interface ResolvedService {
  service: ServiceKnowledgeItem | null;
  confidence: number;
  source: 'direct_mention' | 'alias' | 'context' | 'none';
}

export interface ConversationContext {
  currentServiceId?: string;
  currentServiceName?: string;
  currentIntent?: BotIntent;
  previousIntent?: BotIntent;
  lastUserMessage?: string;
  recentTopics: string[];
  conversationId?: string;
}

export interface BotDecision {
  intent: BotIntent;
  resolvedService: ResolvedService;
  reply: string;
  ctaType: CTAType;
  ctaLabel?: string;
  ctaAction?: 'open_form' | 'navigate' | 'none';
  targetRoute?: string;
  shouldOpenForm: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  ctaType?: CTAType;
  ctaLabel?: string;
  targetRoute?: string;
}

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  description: string;
  budget: string;
}
