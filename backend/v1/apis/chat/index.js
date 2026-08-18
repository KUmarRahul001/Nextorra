import { Router } from 'express';
import { db } from '../../../database/supabase.js';
import { aiGateway } from '../../../ai/core/gateway.js';
import { rateLimiter } from '../../../middleware/rateLimit.js';

const router = Router();

// POST /v1/chat (Public with Rate Limiting)
router.post(
  '/',
  rateLimiter({ maxRequests: 30, windowSeconds: 60, message: 'Chat rate limit exceeded. Please wait a moment.' }),
  async (req, res, next) => {
    try {
      const { message, conversation_id, session_id, category } = req.body || {};

      if (!message || typeof message !== 'string' || message.length > 1500) {
        return res.status(400).json({
          success: false,
          error: { code: 'INVALID_MESSAGE', message: 'Message is required (max 1500 characters).' },
        });
      }

      let convId = conversation_id;
      if (!convId) {
        const conv = await db.createConversation(session_id || `sess-${Date.now()}`);
        convId = conv.id;
      }

      // Record User Message
      await db.addMessage(convId, 'user', message.trim());

      // Process with Rahnoxa AI Gateway (Safety + RAG + Custom Provider)
      const aiResponse = await aiGateway.processChat({
        message,
        conversationId: convId,
        category,
      });

      // Record Assistant Message
      const assistantMsg = await db.addMessage(convId, 'assistant', aiResponse.reply, {
        intent: aiResponse.intent,
        provider: aiResponse.provider,
        safety_status: aiResponse.safety_status,
      });

      res.status(200).json({
        success: true,
        conversation_id: convId,
        message: assistantMsg,
        intent: aiResponse.intent,
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
