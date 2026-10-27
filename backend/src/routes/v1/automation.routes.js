import { Router } from 'express';
import crypto from 'crypto';
import { AutomationController } from '../../controllers/automation.controller.js';
import { authenticate, authorize } from '../../middleware/auth.middleware.js';

const router = Router();

const cronAuth = (req, res, next) => {
  const cronSecret = process.env.CRON_SECRET;
  const incoming = req.headers['x-cron-secret'] || req.query.secret;

  // If CRON_SECRET is configured, compare in constant time
  if (cronSecret && incoming && typeof incoming === 'string') {
    if (incoming.length === cronSecret.length && crypto.timingSafeEqual(Buffer.from(incoming), Buffer.from(cronSecret))) {
      return next();
    }
  }

  // Support HTTP Basic Authentication strictly if explicitly set in environment
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Basic ')) {
    const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('ascii');
    const [user, pass] = credentials.split(':');
    const expectedUser = process.env.INITIAL_ADMIN_EMAIL;
    const expectedPass = process.env.INITIAL_ADMIN_PASSWORD;

    if (expectedUser && expectedPass && user && pass) {
      const userMatch = user === expectedUser;
      const passMatch = pass.length === expectedPass.length && crypto.timingSafeEqual(Buffer.from(pass), Buffer.from(expectedPass));
      if (userMatch && passMatch) {
        return next();
      }
    }
  }

  // Fallback to standard Bearer JWT admin authorization
  return authenticate(req, res, () => authorize('superadmin', 'admin')(req, res, next));
};

router.get('/', authenticate, authorize('superadmin', 'admin'), AutomationController.getStatus);
router.put('/', authenticate, authorize('superadmin', 'admin'), AutomationController.updateJob);
router.all('/run', cronAuth, AutomationController.triggerRun);

export default router;
