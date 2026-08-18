/**
 * RahBot Conversation State Manager
 * Tracks short-term conversational context, active service focus, and recent topics.
 */

import { BotIntent, ConversationContext } from './types';

export function createInitialContext(conversationId?: string): ConversationContext {
  return {
    currentServiceId: undefined,
    currentServiceName: undefined,
    currentIntent: undefined,
    previousIntent: undefined,
    lastUserMessage: undefined,
    recentTopics: [],
    conversationId,
  };
}

export function updateConversationContext(
  prevContext: ConversationContext,
  userMessage: string,
  detectedIntent: BotIntent,
  resolvedServiceId?: string,
  resolvedServiceName?: string
): ConversationContext {
  const updatedTopics = [...prevContext.recentTopics];

  if (resolvedServiceName && !updatedTopics.includes(resolvedServiceName)) {
    updatedTopics.push(resolvedServiceName);
    if (updatedTopics.length > 5) {
      updatedTopics.shift();
    }
  }

  return {
    ...prevContext,
    currentServiceId: resolvedServiceId || prevContext.currentServiceId,
    currentServiceName: resolvedServiceName || prevContext.currentServiceName,
    previousIntent: prevContext.currentIntent,
    currentIntent: detectedIntent,
    lastUserMessage: userMessage,
    recentTopics: updatedTopics,
  };
}
