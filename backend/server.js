import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config, validateProductionConfig } from './config/env.js';
import v1Router from './v1/apis/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { initSeoScheduler } from './jobs/seoScheduler.js';
import { db } from './database/supabase.js';

// Validate required remote configuration
validateProductionConfig();

const app = express();

// Security & Utility Middlewares
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. server-to-server, curl) or matched CORS origin
      if (!origin || config.corsOrigins.includes(origin) || origin.endsWith('.pages.dev') || origin.endsWith('rahnoxa.com')) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));

// ── Health Check Endpoints ──
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'rahnoxa-backend',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString(),
    version: '2.4.0',
  });
});

app.get('/health/database', async (req, res) => {
  const health = await db.checkHealth();
  const statusCode = health.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(health);
});

app.get('/health/ai', (req, res) => {
  res.status(200).json({
    status: 'ok',
    provider: config.ai.provider,
    configured: Boolean(config.ai.baseUrl || config.ai.provider === 'rahnoxa_remote'),
  });
});

// Authoritative /v1 API Gateway
app.use('/v1', v1Router);

// Fallback 404 for unknown endpoints
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `API endpoint '${req.method} ${req.originalUrl}' does not exist. Use /v1/* endpoints.`,
    },
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

// Start Express Server
const server = app.listen(config.port, () => {
  console.log(`🚀 Rahnoxa Backend API Server running on port ${config.port} [${config.nodeEnv}]`);
  console.log(`📡 Remote v1 API Gateway mounted at /v1`);

  // In production, Render Cron is the authoritative scheduler.
  // node-cron is only enabled in non-production local staging to prevent duplicate executions.
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

export default app;
