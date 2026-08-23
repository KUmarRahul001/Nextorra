# Rahnoxa API Architecture & Inventory (`/v1`)

The authoritative backend API is powered by Node.js + Express and mounted under the `/v1` gateway.

**Development Endpoint**: `http://localhost:4000/v1`  
**Production Endpoint**: `https://api.rahnoxa.com/v1`  

---

## 1. Endpoint Directory

### 1.1 Authentication (`/v1/auth`)
- **File**: `backend/v1/apis/auth/index.js`
- `POST /v1/auth/login` — Authenticate admin credentials with rate limiting (5 attempts/5 mins). Returns 7-day JWT.
- `GET /v1/auth/verify` — (Authenticated) Verify JWT token validity.
- `GET /v1/auth/me` — (Authenticated) Get authenticated administrator identity.
- `POST /v1/auth/logout` — Invalidate client-side session.

### 1.2 Dashboard Metrics (`/v1/dashboard`)
- **File**: `backend/v1/apis/dashboard/index.js`
- `GET /v1/dashboard/stats` — (Authenticated) Aggregated counts for projects, blogs, leads, chat sessions, and automation runs.

### 1.3 Projects Showcase (`/v1/projects`)
- **File**: `backend/v1/apis/projects/index.js`
- `GET /v1/projects` — (Public) List published projects (`?status=PUBLISHED&featured=true`).
- `GET /v1/projects/:slug` — (Public) Get single project details by slug.
- `POST /v1/projects` — (Authenticated / Admin) Create new showcase project.
- `PUT /v1/projects/:id` — (Authenticated / Admin) Update project metadata or status.
- `DELETE /v1/projects/:id` — (Authenticated / Admin) Remove project.

### 1.4 Blog & Engineering Insights (`/v1/blog`)
- **File**: `backend/v1/apis/blog/index.js`
- `GET /v1/blog` — (Public: Published / Admin: All drafts with `?all=true`).
- `GET /v1/blog/:slug` — (Public for published; Admin for drafts).
- `POST /v1/blog` — (Authenticated / Admin) Create new technical article.
- `PUT /v1/blog/:slug` — (Authenticated / Admin) Update article content/status.
- `DELETE /v1/blog/:slug` — (Authenticated / Admin) Archive/Delete article.

### 1.5 Leads Management (`/v1/leads`)
- **File**: `backend/v1/apis/leads/index.js`
- `GET /v1/leads` — (Authenticated / Admin) List submitted project enquiries.
- `POST /v1/leads` — (Public, Rate-Limited: 10/10 mins) Submit new project enquiry.
- `PUT /v1/leads/:id` — (Authenticated / Admin) Update lead status (`NEW`, `QUALIFIED`, `PROPOSAL`, `WON`, etc.).

### 1.6 RahBot AI Business Assistant (`/v1/chat`)
- **File**: `backend/v1/apis/chat/index.js`
- `POST /v1/chat` — (Public, Rate-Limited: 30/min) Send message to RahBot. Routes through prompt injection filter, semantic RAG retrieval, and Custom Rahnoxa AI Gateway.

### 1.7 Knowledge Base (`/v1/knowledge`)
- **File**: `backend/v1/apis/knowledge/index.js`
- `GET /v1/knowledge` — (Public/Admin) List knowledge items for RAG context.
- `POST /v1/knowledge` — (Authenticated / Admin) Add knowledge document.
- `PUT /v1/knowledge/:id` — (Authenticated / Admin) Update knowledge document.
- `DELETE /v1/knowledge/:id` — (Authenticated / Admin) Delete knowledge document.

### 1.8 Automation & Daily SEO Engine (`/v1/automation`)
- **File**: `backend/v1/apis/automation/index.js`
- `GET /v1/automation` — (Authenticated / Admin) View jobs status and audit runs.
- `PUT /v1/automation` — (Authenticated / Admin) Toggle automatic publishing.
- `POST /v1/automation/run` — (Authenticated / Admin) Manually trigger the SEO blog generation pipeline.

### 1.9 Platform Settings (`/v1/settings`)
- **File**: `backend/v1/apis/settings/index.js`
- `GET /v1/settings` — (Authenticated / Admin) Read platform settings.
- `PUT /v1/settings` — (Authenticated / Admin) Update system configurations.
