# Admin Management Platform — Rahnoxa

## 1. Overview

The Rahnoxa Admin Platform (`/admin`) provides full lifecycle management across all business assets:
- **Operations Dashboard** (`/admin`): Metrics on incoming leads, published showcases, draft articles, and automation status.
- **Projects Manager** (`/admin/projects`): Dynamic showcase creation, editing, category assignment, tech tags, and featured status without editing code.
- **Blog & Articles Manager** (`/admin/blog`): Markdown article editor, live preview, taxonomy, scheduling, and publication controls.
- **Leads Pipeline** (`/admin/leads`): Stage tracking for incoming client inquiries (`NEW` → `CONTACTED` → `QUALIFIED` → `PROPOSAL` → `WON` → `LOST`).
- **Chatbot Knowledge Base** (`/admin/knowledge`): Manage company facts, FAQs, and service details ingested by RahBot.
- **SEO Automation Center** (`/admin/automation`): Real-time monitor for the daily 18:00 IST article generator with manual trigger and safety toggles.
- **Platform Settings** (`/admin/settings`): Metadata, contact emails, and model identifiers.

---

## 2. Authentication Flow

- **Login Endpoint**: `POST /api/auth/login`
- **Session Mechanism**: HMAC-SHA256 signed bearer token stored in `localStorage`.
- **Route Guarding**: `AuthContext.tsx` validates tokens on navigation and renders `AdminLogin.tsx` if unauthenticated.
- **Default Credentials**: `admin` / `admin@rahnoxa2025` (configurable via environment secrets).
