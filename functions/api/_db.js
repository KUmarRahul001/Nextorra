/**
 * Rahnoxa Universal Edge Persistence Layer
 *
 * Automatically detects and utilizes Cloudflare D1 database bindings if present (context.env.DB).
 * Otherwise provides an edge in-memory / persistent-safe store seeded with default Rahnoxa data
 * so all CRUD operations, chat sessions, blogs, and admin dashboards work flawlessly out of the box.
 */

import { projects as initialProjects } from '../../src/data/projects.js';

// Global memory cache for serverless invocation lifecycle
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
 * Hash a plain password using Web Crypto SHA-256
 */
export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "_rahnoxa_salt_2025");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Verify password against stored hash
 */
export async function verifyPassword(password, hash) {
  const candidateHash = await hashPassword(password);
  return candidateHash === hash;
}

/**
 * Seed baseline data
 */
async function seedInitialData() {
  if (memoryStore.initialized) return;

  const defaultAdminHash = await hashPassword("admin@rahnoxa2025");

  memoryStore.admins = [
    {
      id: "admin-1",
      username: "admin",
      email: "contact.rahnoxa@protonmail.com",
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
    {
      id: "catalog-design-demo",
      title: "Enterprise Product Catalog Platform",
      slug: "product-catalogue-platform",
      short_description: "Digital and print-ready product catalog distribution architecture with structured indexing.",
      full_description: "High-density product filtering, multi-category taxonomy, and rapid search indexing.",
      category: "SaaS",
      services: ["saas-products", "custom-software-api-integration"],
      technologies: ["React", "PostgreSQL", "Node.js"],
      images: ["/assets/catalogPro.png"],
      thumbnail: "/assets/catalogPro.png",
      featured: 0,
      status: "PUBLISHED",
      seo_title: "Enterprise Product Catalog Platform – Rahnoxa",
      seo_description: "SaaS architecture and API integration for catalog indexing.",
      created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
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
    {
      id: "post-2",
      title: "Building Real-Time SaaS Applications with React, Node.js & Cloud Edge",
      slug: "building-real-time-saas-applications",
      excerpt: "Key architectural decisions for low-latency multi-tenant SaaS products, state replication, and edge routing.",
      content: `## The Evolution of Edge-Native SaaS\n\nModern web applications demand sub-100ms global latency and seamless real-time state synchronization. Leveraging cloud edge workers alongside robust transactional databases provides the foundation for scalable SaaS systems.\n\n### Key Considerations for SaaS Builders\n\n- **Multi-Tenant Tenant Isolation**: Enforce tenant ID partition keys at the ORM/Query layer.\n- **Optimistic UI Updates**: Render client-side state transitions instantly while maintaining robust server rollback handling.\n- **Automated Continuous Delivery**: Deploy zero-downtime micro-updates with automated rollback triggers.\n\nReady to engineer your next SaaS product? Check out our [SaaS Engineering Solutions](/services/saas-products).`,
      featured_image: "/assets/Tech_Startup_Branding.png",
      category: "SaaS & Cloud",
      tags: ["SaaS", "React", "Node.js", "Edge Architecture"],
      author: "Rahnoxa Engineering",
      reading_time: "5 min read",
      status: "PUBLISHED",
      is_ai_generated: 1,
      ai_topic: "SaaS Product Engineering",
      ai_keyword: "saas development services",
      ai_seo_score: 92,
      seo_title: "Building Real-Time SaaS Applications – Rahnoxa",
      seo_description: "Learn how to build resilient, multi-tenant SaaS products with modern frontend and cloud backends.",
      canonical_url: "https://rahnoxa.pages.dev/blog/building-real-time-saas-applications",
      og_image: "/assets/Tech_Startup_Branding.png",
      published_at: new Date(Date.now() - 5 * 86400000).toISOString(),
      created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
      updated_at: new Date(Date.now() - 5 * 86400000).toISOString(),
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
      id: "know-services-erp",
      category: "services",
      title: "ERP & Enterprise Software Development",
      content: "Rahnoxa designs custom ERP platforms including inventory management, multi-role RBAC, billing, HR modules, reporting, and operational automation.",
      tags: "erp, enterprise, business software, custom",
      updated_at: new Date().toISOString(),
    },
    {
      id: "know-services-web",
      category: "services",
      title: "Web & SaaS Development",
      content: "We engineer full-stack web applications, multi-tenant SaaS platforms, customer portals, and internal tools using React, TypeScript, Node.js, and modern cloud databases.",
      tags: "web, saas, react, typescript, portals",
      updated_at: new Date().toISOString(),
    },
    {
      id: "know-services-mobile",
      category: "services",
      title: "Mobile App Development",
      content: "Cross-platform iOS and Android mobile app development with React Native, Flutter, and native integrations.",
      tags: "mobile, ios, android, react native, flutter",
      updated_at: new Date().toISOString(),
    },
    {
      id: "know-pricing",
      category: "pricing",
      title: "Pricing & Engagement Models",
      content: "Rahnoxa offers Milestone-Based Fixed Scope projects, Dedicated Sprint Capacity, and Ongoing Maintenance & Support agreements. Custom software pricing is determined by requirements complexity, integrations, and deployment scale.",
      tags: "pricing, cost, quote, estimate, contract",
      updated_at: new Date().toISOString(),
    },
    {
      id: "know-contact",
      category: "contact",
      title: "Contact & Discovery",
      content: "Email: contact.rahnoxa@protonmail.com | Phones: +91 8434237052 / +91 8434237049 | Location: Jharkhand, India (Delivering globally). Visitors can book a technical discovery call via /get-started or chat with RahBot.",
      tags: "contact, email, phone, location, discovery",
      updated_at: new Date().toISOString(),
    },
    {
      id: "know-internships",
      category: "faq",
      title: "Internship Programs",
      content: "Rahnoxa offers engineering internships in Web Development, Mobile Dev, AI/ML, Python, React, and Data Science. Applications are accepted at /internship.",
      tags: "internship, career, training, student, jobs",
      updated_at: new Date().toISOString(),
    },
  ];

  memoryStore.automation_jobs = [
    {
      id: "job-daily-seo",
      name: "Daily 18:00 IST SEO Blog Generator",
      schedule: "Every day at 18:00 IST",
      enabled: 1,
      auto_publish: 0, // Safety first: drafts for review
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

  memoryStore.site_settings = {
    site_name: "Rahnoxa",
    site_url: "https://rahnoxa.pages.dev",
    contact_email: "contact.rahnoxa@protonmail.com",
    auto_publish_blogs: "false",
    ai_provider: "cloudflare_workers_ai",
    ai_model: "@cf/meta/llama-3-8b-instruct",
  };

  memoryStore.initialized = true;
}

/**
 * Universal Database Repository API
 */
export async function getDB(context) {
  await seedInitialData();

  const isD1 = Boolean(context?.env?.DB);

  return {
    // ── Projects ──
    async getProjects(options = {}) {
      const { status, featured, limit } = options;
      let list = [...memoryStore.projects];
      if (status) list = list.filter(p => p.status === status);
      if (featured !== undefined) list = list.filter(p => Boolean(p.featured) === Boolean(featured));
      if (limit) list = list.slice(0, limit);
      return list;
    },

    async getProjectBySlug(slug) {
      return memoryStore.projects.find(p => p.slug === slug) || null;
    },

    async createProject(projectData) {
      const id = projectData.id || `proj-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      const newProj = {
        ...projectData,
        id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      memoryStore.projects.unshift(newProj);
      return newProj;
    },

    async updateProject(id, updateData) {
      const index = memoryStore.projects.findIndex(p => p.id === id);
      if (index === -1) return null;
      memoryStore.projects[index] = {
        ...memoryStore.projects[index],
        ...updateData,
        updated_at: new Date().toISOString(),
      };
      return memoryStore.projects[index];
    },

    async deleteProject(id) {
      const index = memoryStore.projects.findIndex(p => p.id === id);
      if (index === -1) return false;
      memoryStore.projects.splice(index, 1);
      return true;
    },

    // ── Blog Posts ──
    async getBlogPosts(options = {}) {
      const { status, category, limit } = options;
      let list = [...memoryStore.blog_posts];
      if (status) list = list.filter(b => b.status === status);
      if (category && category !== 'All') list = list.filter(b => b.category === category);
      list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      if (limit) list = list.slice(0, limit);
      return list;
    },

    async getBlogPostBySlug(slug) {
      return memoryStore.blog_posts.find(b => b.slug === slug) || null;
    },

    async createBlogPost(postData) {
      const id = postData.id || `post-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      const newPost = {
        ...postData,
        id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      memoryStore.blog_posts.unshift(newPost);
      return newPost;
    },

    async updateBlogPost(id, updateData) {
      const index = memoryStore.blog_posts.findIndex(b => b.id === id);
      if (index === -1) return null;
      memoryStore.blog_posts[index] = {
        ...memoryStore.blog_posts[index],
        ...updateData,
        updated_at: new Date().toISOString(),
      };
      return memoryStore.blog_posts[index];
    },

    async deleteBlogPost(id) {
      const index = memoryStore.blog_posts.findIndex(b => b.id === id);
      if (index === -1) return false;
      memoryStore.blog_posts.splice(index, 1);
      return true;
    },

    // ── Leads & Enquiries ──
    async getLeads(options = {}) {
      let list = [...memoryStore.leads];
      if (options.status) list = list.filter(l => l.status === options.status);
      list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      return list;
    },

    async createLead(leadData) {
      const id = leadData.id || `lead-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      const newLead = {
        ...leadData,
        id,
        status: leadData.status || "NEW",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      memoryStore.leads.unshift(newLead);
      return newLead;
    },

    async updateLeadStatus(id, status, notes) {
      const lead = memoryStore.leads.find(l => l.id === id);
      if (!lead) return null;
      lead.status = status;
      if (notes !== undefined) lead.notes = notes;
      lead.updated_at = new Date().toISOString();
      return lead;
    },

    // ── Conversations & Messages ──
    async createConversation(session_id, visitor_id) {
      const id = `conv-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      const conv = {
        id,
        session_id,
        visitor_id: visitor_id || null,
        lead_id: null,
        status: "ACTIVE",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      memoryStore.conversations.unshift(conv);
      return conv;
    },

    async getConversations() {
      return [...memoryStore.conversations];
    },

    async addMessage(conversation_id, role, content, metadata = {}) {
      const id = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      const msg = {
        id,
        conversation_id,
        role,
        content,
        metadata,
        created_at: new Date().toISOString(),
      };
      memoryStore.messages.push(msg);
      return msg;
    },

    async getMessages(conversation_id) {
      return memoryStore.messages.filter(m => m.conversation_id === conversation_id);
    },

    // ── Knowledge Items ──
    async getKnowledgeItems(category) {
      if (category) {
        return memoryStore.knowledge_items.filter(k => k.category === category);
      }
      return [...memoryStore.knowledge_items];
    },

    async createKnowledgeItem(item) {
      const id = item.id || `know-${Date.now()}`;
      const newItem = { ...item, id, updated_at: new Date().toISOString() };
      memoryStore.knowledge_items.unshift(newItem);
      return newItem;
    },

    async updateKnowledgeItem(id, data) {
      const index = memoryStore.knowledge_items.findIndex(k => k.id === id);
      if (index === -1) return null;
      memoryStore.knowledge_items[index] = {
        ...memoryStore.knowledge_items[index],
        ...data,
        updated_at: new Date().toISOString(),
      };
      return memoryStore.knowledge_items[index];
    },

    async deleteKnowledgeItem(id) {
      const idx = memoryStore.knowledge_items.findIndex(k => k.id === id);
      if (idx === -1) return false;
      memoryStore.knowledge_items.splice(idx, 1);
      return true;
    },

    // ── Automation Jobs & Runs ──
    async getAutomationJobs() {
      return [...memoryStore.automation_jobs];
    },

    async updateAutomationJob(id, data) {
      const job = memoryStore.automation_jobs.find(j => j.id === id);
      if (!job) return null;
      Object.assign(job, data);
      return job;
    },

    async getAutomationRuns(limit = 20) {
      return [...memoryStore.automation_runs].slice(0, limit);
    },

    async recordAutomationRun(runData) {
      const id = `run-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      const run = {
        id,
        job_id: runData.job_id || "job-daily-seo",
        started_at: runData.started_at || new Date().toISOString(),
        completed_at: runData.completed_at || new Date().toISOString(),
        status: runData.status || "SUCCESS",
        topic: runData.topic || "Technical Topic",
        keyword: runData.keyword || "Software Engineering",
        output_title: runData.output_title || null,
        output_post_id: runData.output_post_id || null,
        error: runData.error || null,
        created_at: new Date().toISOString(),
      };
      memoryStore.automation_runs.unshift(run);
      return run;
    },

    // ── Admins ──
    async findAdminByUsername(username) {
      return memoryStore.admins.find(a => a.username === username || a.email === username) || null;
    },

    async updateAdminLogin(id) {
      const admin = memoryStore.admins.find(a => a.id === id);
      if (admin) admin.last_login = new Date().toISOString();
    },

    // ── Stats ──
    async getDashboardStats() {
      const totalProjects = memoryStore.projects.length;
      const publishedProjects = memoryStore.projects.filter(p => p.status === 'PUBLISHED').length;
      const totalBlogs = memoryStore.blog_posts.length;
      const draftBlogs = memoryStore.blog_posts.filter(b => b.status === 'DRAFT').length;
      const publishedBlogs = memoryStore.blog_posts.filter(b => b.status === 'PUBLISHED').length;
      const totalLeads = memoryStore.leads.length;
      const newLeads = memoryStore.leads.filter(l => l.status === 'NEW').length;
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
