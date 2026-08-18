# Rahnoxa Backend Architecture Guide

The Rahnoxa backend is an independent, production-grade **Node.js + Express** service deployed on **Render** and backed by **Supabase PostgreSQL**.

---

## 1. Directory Structure

```text
backend/
├── v1/
│   └── apis/
│       ├── auth/
│       ├── dashboard/
│       ├── projects/
│       ├── blog/
│       ├── leads/
│       ├── chat/
│       ├── knowledge/
│       ├── automation/
│       ├── settings/
│       └── index.js
├── ai/
│   ├── core/
│   ├── providers/
│   ├── routing/
│   ├── prompts/
│   ├── retrieval/
│   ├── tools/
│   └── safety/
├── database/
│   ├── supabase.js
│   └── migrations/
├── jobs/
│   └── seoScheduler.js
├── middleware/
│   ├── auth.js
│   ├── rateLimit.js
│   └── errorHandler.js
├── config/
│   └── env.js
├── tests/
│   └── api.test.js
├── server.js
└── package.json
```

---

## 2. Server Architecture
- **Framework**: Express 4.x (ESM modules)
- **Security**: Helmet headers, CORS origin whitelisting, centralized error sanitizer.
- **Port**: Default `4000` (Dev) / `10000` (Render production).
- **Health Checks**: `/health` and `/health/database`.
