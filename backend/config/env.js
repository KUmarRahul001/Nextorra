import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  siteUrl: process.env.SITE_URL || 'https://rahnoxa.pages.dev',
  jwtSecret: process.env.JWT_SECRET || 'rahnoxa_dev_secure_jwt_secret_2026_change_in_production',
  corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:5173,http://localhost:3000,https://rahnoxa.pages.dev,https://rahnoxa.com,https://www.rahnoxa.com').split(','),
  
  // Database / Supabase
  supabaseUrl: process.env.SUPABASE_URL || null,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || null,
  
  // Initial Admin Provisioning (No hardcoded credentials)
  initialAdminEmail: process.env.INITIAL_ADMIN_EMAIL || 'contact.rahnoxa@protonmail.com',
  initialAdminPassword: process.env.INITIAL_ADMIN_PASSWORD || null,

  // Custom Rahnoxa AI Configuration
  ai: {
    provider: process.env.AI_PROVIDER || 'rahnoxa_local', // 'rahnoxa_local', 'rahnoxa_ollama', 'rahnoxa_vllm', 'rahnoxa_custom_http'
    baseUrl: process.env.AI_BASE_URL || 'http://localhost:11434',
    model: process.env.AI_MODEL || 'rahnoxa-llama-3-8b',
    chatModel: process.env.AI_CHAT_MODEL || 'rahnoxa-llama-3-8b',
    blogModel: process.env.AI_BLOG_MODEL || 'rahnoxa-llama-3-8b',
    embeddingModel: process.env.AI_EMBEDDING_MODEL || 'rahnoxa-bge-large',
    apiKey: process.env.AI_API_KEY || null,
    timeout: parseInt(process.env.AI_TIMEOUT || '30000', 10),
    maxRetries: parseInt(process.env.AI_MAX_RETRIES || '2', 10),
  },

  // Automation
  autoPublishBlogs: process.env.AUTO_PUBLISH_BLOGS === 'true',
};
