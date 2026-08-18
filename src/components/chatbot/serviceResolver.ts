/**
 * RahBot Service Resolver
 * Disambiguates and resolves services from user messages and conversational context.
 */

import { SERVICES_KNOWLEDGE_BASE } from './knowledge';
import { ConversationContext, ResolvedService, ServiceKnowledgeItem } from './types';

export function resolveService(message: string, context: ConversationContext): ResolvedService {
  const lower = message.toLowerCase().trim();

  // 1. Direct match on Service Name or Slug
  for (const item of SERVICES_KNOWLEDGE_BASE) {
    if (lower.includes(item.name.toLowerCase()) || lower.includes(item.slug.replace(/-/g, ' '))) {
      return {
        service: item,
        confidence: 0.95,
        source: 'direct_mention',
      };
    }
  }

  // 2. Match on configured Aliases (sorted longest alias first)
  const aliasMatches: { service: ServiceKnowledgeItem; alias: string; score: number }[] = [];
  for (const item of SERVICES_KNOWLEDGE_BASE) {
    if (item.aliases) {
      for (const alias of item.aliases) {
        const regex = new RegExp(`\\b${alias}\\b`, 'i');
        if (regex.test(lower)) {
          aliasMatches.push({
            service: item,
            alias,
            score: alias.length,
          });
        }
      }
    }
  }

  if (aliasMatches.length > 0) {
    aliasMatches.sort((a, b) => b.score - a.score);
    return {
      service: aliasMatches[0].service,
      confidence: 0.9,
      source: 'alias',
    };
  }

  // 3. Fallback to Conversation Context if no new service is mentioned and not an explicit topic change
  const isExplicitTopicReset =
    lower.startsWith('forget that') ||
    lower.startsWith('different question') ||
    lower.startsWith('new topic');

  if (!isExplicitTopicReset && context.currentServiceId) {
    const contextualService = SERVICES_KNOWLEDGE_BASE.find((s) => s.id === context.currentServiceId);
    if (contextualService) {
      return {
        service: contextualService,
        confidence: 0.75,
        source: 'context',
      };
    }
  }

  return {
    service: null,
    confidence: 0,
    source: 'none',
  };
}
