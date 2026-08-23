-- =============================================================================
-- Migration: 0003_engine_leads_schema.sql
-- Description: Schema for RAHNOXA Conversions Engine & Tonight Mode Pipeline
-- Target: Remote Supabase PostgreSQL / Local PostgreSQL
-- =============================================================================

-- 1. Campaigns Table
CREATE TABLE IF NOT EXISTS campaigns (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    geography TEXT NOT NULL,         -- e.g. 'Jamshedpur', 'Adityapur', 'Ranchi', 'Kolkata'
    industry TEXT NOT NULL,          -- e.g. 'Education', 'Manufacturing', 'Retail'
    target_offer TEXT NOT NULL,      -- e.g. 'Business Website ₹2,999', 'B2B Catalogue ₹4,999'
    target_price NUMERIC(10,2) DEFAULT 2999.00,
    status TEXT DEFAULT 'ACTIVE',    -- 'ACTIVE', 'PAUSED', 'COMPLETED'
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_geo ON campaigns(geography);

-- 2. Enhanced Engine Leads Table
CREATE TABLE IF NOT EXISTS engine_leads (
    id TEXT PRIMARY KEY,
    campaign_id TEXT REFERENCES campaigns(id) ON DELETE SET NULL,
    name TEXT,
    business_name TEXT NOT NULL,
    industry TEXT,
    city TEXT NOT NULL,
    state TEXT DEFAULT 'Jharkhand',
    country TEXT DEFAULT 'India',
    phone TEXT,
    whatsapp TEXT,
    email TEXT,
    website_url TEXT,
    social_url TEXT,
    google_maps_url TEXT,
    source TEXT DEFAULT 'MANUAL_RESEARCH',
    service_opportunity TEXT,        -- 'NO_WEBSITE', 'REDESIGN', 'LANDING_PAGE', 'B2B_CATALOGUE', 'CUSTOM_APP'
    lead_score INTEGER DEFAULT 50,
    temperature TEXT DEFAULT 'WARM', -- 'HOT', 'WARM', 'COLD'
    status TEXT DEFAULT 'IMPORTED',  -- 'IMPORTED', 'VALIDATED', 'TARGETED', 'CONTACT_READY', 'CONTACTED', 'RESPONDED', 'POSITIVE', 'QUALIFIED', 'CONSULTATION', 'QUOTE_SENT', 'NEGOTIATION', 'ADVANCE_PENDING', 'WON', 'LOST', 'OPTED_OUT'
    score_reasons TEXT,              -- JSON array or comma-separated reasons
    recommended_offer TEXT,          -- e.g. 'Business Website'
    recommended_price NUMERIC(10,2) DEFAULT 2999.00,
    last_contacted_at TIMESTAMPTZ,
    next_follow_up TIMESTAMPTZ,
    opt_out INTEGER DEFAULT 0,       -- 1 for opted out
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_engine_leads_status ON engine_leads(status);
CREATE INDEX IF NOT EXISTS idx_engine_leads_temp ON engine_leads(temperature);
CREATE INDEX IF NOT EXISTS idx_engine_leads_city ON engine_leads(city);
CREATE INDEX IF NOT EXISTS idx_engine_leads_industry ON engine_leads(industry);
CREATE INDEX IF NOT EXISTS idx_engine_leads_followup ON engine_leads(next_follow_up);
CREATE INDEX IF NOT EXISTS idx_engine_leads_score ON engine_leads(lead_score);

-- 3. Quotations Table
CREATE TABLE IF NOT EXISTS quotations (
    id TEXT PRIMARY KEY,
    lead_id TEXT REFERENCES engine_leads(id) ON DELETE CASCADE,
    client_name TEXT NOT NULL,
    business_name TEXT NOT NULL,
    project_title TEXT NOT NULL,
    scope_description TEXT NOT NULL,
    features TEXT,                   -- JSON array of bullet points
    total_price NUMERIC(10,2) NOT NULL,
    advance_amount NUMERIC(10,2) NOT NULL,
    balance_amount NUMERIC(10,2) NOT NULL,
    delivery_days INTEGER DEFAULT 3,
    status TEXT DEFAULT 'SENT',      -- 'DRAFT', 'SENT', 'ACCEPTED', 'ADVANCE_PAID', 'REJECTED'
    valid_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_quotations_lead_id ON quotations(lead_id);
CREATE INDEX IF NOT EXISTS idx_quotations_status ON quotations(status);

-- 4. Outreach Queue (Draft & Human-in-the-Loop Review Table)
CREATE TABLE IF NOT EXISTS outreach_queue (
    id TEXT PRIMARY KEY,
    lead_id TEXT REFERENCES engine_leads(id) ON DELETE CASCADE,
    channel TEXT NOT NULL,           -- 'WHATSAPP', 'EMAIL'
    template_type TEXT,             -- 'PROBLEM_FIRST', 'DEMO_FIRST', 'BENEFIT_FIRST'
    draft_content TEXT NOT NULL,
    status TEXT DEFAULT 'PENDING_APPROVAL', -- 'PENDING_APPROVAL', 'APPROVED', 'SENT', 'SKIPPED'
    scheduled_for TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_outreach_status ON outreach_queue(status);
CREATE INDEX IF NOT EXISTS idx_outreach_lead ON outreach_queue(lead_id);
