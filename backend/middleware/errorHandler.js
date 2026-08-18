/**
 * Centralized Express Error Handling Middleware
 * Ensures internal errors, stack traces, and database internals are never leaked to clients.
 */

export function errorHandler(err, req, res, next) {
  const isDev = process.env.NODE_ENV !== 'production';
  
  // Log detailed error internally on server
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err);

  const status = err.status || err.statusCode || 500;
  const code = err.code || (status === 404 ? 'NOT_FOUND' : 'INTERNAL_SERVER_ERROR');
  const message = status === 500 && !isDev
    ? 'An unexpected server error occurred. Please try again later.'
    : err.message || 'Internal server error';

  res.status(status).json({
    success: false,
    error: {
      code,
      message,
    },
  });
}
