-- =============================================================================
-- Migration: 0004_rahnoxa_complete_schema.sql
-- Description: Complete schema for Rahnoxa on Supabase PostgreSQL
-- Enforces Row Level Security (RLS) & provides tables for:
-- admins, projects, blog_posts, blog_categories, leads, conversations,
-- messages, knowledge_items, automation_jobs, automation_runs,
-- site_settings, lead_calls, call_transcripts, quotations, outreach_queue
-- =============================================================================

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
CREATE INDEX IF NOT EXISTS idx_admins_username ON admins(username);
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);

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
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);

-- 3. Blog Categories Table
CREATE TABLE IF NOT EXISTS blog_categories (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT
);

-- 4. Blog Posts Table
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
    ai_seo_score INTEGER DEFAULT 85,
    seo_title TEXT,
    seo_description TEXT,
    canonical_url TEXT,
    og_image TEXT,
    publish_at TIMESTAMP WITH TIME ZONE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_published_at ON blog_posts(published_at);

-- 5. Leads Table
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
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- 6. Chat Conversations & Messages
CREATE TABLE IF NOT EXISTS conversations (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    visitor_id TEXT,
    lead_id TEXT,
    status TEXT DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_conversations_session ON conversations(session_id);

CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);

-- 7. Knowledge Items (RahBot RAG)
CREATE TABLE IF NOT EXISTS knowledge_items (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    tags TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_knowledge_category ON knowledge_items(category);

-- 8. Automation Jobs & Runs
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
CREATE INDEX IF NOT EXISTS idx_automation_runs_job ON automation_runs(job_id);
CREATE INDEX IF NOT EXISTS idx_automation_runs_started ON automation_runs(started_at DESC);

-- 9. Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
    id TEXT PRIMARY KEY DEFAULT 'global',
    key TEXT,
    value TEXT,
    site_name TEXT DEFAULT 'Rahnoxa',
    site_url TEXT DEFAULT 'https://rahnoxa.com',
    contact_email TEXT DEFAULT 'contact.rahnoxa@protonmail.com',
    auto_publish_blogs BOOLEAN DEFAULT false,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Voice Agent Calls & Transcripts
CREATE TABLE IF NOT EXISTS lead_calls (
    id TEXT PRIMARY KEY,
    lead_id TEXT,
    phone_number TEXT,
    call_sid TEXT,
    duration INTEGER DEFAULT 0,
    status TEXT DEFAULT 'INITIATED',
    recording_url TEXT,
    summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    ended_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_lead_calls_lead ON lead_calls(lead_id);

CREATE TABLE IF NOT EXISTS call_transcripts (
    id TEXT PRIMARY KEY,
    call_id TEXT NOT NULL REFERENCES lead_calls(id) ON DELETE CASCADE,
    speaker TEXT NOT NULL,
    text TEXT NOT NULL,
    sequence INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_call_transcripts_call ON call_transcripts(call_id);

-- 11. Quotations & Outreach Queue
CREATE TABLE IF NOT EXISTS quotations (
    id TEXT PRIMARY KEY,
    lead_id TEXT,
    service_tier TEXT,
    package_name TEXT,
    amount NUMERIC,
    currency TEXT DEFAULT 'INR',
    status TEXT DEFAULT 'PENDING',
    items JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS outreach_queue (
    id TEXT PRIMARY KEY,
    target_name TEXT NOT NULL,
    target_phone TEXT,
    target_email TEXT,
    channel TEXT NOT NULL, -- 'whatsapp', 'email', 'sms', 'call'
    payload JSONB DEFAULT '{}'::jsonb,
    status TEXT DEFAULT 'QUEUED',
    scheduled_for TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. Enable Row Level Security (RLS)
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE outreach_queue ENABLE ROW LEVEL SECURITY;

-- 13. Public SELECT policies
CREATE POLICY "Public read published projects" ON projects
    FOR SELECT USING (status = 'PUBLISHED');

CREATE POLICY "Public read published blog_posts" ON blog_posts
    FOR SELECT USING (status = 'PUBLISHED');

CREATE POLICY "Public read blog_categories" ON blog_categories
    FOR SELECT USING (true);
