import { config } from '../../config/env.js';

export const allowedOrigins = config.corsOrigins;

export const isOriginAllowed = (origin) => {
  if (!origin) return true; // allow non-browser / server-to-server requests
  if (allowedOrigins.includes(origin)) return true;
  // Strictly allow local development origins if not in production
  if (config.nodeEnv !== 'production') {
    if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) return true;
  }
  return false;
};
