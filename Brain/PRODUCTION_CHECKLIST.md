# Rahnoxa — Production Readiness Checklist

This checklist tracks all infrastructure, security, database, and operational gates before publishing live.

---

## 1. Security & Authentication
- [x] Hardcoded credentials completely removed from frontend and backend code
- [x] Web Crypto SHA-256 + salt password hashing active
- [x] Environment-driven admin account provisioning (`INITIAL_ADMIN_EMAIL`, `INITIAL_ADMIN_PASSWORD`)
- [x] JWT tokens signed with HMAC-SHA256 with 7-day expiration
- [x] Edge rate limiter active on `/api/auth/login` (5 attempts / 5 mins per IP)
- [x] Edge rate limiter active on `/api/chat` (30 msgs / min per IP)
- [x] Edge rate limiter active on `/api/leads` (10 submissions / 10 mins per IP)
- [x] Prompt-injection defensive filtering on RahBot conversational agent
- [x] Disallow `/admin` and `/api` in `public/robots.txt`

---

## 2. Database & Persistence (Cloudflare D1)
- [x] Formal SQL migration scripts created in `migrations/0001_initial_schema.sql`
- [x] Seed data script created in `migrations/0002_seed_data.sql`
- [x] Universal `getDB()` abstraction supporting both live D1 queries and in-memory edge fallback
- [x] Parameterized SQL statements preventing SQL injection
- [x] Stored XSS sanitization on project and blog descriptions

---

## 3. Autonomous 18:00 IST SEO Engine
- [x] Cron schedule configured as `30 12 * * *` (12:30 UTC = 18:00 IST) in `wrangler.toml`
- [x] Topic rotation matrix avoiding recent duplicates
- [x] Safety review workflow enabled by default (`AUTO_PUBLISH_BLOGS = false` → `status = 'DRAFT'`)
- [x] Execution audit logging to `automation_runs` table
- [x] Manual trigger available in `/admin/automation`

---

## 4. Public Web, Blog & SEO
- [x] Abstract geometric constellation hero animation without fake terminal tropes
- [x] Public engineering blog active at `/blog` and `/blog/:slug`
- [x] Structured JSON-LD schema (`BlogPosting`) injected dynamically on all articles
- [x] Automatic `/sitemap.xml` generated with public services, projects, and articles
- [x] Cloudflare SPA fallback hook creating `404.html` from `index.html`

---

## 5. Build & Deployment
- [x] `npm run build` compiles with 0 TypeScript and Rollup errors
- [x] Git repository synchronized on `main` branch
- [x] Cloudflare Pages routing configured in `public/_routes.json`
