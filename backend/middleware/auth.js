import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

const getSecret = (overrideSecret) => {
  const s = overrideSecret || config.jwtSecret;
  if (!s || s.length < 16) {
    if (config.nodeEnv === 'production') {
      throw new Error('JWT_SECRET must be configured with at least 16 characters in production.');
    }
    return 'rahnoxa_test_jwt_secret_key_32bytes';
  }
  return s;
};

/**
 * Generate a signed JWT token
 */
export function generateToken(payload, customSecret) {
  const secret = getSecret(customSecret);
  return jwt.sign(
    {
      id: payload.id,
      username: payload.username,
      email: payload.email,
      role: payload.role || 'admin',
    },
    secret,
    { expiresIn: '7d' }
  );
}

/**
 * Express Middleware: Require valid Authentication
 */
export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Missing or invalid Authorization header.',
      },
    });
  }

  const token = authHeader.substring(7);
  try {
    const secret = getSecret();
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Token is invalid, malformed, or expired.',
      },
    });
  }
}

/**
 * Express Middleware: Require Specific Role(s)
 */
export function requireRole(allowedRoles = ['superadmin', 'admin']) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'You do not have sufficient permissions to perform this operation.',
        },
      });
    }
    next();
  };
}
