import { Router } from 'express';
import { ChatController } from '../../controllers/chat.controller.js';
import { chatLimiter } from '../../middleware/rateLimit.middleware.js';

const router = Router();

router.post('/', chatLimiter, ChatController.sendMessage);

export default router;
