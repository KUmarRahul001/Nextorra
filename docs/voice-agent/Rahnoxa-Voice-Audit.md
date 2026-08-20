# Rahnoxa Voice Platform & Codebase Audit

**Date**: 2026-08-20  
**Project**: Rahnoxa Platform (KUmarRahul001/Nextorra)  
**Target Voice Agent**: Rishima (Outbound AI Sales & Discovery Calling)

---

## 1. CURRENT ARCHITECTURE

```text
                  RAHNOXA ADMIN LEADS (/admin/leads)
                             │
                      Select Lead & Click
                         [ AI CALL ]
                             │
                             ▼
                    RAHNOXA BACKEND API
                   (POST /v1/voice/calls/start)
                             │
                             ▼
                    CALL ORCHESTRATOR
         (backend/src/voice-agent/call-manager/callManager.js)
                             │
                             ▼
                    RISHIMA VOICE AGENT
         (backend/src/voice-agent/prompts/voice.prompt.js)
                             │
                             ▼
             TELEPHONY PROVIDER ABSTRACTION
        (backend/src/voice-agent/telephony/telephonyProvider.js)
                             │
                             ▼
                 ASTERISK / LIVEKIT SIP TRUNK
                             │
                             ▼
                    AIRTEL FIBER PSTN
                             │
                             ▼
                  PHYSICAL MOBILE RECIPIENT
```

---

## 2. CODEBASE INVENTORY & VERIFICATION

### A. Frontend Layer
- **`src/pages/admin/AdminLeads.tsx`**:
  - Live table showing captured leads from website forms and RahBot assistant.
  - **`[ AI CALL ]`** button calls `api.startVoiceCall(lead.id, selectedEngine)`.
  - Header features real-time carrier health status checking `/v1/voice/health`.
  - **Simulation completely removed**: Zero fake dialogs, zero hard-coded scores.

### B. Backend Controller & Gateway
- **`backend/src/routes/v1/voice.routes.js`**:
  - `POST /v1/voice/calls/start`: Initiates real PSTN call dispatch.
  - `GET /v1/voice/health`: Returns current SIP trunk readiness state.
  - `GET /v1/voice/providers`: Returns configured voice providers (Open-Source LiveKit vs. external).
  - `GET /v1/voice/calls/:leadId`: Fetches historical call records and transcripts.

### C. Voice Engine & Orchestration
- **`backend/src/voice-agent/call-manager/callManager.js`**:
  - Validates lead existence, phone number format, and single active-call concurrency lock.
  - Generates custom system prompt for **Rishima** embedding lead metadata, budget, timeline, and canonical service specifications.
  - Enforces strict validation: Refuses to fake a call if PSTN is unconfigured.
- **`backend/src/voice-agent/telephony/telephonyProvider.js`**:
  - Universal telephony abstraction layer decoupling Asterisk/LiveKit from carrier-specific interfaces.
- **`backend/src/voice-agent/prompts/voice.prompt.js`**:
  - System prompt generator for the outbound sales assistant (**Rishima**), incorporating Rahnoxa commercial pricing and transparent milestone policies.

### D. Single Source of Truth Database
- **`backend/database/supabase.js`**:
  - `leads`: Authoritative leads table.
  - `lead_calls`: Stores real call metadata, status, direction, duration, recording URL, and summary.
  - `call_transcripts`: Sequential speaker attribution records (`speaker`, `text`, `sequence`).
  - `knowledge_items`: Authoritative commercial service definitions.

---

## 3. WHAT ACTUALLY WORKS VS. WHAT IS MISSING

| Component | Status | Details |
| :--- | :---: | :--- |
| **Admin UI & Action Trigger** | ✅ **WORKING** | Single click invokes real backend endpoint. |
| **Lead Context & Service Matching**| ✅ **WORKING** | Canonical service knowledge resolved dynamically without arbitrary fallbacks. |
| **Orchestration & Validation** | ✅ **WORKING** | Strict parameter validation and active-call concurrency locking. |
| **PSTN Telephony Gateway** | ⏳ **AWAITING AIRTEL CARRIER LINK** | LiveKit SIP / Asterisk gateway requires connection to the Airtel Fiber landline interface. |
| **Physical Phone Ringing** | ⏳ **BLOCKED ON AIRTEL INTERFACE** | Waiting for Airtel Fiber landline SIP extraction or analog FXS-to-FXO bridge. |

---

## 4. CURRENT BLOCKERS
1. **Physical Interconnect to Airtel Landline**: Determining whether the consumer Airtel Xstream Fiber connection allows direct SIP trunk authentication or requires an analog FXS-to-FXO VoIP gateway bridge.
