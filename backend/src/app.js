import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { isOriginAllowed } from './config/cors.js';
import errorHandler from './middleware/error.middleware.js';
import v1Router from './routes/v1/index.js';
import seoRoutes from './routes/v1/seo.routes.js';
import { db } from '../database/supabase.js';
import { config } from '../config/env.js';

const app = express();

app.use(seoRoutes);

// ─── Security Headers ────────────────────────────────────────────────────────
app.use(helmet());

// ─── Express CORS ─────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    credentials: true,
  })
);

// ─── Request Logging ──────────────────────────────────────────────────────────
app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));

// ─── Body Parsers ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Root Index Endpoint ──────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    service: 'Rahnoxa Backend API Gateway',
    version: '2.4.0',
    environment: config.nodeEnv,
    status: 'ONLINE',
    endpoints: {
      health: '/health',
      database_health: '/health/database',
      ai_health: '/health/ai',
      v1_gateway: '/v1',
      auth: '/v1/auth/login',
      projects: '/v1/projects',
      blog: '/v1/blog',
      leads: '/v1/leads',
      chat: '/v1/chat',
      knowledge: '/v1/knowledge',
      automation: '/v1/automation',
      settings: '/v1/settings',
    },
    documentation: 'https://rahnoxa.com/docs',
    timestamp: new Date().toISOString(),
  });
});

// ─── Health Check Endpoints ───────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'rahnoxa-backend',
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
    status: 'OK',
    provider: config.ai.provider,
    configured: Boolean(config.ai.baseUrl || config.ai.provider === 'rahnoxa_remote'),
  });
});

// ─── API Routes (/v1 and /api/v1 compatibility) ──────────────────────────────
app.use('/v1', v1Router);
app.use('/api/v1', v1Router);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Cannot ${req.method} ${req.originalUrl}. Use /v1/* endpoints.`,
    },
  });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorHandler);

export default app;
