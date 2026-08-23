# Security Architecture & Policies — Rahnoxa

## 1. Authentication & Session Security

- **Algorithm**: HMAC-SHA256 bearer tokens with 7-day expiration.
- **Secret Management**: Tokens signed using `AUTH_SECRET` environment binding on Cloudflare Pages.
- **Passwords**: Hashed with SHA-256 and platform-specific salt.
- **Frontend Isolation**: Tokens stored exclusively in client-side storage and automatically transmitted in the `Authorization: Bearer <token>` header.

---

## 2. API Hardening & Input Sanitization

- **Regex Email Validation**: All lead submissions must match standard RFC email formatting.
- **Payload Limits**: Strict length controls on incoming contact messages.
- **Prompt Injection Filter**: All conversational input to RahBot is scrutinized against instruction overriding patterns.

---

## 3. Environment Secrets

| Variable Name | Purpose | Default / Fallback |
| :--- | :--- | :--- |
| `AUTH_SECRET` | Signing JWT admin tokens | Built-in production fallback key |
| `ADMIN_PASSWORD` | Superadmin initial password | `admin@rahnoxa2025` |
| `DB` | Cloudflare D1 Database binding | In-memory edge repository fallback |
