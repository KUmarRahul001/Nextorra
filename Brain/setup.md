# Rahnoxa — Remote Production Setup & Deployment Guide

This guide details setting up Rahnoxa across **Supabase**, **Render**, and **Cloudflare Pages**.

---

## 1. Supabase PostgreSQL Setup

1. Log into your [Supabase Dashboard](https://supabase.com/dashboard) and click **New Project**.
2. Set **Database Password** and select your closest deployment region.
3. Once provisioned, open **SQL Editor** in Supabase:
   - Copy the contents of [`backend/database/migrations/0001_supabase_schema.sql`](file:///home/rahul-kumar/Desktop/Nextorra/backend/database/migrations/0001_supabase_schema.sql).
   - Click **Run** to generate all 7 tables and optimized indexes.
4. Go to **Project Settings** → **API**:
   - Copy **Project URL** (`SUPABASE_URL`).
   - Copy **service_role (secret)** key (`SUPABASE_SERVICE_ROLE_KEY`).

---

## 2. Render Backend Deployment

1. Log into [Render](https://dashboard.render.com/) and click **New** → **Blueprint** (or connect your GitHub repository).
2. Point Render to [`render.yaml`](file:///home/rahul-kumar/Desktop/Nextorra/render.yaml).
3. Render creates:
   - **Web Service** (`rahnoxa-backend`): Root `backend`, Command `node server.js`.
   - **Cron Job** (`rahnoxa-daily-seo-cron`): Root `backend`, Schedule `30 12 * * *` (18:00 IST).
4. In Render's **Environment** tab for `rahnoxa-backend`:
   - Enter `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
   - Generate/enter a strong `JWT_SECRET`.
   - Enter `INITIAL_ADMIN_EMAIL` and `INITIAL_ADMIN_PASSWORD`.
   - Enter `AI_BASE_URL` (HTTPS endpoint of your remote AI inference server).
5. Attach custom domain `api.rahnoxa.com` to the Web Service.

---

## 3. Cloudflare Pages Frontend Deployment

1. In Cloudflare Dashboard, go to **Workers & Pages** → **Create Application** → **Pages**.
2. Connect your GitHub repository (`Nextorra`).
3. Configure Build Settings:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
4. In **Settings** → **Environment Variables**:
   - `VITE_API_URL`: `https://api.rahnoxa.com`
   - `VITE_SITE_URL`: `https://rahnoxa.com`
5. Click **Deploy**.
6. Under **Custom Domains**, connect `rahnoxa.com` and `www.rahnoxa.com`.
