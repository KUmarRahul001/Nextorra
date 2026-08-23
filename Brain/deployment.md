# Cloudflare Deployment & Operations Guide — Rahnoxa

## 1. Cloudflare Pages Deployment Architecture

The platform operates as a unified edge application on Cloudflare Pages:

- **Static Frontend**: Static SPA assets built into `dist/` and served globally via Cloudflare CDN.
- **Client SPA Routing**: `404.html` generated from `index.html` during the build ensures all client-side paths (`/blog`, `/blog/:slug`, `/admin/*`) resolve cleanly without routing loops.
- **Edge Backend**: Native Pages Functions in `functions/api/*` handle API requests.
- **Routing Rules**: `public/_routes.json` limits function execution exclusively to `/api/*`.

---

## 2. Cloudflare D1 & Environment Secrets Configuration

### 2.1 Bindings (Dashboard → Pages → Settings → Functions)
1. **D1 Database Binding**:
   - Variable name: `DB`
   - Database: `rahnoxa-db`

### 2.2 Environment Variables & Secrets
1. **`JWT_SECRET`**: Strong random key for signing admin tokens.
2. **`INITIAL_ADMIN_EMAIL`**: `contact.rahnoxa@protonmail.com`
3. **`INITIAL_ADMIN_PASSWORD`**: Strong initial password.
4. **`AUTO_PUBLISH_BLOGS`**: `false` (default) or `true`.
5. **`SITE_URL`**: `https://rahnoxa.pages.dev` or `https://rahnoxa.com`.

---

## 3. Scheduled Worker / Cron Setup

To execute the daily 18:00 IST blog engine autonomously:
- **Schedule**: `30 12 * * *` (12:30 UTC = 18:00 IST).
- Configured in `wrangler.toml` via `[triggers] crons = ["30 12 * * *"]`.
