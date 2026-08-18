import app from './app.js';
import { config, validateProductionConfig } from '../config/env.js';
import { initSeoScheduler } from '../jobs/seoScheduler.js';

// Fail-fast validation of required remote environment secrets
validateProductionConfig();

const server = app.listen(config.port, () => {
  console.log(`🚀 Rahnoxa Backend API Server running on port ${config.port} [${config.nodeEnv}]`);
  console.log(`📡 Authoritative v1 API Gateway mounted at /v1 and /api/v1`);

  if (config.nodeEnv !== 'production') {
    initSeoScheduler();
  } else {
    console.log('⏰ Production mode active: Render Cron Job is the authoritative scheduler.');
  }
});

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

export default server;
