import app from './app.js';
import { config, validateProductionConfig } from '../config/env.js';
import { initSeoScheduler } from '../jobs/seoScheduler.js';
import { ensureSupabaseBlogPostsSeeded } from './data/seeder.js';

// Fail-fast validation of required remote environment secrets
validateProductionConfig();

const server = app.listen(config.port, async () => {
  console.log(`🚀 Rahnoxa Backend API Server running on port ${config.port} [${config.nodeEnv}]`);
  console.log(`📡 Authoritative v1 API Gateway mounted at /v1 and /api/v1`);

  // Ensure Supabase PostgreSQL has real published articles saved
  await ensureSupabaseBlogPostsSeeded();

  // Initialize automated daily AI blog scheduler (Runs daily at 18:00 IST / 12:30 UTC)
  initSeoScheduler();
});

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

export default server;
