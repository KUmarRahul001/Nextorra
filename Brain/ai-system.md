# Rahnoxa Custom AI Platform Architecture

The Rahnoxa AI platform is built around an owned, provider-agnostic inference abstraction that eliminates vendor lock-in.

---

## 1. AI Topology

```text
Visitor / Admin
      │
      ▼
POST /v1/chat
      │
      ▼
Rahnoxa AI Gateway (backend/ai/core/gateway.js)
      │
      ├── 1. Safety Guardrails (Prompt-Injection & Secret Leak Filter)
      ├── 2. RAG Knowledge Retrieval (Domain Scoring Engine)
      └── 3. Provider Routing:
             ├── Rahnoxa Native Local Provider (Zero-cost fallback)
             ├── Rahnoxa Ollama Provider (Self-hosted local runner)
             ├── Rahnoxa vLLM Provider (High-throughput inference cluster)
             └── Rahnoxa Custom HTTP Provider (Private VPC endpoints)
```

---

## 2. RahBot Grounding & Safety
- **No Hallucinations**: Grounded in authentic Rahnoxa services, ERP capabilities, tech stack, and internship programs.
- **Safety**: Blocks instruction override, prompt-leak attempts, and privileged credential probes.
- **Lead Capture**: Seamlessly extracts visitor requirements into structured lead enquiries.
