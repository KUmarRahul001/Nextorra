import { Router } from 'express';
import { AutomationController } from '../../controllers/automation.controller.js';
import { authenticate, authorize } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/', authenticate, authorize('superadmin', 'admin'), AutomationController.getStatus);
router.put('/', authenticate, authorize('superadmin', 'admin'), AutomationController.updateJob);
router.post('/run', authenticate, authorize('superadmin', 'admin'), AutomationController.triggerRun);

export default router;
