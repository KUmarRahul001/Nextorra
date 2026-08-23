import { Router } from 'express';
import { AutomationController } from '../../controllers/automation.controller.js';
import { authenticate, authorize } from '../../middleware/auth.middleware.js';

const router = Router();

const cronAuth = (req, res, next) => {
  const cronSecret = process.env.CRON_SECRET || 'rahnoxa_secure_cron_2026_key';
  const incoming = req.headers['x-cron-secret'] || req.query.secret;
  if (incoming && incoming === cronSecret) {
    return next();
  }
  return authenticate(req, res, () => authorize('superadmin', 'admin')(req, res, next));
};

router.get('/', authenticate, authorize('superadmin', 'admin'), AutomationController.getStatus);
router.put('/', authenticate, authorize('superadmin', 'admin'), AutomationController.updateJob);
router.all('/run', cronAuth, AutomationController.triggerRun);

export default router;
