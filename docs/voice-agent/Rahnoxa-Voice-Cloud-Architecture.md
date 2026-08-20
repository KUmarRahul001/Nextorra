# Rahnoxa Cloud Voice Platform Architecture (Phase 2)

**Stack**: Vercel (Frontend) + Render (Backend/Orchestration) + Supabase (Database/CRM)  
**Agent**: Rishima — AI Technical Sales & Discovery Specialist  
**Telephony Status**: Real-Time Cloud Voice Session (WebRTC) Active | PSTN Carrier Disconnected

---

## 1. HIGH-LEVEL CLOUD ARCHITECTURE

```text
                  VERCEL (Frontend SPA)
                            │
                     HTTPS / WSS
                            │
                            ▼
              RENDER (Node.js & Express API)
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
 Rishima Engine        Leads / CRM      Knowledge Base
(Voice Prompt & Logic)      │           (Supabase Specs)
        │                   └─────┬─────────────┘
        ▼                         ▼
 VoiceSessionProvider          SUPABASE
 (Browser WebRTC Mode)   (Single Source of Truth)
        │
        ├── Real Speech Input (User Microphone)
        ├── Contextual Knowledge Matching
        ├── Rishima Real-time LLM Response
        └── Natural Speech Audio Output
```

---

## 2. KEY CAPABILITIES & COMPLIANCE

1. **Deterministic Knowledge Matching**:
   - Matches incoming prospect enquiries strictly to canonical service specifications in Supabase (`knowledge_items`).
   - Zero hallucinated pricing or fabricated guarantees.
2. **Multilingual Context & Language Persistence**:
   - Supports natural English, Hindi (Hinglish/Devanagari), Tamil, Kannada, Telugu, and Marathi.
   - Detects language switches organically and maintains context without restarting.
3. **Strict Truthfulness**:
   - Real-time WebRTC browser sessions are clearly designated as **`Voice Session`**.
   - Outbound physical phone dialing is designated as **`Phone Call`** and truthfully states `PSTN_NOT_CONFIGURED` when an external carrier trunk is not attached.
   - Zero fake transcripts or fabricated call scoring.
