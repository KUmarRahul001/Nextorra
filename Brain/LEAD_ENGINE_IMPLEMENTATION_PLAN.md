# RAHNOXA Conversions Engine — Implementation Plan & Synthesis

**Document Version:** 1.1.0  
**Authors:** Lead Multi-Agent Architectural Council (Product, CRM, Database, Backend, Frontend, QA, DevOps)  
**Status:** Implementation Ready (Phase 0 Audit Complete)

---

## 1. Existing vs Proposed Architecture

```
                       [ Incoming Outreach & Lead Sources ]
                                        │
                                        ▼
    ┌────────────────────────────────────────────────────────────────────────┐
    │  Frontend Admin Portal (/admin/dashboard)                              │
    │  • NEW: "Tonight Mode Sales Desk" (High-priority action queue)         │
    │  • NEW: Lead Pipeline Manager & CSV Multi-Column Importer              │
    │  • NEW: 1-Click WhatsApp Personalized Launcher                         │
    │  • NEW: Instant 50% Milestone Quotation & Advance Tracker              │
    └───────────────────────────────────┬────────────────────────────────────┘
                                        │ /api/v1/engine/*
                                        ▼
    ┌────────────────────────────────────────────────────────────────────────┐
    │  Express.js Backend API (Render)                                       │
    │  • engine.routes.js + EngineController.js                              │
    │  • Robust Multi-Factor Deduplication (Phone, Email, Domain, Name+City) │
    │  • Rule-Based Transparent Lead Scoring Engine (+Reasoning Breakdown)   │
    │  • Strict Status Transition State Machine                              │
    └───────────────────────────────────┬────────────────────────────────────┘
                                        │
                                        ▼
    ┌────────────────────────────────────────────────────────────────────────┐
    │  Supabase PostgreSQL Database                                          │
    │  • engine_leads (Indexed on status, temperature, city, follow_up)      │
    │  • campaigns (Multi-geo, multi-industry tracking)                      │
    │  • quotations (Automated 50% advance / balance calculation)             │
    │  • outreach_queue (Human-in-the-loop approved message drafts)          │
    └────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Database Schema & Migration Strategy
- **Migration File:** `backend/database/migrations/0003_engine_leads_schema.sql`
- **Nullable Flexibility:** Phone, WhatsApp, and Email are appropriately nullable to prevent rejecting real businesses that only expose one contact channel.
- **Robust Deduplication Logic:** Backend checks across 4 composite keys:
  1. `whatsapp` (exact match if present)
  2. `phone` (exact match if present)
  3. `website_url` domain extraction
  4. `LOWER(business_name) + LOWER(city)` composite match.
- **Performance Indexes:** Indexed on `status`, `temperature`, `city`, `industry`, `next_follow_up`, and `lead_score`.

---

## 3. Backend API Endpoints (`/api/v1/engine`)

| Method | Route | Description | Auth |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/v1/engine/tonight` | Get prioritized HOT leads, calls, active quotes & advance metrics | Admin |
| `GET` | `/api/v1/engine/leads` | Filterable lead list with search, temperature, city, pagination | Admin |
| `POST` | `/api/v1/engine/leads/import` | Bulk CSV import with deduplication and validation report | Admin |
| `POST` | `/api/v1/engine/leads/score` | Re-evaluates transparent lead scores and temperature | Admin |
| `POST` | `/api/v1/engine/quotes` | Generate quotation with automatic 50% advance split | Admin |
| `PUT` | `/api/v1/engine/leads/:id/status` | Safe state-machine status update | Admin |
| `PUT` | `/api/v1/engine/leads/:id/advance` | Marks 50% advance received, transitions lead to WON & creates project | Admin |

---

## 4. Frontend Component Breakdown

1. **`TonightModeDesk.tsx`:** The core 7:00 PM – 10:00 PM cockpit showing summary counters, HOT lead action cards, 1-click WhatsApp trigger, and advance payment status.
2. **`LeadImporterModal.tsx`:** Drag-and-drop CSV importer with column mapping preview, deduplication report, and error breakdown.
3. **`QuoteBuilderModal.tsx`:** 3-step quote generator with instant 50% advance calculation and copyable quotation summary.

---

## 5. Security & Row Level Security (RLS)
- All engine endpoints are protected by `authenticate` and `authorize('superadmin', 'admin')` middlewares.
- Service keys remain isolated on the Render backend; no database credentials or service-role keys are exposed to the client bundle.

---

## 6. End-to-End Acceptance Test Workflow
1. Import 50 sample leads via CSV.
2. Verify system reports valid vs duplicate vs invalid records.
3. Verify scoring engine flags top candidates as **HOT** with transparent reason tags.
4. Launch 1-click personalized WhatsApp message for a coaching institute in Jamshedpur.
5. Transition status to `QUALIFIED` → `CONSULTATION`.
6. Generate ₹2,999 quote with automatic ₹1,499.50 advance.
7. Record advance payment, confirm state transitions to `WON`, and verify revenue pulse updates in Tonight Mode.
