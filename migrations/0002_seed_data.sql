-- =============================================================================
-- Migration: 0002_seed_data.sql
-- Description: Seed initial categories, knowledge base, and showcase records
-- =============================================================================

-- Seed Blog Categories
INSERT OR IGNORE INTO blog_categories (id, name, slug, description) VALUES
('cat-arch', 'Software Architecture', 'software-architecture', 'Deep-dive architectural patterns and distributed systems'),
('cat-erp', 'ERP & Enterprise', 'erp-enterprise', 'Custom ERP systems, modular monoliths, and enterprise workflows'),
('cat-saas', 'SaaS & Cloud', 'saas-cloud', 'Multi-tenant cloud SaaS engineering and low-latency architectures'),
('cat-eng', 'Software Engineering', 'software-engineering', 'Modern full-stack patterns, TypeScript, Node.js, and APIs'),
('cat-db', 'Database & Cloud', 'database-cloud', 'PostgreSQL, edge storage, RLS, and database scaling');

-- Seed Initial Knowledge Base
INSERT OR IGNORE INTO knowledge_items (id, category, title, content, tags, updated_at) VALUES
('know-company', 'company', 'About Rahnoxa', 'Rahnoxa is a specialized software engineering and technology solutions company. We build custom web applications, mobile apps, enterprise ERP modules, SaaS platforms, and API integrations for modern businesses globally.', 'company, overview, about, rahnoxa', CURRENT_TIMESTAMP),
('know-erp', 'services', 'ERP & Enterprise Software Development', 'Rahnoxa designs custom ERP platforms including inventory management, multi-role RBAC, billing, HR modules, reporting, and operational automation.', 'erp, enterprise, business software, custom', CURRENT_TIMESTAMP),
('know-web', 'services', 'Web & SaaS Development', 'We engineer full-stack web applications, multi-tenant SaaS platforms, customer portals, and internal tools using React, TypeScript, Node.js, and modern cloud databases.', 'web, saas, react, typescript, portals', CURRENT_TIMESTAMP),
('know-mobile', 'services', 'Mobile App Development', 'Cross-platform iOS and Android mobile app development with React Native, Flutter, and native integrations.', 'mobile, ios, android, react native, flutter', CURRENT_TIMESTAMP),
('know-pricing', 'pricing', 'Pricing & Engagement Models', 'Rahnoxa offers Milestone-Based Fixed Scope projects, Dedicated Sprint Capacity, and Ongoing Maintenance & Support agreements. Custom software pricing is determined by requirements complexity, integrations, and deployment scale.', 'pricing, cost, quote, estimate, contract', CURRENT_TIMESTAMP),
('know-contact', 'contact', 'Contact & Discovery', 'Email: contact.rahnoxa@protonmail.com | Phones: +91 8434237052 / +91 8434237049 | Location: Jharkhand, India (Delivering globally). Visitors can book a technical discovery call via /get-started or chat with RahBot.', 'contact, email, phone, location, discovery', CURRENT_TIMESTAMP),
('know-internships', 'faq', 'Internship Programs', 'Rahnoxa offers engineering internships in Web Development, Mobile Dev, AI/ML, Python, React, and Data Science. Applications are accepted at /internship.', 'internship, career, training, student, jobs', CURRENT_TIMESTAMP);

-- Seed Default Automation Job
INSERT OR IGNORE INTO automation_jobs (id, name, schedule, enabled, auto_publish, status) VALUES
('job-daily-seo', 'Daily 18:00 IST SEO Blog Generator', '30 12 * * *', 1, 0, 'IDLE');

-- Seed Site Settings
INSERT OR IGNORE INTO site_settings (key, value, updated_at) VALUES
('site_name', 'Rahnoxa', CURRENT_TIMESTAMP),
('site_url', 'https://rahnoxa.pages.dev', CURRENT_TIMESTAMP),
('contact_email', 'contact.rahnoxa@protonmail.com', CURRENT_TIMESTAMP),
('auto_publish_blogs', 'false', CURRENT_TIMESTAMP);
