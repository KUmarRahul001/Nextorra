# 🏗️ Rahnoxa Pricing System Implementation Architecture

**Document Version:** 1.0.0 (Production)  
**Date:** August 2026  
**Status:** FULLY IMPLEMENTED & CENTRALIZED

---

## 1. Single Source of Truth Architecture

Rahnoxa enforces a single canonical data pipeline for all service pricing, specifications, turnaround times, warranties, and emergency triage rates across both frontend and backend layers:

```
[docs/business/PRICE_MATRIX.md] (Commercial Source of Truth)
        │
        ├──► [src/data/services.ts] (Canonical TypeScript Data Model)
        │         ├──► [src/components/ServiceTemplate.tsx] (Individual Service Pages)
        │         ├──► [src/pages/ServicesOverview.tsx] (Public Commercial Catalog)
        │         ├──► [src/components/sections/ServicesSection.tsx] (Homepage Service Grid)
        │         ├──► [src/components/sections/PricingSection.tsx] (Homepage Engagement Models)
        │         └──► [src/components/chatbot/knowledge.ts] (Client-Side RahBot Engine)
        │
        └──► [backend/ai/knowledge/servicesKnowledge.js] (Backend AI Knowledge Sync)
                  └──► [backend/src/routes/v1/chat.routes.js] (Live AI Chatbot API)
```

---

## 2. Canonical Pricing Schema & Service Inventory

Every active service in the Rahnoxa ecosystem inherits the structured pricing schema:

```typescript
export interface ServicePricing {
  model: 'fixed' | 'starting_from' | 'monthly' | 'custom';
  currency: 'INR';
  startingAt: string;
  startingAmount?: number;
  recommendedPrice?: string;
  packages: ServicePackage[];
  fastPrice?: string;
  expressPrice?: string;
  emergencyPrice?: string;
  monthlyRetainer?: string;
  gstNote: string;
  thirdPartyNote: string;
}
```

### Full Implemented Service Map:

1. **Modern Website Design & Engineering (`/services/web-development`)**
   - Starter Landing Page: **₹4,999** (2–3 Days)
   - Growth Business Site (Recommended): **₹11,999** (4–7 Days)
   - Pro Corporate Portal: **₹18,999** (7–12 Days)
   - Priority Rush: ₹14,999 | Express 24h: ₹17,999 | Monthly Care: ₹1,499/mo

2. **Full Stack Web Apps (`/services/full-stack-web-apps`)**
   - Starter MVP Web App: **₹39,999** (2 Weeks)
   - Growth Business Platform (Recommended): **₹69,999** (3–4 Weeks)
   - Pro Custom Architecture: **₹1,19,999** (4–6 Weeks)
   - Monthly Retainer: ₹3,999/mo

3. **Mobile App Development (`/services/app-development`)**
   - Starter Android App: **₹44,999** (3 Weeks)
   - Cross-Platform App (iOS + Android - Recommended): **₹79,999** (4–5 Weeks)
   - Pro Marketplace / Real-Time: **₹1,39,999** (6–8 Weeks)
   - Monthly Retainer: ₹4,999/mo

4. **Custom Software & API Integration (`/services/custom-software-api-integration`)**
   - Single API / Gateway Setup: **₹1,999** (24–48 Hours)
   - Standard Automation Bridge (Recommended): **₹5,999** (3–5 Days)
   - Pro Multi-System Sync: **₹11,999** (5–7 Days)
   - Emergency Webhook Fix: **₹2,999**

5. **ERP & Enterprise Applications (`/services/erp-enterprise-applications`)**
   - Starter Modular ERP: **₹75,000** (3–4 Weeks)
   - Growth Multi-Module ERP (Recommended): **₹1,50,000** (6–8 Weeks)
   - Pro Enterprise Custom Suite: **₹2,75,000+** (8–12 Weeks)
   - Monthly Retainer: ₹8,999/mo

6. **SaaS Products (`/services/saas-products`)**
   - Starter SaaS MVP: **₹64,999** (3–4 Weeks)
   - Growth SaaS Platform (Recommended): **₹1,24,999** (5–6 Weeks)
   - Scale SaaS Foundation: **₹2,19,999+** (8–10 Weeks)
   - Monthly Retainer: ₹6,999/mo

7. **Desktop Applications (`/services/desktop-applications`)**
   - Starter Desktop Utility: **₹34,999** (2 Weeks)
   - Growth POS & Hardware App (Recommended): **₹59,999** (3–4 Weeks)
   - Pro High-Performance Tool: **₹99,999** (5–6 Weeks)

8. **B2B Lead Generation & Local Dominance (`/services/lead-generation`)**
   - GBP Setup & Verification: **₹2,499** (2 Days)
   - Local Map Domination & Funnel (Recommended): **₹4,499** (3–4 Days)
   - Monthly Local Dominance Retainer: **₹3,499/mo**

9. **Social Media Marketing & Creatives (`/services/social-media-marketing`)**
   - Starter Creative Pack (10 Posts): **₹2,499** (2–3 Days)
   - Growth Social Retainer (16 Posts/mo - Recommended): **₹5,999/mo**
   - Pro Brand Dominance Retainer: **₹11,999/mo**

10. **Brand & Graphic Design (`/services/graphic-design`)**
    - Fast-Track Logo Starter: **₹2,499** (2 Days)
    - Complete Brand Identity Suite (Recommended): **₹4,499** (3–4 Days)
    - Investor Pitch Deck & Corporate Kit: **₹8,999** (4–5 Days)

11. **Email Marketing & Deliverability (`/services/email-marketing`)**
    - Deliverability & SPF/DKIM Rescue: **₹1,999** (24 Hours)
    - Automation & Template Setup (Recommended): **₹3,999** (3 Days)
    - Monthly Email Management: **₹4,999/mo**

12. **SMS Marketing & Transactional Alerts (`/services/sms-marketing`)**
    - SMS Gateway API Setup: **₹1,999** (24 Hours)
    - DLT Registration & Automation Suite (Recommended): **₹3,499** (2–3 Days)
    - Pro Custom Messaging Engine: **₹6,999** (4–5 Days)

13. **Missed Call Alert Service (`/services/missed-call-service`)**
    - Starter Missed Call Capture: **₹2,499** (2 Days)
    - Growth WhatsApp Callback Suite (Recommended): **₹4,499** (3 Days)
    - Pro Multi-Channel Suite: **₹7,999** (4 Days)

14. **Voice Call & IVR Solutions (`/services/voice-call-services`)**
    - Starter Voice Broadcast (OBD): **₹3,499** (2 Days)
    - Growth Virtual IVR Receptionist (Recommended): **₹6,499** (3–4 Days)
    - Pro Multi-Level Cloud PBX: **₹11,999** (5–7 Days)

---

## 3. Emergency Rescue Service Suite (Dedicated Fixed Pricing)

- **Emergency Website Crash Fix:** **₹2,999** (SLA < 4–8 Hours)
- **Broken DNS, Domain & SSL Fix:** **₹1,499** (SLA < 2–4 Hours)
- **Spam / Bouncing Email (SPF/DKIM/DMARC) Fix:** **₹1,999** (SLA < 2–4 Hours)
- **Hacked Website Cleanup & Malware Removal:** **₹4,999** (SLA < 12 Hours)
- **Last-Minute 24-Hour Express Website Launch:** **₹7,499** (SLA < 24 Hours)

---

## 4. Recurring Care & Maintenance Plans

- **Essential Web Care:** **₹1,499 / month** (1 dev hr/mo, 24/7 uptime, weekly backups, security patches)
- **Growth Care Retainer:** **₹3,999 / month** (4 dev hrs/mo, monthly Core Web Vitals, WhatsApp bot health)
- **Digital Command Retainer:** **₹8,999 / month** (8 dev hrs/mo, full-stack database + local SEO + priority SLA)
