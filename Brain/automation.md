# Daily SEO Blog Automation Engine — Rahnoxa

## 1. Overview

The Rahnoxa platform includes an automated content generation engine scheduled to execute daily at **18:00 IST (6:00 PM IST)**.

```text
┌─────────────────────────────────────────────────────────────┐
│                 DAILY SCHEDULE (18:00 IST)                  │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 TOPIC SELECTION & ROTATION                  │
│  - Queries `automation_runs` to avoid recent duplicates    │
│  - Selects high-intent software engineering topics          │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                TECHNICAL ARTICLE COMPILATION                │
│  - Outline (H1, H2, H3)                                     │
│  - Practical engineering explanations & code patterns       │
│  - Internal links to Rahnoxa services & project showcases   │
│  - SEO keywords, reading time, and meta tags                │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│             SAFETY & APPROVAL PIPELINE (DRAFT)              │
│  - Default: `status = 'DRAFT'` for admin review             │
│  - Optional: Direct publish if `AUTO_PUBLISH` is enabled    │
│  - Audit log written to `automation_runs` table             │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. API Endpoints

- `GET /api/automation`: Retrieve active jobs and last 30 execution logs.
- `PUT /api/automation`: Update schedule or toggle `auto_publish`.
- `POST /api/automation/run`: Manually trigger immediate article generation.
