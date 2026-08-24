import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { isOriginAllowed } from './config/cors.js';
import errorHandler from './middleware/error.middleware.js';
import v1Router from './routes/v1/index.js';
import seoRoutes from './routes/v1/seo.routes.js';
import { db } from '../database/supabase.js';
import { config } from '../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDistPath = path.resolve(__dirname, '../public');

const app = express();

app.use(seoRoutes);

// ─── Static Frontend Serving ─────────────────────────────────────────────────
if (fs.existsSync(publicDistPath)) {
  app.use(express.static(publicDistPath, {
    maxAge: '1d',
    setHeaders: (res, filePath) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    }
  }));
}

// ─── Security Headers ────────────────────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// ─── Express CORS ─────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Allow browser client on antideploy
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

// ─── API Routes (/v1 and /api/v1 compatibility) ──────────────────────────────
app.use('/v1', v1Router);
app.use('/api/v1', v1Router);

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

// ─── Root Index Endpoint (if no static frontend build present) ────────────────
app.get('/', (req, res, next) => {
  const indexPath = path.join(publicDistPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  res.status(200).json({
    success: true,
    service: 'Rahnoxa Full-Stack Platform',
    version: '2.4.0',
    environment: config.nodeEnv,
    status: 'ONLINE',
    endpoints: {
      health: '/health',
      v1_gateway: '/v1',
      blog: '/v1/blog',
    },
    timestamp: new Date().toISOString(),
  });
});

// ─── SPA Fallback (Non-API routes serve index.html) ───────────────────────────
app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/v1') || req.originalUrl.startsWith('/api') || req.originalUrl.startsWith('/health')) {
    return next();
  }
  const indexPath = path.join(publicDistPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  next();
});

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
