# Rahnoxa Production Environment & Secrets Reference

This document outlines the strict remote-only environment configuration for Rahnoxa across **Cloudflare Pages** (Frontend), **Render** (Backend API Gateway & Cron), and **Supabase** (PostgreSQL Database).

---

## 1. Environment Variable Matrix

| Variable | Target Platform | Secret? | Required? | Purpose & Format |
| :--- | :--- | :---: | :---: | :--- |
| `VITE_API_URL` | Cloudflare Pages | **No** | **Yes** | Remote backend API gateway URL (e.g. `https://api.rahnoxa.com`). |
| `VITE_SITE_URL` | Cloudflare Pages | **No** | **Yes** | Public website domain (e.g. `https://rahnoxa.com`). |
| `NODE_ENV` | Render (Web & Cron) | **No** | **Yes** | Set to `production`. |
| `PORT` | Render (Web Service) | **No** | **Yes** | Injected dynamically by Render (defaults to `10000`). |
| `SITE_URL` | Render (Web Service) | **No** | **Yes** | Public canonical website URL (e.g. `https://rahnoxa.com`). |
| `CORS_ORIGINS` | Render (Web Service) | **No** | **Yes** | Allowed CORS origins (e.g. `https://rahnoxa.com,https://www.rahnoxa.com,https://rahnoxa.pages.dev`). |
| `SUPABASE_URL` | Render (Web & Cron) | **Yes** | **Yes** | Supabase project URL (`https://<project-id>.supabase.co`). |
| `SUPABASE_SERVICE_ROLE_KEY` | Render (Web & Cron) | **Yes** | **Yes** | Privileged server-side service role key (Never expose to browser). |
| `JWT_SECRET` | Render (Web Service) | **Yes** | **Yes** | 32+ character random string for signing admin tokens. |
| `INITIAL_ADMIN_EMAIL` | Render (Web Service) | **Yes** | **Yes** | Email for administrator setup. |
| `INITIAL_ADMIN_PASSWORD` | Render (Web Service) | **Yes** | **Yes** | Initial password for administrator setup. |
| `AI_PROVIDER` | Render (Web & Cron) | **No** | **Yes** | Remote AI provider identifier (`rahnoxa_remote`, `rahnoxa_vllm`, `rahnoxa_custom_http`). |
| `AI_BASE_URL` | Render (Web & Cron) | **Yes** | **Yes** | HTTPS URL of private/remote inference server. |
| `AI_MODEL` | Render (Web & Cron) | **No** | **No** | Inference model tag (e.g. `rahnoxa-llama-3-8b`). |
| `AI_API_KEY` | Render (Web & Cron) | **Yes** | **No** | Bearer token for remote inference server (if protected). |
| `EMAIL_PROVIDER` | Render (Web Service) | **No** | **No** | Transactional email provider (e.g. `resend`, `sendgrid`). |
| `EMAIL_API_KEY` | Render (Web Service) | **Yes** | **No** | API key for transactional email provider. |
| `AUTO_PUBLISH_BLOGS` | Render (Web & Cron) | **No** | **Yes** | Set to `false` for draft review queue; `true` for auto-publishing. |

---

## 2. Configuration Locations

### 2.1 Cloudflare Pages
1. Go to **Workers & Pages** → Select your Pages Project (`rahnoxa`).
2. Navigate to **Settings** → **Environment Variables** (Production).
3. Add:
   - `VITE_API_URL`: `https://api.rahnoxa.com`
   - `VITE_SITE_URL`: `https://rahnoxa.com`

### 2.2 Render Web Service (`rahnoxa-backend`)
1. Go to **Dashboard** → Select `rahnoxa-backend` service.
2. Navigate to **Environment**.
3. Add the secrets (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `JWT_SECRET`, `INITIAL_ADMIN_PASSWORD`, etc.).

### 2.3 Render Cron Job (`rahnoxa-daily-seo-cron`)
1. Go to **Dashboard** → Select `rahnoxa-daily-seo-cron` job.
2. Navigate to **Environment**.
3. Add `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `AI_BASE_URL`, `AI_API_KEY`.
