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

  // Support HTTP Basic Authentication (Username & Password from cron-job.org)
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Basic ')) {
    const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('ascii');
    const [user, pass] = credentials.split(':');
    const expectedUser = process.env.INITIAL_ADMIN_EMAIL || 'contact.rahnoxa@protonmail.com';
    const expectedPass = process.env.INITIAL_ADMIN_PASSWORD || 'admin123';
    
    if ((user === expectedUser || user === 'admin') && pass === expectedPass) {
      return next();
    }
  }

  return authenticate(req, res, () => authorize('superadmin', 'admin')(req, res, next));
};

router.get('/', authenticate, authorize('superadmin', 'admin'), AutomationController.getStatus);
router.put('/', authenticate, authorize('superadmin', 'admin'), AutomationController.updateJob);
router.all('/run', cronAuth, AutomationController.triggerRun);

export default router;
