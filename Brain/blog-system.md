# Public Blog & Engineering Insights System — Rahnoxa

## 1. Overview

The Rahnoxa technical blog serves as the primary organic acquisition engine for technical buyers, CTOs, and founders seeking software engineering services.

- **Index URL**: `/blog`
- **Article URL Pattern**: `/blog/:slug`
- **Structured Schema**: Fully automated `BlogPosting` JSON-LD schema injected via `react-helmet-async`.
- **Taxonomy Categories**:
  - `Software Architecture`
  - `ERP & Enterprise`
  - `SaaS & Cloud`
  - `Software Engineering`
  - `Database & Cloud`
  - `Mobile Engineering`

---

## 2. Dynamic SEO Integration

Every published article automatically generates:
1. **Dynamic Meta Title**: `<Title> – Rahnoxa`
2. **Meta Description**: 150-160 character technical excerpt.
3. **Canonical URL**: `https://rahnoxa.pages.dev/blog/:slug`
4. **Open Graph & Twitter Card**: Pre-configured with featured image, title, and site name.
5. **JSON-LD Schema**:
   ```json
   {
     "@context": "https://schema.org",
     "@type": "BlogPosting",
     "headline": "...",
     "description": "...",
     "author": { "@type": "Organization", "name": "Rahnoxa" },
     "datePublished": "2026-08-18T...",
     "mainEntityOfPage": "https://rahnoxa.pages.dev/blog/..."
   }
   ```
