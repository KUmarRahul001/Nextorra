# RAHNOXA — COMPLETE BUSINESS, PRODUCT, TECHNICAL & SERVICE CAPABILITY AUDIT

**Document Version:** 1.0.0 (Forensic Audit & Master Context)  
**Target Repository:** `Nextorra` (Version 2.4.0)  
**Auditor:** Antigravity Senior Software Architect & Security Auditor  
**Database Authority:** Supabase PostgreSQL (Remote Cloud Authority)  
**Operating Mode:** Forensic Read-Only Capability Extraction  

---

## 1. Executive Overview

**RAHNOXA** is an agile, full-cycle software engineering, digital product studio, and automation provider founded by Rahul Kumar, operating from Jamshedpur (Jharkhand, India) and serving clients across India and globally.

The `Nextorra` (v2.4.0) codebase serves a dual role:
1. **Public Web Experience**: A high-performance, dark-themed React 18 Single-Page Application (SPA) driven by Vite, Tailwind CSS, and Framer Motion. It includes an edge AI chatbot (**RahBot**), dynamic project showcase, automated SEO blog, and 14 dedicated service landing pages.
2. **Operations & Automation Gateway**: A production Node.js Express REST API backed strictly by **Supabase PostgreSQL**, powering a **Local Business Discovery Radar** (OpenStreetMap/Nominatim scraper), automated **7-tab Excel lead generation** (`ExcelJS`), an automated **SEO news cron engine**, Cloudinary CDN media uploads, and a browser-based **Two-Way Voice AI Agent** ("Rishima AI").

---

## 2. Technology Stack Audit

| Category | Technology | Version | Evidence in Codebase | Real-World Operational Status |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend Framework** | React | `^18.3.1` | [`frontend/package.json`](file:///home/rahul-kumar/Desktop/Nextorra/frontend/package.json) | **Active Production** (Vite SPA) |
| **Language** | TypeScript / JavaScript | `^5.5.3` | `frontend/tsconfig.json` | **Active Production** |
| **Styling & Motion** | Tailwind CSS + Framer Motion | `^3.4.1` / `^11.0.8` | `frontend/tailwind.config.js` | **Active Production** |
| **Icons & Visuals** | Lucide React + React Icons | `^0.344.0` / `^5.5.0` | `frontend/src/components` | **Active Production** |
| **Backend Runtime** | Node.js (ESM) + Express | `^4.21.2` | [`backend/package.json`](file:///home/rahul-kumar/Desktop/Nextorra/backend/package.json) | **Active Production** |
| **Database Authority** | Supabase PostgreSQL | `^2.112.3` | [`backend/src/config/supabase.js`](file:///home/rahul-kumar/Desktop/Nextorra/backend/src/config/supabase.js) | **Strict Single Database Authority** |
| **Authentication** | JWT (`jsonwebtoken`) | `^9.0.2` | [`backend/src/services/auth.service.js`](file:///home/rahul-kumar/Desktop/Nextorra/backend/src/services/auth.service.js) | **Active Admin Gate** (No public sign-up) |
| **File Storage / CDN** | Cloudinary + Multer | `^1.41.3` / `^2.2.0` | [`backend/src/services/cloudinary.service.js`](file:///home/rahul-kumar/Desktop/Nextorra/backend/src/services/cloudinary.service.js) | **Active Production** |
| **Spreadsheet Engine** | ExcelJS | `^4.4.0` | [`backend/src/services/discovery/excelGenerator.js`](file:///home/rahul-kumar/Desktop/Nextorra/backend/src/services/discovery/excelGenerator.js) | **Active Production (7 Tabs)** |
| **Automation / Cron** | Node-Cron | `^3.0.3` | [`backend/src/services/newsService.js`](file:///home/rahul-kumar/Desktop/Nextorra/backend/src/services/newsService.js) | **Active Daily 18:00 IST Cron** |
| **Voice / Telephony** | WebRTC Browser Engine | Custom | [`backend/src/voice-agent/session/browserVoiceSession.js`](file:///home/rahul-kumar/Desktop/Nextorra/backend/src/voice-agent/session/browserVoiceSession.js) | **Active In-Browser Engine** |
| **Payment Gateways** | Razorpay / Cashfree | — | Mentions in `servicesKnowledge.js` & `plans.js` | **Offered Client Service** (No platform SDK) |

---

## 3. Page & Route Inventory

### 3.1 Public Portal Routes (22 Routes)
1. **`/` (Home)**: Hero section, tech badges, live case studies, delivery timeline, pricing teasers, and lead contact intake.
2. **`/services`**: Directory of all 14 core digital solutions.
3. **`/services/web-development`**: Web design & landing pages (Starter ₹4,999 to Pro ₹18,999).
4. **`/services/full-stack-web-apps`**: Custom web application development (Starter ₹34,999 to Pro ₹99,999).
5. **`/services/app-development`**: Mobile app engineering (Android Starter ₹39,999 to Cross-Platform ₹69,999).
6. **`/services/custom-software-api-integration`**: Third-party API, CRM, and webhook engineering (₹1,999 to ₹11,999).
7. **`/services/erp-enterprise-applications`**: Custom ERP & business workflow automation (₹59,999 to ₹2,25,000+).
8. **`/services/saas-products`**: Cloud SaaS MVP development (₹49,999 to ₹1,79,999+).
9. **`/services/desktop-applications`**: Offline-first Electron/Tauri desktop software (₹34,999 to ₹99,999).
10. **`/services/social-media-marketing`**: Social media management packages (₹2,499 to ₹11,999/mo).
11. **`/services/lead-generation`**: Local Google Maps & B2B lead generation engines (₹2,499 to ₹3,499/mo).
12. **`/services/sms-marketing`**: DLT-compliant SMS gateways and transactional alerts (₹1,999 to ₹6,999).
13. **`/services/email-marketing`**: Cold outreach, newsletter systems, and DNS authentication (SPF/DKIM) (₹1,999 to ₹4,999/mo).
14. **`/services/missed-call-service`**: Automated missed-call lead capture (₹2,499 to ₹7,999).
15. **`/services/graphic-design`**: Vector logos, branding kits, and marketing collateral (₹2,499 to ₹8,999).
16. **`/services/voice-call-services`**: Interactive voice broadcasting and phone trees (₹3,499 to ₹11,999).
17. **`/projects/:slug`**: Dynamic case study detail page backed by Supabase.
18. **`/blog` & `/blog/:slug`**: Automated SEO blog engine with category tags and metadata.
19. **`/contact` & `/get-started`**: Lead intake form with budget and timeline qualification.
20. **`/internship`**: Career and student internship portal.
21. **`/terms-and-conditions`**: Commercial clauses: 50% advance / 50% delivery, 30-day bug warranty, 100% IP handover.
22. **`/privacy-policy`**: DPDP Act (India) and GDPR compliant privacy terms.

### 3.2 Administrative Control Center Routes (9 Protected Routes)
* **`/admin/login`**: Rate-limited administrative access.
* **`/admin` (Dashboard)**: Aggregate telemetry (Projects, Articles, Leads, Conversations).
* **`/admin/leads`**: Inbound CRM lead triage (`NEW` → `CONTACTED` → `QUALIFIED` → `WON` → `LOST`).
* **`/admin/automation`**: Local Business Discovery Radar + Instant Excel Export.
* **`/admin/projects`**: Project portfolio CRUD with Cloudinary image upload.
* **`/admin/blog`**: Markdown article editor with AI-assisted drafting.
* **`/admin/chat`**: RahBot conversation session logs.
* **`/admin/knowledge`**: Dynamic RAG knowledge item CRUD.
* **`/admin/settings`**: Site-wide configuration and automation toggles.

---

## 4. Master Commercial Price Matrix

| Deliverable Category | Starter Package | Standard / Growth (Recommended) | Pro / Enterprise | Turnaround SLA |
| :--- | :---: | :---: | :---: | :---: |
| **High-Converting Landing Page** | ₹2,000 – ₹3,499 | **₹4,999** | ₹7,999 | 24–72 Hours |
| **Business Website (3–5 Pages)** | ₹5,000 – ₹7,999 | **₹11,999** | ₹18,999 | 3–7 Days |
| **E-Commerce Store MVP** | ₹12,000 – ₹14,999 | **₹22,999** | ₹34,999 | 7–14 Days |
| **Custom Web Application / MVP** | ₹34,999 – ₹39,999 | **₹64,999 – ₹69,999** | ₹99,999 – ₹1,19,999 | 2–4 Weeks |
| **Cross-Platform Mobile App (iOS/Android)**| ₹39,999 – ₹44,999 | **₹69,999 – ₹79,999** | ₹1,19,999 – ₹1,39,999 | 3–6 Weeks |
| **Custom ERP / Enterprise System** | ₹59,999 – ₹75,000 | **₹1,19,999 – ₹1,50,000** | ₹2,25,000 – ₹2,75,000+ | 4–8 Weeks |
| **Multi-Tenant SaaS Platform** | ₹49,999 – ₹64,999 | **₹99,999 – ₹1,24,999** | ₹1,79,999 – ₹2,19,999+ | 4–8 Weeks |
| **Single API / Webhook Integration** | ₹1,999 | **₹4,999 – ₹5,999** | ₹11,999 | 24–72 Hours |
| **Emergency Website / Server Crash Fix**| — | **₹2,999** (Fixed) | — | < 4–8 Hours |
| **Broken DNS, Domain & SSL Fix** | — | **₹1,499** (Fixed) | — | < 2–4 Hours |
| **Spam / Bouncing Email (SPF/DKIM) Fix** | — | **₹1,999** (Fixed) | — | < 2–4 Hours |
| **Hacked Website Malware Cleanup** | — | **₹4,999** (Fixed) | — | < 12 Hours |
| **Essential Monthly Care Retainer** | — | **₹1,499 / month** | — | Ongoing (1 dev hr) |
| **Growth Care Retainer** | — | **₹3,999 / month** | — | Ongoing (4 dev hrs) |

---

## 5. Overclaim Prevention & Reality Check

To preserve 100% credibility when presenting proposals to clients:
1. **Payment Gateways**: Do NOT claim that RAHNOXA runs its own in-house payment gateway. Clearly state: *"We engineer Razorpay, Cashfree, Stripe, or PhonePe integrations directly into your project using your merchant account."*
2. **User Accounts**: The built-in authentication system is an administrative control gate, not a multi-tenant client membership system. Client user portals are built per custom project requirements.
3. **Telephony**: Browser-based voice qualification (Rishima) is functional in-app; outbound PSTN cellular calling requires client SIP trunk setup (Airtel, Tata Tele, Twilio).
4. **Commercial Pricing Floor**: Full multi-page business websites must **never be quoted below ₹5,000** (enforced in `plans.js`). Single express landing pages may begin at ₹2,000–₹3,499.

---

## 6. Standard Contractual Terms

* **Payment Milestone**: **50% Advance** before engineering kick-off; **50% Balance** upon staging demo approval prior to production release.
* **Warranty**: **30 Days of Free Bug-Fix Warranty** on all custom deliveries.
* **IP Ownership**: **100% Ownership** of source code, configurations, and assets transferred to the client upon final settlement. Zero vendor lock-in.
