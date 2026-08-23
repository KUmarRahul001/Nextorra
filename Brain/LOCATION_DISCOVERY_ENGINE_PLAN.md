# RAHNOXA Location Business Discovery & Opportunity Engine Architecture

**Document Version:** 1.0.0  
**Authors:** Lead Multi-Agent Architectural Council (Discovery, Data Engineering, Scraping Ethics, CRM, Security, UX)  
**Core Directive:** Discover local businesses in target geographies (Jharkhand & Kolkata), extract publicly available data, detect website/software opportunities with tangible evidence, score them, and convert them seamlessly into `engine_leads` for 1-click Tonight Mode sales execution.

---

## 1. End-to-End Discovery & Qualification Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. ADMIN LOCATION SEARCH                                                    │
│ Location: Jamshedpur / Adityapur / Kolkata | Category: Coaching / Industrial│
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 2. SOURCE ADAPTER LAYER (BusinessDiscoveryProvider)                         │
│ • DirectoryProvider (ASIA, Justdial public listings, Chamber directories)   │
│ • GoogleBusinessProvider (Public Maps/Places API & business endpoints)      │
│ • ManualCSVProvider / WebSearchProvider (Public business research)          │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 3. NORMALIZATION & DEDUPLICATION                                            │
│ • Phone & WhatsApp normalization (+91 standard, separate verification flag) │
│ • Canonical domain extraction (https://www.abc.com/ → abc.com)              │
│ • Composite deduplication check (Domain, Phone, Business Name + City)       │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 4. EVIDENCE-BASED WEBSITE & DIGITAL AUDIT ENGINE                            │
│ • NO_WEBSITE: No verified website found (+25 pts)                           │
│ • WEAK_WEBSITE: Missing HTTPS, missing WhatsApp CTA, slow mobile UX (+15)  │
│ • REDESIGN_OPPORTUNITY: Outdated layout, no mobile responsive meta (+15)   │
│ • GOOD_WEBSITE: Modern stack, full CTAs (Filtered / Low Priority)          │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 5. OPPORTUNITY & PRICING MAPPER                                             │
│ • Coaching + No Website → "Admission & Course Website" (₹2,999)             │
│ • Manufacturer + Outdated → "B2B Product Catalogue & RFQ System" (₹4,999)   │
│ • Retail/Service + Weak UX → "High-Conversion Business Landing Page" (₹1,999)│
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 6. CONVERSION TO ENGINE_LEADS & TONIGHT MODE READY                          │
│ • Status: CONTACT_READY | Temperature: HOT / WARM                           │
│ • Automated Personalized Draft Generation (Problem-First / Demo-First)      │
│ • Zero Auto-Spam: 1-Click Human Approval launches WhatsApp deep link        │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Source Adapter Architecture (`BusinessDiscoveryProvider`)

```javascript
class BusinessDiscoveryProvider {
  async discover({ location, category, limit = 50 }) {
    throw new Error('Provider must implement discover() method');
  }
}

class DirectoryDiscoveryProvider extends BusinessDiscoveryProvider { ... }
class GoogleBusinessDiscoveryProvider extends BusinessDiscoveryProvider { ... }
class ManualCSVDiscoveryProvider extends BusinessDiscoveryProvider { ... }
```

---

## 3. Evidence-Backed Website Audit & Opportunity Classification

Every opportunity classified by the engine stores verified, observable evidence:
- **`NO_WEBSITE`:** `"No active website found in public directory or search listing."`
- **`NO_WHATSAPP_CTA`:** `"Homepage does not contain click-to-chat WhatsApp link on mobile."`
- **`NO_MOBILE_RESPONSIVE`:** `"Missing viewport meta tag; desktop layout overflows on mobile."`
- **`NO_ENQUIRY_FORM`:** `"No active lead capture or admission enquiry form detected."`

---

## 4. Discovery UI & Admin Experience (`/admin/discovery`)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ 🔍 RAHNOXA LOCATION BUSINESS DISCOVERY                                   │
├──────────────────────────────────────────────────────────────────────────┤
│ Location: [ Jamshedpur (Jharkhand) ▼ ]   Category: [ Coaching Institute ▼]│
│ Max Records: [ 50 ]                      Provider: [ Directory/Search  ▼]│
│                                                                          │
│ [ ▶ START BUSINESS DISCOVERY ]                                           │
├──────────────────────────────────────────────────────────────────────────┤
│ DISCOVERY RESULTS (Job #job-8912 - COMPLETED)                            │
│ Discovered: 50 | Valid: 46 | Duplicates: 3 | Excluded: 1                 │
│ 🔥 Opportunities Detected: 28 (16 No Website, 12 Weak Website)          │
│                                                                          │
│ [x] Sharp Computer Education | Baridih, Jamshedpur | ❌ No Website | 84 |
│     Rec: Business Website (₹2,999) | [Convert to Contact-Ready Lead]     │
│                                                                          │
│ [x] ABC Coaching Hub         | Sakchi, Jamshedpur  | ⚠️ Weak Mobile | 78 │
│     Rec: Website Redesign (₹2,999)  | [Convert to Contact-Ready Lead]     │
│                                                                          │
│ [ 🚀 CONVERT SELECTED (28) TO CONTACT-READY LEADS & GENERATE DRAFTS ]   │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Solo-Developer Safety & Compliance Guardrails

1. **Zero Cold Auto-Blasting:** Discovery only prepares normalized leads and drafts. Outreach is triggered only when the developer clicks **"Open WhatsApp"** or **"Send"** in Tonight Mode.
2. **Permanent Suppression:** Opted-out phone numbers and domains are stored in suppression records to ensure they are never re-imported or re-contacted.
3. **Paced Discovery Runs:** Jobs are throttled with configurable delays (1–2s between requests) to respect server terms and public API rate limits.
