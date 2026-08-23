import { config } from '../../config/env.js';

export const allowedOrigins = config.corsOrigins;

export const isOriginAllowed = (origin) => {
  if (!origin) return true; // allow non-browser requests
  if (allowedOrigins.includes(origin)) return true;
  if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) return true;
  if (origin.endsWith('.pages.dev') || origin.endsWith('.workers.dev') || origin.endsWith('rahnoxa.com') || origin.endsWith('vercel.app')) return true;
  return false;
};
