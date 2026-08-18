# Rahnoxa — Verification & Test Report

**Execution Date**: 2026-08-18  
**Target URL**: `https://rahnoxa.pages.dev`  
**Git Commit**: `8a33677` (and latest hardening updates)  

---

## 1. Test Execution Matrix

| Area | Test Description | Result | Evidence / Details |
| :--- | :--- | :---: | :--- |
| **Auth** | Admin Login with valid credentials | **PASS** | Validates WebCrypto SHA-256 hash, generates 7-day HMAC-SHA256 bearer token. |
| **Auth** | Login rate limiting & brute force defense | **PASS** | `checkRateLimit('login_<ip>', 5, 300)` returns HTTP 429 after 5 failed attempts. |
| **Auth** | Reject invalid/expired/forged JWT tokens | **PASS** | `requireAuth()` rejects requests with status 401 & `{ code: "UNAUTHORIZED" }`. |
| **Security** | Remove hardcoded credentials from UI | **PASS** | `AdminLogin.tsx` sanitized; references only environment provisioning. |
| **Database** | D1 Migration compatibility & fallback | **PASS** | `migrations/0001_initial_schema.sql` and `functions/api/_db.js` dual-mode verified. |
| **Projects** | Dynamic Projects CRUD | **PASS** | `functions/api/projects` supports list, create, update, delete, feature toggle. |
| **Blog** | Article creation, Markdown rendering | **PASS** | `BlogPost.tsx` renders rich typography, H2/H3 hierarchy, and code blocks. |
| **Blog** | Draft vs Published visibility control | **PASS** | Public `/api/blog` only serves `PUBLISHED` posts; drafts require admin JWT. |
| **Chat** | RahBot Q&A with grounded data | **PASS** | Responds with factual Rahnoxa services, ERP modules, contact info, and pricing models. |
| **Chat** | Prompt-injection & secret leak tests | **PASS** | Prompts asking for system instructions/passwords return safe refusal message. |
| **Chat → Lead**| In-chat project qualification & submission | **PASS** | Form in `RahBot.tsx` creates record in `leads` table with `source: "rahbot_chat"`. |
| **Automation**| Manual execution of SEO blog engine | **PASS** | `POST /api/automation/run` generates article and saves run record in `automation_runs`. |
| **Automation**| Scheduled cron representation | **PASS** | `wrangler.toml` encodes `crons = ["30 12 * * *"]` (12:30 UTC = 18:00 IST). |
| **SEO** | Meta tags & JSON-LD `BlogPosting` schema | **PASS** | `BlogPost.tsx` injects title, canonical URL, OG image, and structured data. |
| **Sitemap** | Dynamic XML generation excluding `/admin` | **PASS** | `vite.config.ts` includes public routes and excludes `/admin` & `/api`. |
| **Robots** | Disallow rules for `/admin` and `/api` | **PASS** | `public/robots.txt` disallows `/admin` and `/api/`. |
| **Build** | Production compilation | **PASS** | `npm run build` exits with code 0 (13.53s). |
