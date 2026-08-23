# Platform Changelog — Rahnoxa

## [v2.4.0] — 2026-08-18 (Production Hardening & Platform Evolution)

### Added
- **AI Business Assistant (`RahBot`)**: Floating interactive assistant for technical scoping, service exploration, prompt-injection defense, and automatic qualified lead capture.
- **Admin Management Platform (`/admin`)**: Operations dashboard, projects showcase CRUD, blog CMS with markdown editor and live preview, leads pipeline, and chatbot knowledge management.
- **Public Technical Blog**: Semantic article index at `/blog` and dynamic reader at `/blog/:slug` with automated `BlogPosting` JSON-LD schema.
- **Daily 18:00 IST SEO Engine**: Autonomous article generator with safety draft review model and audit logs.
- **Cloudflare D1 & Edge API Layer**: `functions/api/*` endpoints with dual-mode D1 prepared queries and in-memory edge fallback.
- **Edge Rate Limiting**: Sliding window rate limiting on `/api/auth/login`, `/api/chat`, and `/api/leads`.
- **Database Migrations**: `migrations/0001_initial_schema.sql` and `migrations/0002_seed_data.sql`.
- **Comprehensive Brain Documentation**: Setup guides, verification reports, production checklists, and security policies.

### Changed
- Replaced hardcoded credentials with environment-driven provisioning.
- Upgraded hero design to an abstract geometric constellation animation using Framer Motion.
- Updated `public/robots.txt` and `vite.config.ts` sitemap to exclude private `/admin` and `/api/` endpoints while indexing blog articles.
