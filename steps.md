# 🚀 Nextorra / Rahnoxa Deployment Checklist

This document contains step-by-step instructions to deploy the **Backend on Render** and the **Frontend on Vercel**. Use the checkboxes `[ ]` to tick off each step as you complete it.

---

## 📌 Phase 1: Deploy Backend on Render

### 1.1 Create Web Service
- [ ] Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** → **Web Service**.
- [ ] Connect your GitHub repository: `KUmarRahul001/Nextorra`.
- [ ] Choose **Branch**: `main`.

### 1.2 Service Settings
- [ ] **Name**: `rahnoxa-backend` (or your chosen name)
- [ ] **Region**: Choose closest to your users (e.g., `Singapore` or `Frankfurt` or `Oregon`)
- [ ] **Root Directory**: `backend`
- [ ] **Runtime**: `Node`
- [ ] **Build Command**: `npm install`
- [ ] **Start Command**: `npm start`
- [ ] **Instance Type**: `Free` (or Starter for production SLA)

### 1.3 Environment Variables
In the **Environment Variables** section on Render, add the following key-value pairs:

- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `10000`
- [ ] `SUPABASE_URL` = `https://your-project.supabase.co` *(from your Supabase dashboard)*
- [ ] `SUPABASE_KEY` = `your-supabase-anon-or-service-key`
- [ ] `JWT_SECRET` = `your-secure-jwt-secret-key-32-chars-long`
- [ ] `CORS_ORIGIN` = `*` *(or your Vercel frontend URL once deployed)*

### 1.4 Deploy & Verify
- [ ] Click **Create Web Service** and wait for the build to finish.
- [ ] Copy your Render Backend URL (e.g., `https://rahnoxa-backend.onrender.com`).
- [ ] Test the backend live by visiting: `https://rahnoxa-backend.onrender.com/health`
  - Expected response: `{"status":"UP", ...}`
- [ ] Test the API root endpoint: `https://rahnoxa-backend.onrender.com/`
  - Expected response: `{"name":"Rahnoxa API Gateway","status":"online", ...}`

---

## 🌐 Phase 2: Deploy Frontend on Vercel

### 2.1 Import Project
- [ ] Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New...** → **Project**.
- [ ] Import your Git repository: `KUmarRahul001/Nextorra`.

### 2.2 Build & Project Settings
- [ ] **Framework Preset**: `Vite` (automatically detected)
- [ ] **Root Directory**: `./` (leave default root)
- [ ] **Build Command**: `npm run build`
- [ ] **Output Directory**: `dist`
- [ ] **Install Command**: `npm install`

### 2.3 Environment Variables
In the **Environment Variables** section on Vercel, add:

- [ ] `VITE_API_URL` = `https://your-render-backend.onrender.com` *(paste your Render backend URL from Phase 1)*

### 2.4 Deploy
- [ ] Click **Deploy** and wait ~30 seconds for the Vite build to complete.
- [ ] Note down your production Vercel URL (e.g., `https://nextorra.vercel.app`).

---

## 🔗 Phase 3: Connect Frontend & Backend (CORS & Security)

- [ ] Go back to your **Render Dashboard** → `rahnoxa-backend` → **Environment**.
- [ ] Update `CORS_ORIGIN` to your exact Vercel frontend URL:
  - Example: `https://nextorra.vercel.app`
- [ ] Save changes (Render will automatically redeploy backend in ~15 seconds).

---

## 🧪 Phase 4: End-to-End Live Testing

- [ ] Open your live Vercel website in the browser.
- [ ] **Page Navigation**: Click through `/services/erp-enterprise-applications`, `/services/full-stack-web-apps`, `/internship`, `/about`, and `/contact`. (Verify `vercel.json` SPA routing works without 404 on refresh).
- [ ] **RahBot AI Chatbot**:
  - Click the **Ask RahBot** floating button (bottom-right).
  - Ask: `"Can you build a custom ERP system?"` → Verify rich technical response without auto-opening form.
  - Click `"Submit Enquiry"` button → Verify Project Enquiry form opens cleanly.
  - Fill out a test lead → Verify submission confirmation with 24–48h SLA response.
- [ ] **Contact Page Form**: Submit a message on `/contact` and check Supabase / Backend logs.
- [ ] **Admin Dashboard**: Visit `/admin/login` and verify credentials login.

---

## 📋 Summary of Configuration Files

| Purpose | File Location |
| :--- | :--- |
| **Vercel SPA Rewrites** | [`vercel.json`](./vercel.json) |
| **Frontend Config** | [`package.json`](./package.json) |
| **Backend Config** | [`backend/package.json`](./backend/package.json) |
| **AI Knowledge Base** | [`backend/ai/knowledge/servicesKnowledge.js`](./backend/ai/knowledge/servicesKnowledge.js) |
| **Client Chatbot Engine** | [`src/components/chatbot/RahBot.tsx`](./src/components/chatbot/RahBot.tsx) |
