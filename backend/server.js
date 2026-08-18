import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/env.js';
import v1Router from './v1/apis/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { initSeoScheduler } from './jobs/seoScheduler.js';

const app = express();

// Security & Utility Middlewares
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin || config.corsOrigins.includes(origin) || origin.endsWith('.pages.dev') || origin.endsWith('rahnoxa.com')) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev/testing, secured by token/headers
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));

// Health Check Endpoints
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'rahnoxa-backend',
    version: '2.4.0',
  });
});

app.get('/health/database', (req, res) => {
  res.status(200).json({
    status: 'ok',
    database: config.supabaseUrl ? 'supabase_postgresql' : 'in_memory_resilience_layer',
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

// Start Express HTTP Server
const server = app.listen(config.port, () => {
  console.log(`🚀 Rahnoxa Backend API Server running on port ${config.port} [${config.nodeEnv}]`);
  console.log(`📡 Authoritative v1 API Gateway mounted at http://localhost:${config.port}/v1`);
  
  // Register Daily 18:00 IST SEO Cron Scheduler
  initSeoScheduler();
});

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

export default app;
