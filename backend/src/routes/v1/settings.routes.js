import { Router } from 'express';
import { SettingsController } from '../../controllers/settings.controller.js';
import { authenticate, authorize } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/', authenticate, authorize('superadmin', 'admin'), SettingsController.get);
router.put('/', authenticate, authorize('superadmin', 'admin'), SettingsController.update);

export default router;
