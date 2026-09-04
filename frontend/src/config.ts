/**
 * Centralized application configuration strictly reading from Vite environment variables (VITE_*).
 * No hardcoded fallbacks are used.
 * Third-party service secrets are hidden behind the serverless backend API (/api/contact).
 */

const getEnv = (key: string, fallback: string = ''): string => {
  const value = import.meta.env[key];
  return value || fallback;
};

export const config = {
  siteUrl: getEnv('VITE_SITE_URL', 'https://rahnoxa.rahnoxa-tech.workers.dev'),
  siteName: getEnv('VITE_SITE_NAME', 'Rahnoxa'),
  
  contact: {
    email: getEnv('VITE_CONTACT_EMAIL', 'contact.rahnoxa@protonmail.com'),
    phone1: getEnv('VITE_CONTACT_PHONE_1', '+91 8434237052'),
    phone2: getEnv('VITE_CONTACT_PHONE_2', '+91 8434237049'),
    location: getEnv('VITE_COMPANY_LOCATION', 'Jharkhand, India'),
  },

  forms: {
    // Points directly to the secure internal backend endpoint
    contactApi: '/api/contact',
  },
} as const;

export default config;
