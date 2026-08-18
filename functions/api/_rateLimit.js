/**
 * In-memory / Edge Rate Limiter Middleware
 * Tracks client IP requests in a sliding window to mitigate brute force & DDoS attempts.
 */

const ipRequests = new Map();

/**
 * Clean expired entries periodically
 */
function cleanupExpired() {
  const now = Date.now();
  for (const [key, record] of ipRequests.entries()) {
    if (now > record.resetAt) {
      ipRequests.delete(key);
    }
  }
}

/**
 * Check rate limit for a given key / IP address
 * @param {string} identifier - Client IP or key
 * @param {number} maxRequests - Max permitted requests in window
 * @param {number} windowSeconds - Duration in seconds
 */
export function checkRateLimit(identifier, maxRequests = 20, windowSeconds = 60) {
  cleanupExpired();

  const now = Date.now();
  const key = `${identifier}`;
  const record = ipRequests.get(key);

  if (!record || now > record.resetAt) {
    ipRequests.set(key, {
      count: 1,
      resetAt: now + windowSeconds * 1000,
    });
    return { limited: false, remaining: maxRequests - 1 };
  }

  if (record.count >= maxRequests) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    return { limited: true, remaining: 0, retryAfter };
  }

  record.count += 1;
  return { limited: false, remaining: maxRequests - record.count };
}

/**
 * Extract client IP from Cloudflare / HTTP Request headers
 */
export function getClientIP(request) {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'
  );
}
