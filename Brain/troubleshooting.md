# Troubleshooting & Operations Guide — Rahnoxa

## 1. Common Scenarios & Solutions

### 1.1 SPA Routing Returns 404 on Deep Links
- **Cause**: Cloudflare Pages looking for static HTML files matching `/blog/...` or `/admin/...`.
- **Solution**: The Vite build pipeline (`vite.config.ts`) automatically copies `dist/index.html` to `dist/404.html` on every build. Cloudflare Pages uses this file as the fallback for client-side routing.

### 1.2 Admin Login Authentication Failure
- **Cause**: Incorrect username or expired token.
- **Solution**: Default superadmin credentials are `admin` / `admin@rahnoxa2025`. Check browser `localStorage` under `rahnoxa_admin_token` or clear storage and re-login at `/admin/login`.

### 1.3 RahBot Shows Network Error
- **Cause**: Backend API route `/api/chat` unreachable in purely static environments.
- **Solution**: RahBot includes built-in offline fallbacks to ensure the UI remains responsive and guides visitors to direct contact routes (`/get-started`).

---

## 2. Build & Verification Commands

```bash
# Run local development server
npm run dev

# Run production compilation & TypeScript checks
npm run build

# Preview production build locally
npm run preview
```
