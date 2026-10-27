-- =============================================================================
-- Migration: 0003_enable_rls.sql
-- Description: Enforce Row Level Security (RLS) on all Supabase PostgreSQL tables
-- Single Database Authority: Supabase PostgreSQL
-- =============================================================================

-- 1. Enable RLS across all tables
ALTER TABLE IF EXISTS admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS lead_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS automation_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS automation_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS seo_automation_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS knowledge_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS messages ENABLE ROW LEVEL SECURITY;

-- 2. Drop any legacy open policies if they exist
DROP POLICY IF EXISTS "Public read published projects" ON projects;
DROP POLICY IF EXISTS "Public read published blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Public read blog_categories" ON blog_categories;
DROP POLICY IF EXISTS "Service role full access on admins" ON admins;
DROP POLICY IF EXISTS "Service role full access on leads" ON leads;

-- 3. Public read-only policies for public content
CREATE POLICY "Public read published projects" ON projects
    FOR SELECT
    USING (status = 'PUBLISHED');

CREATE POLICY "Public read published blog_posts" ON blog_posts
    FOR SELECT
    USING (status = 'PUBLISHED');

CREATE POLICY "Public read blog_categories" ON blog_categories
    FOR SELECT
    USING (true);

-- 4. Note on sensitive tables (admins, leads, lead_calls, site_settings, automation_*):
-- Because RLS is enabled and NO policies are granted to the 'anon' role,
-- direct access via Supabase anon publishable keys is strictly BLOCKED.
-- Privileged server-side operations use SUPABASE_SERVICE_ROLE_KEY which bypasses RLS safely.
