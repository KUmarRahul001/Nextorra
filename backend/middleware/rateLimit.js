const ipMap = new Map();

/**
 * Clean up expired rate limiting buckets
 */
function cleanupExpired() {
  const now = Date.now();
  for (const [key, item] of ipMap.entries()) {
    if (now > item.resetAt) {
      ipMap.delete(key);
    }
  }
}

/**
 * Express Rate Limiting Middleware Factory
 */
export function rateLimiter({ maxRequests = 20, windowSeconds = 60, message = 'Too many requests. Please try again later.' }) {
  return (req, res, next) => {
    cleanupExpired();

    const clientIP = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || req.socket.remoteAddress || '127.0.0.1';
    const key = `${req.baseUrl || req.path}:${clientIP}`;
    const now = Date.now();

    const record = ipMap.get(key);

    if (!record || now > record.resetAt) {
      ipMap.set(key, {
        count: 1,
        resetAt: now + windowSeconds * 1000,
      });
      return next();
    }

    if (record.count >= maxRequests) {
      const retryAfter = Math.ceil((record.resetAt - now) / 1000);
      res.setHeader('Retry-After', String(retryAfter));
      return res.status(429).json({
        success: false,
        error: {
          code: 'TOO_MANY_REQUESTS',
          message,
          retryAfter,
        },
      });
    }

    record.count += 1;
    next();
  };
}
