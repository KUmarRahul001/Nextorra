import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

// Fail-fast environment validation for production
export function validateProductionConfig() {
  const errors = [];

  if (!process.env.SUPABASE_URL) {
    errors.push('SUPABASE_URL is required. Remote Supabase PostgreSQL instance must be configured.');
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    errors.push('SUPABASE_SERVICE_ROLE_KEY is required for privileged server-side database operations.');
  }

  if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'default-secret' || process.env.JWT_SECRET.length < 16) {
    errors.push('JWT_SECRET must be a cryptographically secure string (minimum 16 characters).');
  }

  if (isProd && errors.length > 0) {
    console.error('❌ [FATAL CONFIGURATION ERROR] Rahnoxa Backend Startup Aborted:');
    errors.forEach((err) => console.error(`  - ${err}`));
    process.exit(1);
  } else if (errors.length > 0) {
    console.warn('⚠️ [CONFIG WARNING] Running with incomplete database/auth secrets:');
    errors.forEach((err) => console.warn(`  - ${err}`));
  }
}

export const config = {
  port: parseInt(process.env.PORT || '10000', 10),
  nodeEnv,
  siteUrl: process.env.SITE_URL || 'https://rahnoxa.com',
  jwtSecret: process.env.JWT_SECRET || '',
  corsOrigins: (process.env.CORS_ORIGINS || 'https://rahnoxa.com,https://www.rahnoxa.com,https://rahnoxa.pages.dev').split(',').map(s => s.trim()),
  
  // Database / Supabase (Strict remote PostgreSQL)
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseServiceKey: process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  supabasePublishableKey: process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || '',
  supabaseJwksUrl: process.env.SUPABASE_JWKS_URL || '',
  databaseUrl: process.env.DATABASE_URL || '',

  // Cloudinary CDN & Asset Storage
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
    url: process.env.CLOUDINARY_URL || '',
  },
  
  // Initial Admin Provisioning
  initialAdminEmail: process.env.INITIAL_ADMIN_EMAIL || 'contact.rahnoxa@protonmail.com',
  initialAdminPassword: process.env.INITIAL_ADMIN_PASSWORD || '',

  // Custom Rahnoxa Remote AI Configuration
  ai: {
    provider: process.env.AI_PROVIDER || 'rahnoxa_remote',
    baseUrl: process.env.AI_BASE_URL || '',
    model: process.env.AI_MODEL || 'rahnoxa-llama-3-8b',
    chatModel: process.env.AI_CHAT_MODEL || 'rahnoxa-llama-3-8b',
    blogModel: process.env.AI_BLOG_MODEL || 'rahnoxa-llama-3-8b',
    embeddingModel: process.env.AI_EMBEDDING_MODEL || 'rahnoxa-bge-large',
    apiKey: process.env.AI_API_KEY || '',
    timeout: parseInt(process.env.AI_TIMEOUT || '30000', 10),
    maxRetries: parseInt(process.env.AI_MAX_RETRIES || '2', 10),
  },

  // News API & Live Trend Aggregator
  newsApiKey: process.env.NEWS_API_KEY || 'cdd54872be2d44e4bec703de97506c1c',

  // Automation (Auto-publish real live news blogs immediately)
  autoPublishBlogs: process.env.AUTO_PUBLISH_BLOGS !== 'false',
};
