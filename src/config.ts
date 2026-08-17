/**
 * Centralized application configuration strictly reading from Vite environment variables (VITE_*).
 * No hardcoded fallbacks are used.
 * Third-party service secrets are hidden behind the serverless backend API (/api/contact).
 */

const getEnv = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const config = {
  siteUrl: getEnv('VITE_SITE_URL'),
  siteName: getEnv('VITE_SITE_NAME'),
  
  contact: {
    email: getEnv('VITE_CONTACT_EMAIL'),
    phone1: getEnv('VITE_CONTACT_PHONE_1'),
    phone2: getEnv('VITE_CONTACT_PHONE_2'),
    location: getEnv('VITE_COMPANY_LOCATION'),
  },

  forms: {
    // Points directly to the secure internal backend endpoint
    contactApi: '/api/contact',
  },
} as const;

export default config;
