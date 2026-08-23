# RAHNOXA Conversions Engine — Solo-Developer Client Acquisition & Pipeline Architecture
**Document Version:** 1.0.0 (Brainstorming & Architecture Blueprint)  
**Author:** Lead Multi-Agent Architectural Council (Product, Growth, CRM, Backend, UX, Compliance, QA)  
**Target Operating Profile:** Solo Senior Developer (18 hrs/week: Mon–Sat 7:00 PM – 10:00 PM + Flexible Sunday)

---

## 1. Executive Summary & Core Hypothesis
The primary objective of **RAHNOXA Conversions Engine** is to scale outbound and inbound client conversion from **1,000 → 5,000 → 10,000 prospects** without overwhelming a solo developer.

```
1,000 Targeted Prospects (Quality Scored & Validated)
       │ (10–15% Positive Interaction)
       ▼
 100–150 Positive Responses
       │ (25–30% Qualified Opportunity)
       ▼
   25–40 Scheduled Evening Consultations (10–15 mins)
       │ (60% Structured Quotations Sent)
       ▼
   15–25 Quotations Active
       │ (30–40% Close Rate on 50% Advance)
       ▼
    5–10 Paying Clients (₹15,000 – ₹50,000+ Net Margin)
```

---

## 2. System Name Recommendation
**Recommended Internal Name:** `RAHNOXA Conversions Engine` (Module: `Tonight Mode Sales Desk`)  
*Rationale:* Concise, action-oriented, distinct from generic marketing CRMs, and directly focused on closing advances.

---

## 3. Solo-Developer Operating Model & Daily Workflows

### 3.1 Daytime (Asynchronous Auto-Triage)
- **Zero manual phone calls.**
- Inbound inquiries from WhatsApp / Website form are normalized into Supabase.
- Outbound draft queue is populated automatically by lead scoring rules.

### 3.2 Mon–Sat 7:00 PM – 10:00 PM ("Tonight Mode")
A specialized high-focus view designed specifically to answer one question: **"What actions generate cash tonight?"**
- **7:00 PM – 7:25 PM:** Triage HOT leads (Review & one-click approve WhatsApp draft messages).
- **7:25 PM – 8:15 PM:** Conduct 10–15 minute scheduled consultative calls & send 50% advance UPI links.
- **8:15 PM – 9:45 PM:** Focused engineering delivery on active milestone builds.
- **9:45 PM – 10:00 PM:** Daily review & queue setup for tomorrow.

### 3.3 Sunday ("Deep Architecture & Strategy Mode")
- Bulk CSV/Directory lead imports and enrichment audits.
- Full-pipeline review, campaign ROI analysis, and multi-week project planning.

---

## 4. Database Schema Design (PostgreSQL / Supabase)

```sql
-- 1. Campaigns
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  geography VARCHAR(100) NOT NULL, -- e.g. 'Jamshedpur', 'Adityapur', 'Kolkata'
  industry VARCHAR(100) NOT NULL,  -- e.g. 'Education', 'Manufacturing'
  target_offer VARCHAR(100) NOT NULL, -- e.g. 'Business Website ₹2,999'
  status VARCHAR(50) DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enhanced Leads
CREATE TABLE IF NOT EXISTS engine_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  name VARCHAR(255),
  business_name VARCHAR(255) NOT NULL,
  industry VARCHAR(100),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) DEFAULT 'Jharkhand',
  phone VARCHAR(50),
  whatsapp VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  website_url TEXT,
  google_maps_url TEXT,
  source VARCHAR(100) DEFAULT 'MANUAL_RESEARCH',
  service_opportunity VARCHAR(100), -- 'NO_WEBSITE', 'REDESIGN', 'ERP_MODULE'
  lead_score INT DEFAULT 50,
  temperature VARCHAR(20) DEFAULT 'WARM', -- 'HOT', 'WARM', 'COLD'
  status VARCHAR(50) DEFAULT 'IMPORTED',
  -- Pipeline states: IMPORTED, VALIDATED, CONTACT_READY, CONTACTED, RESPONDED, POSITIVE, QUALIFIED, CONSULTATION, QUOTE_SENT, NEGOTIATION, ADVANCE_PENDING, WON, LOST, OPTED_OUT
  last_contacted_at TIMESTAMPTZ,
  next_follow_up TIMESTAMPTZ,
  opt_out BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Quotations
CREATE TABLE IF NOT EXISTS quotations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES engine_leads(id) ON DELETE CASCADE,
  project_title VARCHAR(255) NOT NULL,
  scope_description TEXT NOT NULL,
  total_price NUMERIC(10,2) NOT NULL,
  advance_amount NUMERIC(10,2) NOT NULL,
  balance_amount NUMERIC(10,2) NOT NULL,
  delivery_days INT NOT NULL,
  status VARCHAR(50) DEFAULT 'SENT', -- DRAFT, SENT, ACCEPTED, ADVANCE_PAID, REJECTED
  valid_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Outreach Queue (Draft & Approval Engine)
CREATE TABLE IF NOT EXISTS outreach_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES engine_leads(id) ON DELETE CASCADE,
  channel VARCHAR(20) NOT NULL, -- 'WHATSAPP', 'EMAIL'
  draft_content TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'PENDING_APPROVAL', -- PENDING_APPROVAL, APPROVED, SENT, FAILED
  scheduled_for TIMESTAMPTZ DEFAULT NOW(),
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Unique index to prevent duplicate lead pollution
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_unique_phone ON engine_leads(whatsapp);
```

---

## 5. API Design & Endpoint Specifications

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/v1/engine/tonight` | Returns prioritized action items for the 7–10 PM window | Admin |
| `GET` | `/api/v1/engine/leads` | Filterable lead pipeline with geo, temperature, and status | Admin |
| `POST` | `/api/v1/engine/leads/import` | Bulk CSV import with deduplication and phone validation | Admin |
| `POST` | `/api/v1/engine/outreach/approve` | One-click approve and generate direct WhatsApp link | Admin |
| `POST` | `/api/v1/engine/quotes/generate` | Generates standardized milestone quotation & advance UPI QR | Admin |
| `PUT` | `/api/v1/engine/leads/:id/advance` | Marks 50% advance received and converts lead to active project | Admin |

---

## 6. Frontend UI / UX Architecture

### 6.1 "Tonight Mode" Screen Components
1. **Financial Pulse Bar:** `HOT Leads: 6 | Calls Scheduled: 2 | Quotes Active: 3 | Advance Pending: ₹5,998`
2. **Opportunity Cards:** Action-oriented cards displaying business name, city, detected problem (*No website*), recommended offer (*₹2,999 Business Website*), and a **1-Click WhatsApp Launch button**.
3. **Quotation Builder Modal:** 3-click quotation generator calculating 50% advance automatically.

### 6.2 Sunday CRM Overview
- Full table with filters for Jamshedpur, Adityapur, Ranchi, Kolkata, and custom campaign tags.
- Conversion funnel visualization calculating actual stage-by-stage dropoff.

---

## 7. Anti-Spam, Safety & Compliance Framework
1. **Strict Human-in-the-Loop:** No unapproved cold blasting. Every cold WhatsApp interaction requires a physical tap/approval by the developer.
2. **Instant Opt-Out Flagging:** Any prospect stating *"Not interested"* or *"Remove"* is flagged as `OPTED_OUT` and permanently suppressed from all future campaign imports.
3. **Rate Limiting:** Maximum 15–20 new targeted cold outreach touches per day to ensure personal engagement and prevent platform restrictions.

---

## 8. MVP Implementation Roadmap (3-Phase Delivery)

### Phase 1: MVP Core (Smallest High-Impact Version)
- Run Supabase migrations for `engine_leads`, `quotations`, and `campaigns`.
- Build the **"Tonight Mode"** UI tab inside the existing Admin portal (`/admin/dashboard`).
- Implement 1-click WhatsApp deep-link generation with personalized templates.

### Phase 2: Quotation & Advance Automation
- PDF / Web-link quote generation with built-in UPI QR code for 50% advances.
- Real-time conversion KPI calculator.

### Phase 3: Geo & Industry Multi-Channel Scaling
- Expand database to 5,000+ validated records across Jharkhand and Kolkata.
- Implement automated website audit opportunity tagger.
