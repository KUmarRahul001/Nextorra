import { Router } from 'express';
import { DashboardController } from '../../controllers/dashboard.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/stats', authenticate, DashboardController.getStats);

export default router;
