# System Architecture — Rahnoxa

## 1. Overview

Rahnoxa is architected as an edge-native full-stack platform leveraging **React / TypeScript / Vite** on the frontend and **Cloudflare Pages Functions** on the backend.

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                                CLIENT BROWSER                               │
├──────────────────────────────────────┬──────────────────────────────────────┤
│            Public Website            │             Admin Portal             │
│  - Home, Services, Projects, About   │  - Auth (JWT / Session)              │
│  - /blog & /blog/:slug (SEO)         │  - Dashboard & Activity Feeds        │
│  - Internship, Contact, Legal        │  - Projects, Blog, Leads Manager     │
│  - RahBot AI Assistant Widget        │  - Automation & Knowledge Control    │
└──────────────────────────────────────┴──────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CLOUDFLARE PAGES EDGE ROUTING & CDN                      │
│  - Static Asset Delivery & Brotli/Gzip Compression                          │
│  - SPA Fallback routing (404.html -> index.html)                            │
│  - API Route Filtering (_routes.json -> /api/*)                             │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EDGE BACKEND (Functions/API Runtime)                     │
├─────────────────┬─────────────────┬─────────────────┬───────────────────────┤
│   Auth Module   │  Chat & RahBot  │  Content & SEO  │  Automation Engine    │
│  - Login/Verify │  - Intent/Qual  │  - Blog CRUD    │  - Daily 18:00 IST    │
│  - Session/Hash │  - Knowledge RAG│  - Projects CRUD│  - Topic Pipeline     │
│  - Rate Limiter │  - Lead Capture │  - Lead Pipeline│  - Draft Validation   │
└─────────────────┴─────────────────┴─────────────────┴───────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        DATA PERSISTENCE LAYER                               │
│  - Universal Edge Repository (Cloudflare D1 SQLite / Local Persistent Store)│
│  - Tables: Admins, Projects, Services, Blogs, Leads, Chat, Automation, Settings
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Component Layers

### 2.1 Public Frontend (`src/`)
- Built with **React 18 + TypeScript + Vite**.
- Styled using **Tailwind CSS** with cohesive dark/light slate tokens.
- Dynamic route transitions and component animations via **Framer Motion**.
- Client-side routing with **React Router v6**.
- SEO meta injection and structured schema generation via `react-helmet-async`.

### 2.2 AI Assistant (`src/components/chatbot/` & `functions/api/chat/`)
- **RahBot** provides intelligent real-time conversational assistance.
- Built-in requirement gathering state machine transitions qualified visitors into structured business leads.
- Server-side guardrails protect against prompt-injection and hallucinated guarantees.

### 2.3 Admin Management Console (`src/pages/admin/` & `src/components/admin/`)
- Protected `/admin` route tree with zero public exposure.
- Comprehensive CRUD interfaces for Projects, Blogs, Leads, Automation, and Knowledge Documents.
- Built-in Markdown & SEO preview tooling for content creators.

### 2.4 Serverless Edge APIs (`functions/api/`)
- Native Cloudflare Pages Functions (`onRequestGet`, `onRequestPost`, `onRequestPut`, `onRequestDelete`).
- Universal DB abstraction in `functions/api/_db.js` providing seamless edge SQLite (D1) integration and local in-memory fallback.
- Standardized JSON responses with comprehensive status codes and error auditing.

### 2.5 Daily SEO Automation (`functions/api/automation/`)
- Automated daily workflow targeting 18:00 IST for generating high-intent technical articles.
- Evaluates recent topic history to prevent duplication.
- Enforces a safety review model (`AUTO_PUBLISH=false` default) sending articles to `DRAFT` for admin approval.
