import { db } from '../../database/supabase.js';
import { aiGateway } from '../../ai/core/gateway.js';
import { BadRequestError } from '../utils/errors.js';

export class ChatService {
  static async handleMessage({ message, conversation_id, session_id, category }) {
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      throw new BadRequestError('Message cannot be empty');
    }
    if (message.length > 1500) {
      throw new BadRequestError('Message exceeds maximum length (1500 chars)');
    }

    let convId = conversation_id || `conv-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

    // Try logging conversation to remote Supabase if available
    try {
      if (!conversation_id) {
        const conv = await db.createConversation(session_id || `sess-${Date.now()}`);
        if (conv?.id) convId = conv.id;
      }
      await db.addMessage(convId, 'user', message.trim());
    } catch (err) {
      // Remote DB is optional for local development or during transient offline states
      console.warn('[ChatService] Database logging bypassed:', err.message);
    }

    // Process via Rahnoxa AI Gateway
    const aiResult = await aiGateway.processChat({
      message,
      conversationId: convId,
      category,
    });

    let assistantMsg = {
      id: `msg-${Date.now()}`,
      conversation_id: convId,
      role: 'assistant',
      content: aiResult.reply,
      created_at: new Date().toISOString(),
    };

    // Try persisting assistant message
    try {
      const saved = await db.addMessage(convId, 'assistant', aiResult.reply, {
        intent: aiResult.intent,
        provider: aiResult.provider,
        safety_status: aiResult.safety_status,
      });
      if (saved) assistantMsg = saved;
    } catch {
      // Ignore DB error and proceed with generated AI reply
    }

    return {
      conversation_id: convId,
      message: assistantMsg,
      intent: aiResult.intent,
    };
  }
}
