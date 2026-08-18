# Database Schema & Entity Design — Rahnoxa

## 1. Relational Entity Schema

The Rahnoxa platform persistence layer is modeled as an edge-native relational database (compatible with SQLite / Cloudflare D1 / PostgreSQL).

```sql
-- 1. Admins / Users
CREATE TABLE IF NOT EXISTS admins (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'admin', -- 'superadmin', 'admin', 'editor'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME
);

-- 2. Projects
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT,
    category TEXT NOT NULL, -- 'Web App', 'Mobile App', 'ERP', 'SaaS', 'API', 'Website'
    services TEXT, -- JSON array of service slugs
    technologies TEXT, -- JSON array of strings
    images TEXT, -- JSON array of image URLs
    thumbnail TEXT,
    demo_url TEXT,
    github_url TEXT,
    featured INTEGER DEFAULT 0,
    status TEXT DEFAULT 'PUBLISHED', -- 'DRAFT', 'PUBLISHED', 'ARCHIVED'
    seo_title TEXT,
    seo_description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    featured_image TEXT,
    category TEXT NOT NULL,
    tags TEXT, -- JSON array of strings
    author TEXT DEFAULT 'Rahnoxa Engineering',
    reading_time TEXT DEFAULT '5 min read',
    status TEXT DEFAULT 'DRAFT', -- 'DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED'
    is_ai_generated INTEGER DEFAULT 0,
    ai_topic TEXT,
    ai_keyword TEXT,
    ai_seo_score INTEGER DEFAULT 85,
    seo_title TEXT,
    seo_description TEXT,
    canonical_url TEXT,
    og_image TEXT,
    published_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Leads / Project Enquiries
CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    service TEXT,
    project_description TEXT NOT NULL,
    budget TEXT,
    timeline TEXT,
    source TEXT DEFAULT 'website_contact', -- 'website_contact', 'rahbot_chat', 'service_modal'
    conversation_id TEXT,
    status TEXT DEFAULT 'NEW', -- 'NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST', 'ARCHIVED'
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. Chatbot Conversations
CREATE TABLE IF NOT EXISTS conversations (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    visitor_id TEXT,
    lead_id TEXT,
    status TEXT DEFAULT 'ACTIVE', -- 'ACTIVE', 'QUALIFIED', 'HANDOFF', 'CLOSED'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 6. Chatbot Messages
CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    conversation_id TEXT NOT NULL,
    role TEXT NOT NULL, -- 'user', 'assistant', 'system'
    content TEXT NOT NULL,
    metadata TEXT, -- JSON object
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
);

-- 7. Chatbot Knowledge Items
CREATE TABLE IF NOT EXISTS knowledge_items (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL, -- 'company', 'services', 'pricing', 'tech_stack', 'faq', 'policy'
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    tags TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 8. Automation Jobs
CREATE TABLE IF NOT EXISTS automation_jobs (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    schedule TEXT NOT NULL, -- e.g. '18:00 IST'
    enabled INTEGER DEFAULT 1,
    auto_publish INTEGER DEFAULT 0,
    last_run DATETIME,
    next_run DATETIME,
    status TEXT DEFAULT 'IDLE' -- 'IDLE', 'RUNNING', 'ERROR'
);

-- 9. Automation Execution Runs (Audit Log)
CREATE TABLE IF NOT EXISTS automation_runs (
    id TEXT PRIMARY KEY,
    job_id TEXT NOT NULL,
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    status TEXT NOT NULL, -- 'RUNNING', 'SUCCESS', 'FAILED'
    topic TEXT,
    keyword TEXT,
    output_title TEXT,
    output_post_id TEXT,
    error TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 10. Site & Platform Settings
CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 2. Seed Data Strategy

When initialized, the system automatically populates baseline data:
1. **Default Administrator Account**: `admin` / `rahnoxa_admin_2025` (configurable via `ADMIN_PASSWORD` env variable).
2. **Initial Projects**: Imported from `src/data/projects.ts`.
3. **Initial Knowledge Items**: Complete details on Rahnoxa services, core competencies, tech stack, and discovery process.
4. **Daily SEO Automation Job**: Registered for 18:00 IST schedule.
