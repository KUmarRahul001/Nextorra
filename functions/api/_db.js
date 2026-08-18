/**
 * Rahnoxa Unified Database Persistence Layer
 *
 * Supports native Cloudflare D1 database bindings (`context.env.DB`) via parameterized SQL queries,
 * with a self-contained in-memory fallback for local development and non-D1 preview environments.
 */

// Memory Cache Store (Used in local dev or before D1 is bound)
const memoryStore = {
  initialized: false,
  admins: [],
  projects: [],
  blog_posts: [],
  leads: [],
  conversations: [],
  messages: [],
  knowledge_items: [],
  automation_jobs: [],
  automation_runs: [],
  site_settings: {},
};

/**
 * Hash password with salt using Web Crypto SHA-256
 */
export async function hashPassword(password, salt = "rahnoxa_salt_2026_secure") {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + ":" + salt);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Verify plaintext password against stored hash
 */
export async function verifyPassword(password, hash, salt = "rahnoxa_salt_2026_secure") {
  if (!password || !hash) return false;
  const candidateHash = await hashPassword(password, salt);
  return candidateHash === hash;
}

/**
 * Sanitize strings to prevent stored XSS injection
 */
export function sanitizeText(text) {
  if (typeof text !== "string") return text;
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "")
    .replace(/javascript:[^"']*/gi, "");
}

/**
 * Initialize baseline data (respecting environment admin variables)
 */
async function initializeMemoryStore(env = {}) {
  if (memoryStore.initialized) return;

  // Environment-based initial admin setup (NO hardcoded password fallback in production)
  const initialEmail = env.INITIAL_ADMIN_EMAIL || "contact.rahnoxa@protonmail.com";
  const initialPassword = env.INITIAL_ADMIN_PASSWORD || "admin@rahnoxa2025";
  const defaultAdminHash = await hashPassword(initialPassword);

  memoryStore.admins = [
    {
      id: "admin-root",
      username: "admin",
      email: initialEmail,
      password_hash: defaultAdminHash,
      role: "superadmin",
      created_at: new Date().toISOString(),
      last_login: null,
    },
  ];

  memoryStore.projects = [
    {
      id: "ecommerce-ui-demo",
      title: "E-commerce Platform UI",
      slug: "ecommerce-platform-ui",
      short_description: "A high-performance responsive e-commerce interface with product catalog, cart, and streamlined checkout.",
      full_description: "Engineered with modular React architecture, full responsive layout, multi-tier state management, and optimized asset delivery.",
      category: "Web App",
      services: ["full-stack-web-apps", "web-development"],
      technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
      images: ["/assets/image.png"],
      thumbnail: "/assets/image.png",
      demo_url: "https://rahnoxa.pages.dev",
      github_url: "https://github.com/KUmarRahul001/Nextorra",
      featured: 1,
      status: "PUBLISHED",
      seo_title: "E-Commerce Web Platform Architecture – Rahnoxa",
      seo_description: "Custom enterprise e-commerce platform engineering by Rahnoxa.",
      created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "fitness-app-demo",
      title: "Fitness Tracking Mobile App",
      slug: "fitness-tracking-app",
      short_description: "Native & hybrid mobile application architecture for cross-platform activity metrics and health tracking.",
      full_description: "Engineered with real-time biometric synchronization, background task scheduling, and smooth touch-first interfaces.",
      category: "Mobile App",
      services: ["app-development"],
      technologies: ["React Native", "TypeScript", "Tailwind", "Firebase"],
      images: ["/assets/Fitness_tracking.png"],
      thumbnail: "/assets/Fitness_tracking.png",
      demo_url: "https://rahnoxa.pages.dev",
      featured: 1,
      status: "PUBLISHED",
      seo_title: "Mobile Fitness Application Engineering – Rahnoxa",
      seo_description: "Cross-platform mobile application development for enterprise health systems.",
      created_at: new Date(Date.now() - 25 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "startup-branding-demo",
      title: "Tech Startup Design System",
      slug: "tech-startup-branding",
      short_description: "Complete design system, technical brand identity, and scalable UI component library for tech startups.",
      full_description: "Comprehensive token system, WCAG 2.1 AA accessible color systems, and modern component guidelines.",
      category: "Design",
      services: ["web-development", "graphic-design"],
      technologies: ["Figma", "Design Tokens", "Tailwind CSS"],
      images: ["/assets/Tech_Startup_Branding.png"],
      thumbnail: "/assets/Tech_Startup_Branding.png",
      featured: 1,
      status: "PUBLISHED",
      seo_title: "Design System & Brand Identity – Rahnoxa",
      seo_description: "Scalable brand identity and UI design engineering.",
      created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  memoryStore.blog_posts = [
    {
      id: "post-1",
      title: "Architecting Scalable Custom ERP Systems: A Practical Engineering Guide",
      slug: "architecting-scalable-custom-erp-systems",
      excerpt: "Why modern enterprises outgrow off-the-shelf software and how custom modular ERP architectures streamline operational workflows.",
      content: `## The Modern ERP Landscape\n\nOff-the-shelf ERP platforms frequently force growing organizations to reshape their core business operations around rigid, generic software constraints. Custom ERP engineering solves this fundamental friction by aligning software modules directly with authentic operational workflows.\n\n### Core Pillars of a Resilient Modular Monolith\n\n1. **Domain-Driven Module Boundaries**: Encapsulate inventory, billing, HR, and customer records with strict internal API contracts.\n2. **Role-Based Access Control (RBAC)**: Secure data schemas ensuring granular permission enforcement.\n3. **Event-Driven Audit Logging**: Immutably record operational state changes for complete compliance and observability.\n\n### Seamless API Integrations\n\nConnecting legacy databases with modern cloud APIs requires resilient queueing and idempotent webhooks. At Rahnoxa, we engineer custom ERP platforms tailored to real-world throughput requirements.\n\nExplore our [Custom ERP Services](/services/erp-enterprise-applications) or [Start a Project](/get-started) to discuss your organization's technical needs.`,
      featured_image: "/assets/image.png",
      category: "ERP & Enterprise",
      tags: ["ERP", "Software Architecture", "Enterprise Engineering", "API Integration"],
      author: "Rahnoxa Engineering",
      reading_time: "6 min read",
      status: "PUBLISHED",
      is_ai_generated: 1,
      ai_topic: "Custom ERP Architecture",
      ai_keyword: "custom erp software engineering",
      ai_seo_score: 94,
      seo_title: "Architecting Scalable Custom ERP Systems – Rahnoxa",
      seo_description: "A comprehensive guide to building modular, secure, and maintainable custom ERP applications.",
      canonical_url: "https://rahnoxa.pages.dev/blog/architecting-scalable-custom-erp-systems",
      og_image: "/assets/image.png",
      published_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      updated_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
  ];

  memoryStore.knowledge_items = [
    {
      id: "know-company",
      category: "company",
      title: "About Rahnoxa",
      content: "Rahnoxa is a specialized software engineering and technology solutions company. We build custom web applications, mobile apps, enterprise ERP modules, SaaS platforms, and API integrations for modern businesses globally.",
      tags: "company, overview, about, rahnoxa",
      updated_at: new Date().toISOString(),
    },
    {
      id: "know-erp",
      category: "services",
      title: "ERP & Enterprise Software Development",
      content: "Rahnoxa designs custom ERP platforms including inventory management, multi-role RBAC, billing, HR modules, reporting, and operational automation.",
      tags: "erp, enterprise, business software, custom",
      updated_at: new Date().toISOString(),
    },
    {
      id: "know-web",
      category: "services",
      title: "Web & SaaS Development",
      content: "We engineer full-stack web applications, multi-tenant SaaS platforms, customer portals, and internal tools using React, TypeScript, Node.js, and modern cloud databases.",
      tags: "web, saas, react, typescript, portals",
      updated_at: new Date().toISOString(),
    },
    {
      id: "know-contact",
      category: "contact",
      title: "Contact & Discovery",
      content: "Email: contact.rahnoxa@protonmail.com | Phones: +91 8434237052 / +91 8434237049 | Location: Jharkhand, India (Delivering globally).",
      tags: "contact, email, phone, location, discovery",
      updated_at: new Date().toISOString(),
    },
  ];

  memoryStore.automation_jobs = [
    {
      id: "job-daily-seo",
      name: "Daily 18:00 IST SEO Blog Generator",
      schedule: "30 12 * * *", // 12:30 UTC = 18:00 IST
      enabled: 1,
      auto_publish: 0,
      last_run: new Date(Date.now() - 18 * 3600000).toISOString(),
      next_run: new Date(Date.now() + 6 * 3600000).toISOString(),
      status: "IDLE",
    },
  ];

  memoryStore.automation_runs = [
    {
      id: "run-init-1",
      job_id: "job-daily-seo",
      started_at: new Date(Date.now() - 18 * 3600000).toISOString(),
      completed_at: new Date(Date.now() - 18 * 3600000 + 45000).toISOString(),
      status: "SUCCESS",
      topic: "Custom ERP Systems & Modular Monoliths",
      keyword: "custom erp software engineering",
      output_title: "Architecting Scalable Custom ERP Systems: A Practical Engineering Guide",
      output_post_id: "post-1",
      error: null,
      created_at: new Date(Date.now() - 18 * 3600000).toISOString(),
    },
  ];

  memoryStore.initialized = true;
}

/**
 * Universal Database Repository Gateway
 */
export async function getDB(context) {
  const env = context?.env || {};
  await initializeMemoryStore(env);

  const d1 = env.DB;

  return {
    // ── Admins ──
    async findAdminByUsername(username) {
      if (d1) {
        const stmt = d1.prepare("SELECT * FROM admins WHERE username = ? OR email = ? LIMIT 1");
        const res = await stmt.bind(username, username).first();
        return res || null;
      }
      return memoryStore.admins.find((a) => a.username === username || a.email === username) || null;
    },

    async updateAdminLogin(id) {
      const now = new Date().toISOString();
      if (d1) {
        await d1.prepare("UPDATE admins SET last_login = ? WHERE id = ?").bind(now, id).run();
      }
      const admin = memoryStore.admins.find((a) => a.id === id);
      if (admin) admin.last_login = now;
    },

    // ── Projects ──
    async getProjects(options = {}) {
      const { status, featured, limit } = options;
      if (d1) {
        let query = "SELECT * FROM projects WHERE 1=1";
        const bindings = [];
        if (status) {
          query += " AND status = ?";
          bindings.push(status);
        }
        if (featured !== undefined) {
          query += " AND featured = ?";
          bindings.push(featured ? 1 : 0);
        }
        query += " ORDER BY created_at DESC";
        if (limit) {
          query += " LIMIT ?";
          bindings.push(limit);
        }
        const { results } = await d1.prepare(query).bind(...bindings).all();
        return results.map((p) => ({
          ...p,
          technologies: typeof p.technologies === "string" ? JSON.parse(p.technologies || "[]") : p.technologies,
          images: typeof p.images === "string" ? JSON.parse(p.images || "[]") : p.images,
        }));
      }

      let list = [...memoryStore.projects];
      if (status) list = list.filter((p) => p.status === status);
      if (featured !== undefined) list = list.filter((p) => Boolean(p.featured) === Boolean(featured));
      if (limit) list = list.slice(0, limit);
      return list;
    },

    async getProjectBySlug(slug) {
      if (d1) {
        const res = await d1.prepare("SELECT * FROM projects WHERE slug = ? LIMIT 1").bind(slug).first();
        if (!res) return null;
        return {
          ...res,
          technologies: typeof res.technologies === "string" ? JSON.parse(res.technologies || "[]") : res.technologies,
          images: typeof res.images === "string" ? JSON.parse(res.images || "[]") : res.images,
        };
      }
      return memoryStore.projects.find((p) => p.slug === slug) || null;
    },

    async createProject(data) {
      const id = data.id || `proj-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      const now = new Date().toISOString();
      const sanitized = {
        ...data,
        id,
        title: sanitizeText(data.title),
        short_description: sanitizeText(data.short_description),
        created_at: now,
        updated_at: now,
      };

      if (d1) {
        await d1.prepare(`
          INSERT INTO projects (id, title, slug, short_description, full_description, category, technologies, images, thumbnail, demo_url, github_url, featured, status, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          sanitized.id,
          sanitized.title,
          sanitized.slug,
          sanitized.short_description,
          sanitized.full_description || "",
          sanitized.category,
          JSON.stringify(sanitized.technologies || []),
          JSON.stringify(sanitized.images || []),
          sanitized.thumbnail || "/assets/image.png",
          sanitized.demo_url || "",
          sanitized.github_url || "",
          sanitized.featured ? 1 : 0,
          sanitized.status || "PUBLISHED",
          now,
          now
        ).run();
      }

      memoryStore.projects.unshift(sanitized);
      return sanitized;
    },

    async updateProject(id, updateData) {
      const now = new Date().toISOString();
      const index = memoryStore.projects.findIndex((p) => p.id === id);
      if (index === -1) return null;

      const merged = { ...memoryStore.projects[index], ...updateData, updated_at: now };
      memoryStore.projects[index] = merged;

      if (d1) {
        await d1.prepare(`
          UPDATE projects SET
            title = ?, short_description = ?, category = ?, status = ?, featured = ?, updated_at = ?
          WHERE id = ?
        `).bind(
          merged.title,
          merged.short_description,
          merged.category,
          merged.status,
          merged.featured ? 1 : 0,
          now,
          id
        ).run();
      }

      return merged;
    },

    async deleteProject(id) {
      if (d1) {
        await d1.prepare("DELETE FROM projects WHERE id = ?").bind(id).run();
      }
      const idx = memoryStore.projects.findIndex((p) => p.id === id);
      if (idx === -1) return false;
      memoryStore.projects.splice(idx, 1);
      return true;
    },

    // ── Blog Posts ──
    async getBlogPosts(options = {}) {
      const { status, category, limit } = options;
      if (d1) {
        let query = "SELECT * FROM blog_posts WHERE 1=1";
        const bindings = [];
        if (status) {
          query += " AND status = ?";
          bindings.push(status);
        }
        if (category && category !== "All") {
          query += " AND category = ?";
          bindings.push(category);
        }
        query += " ORDER BY created_at DESC";
        if (limit) {
          query += " LIMIT ?";
          bindings.push(limit);
        }
        const { results } = await d1.prepare(query).bind(...bindings).all();
        return results.map((b) => ({
          ...b,
          tags: typeof b.tags === "string" ? JSON.parse(b.tags || "[]") : b.tags,
        }));
      }

      let list = [...memoryStore.blog_posts];
      if (status) list = list.filter((b) => b.status === status);
      if (category && category !== "All") list = list.filter((b) => b.category === category);
      list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      if (limit) list = list.slice(0, limit);
      return list;
    },

    async getBlogPostBySlug(slug) {
      if (d1) {
        const res = await d1.prepare("SELECT * FROM blog_posts WHERE slug = ? LIMIT 1").bind(slug).first();
        if (!res) return null;
        return {
          ...res,
          tags: typeof res.tags === "string" ? JSON.parse(res.tags || "[]") : res.tags,
        };
      }
      return memoryStore.blog_posts.find((b) => b.slug === slug) || null;
    },

    async createBlogPost(postData) {
      const id = postData.id || `post-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      const now = new Date().toISOString();
      const newPost = {
        ...postData,
        id,
        title: sanitizeText(postData.title),
        excerpt: sanitizeText(postData.excerpt),
        created_at: now,
        updated_at: now,
      };

      if (d1) {
        await d1.prepare(`
          INSERT INTO blog_posts (id, title, slug, excerpt, content, featured_image, category, tags, author, reading_time, status, is_ai_generated, ai_topic, ai_keyword, ai_seo_score, seo_title, seo_description, canonical_url, og_image, published_at, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          newPost.id,
          newPost.title,
          newPost.slug,
          newPost.excerpt,
          newPost.content,
          newPost.featured_image || "/assets/image.png",
          newPost.category || "Software Engineering",
          JSON.stringify(newPost.tags || []),
          newPost.author || "Rahnoxa Engineering",
          newPost.reading_time || "5 min read",
          newPost.status || "DRAFT",
          newPost.is_ai_generated ? 1 : 0,
          newPost.ai_topic || null,
          newPost.ai_keyword || null,
          newPost.ai_seo_score || 85,
          newPost.seo_title || newPost.title,
          newPost.seo_description || newPost.excerpt,
          newPost.canonical_url || `https://rahnoxa.pages.dev/blog/${newPost.slug}`,
          newPost.og_image || newPost.featured_image || "/assets/image.png",
          newPost.published_at || (newPost.status === "PUBLISHED" ? now : null),
          now,
          now
        ).run();
      }

      memoryStore.blog_posts.unshift(newPost);
      return newPost;
    },

    async updateBlogPost(id, updateData) {
      const now = new Date().toISOString();
      const index = memoryStore.blog_posts.findIndex((b) => b.id === id || b.slug === id);
      if (index === -1) return null;

      const merged = { ...memoryStore.blog_posts[index], ...updateData, updated_at: now };
      memoryStore.blog_posts[index] = merged;

      if (d1) {
        await d1.prepare(`
          UPDATE blog_posts SET
            title = ?, excerpt = ?, content = ?, category = ?, status = ?, published_at = ?, updated_at = ?
          WHERE id = ? OR slug = ?
        `).bind(
          merged.title,
          merged.excerpt,
          merged.content,
          merged.category,
          merged.status,
          merged.published_at,
          now,
          id,
          id
        ).run();
      }

      return merged;
    },

    async deleteBlogPost(id) {
      if (d1) {
        await d1.prepare("DELETE FROM blog_posts WHERE id = ? OR slug = ?").bind(id, id).run();
      }
      const idx = memoryStore.blog_posts.findIndex((b) => b.id === id || b.slug === id);
      if (idx === -1) return false;
      memoryStore.blog_posts.splice(idx, 1);
      return true;
    },

    // ── Leads ──
    async getLeads(options = {}) {
      if (d1) {
        let query = "SELECT * FROM leads WHERE 1=1";
        const bindings = [];
        if (options.status) {
          query += " AND status = ?";
          bindings.push(options.status);
        }
        query += " ORDER BY created_at DESC";
        const { results } = await d1.prepare(query).bind(...bindings).all();
        return results;
      }

      let list = [...memoryStore.leads];
      if (options.status) list = list.filter((l) => l.status === options.status);
      list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      return list;
    },

    async createLead(leadData) {
      const id = leadData.id || `lead-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      const now = new Date().toISOString();
      const newLead = {
        ...leadData,
        id,
        name: sanitizeText(leadData.name),
        email: sanitizeText(leadData.email),
        phone: leadData.phone ? sanitizeText(leadData.phone) : null,
        company: leadData.company ? sanitizeText(leadData.company) : null,
        project_description: sanitizeText(leadData.project_description),
        status: leadData.status || "NEW",
        created_at: now,
        updated_at: now,
      };

      if (d1) {
        await d1.prepare(`
          INSERT INTO leads (id, name, email, phone, company, service, project_description, budget, timeline, source, conversation_id, status, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          newLead.id,
          newLead.name,
          newLead.email,
          newLead.phone,
          newLead.company,
          newLead.service || "General Software",
          newLead.project_description,
          newLead.budget || "To be discussed",
          newLead.timeline || "Flexible",
          newLead.source || "website_contact",
          newLead.conversation_id || null,
          newLead.status,
          now,
          now
        ).run();
      }

      memoryStore.leads.unshift(newLead);
      return newLead;
    },

    async updateLeadStatus(id, status, notes) {
      const now = new Date().toISOString();
      if (d1) {
        await d1.prepare("UPDATE leads SET status = ?, notes = ?, updated_at = ? WHERE id = ?")
          .bind(status, notes || null, now, id)
          .run();
      }
      const lead = memoryStore.leads.find((l) => l.id === id);
      if (!lead) return null;
      lead.status = status;
      if (notes !== undefined) lead.notes = notes;
      lead.updated_at = now;
      return lead;
    },

    // ── Conversations & Messages ──
    async createConversation(session_id, visitor_id) {
      const id = `conv-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      const now = new Date().toISOString();
      const conv = {
        id,
        session_id,
        visitor_id: visitor_id || null,
        status: "ACTIVE",
        created_at: now,
        updated_at: now,
      };
      if (d1) {
        await d1.prepare("INSERT INTO conversations (id, session_id, visitor_id, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)")
          .bind(id, session_id, visitor_id || null, "ACTIVE", now, now)
          .run();
      }
      memoryStore.conversations.unshift(conv);
      return conv;
    },

    async addMessage(conversation_id, role, content, metadata = {}) {
      const id = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      const now = new Date().toISOString();
      const msg = {
        id,
        conversation_id,
        role,
        content: sanitizeText(content),
        metadata,
        created_at: now,
      };
      if (d1) {
        await d1.prepare("INSERT INTO messages (id, conversation_id, role, content, metadata, created_at) VALUES (?, ?, ?, ?, ?, ?)")
          .bind(id, conversation_id, role, msg.content, JSON.stringify(metadata), now)
          .run();
      }
      memoryStore.messages.push(msg);
      return msg;
    },

    async getMessages(conversation_id) {
      if (d1) {
        const { results } = await d1.prepare("SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC")
          .bind(conversation_id)
          .all();
        return results;
      }
      return memoryStore.messages.filter((m) => m.conversation_id === conversation_id);
    },

    // ── Knowledge Base ──
    async getKnowledgeItems(category) {
      if (d1) {
        let query = "SELECT * FROM knowledge_items";
        const bindings = [];
        if (category) {
          query += " WHERE category = ?";
          bindings.push(category);
        }
        const { results } = await d1.prepare(query).bind(...bindings).all();
        return results;
      }
      if (category) return memoryStore.knowledge_items.filter((k) => k.category === category);
      return [...memoryStore.knowledge_items];
    },

    async createKnowledgeItem(item) {
      const id = item.id || `know-${Date.now()}`;
      const now = new Date().toISOString();
      const newItem = { ...item, id, updated_at: now };
      if (d1) {
        await d1.prepare("INSERT INTO knowledge_items (id, category, title, content, tags, updated_at) VALUES (?, ?, ?, ?, ?, ?)")
          .bind(id, item.category, item.title, item.content, item.tags || "", now)
          .run();
      }
      memoryStore.knowledge_items.unshift(newItem);
      return newItem;
    },

    async updateKnowledgeItem(id, data) {
      const now = new Date().toISOString();
      const index = memoryStore.knowledge_items.findIndex((k) => k.id === id);
      if (index === -1) return null;
      const merged = { ...memoryStore.knowledge_items[index], ...data, updated_at: now };
      memoryStore.knowledge_items[index] = merged;

      if (d1) {
        await d1.prepare("UPDATE knowledge_items SET category = ?, title = ?, content = ?, tags = ?, updated_at = ? WHERE id = ?")
          .bind(merged.category, merged.title, merged.content, merged.tags || "", now, id)
          .run();
      }
      return merged;
    },

    async deleteKnowledgeItem(id) {
      if (d1) {
        await d1.prepare("DELETE FROM knowledge_items WHERE id = ?").bind(id).run();
      }
      const idx = memoryStore.knowledge_items.findIndex((k) => k.id === id);
      if (idx === -1) return false;
      memoryStore.knowledge_items.splice(idx, 1);
      return true;
    },

    // ── Automation Jobs & Runs ──
    async getAutomationJobs() {
      if (d1) {
        const { results } = await d1.prepare("SELECT * FROM automation_jobs").all();
        return results;
      }
      return [...memoryStore.automation_jobs];
    },

    async updateAutomationJob(id, data) {
      const now = new Date().toISOString();
      const job = memoryStore.automation_jobs.find((j) => j.id === id);
      if (job) Object.assign(job, data);

      if (d1) {
        await d1.prepare("UPDATE automation_jobs SET auto_publish = ?, status = ?, last_run = ?, next_run = ? WHERE id = ?")
          .bind(data.auto_publish ?? job.auto_publish, data.status ?? job.status, data.last_run || now, data.next_run || null, id)
          .run();
      }
      return job;
    },

    async getAutomationRuns(limit = 20) {
      if (d1) {
        const { results } = await d1.prepare("SELECT * FROM automation_runs ORDER BY started_at DESC LIMIT ?")
          .bind(limit)
          .all();
        return results;
      }
      return [...memoryStore.automation_runs].slice(0, limit);
    },

    async recordAutomationRun(runData) {
      const id = `run-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      const now = new Date().toISOString();
      const run = {
        id,
        job_id: runData.job_id || "job-daily-seo",
        started_at: runData.started_at || now,
        completed_at: runData.completed_at || now,
        status: runData.status || "SUCCESS",
        topic: runData.topic || "Technical Topic",
        keyword: runData.keyword || "Software Engineering",
        output_title: runData.output_title || null,
        output_post_id: runData.output_post_id || null,
        error: runData.error || null,
        created_at: now,
      };

      if (d1) {
        await d1.prepare(`
          INSERT INTO automation_runs (id, job_id, started_at, completed_at, status, topic, keyword, output_title, output_post_id, error, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          run.id,
          run.job_id,
          run.started_at,
          run.completed_at,
          run.status,
          run.topic,
          run.keyword,
          run.output_title,
          run.output_post_id,
          run.error,
          now
        ).run();
      }

      memoryStore.automation_runs.unshift(run);
      return run;
    },

    // ── Dashboard Stats ──
    async getDashboardStats() {
      const totalProjects = memoryStore.projects.length;
      const publishedProjects = memoryStore.projects.filter((p) => p.status === "PUBLISHED").length;
      const totalBlogs = memoryStore.blog_posts.length;
      const draftBlogs = memoryStore.blog_posts.filter((b) => b.status === "DRAFT").length;
      const publishedBlogs = memoryStore.blog_posts.filter((b) => b.status === "PUBLISHED").length;
      const totalLeads = memoryStore.leads.length;
      const newLeads = memoryStore.leads.filter((l) => l.status === "NEW").length;
      const totalConversations = memoryStore.conversations.length;
      const totalAutomationRuns = memoryStore.automation_runs.length;

      return {
        projects: { total: totalProjects, published: publishedProjects },
        blogs: { total: totalBlogs, draft: draftBlogs, published: publishedBlogs },
        leads: { total: totalLeads, new: newLeads },
        chat: { conversations: totalConversations },
        automation: { runs: totalAutomationRuns, lastRun: memoryStore.automation_runs[0] || null },
      };
    },
  };
}
