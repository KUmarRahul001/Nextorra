-- Rahnoxa Supabase PostgreSQL Schema Migration (0001_supabase_schema.sql)

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS admins (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    last_login TIMESTAMP WITH TIME ZONE
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT,
    category TEXT NOT NULL,
    services JSONB DEFAULT '[]'::jsonb,
    technologies JSONB DEFAULT '[]'::jsonb,
    images JSONB DEFAULT '[]'::jsonb,
    thumbnail TEXT,
    demo_url TEXT,
    github_url TEXT,
    featured INTEGER DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'PUBLISHED',
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    featured_image TEXT,
    category TEXT NOT NULL,
    tags JSONB DEFAULT '[]'::jsonb,
    author TEXT DEFAULT 'Rahnoxa Engineering',
    reading_time TEXT DEFAULT '5 min read',
    status TEXT NOT NULL DEFAULT 'DRAFT',
    is_ai_generated INTEGER DEFAULT 0,
    ai_topic TEXT,
    ai_keyword TEXT,
    ai_seo_score INTEGER DEFAULT 0,
    seo_title TEXT,
    seo_description TEXT,
    canonical_url TEXT,
    og_image TEXT,
    publish_at TIMESTAMP WITH TIME ZONE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Leads Table
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
    source TEXT DEFAULT 'website_contact',
    status TEXT NOT NULL DEFAULT 'NEW',
    notes TEXT,
    conversation_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Conversations & Messages
CREATE TABLE IF NOT EXISTS conversations (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    visitor_id TEXT,
    status TEXT DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Knowledge Items (RAG)
CREATE TABLE IF NOT EXISTS knowledge_items (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    tags TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Automation Jobs & Runs
CREATE TABLE IF NOT EXISTS automation_jobs (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    schedule TEXT NOT NULL,
    enabled INTEGER DEFAULT 1,
    auto_publish INTEGER DEFAULT 0,
    last_run TIMESTAMP WITH TIME ZONE,
    next_run TIMESTAMP WITH TIME ZONE,
    status TEXT DEFAULT 'IDLE'
);

CREATE TABLE IF NOT EXISTS automation_runs (
    id TEXT PRIMARY KEY,
    job_id TEXT,
    started_at TIMESTAMP WITH TIME ZONE NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    status TEXT NOT NULL,
    topic TEXT,
    keyword TEXT,
    output_title TEXT,
    output_post_id TEXT,
    error TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for high-speed queries
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_blog_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_knowledge_category ON knowledge_items(category);
CREATE INDEX IF NOT EXISTS idx_automation_runs_started ON automation_runs(started_at DESC);
