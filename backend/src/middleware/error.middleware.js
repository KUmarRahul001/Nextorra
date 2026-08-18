import { errorResponse } from '../utils/response.js';
import { AppError } from '../utils/errors.js';

export default function errorHandler(err, req, res, next) {
  const isDev = process.env.NODE_ENV !== 'production';

  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err);

  if (err instanceof AppError) {
    return errorResponse(res, err.message, err.statusCode, err.details, err.code);
  }

  // Handle Syntax / JSON Parsing Errors
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return errorResponse(res, 'Invalid JSON payload format', 400, null, 'INVALID_JSON_ERROR');
  }

  // Generic 500
  const message = isDev ? err.message : 'An internal server error occurred. Please try again later.';
  return errorResponse(res, message, 500, null, 'INTERNAL_SERVER_ERROR');
}
