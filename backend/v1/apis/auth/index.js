import { Router } from 'express';
import { db, verifyPassword } from '../../../database/supabase.js';
import { generateToken, requireAuth } from '../../../middleware/auth.js';
import { rateLimiter } from '../../../middleware/rateLimit.js';

const router = Router();

// POST /v1/auth/login
router.post(
  '/login',
  rateLimiter({ maxRequests: 5, windowSeconds: 300, message: 'Too many login attempts. Please wait 5 minutes.' }),
  async (req, res, next) => {
    try {
      const { username, password } = req.body || {};

      if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_REQUEST',
            message: 'Username and password are required.',
          },
        });
      }

      const admin = await db.findAdminByUsername(username.trim());
      if (!admin) {
        return res.status(401).json({
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid username or password.',
          },
        });
      }

      const isValid = verifyPassword(password, admin.password_hash);
      if (!isValid) {
        return res.status(401).json({
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid username or password.',
          },
        });
      }

      await db.updateAdminLogin(admin.id);

      const token = generateToken({
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role || 'admin',
      });

      return res.status(200).json({
        success: true,
        token,
        user: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role || 'admin',
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

// GET /v1/auth/verify (or /v1/auth/me)
router.get('/verify', requireAuth, (req, res) => {
  res.status(200).json({
    valid: true,
    user: req.user,
  });
});

router.get('/me', requireAuth, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

// POST /v1/auth/logout
router.post('/logout', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Session cleared successfully.',
  });
});

export default router;
