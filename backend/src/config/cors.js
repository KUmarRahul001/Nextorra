import { config } from '../../config/env.js';

export const allowedOrigins = config.corsOrigins;

export const isOriginAllowed = (origin) => {
  if (!origin) return true; // allow non-browser requests
  if (allowedOrigins.includes(origin)) return true;
  if (origin.endsWith('.pages.dev') || origin.endsWith('rahnoxa.com')) return true;
  return false;
};
