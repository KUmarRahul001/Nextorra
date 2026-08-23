-- =============================================================================
-- Migration: 0004_location_discovery_schema.sql
-- Description: Schema for Location Business Discovery, Audits & Opportunity Engine
-- Target: Remote Supabase PostgreSQL / Edge SQLite D1
-- =============================================================================

-- 1. Target Locations Table
CREATE TABLE IF NOT EXISTS target_locations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,              -- e.g. 'Jamshedpur', 'Adityapur', 'Kolkata'
    state TEXT DEFAULT 'Jharkhand',
    country TEXT DEFAULT 'India',
    priority TEXT DEFAULT 'HIGH',    -- 'HIGH', 'MEDIUM', 'LOW'
    status TEXT DEFAULT 'ACTIVE',    -- 'ACTIVE', 'PAUSED'
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_locations_name ON target_locations(name);
CREATE INDEX IF NOT EXISTS idx_locations_status ON target_locations(status);

-- 2. Discovery Jobs Table
CREATE TABLE IF NOT EXISTS discovery_jobs (
    id TEXT PRIMARY KEY,
    location_id TEXT REFERENCES target_locations(id) ON DELETE SET NULL,
    location_name TEXT NOT NULL,
    category TEXT NOT NULL,          -- e.g. 'Coaching Institute', 'Manufacturer', 'Gym'
    source_provider TEXT NOT NULL,   -- e.g. 'DirectoryProvider', 'GoogleBusinessProvider', 'ManualCSVProvider'
    requested_count INTEGER DEFAULT 50,
    discovered_count INTEGER DEFAULT 0,
    valid_count INTEGER DEFAULT 0,
    duplicate_count INTEGER DEFAULT 0,
    rejected_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'QUEUED',    -- 'QUEUED', 'RUNNING', 'COMPLETED', 'PARTIAL', 'FAILED', 'CANCELLED'
    progress_percentage INTEGER DEFAULT 0,
    error_message TEXT,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_discovery_jobs_status ON discovery_jobs(status);
CREATE INDEX IF NOT EXISTS idx_discovery_jobs_location ON discovery_jobs(location_name);

-- 3. Discovered Businesses (Pre-Lead Buffer Table)
CREATE TABLE IF NOT EXISTS discovered_businesses (
    id TEXT PRIMARY KEY,
    job_id TEXT REFERENCES discovery_jobs(id) ON DELETE CASCADE,
    business_name TEXT NOT NULL,
    category TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT DEFAULT 'Jharkhand',
    phone TEXT,
    whatsapp TEXT,
    email TEXT,
    website_url TEXT,
    canonical_domain TEXT,
    google_maps_url TEXT,
    social_url TEXT,
    source TEXT NOT NULL,
    source_url TEXT,
    raw_data TEXT,                   -- JSON payload of source record
    website_status TEXT DEFAULT 'UNVERIFIED', -- 'HAS_WEBSITE', 'NO_WEBSITE_FOUND', 'WEBSITE_UNVERIFIED'
    opportunity_class TEXT DEFAULT 'UNVERIFIED', -- 'NO_WEBSITE', 'WEAK_WEBSITE', 'REDESIGN_OPPORTUNITY', 'GOOD_WEBSITE', 'UNVERIFIED'
    opportunity_score INTEGER DEFAULT 0,
    audit_evidence TEXT,             -- JSON summary of observable findings
    recommended_offer TEXT,          -- e.g. 'Business Website', 'B2B Catalogue'
    recommended_price NUMERIC(10,2) DEFAULT 2999.00,
    is_converted_to_lead INTEGER DEFAULT 0,
    engine_lead_id TEXT REFERENCES engine_leads(id) ON DELETE SET NULL,
    discovered_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    last_audited_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_discovered_job ON discovered_businesses(job_id);
CREATE INDEX IF NOT EXISTS idx_discovered_city ON discovered_businesses(city);
CREATE INDEX IF NOT EXISTS idx_discovered_opp ON discovered_businesses(opportunity_class);
CREATE INDEX IF NOT EXISTS idx_discovered_domain ON discovered_businesses(canonical_domain);
CREATE INDEX IF NOT EXISTS idx_discovered_converted ON discovered_businesses(is_converted_to_lead);

-- 4. Website Audits Detail Table
CREATE TABLE IF NOT EXISTS website_audits (
    id TEXT PRIMARY KEY,
    discovered_business_id TEXT REFERENCES discovered_businesses(id) ON DELETE CASCADE,
    website_url TEXT NOT NULL,
    has_https INTEGER DEFAULT 0,
    has_mobile_meta INTEGER DEFAULT 0,
    has_whatsapp_cta INTEGER DEFAULT 0,
    has_contact_form INTEGER DEFAULT 0,
    has_broken_links INTEGER DEFAULT 0,
    load_time_ms INTEGER,
    seo_title TEXT,
    seo_h1 TEXT,
    audit_findings TEXT,             -- JSON array of specific evidence strings
    opportunity_verdict TEXT NOT NULL, -- 'NO_WEBSITE', 'WEAK_WEBSITE', 'REDESIGN_OPPORTUNITY', 'GOOD_WEBSITE'
    audited_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_audits_business ON website_audits(discovered_business_id);
