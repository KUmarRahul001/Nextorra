import { Router } from 'express';
import { LeadController } from '../../controllers/lead.controller.js';
import { authenticate, authorize } from '../../middleware/auth.middleware.js';
import { leadLimiter } from '../../middleware/rateLimit.middleware.js';

const router = Router();

router.get('/', authenticate, authorize('superadmin', 'admin', 'support'), LeadController.list);
router.post('/', leadLimiter, LeadController.submit);
router.put('/:id', authenticate, authorize('superadmin', 'admin', 'support'), LeadController.updateStatus);

export default router;
