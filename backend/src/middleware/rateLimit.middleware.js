const ipStore = new Map();
const MAX_TRACKED_ENTRIES = 5000;
let lastCleanTime = 0;

function cleanStore() {
  const now = Date.now();
  if (now - lastCleanTime < 10000 && ipStore.size < MAX_TRACKED_ENTRIES) return; // Run at most every 10 seconds
  lastCleanTime = now;

  for (const [key, val] of ipStore.entries()) {
    if (now > val.resetAt) ipStore.delete(key);
  }

  // Cap size to prevent memory exhaustion DoS
  if (ipStore.size > MAX_TRACKED_ENTRIES) {
    const overflowKeys = Array.from(ipStore.keys()).slice(0, ipStore.size - MAX_TRACKED_ENTRIES);
    overflowKeys.forEach((k) => ipStore.delete(k));
  }
}

export const rateLimit = ({ maxRequests = 30, windowSeconds = 60, message = 'Rate limit exceeded' }) => {
  return (req, res, next) => {
    cleanStore();
    // Use Express req.ip (which respects app.set('trust proxy', 1)) rather than raw spoofable header
    const clientIP = req.ip || req.socket?.remoteAddress || '127.0.0.1';
    const key = `${req.baseUrl || req.path}:${clientIP}`;
    const now = Date.now();

    const record = ipStore.get(key);
    if (!record || now > record.resetAt) {
      ipStore.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
      return next();
    }

    if (record.count >= maxRequests) {
      const retryAfter = Math.ceil((record.resetAt - now) / 1000);
      res.setHeader('Retry-After', String(retryAfter));
      return res.status(429).json({
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message,
          retryAfter,
        },
      });
    }

    record.count += 1;
    next();
  };
};

export const apiLimiter = rateLimit({ maxRequests: 100, windowSeconds: 60 });
export const authLimiter = rateLimit({ maxRequests: 5, windowSeconds: 300, message: 'Too many login attempts. Please wait 5 minutes.' });
export const chatLimiter = rateLimit({ maxRequests: 30, windowSeconds: 60, message: 'Chat rate limit exceeded. Please wait a moment.' });
export const leadLimiter = rateLimit({ maxRequests: 10, windowSeconds: 600, message: 'Too many submissions. Please wait 10 minutes.' });
