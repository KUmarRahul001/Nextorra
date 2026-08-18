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

    let convId = conversation_id;
    if (!convId) {
      const conv = await db.createConversation(session_id || `sess-${Date.now()}`);
      convId = conv.id;
    }

    // Save user message to Supabase
    await db.addMessage(convId, 'user', message.trim());

    // Process via Rahnoxa AI Gateway
    const aiResult = await aiGateway.processChat({
      message,
      conversationId: convId,
      category,
    });

    // Save assistant message to Supabase
    const assistantMsg = await db.addMessage(convId, 'assistant', aiResult.reply, {
      intent: aiResult.intent,
      provider: aiResult.provider,
      safety_status: aiResult.safety_status,
    });

    return {
      conversation_id: convId,
      message: assistantMsg,
      intent: aiResult.intent,
    };
  }
}
