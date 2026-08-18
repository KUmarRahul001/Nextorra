import { verifyAccessToken } from '../config/jwt.js';
import { UnauthorizedError, ForbiddenError } from '../utils/errors.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Access token is required');
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedError('Access token expired', { expired: true });
      }
      throw new UnauthorizedError('Invalid access token');
    }

    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new UnauthorizedError('Authentication required'));
    }

    const roles = allowedRoles.length > 0 ? allowedRoles : ['superadmin', 'admin'];
    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError('You do not have permission to perform this action'));
    }

    next();
  };
};
