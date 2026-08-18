# Rahnoxa Platform — Fresh Machine Setup & Deployment Guide

This guide walks through deploying the complete Rahnoxa platform on a fresh machine or server environment.

---

## 1. Prerequisites

- **Node.js**: v18.0.0 or later (Node 20+ recommended)
- **npm**: v9.0.0 or later
- **Git**
- **Cloudflare Account** (with Pages and D1 enabled)
- **Wrangler CLI** (optional for local edge emulation: `npm install -g wrangler` or `npx wrangler`)

---

## 2. Clone Repository & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/KUmarRahul001/Nextorra.git rahnoxa
cd rahnoxa

# Install project dependencies
npm clean-install
```

---

## 3. Environment Configuration

Copy the template environment file:

```bash
cp .env.example .env
```

Configure the environment variables:

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `VITE_SITE_URL` | Production website base URL | `https://rahnoxa.pages.dev` |
| `VITE_SITE_NAME` | Platform Brand Name | `Rahnoxa` |
| `VITE_CONTACT_EMAIL` | Public contact email address | `contact.rahnoxa@protonmail.com` |
| `VITE_CONTACT_PHONE_1` | Primary contact telephone | `+91 8434237052` |
| `VITE_CONTACT_PHONE_2` | Secondary contact telephone | `+91 8434237049` |
| `VITE_COMPANY_LOCATION` | Physical/HQ operational region | `Jharkhand, India` |
| `VITE_FORMSPREE_ENDPOINT`| Formspree fallback endpoint | `https://formspree.io/f/YOUR_ID` |

---

## 4. Cloudflare D1 Database Setup

### Step 4.1: Create D1 Database Instance

```bash
npx wrangler d1 create rahnoxa-db
```

*Copy the resulting `database_id` into `wrangler.toml` under `[[d1_databases]]`.*

### Step 4.2: Apply Schema Migrations

```bash
# Execute initial schema migration
npx wrangler d1 execute rahnoxa-db --file=./migrations/0001_initial_schema.sql

# Seed initial categories & knowledge base
npx wrangler d1 execute rahnoxa-db --file=./migrations/0002_seed_data.sql
```

---

## 5. Configure Cloudflare Secrets & Environment Bindings

In your Cloudflare Pages Dashboard (**Settings** → **Environment Variables**):

1. **`JWT_SECRET`**: Set a cryptographically secure 32+ character random key.
2. **`INITIAL_ADMIN_EMAIL`**: Set the administrator email address.
3. **`INITIAL_ADMIN_PASSWORD`**: Set the administrator initial password.
4. **`AUTO_PUBLISH_BLOGS`**: `false` (Recommended: keeps AI articles in draft review).

---

## 6. Local Development & Verification

```bash
# Run local Vite development server
npm run dev

# Run local production build
npm run build

# Preview production build locally
npm run preview
```

---

## 7. Deploy to Cloudflare Pages

### Option A: Automatic Git Integration (Recommended)
1. Link your GitHub repository to Cloudflare Pages.
2. Set Build Command: `npm run build`
3. Set Build Output Directory: `dist`
4. Attach D1 Database binding `DB` pointing to `rahnoxa-db`.

### Option B: Deploy via Wrangler CLI
```bash
npm run build
npx wrangler pages deploy dist --project-name rahnoxa
```

---

## 8. Verification Steps

1. Visit `/` to confirm homepage and interactive abstract constellation hero animation.
2. Open **RahBot** in bottom right and ask: *"Can you build a custom ERP system?"*
3. Visit `/blog` to verify technical articles and JSON-LD schema.
4. Sign in at `/admin/login` using your configured administrator credentials.
5. In `/admin/automation`, trigger **"Run Generation Pipeline Now"** to test autonomous article creation.
