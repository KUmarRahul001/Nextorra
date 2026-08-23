# RahBot — AI Business Assistant Architecture

## 1. Overview

**RahBot** is Rahnoxa's intelligent business assistant and technical qualification agent. Embedded directly into the web application, RahBot enables prospective clients to explore technical services, evaluate scope, and submit structured project enquiries.

```text
┌─────────────────────────────────────────────────────────────┐
│                    VISITOR BROWSER / UI                     │
│  - Floating Launcher (`RahBot.tsx`)                         │
│  - Reactive Chat Window with Framer Motion animations       │
│  - Quick Prompts & Inline Project Qualification Form        │
└──────────────────────────────┬──────────────────────────────┘
                               │ POST /api/chat
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                  EDGE CHAT ROUTE & ENGINE                   │
│  - functions/api/chat/index.js                              │
│  - Prompt-Injection & Jailbreak Defensive Layer             │
│  - Intent Classifier (Services, Pricing, ERP, Jobs, Scoping)│
│  - Semantic Knowledge Retrieval from `knowledge_items`      │
└──────────────────────────────┬──────────────────────────────┘
                               │ Automatic Lead Extraction
                               ▼
┌─────────────────────────────────────────────────────────────┐
│               LEADS & CONVERSATION PIPELINE                 │
│  - Stores user & assistant messages in `messages` table     │
│  - Creates qualified entry in `leads` table (`source: chat`)│
│  - Accessible via /admin/leads and /admin/chat              │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Core Capabilities & Intent Flows

1. **Service Discovery**: Explains Rahnoxa's core engineering domains (Full-Stack Web, React Native / Mobile Apps, Custom ERP Systems, SaaS, API Integrations).
2. **Interactive Scoping & Qualification**:
   - Captures client requirements, tech stack preferences, and timelines.
   - Embeds a rapid qualification form inside the chat.
3. **Human Leadership Handoff**:
   - Triggers direct contact details (`contact.rahnoxa@protonmail.com` and `+91 8434237052 / +91 8434237049`) for complex contracts or legal scopes.
4. **Internship Inquiries**:
   - Guides aspiring engineering interns to `/internship`.

---

## 3. Security Guardrails & Anti-Hallucination

- **Prompt Injection Filter**: Blocks jailbreak patterns, system prompt extraction, or requests to reveal internal secrets.
- **Strict Scope Boundaries**: Prohibits fabricating fixed price quotes or unrealistic delivery guarantees without human review.
- **Lead Protection**: Encrypts and validates all visitor input before writing to the database.
