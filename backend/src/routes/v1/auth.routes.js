import { Router } from 'express';
import { AuthController } from '../../controllers/auth.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { authLimiter } from '../../middleware/rateLimit.middleware.js';

const router = Router();

router.post('/login', authLimiter, AuthController.login);
router.get('/verify', authenticate, AuthController.verify);
router.get('/me', authenticate, AuthController.me);
router.post('/logout', AuthController.logout);

export default router;
