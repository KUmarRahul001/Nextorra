# Architecture Decision Records (ADR) — Rahnoxa

## ADR-001: Unified Edge Monolith over Distributed Microservices
- **Context**: Rahnoxa requires rapid page loads, global edge delivery, and zero server maintenance overhead.
- **Decision**: Leverage Cloudflare Pages with native Functions (`functions/api/*`) for backend operations rather than a standalone Node/Express server.
- **Consequences**: Zero idle compute cost, sub-50ms global TTFB, unified build and deployment pipeline.

## ADR-002: Universal Persistence Abstraction Layer
- **Context**: Local development environments may not always have active Cloudflare D1 database credentials connected.
- **Decision**: Created `functions/api/_db.js` with auto-detection: utilizes `context.env.DB` if bound, otherwise falls back seamlessly to an in-memory/edge-cached store pre-seeded with baseline data.
- **Consequences**: Local development (`npm run dev`) and edge preview environments function identically without crashing or requiring complex local database setup.

## ADR-003: Safety-First Draft Workflow for AI Content
- **Context**: Automated daily SEO generation runs autonomously.
- **Decision**: Articles default to `status = 'DRAFT'`, requiring administrator review before public indexing unless explicitly overridden via `auto_publish = 1`.
- **Consequences**: Protects domain reputation and SEO rankings from unreviewed or misaligned copy.
