/**
 * Standardized API Response Helpers (Modeled after enterprise response patterns)
 */

export const successResponse = (res, data, status = 200, meta = undefined) => {
  return res.status(status).json({
    success: true,
    data,
    ...(meta ? { meta } : {}),
  });
};

export const errorResponse = (res, message, status = 500, details = null, code = 'INTERNAL_ERROR') => {
  return res.status(status).json({
    success: false,
    error: {
      code,
      message,
      ...(details ? { details } : {}),
    },
  });
};
