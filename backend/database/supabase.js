import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import { config } from '../config/env.js';

let supabase = null;
if (config.supabaseUrl && config.supabaseServiceKey) {
  try {
    supabase = createClient(config.supabaseUrl, config.supabaseServiceKey);
    console.log('✅ Connected to Supabase PostgreSQL');
  } catch (err) {
    console.warn('⚠️ Supabase connection warning, utilizing local resilience store:', err.message);
  }
}

/**
 * Hash password with SHA-256 + cryptographic salt
 */
export function hashPassword(password, salt = 'rahnoxa_salt_2026_backend') {
  return crypto.createHash('sha256').update(password + ':' + salt).digest('hex');
}

/**
 * Verify password against stored hash
 */
export function verifyPassword(password, hash, salt = 'rahnoxa_salt_2026_backend') {
  if (!password || !hash) return false;
  return hashPassword(password, salt) === hash;
}

/**
 * Sanitize text to mitigate XSS
 */
export function sanitize(text) {
  if (typeof text !== 'string') return text;
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/javascript:[^"']*/gi, '');
}

// In-Memory Storage & Local Dev Fallback Engine
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
  settings: {},
};

function initMemoryStore() {
  if (memoryStore.initialized) return;

  const defaultAdminPassword = config.initialAdminPassword || 'admin@rahnoxa2025';
  const defaultAdminHash = hashPassword(defaultAdminPassword);

  memoryStore.admins = [
    {
      id: 'admin-root',
      username: 'admin',
      email: config.initialAdminEmail || 'contact.rahnoxa@protonmail.com',
      password_hash: defaultAdminHash,
      role: 'superadmin',
      created_at: new Date().toISOString(),
      last_login: null,
    },
  ];

  memoryStore.projects = [
    {
      id: 'ecommerce-ui-demo',
      title: 'E-commerce Platform UI',
      slug: 'ecommerce-platform-ui',
      short_description: 'A high-performance responsive e-commerce interface with product catalog, cart, and streamlined checkout.',
      full_description: 'Engineered with modular React architecture, full responsive layout, multi-tier state management, and optimized asset delivery.',
      category: 'Web App',
      services: ['full-stack-web-apps', 'web-development'],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
      images: ['/assets/image.png'],
      thumbnail: '/assets/image.png',
      demo_url: 'https://rahnoxa.pages.dev',
      github_url: 'https://github.com/KUmarRahul001/Nextorra',
      featured: 1,
      status: 'PUBLISHED',
      seo_title: 'E-Commerce Web Platform Architecture – Rahnoxa',
      seo_description: 'Custom enterprise e-commerce platform engineering by Rahnoxa.',
      created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'fitness-app-demo',
      title: 'Fitness Tracking Mobile App',
      slug: 'fitness-tracking-app',
      short_description: 'Native & hybrid mobile application architecture for cross-platform activity metrics and health tracking.',
      full_description: 'Engineered with real-time biometric synchronization, background task scheduling, and smooth touch-first interfaces.',
      category: 'Mobile App',
      services: ['app-development'],
      technologies: ['React Native', 'TypeScript', 'Tailwind', 'Firebase'],
      images: ['/assets/Fitness_tracking.png'],
      thumbnail: '/assets/Fitness_tracking.png',
      demo_url: 'https://rahnoxa.pages.dev',
      featured: 1,
      status: 'PUBLISHED',
      seo_title: 'Mobile Fitness Application Engineering – Rahnoxa',
      seo_description: 'Cross-platform mobile application development for enterprise health systems.',
      created_at: new Date(Date.now() - 25 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'startup-branding-demo',
      title: 'Tech Startup Design System',
      slug: 'tech-startup-branding',
      short_description: 'Complete design system, technical brand identity, and scalable UI component library for tech startups.',
      full_description: 'Comprehensive token system, WCAG 2.1 AA accessible color systems, and modern component guidelines.',
      category: 'Design',
      services: ['web-development', 'graphic-design'],
      technologies: ['Figma', 'Design Tokens', 'Tailwind CSS'],
      images: ['/assets/Tech_Startup_Branding.png'],
      thumbnail: '/assets/Tech_Startup_Branding.png',
      featured: 1,
      status: 'PUBLISHED',
      seo_title: 'Design System & Brand Identity – Rahnoxa',
      seo_description: 'Scalable brand identity and UI design engineering.',
      created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  memoryStore.blog_posts = [
    {
      id: 'post-1',
      title: 'Architecting Scalable Custom ERP Systems: A Practical Engineering Guide',
      slug: 'architecting-scalable-custom-erp-systems',
      excerpt: 'Why modern enterprises outgrow off-the-shelf software and how custom modular ERP architectures streamline operational workflows.',
      content: `## The Modern ERP Landscape\n\nOff-the-shelf ERP platforms frequently force growing organizations to reshape their core business operations around rigid, generic software constraints. Custom ERP engineering solves this fundamental friction by aligning software modules directly with authentic operational workflows.\n\n### Core Pillars of a Resilient Modular Monolith\n\n1. **Domain-Driven Module Boundaries**: Encapsulate inventory, billing, HR, and customer records with strict internal API contracts.\n2. **Role-Based Access Control (RBAC)**: Secure data schemas ensuring granular permission enforcement.\n3. **Event-Driven Audit Logging**: Immutably record operational state changes for complete compliance and observability.\n\n### Seamless API Integrations\n\nConnecting legacy databases with modern cloud APIs requires resilient queueing and idempotent webhooks. At Rahnoxa, we engineer custom ERP platforms tailored to real-world throughput requirements.\n\nExplore our [Custom ERP Services](/services/erp-enterprise-applications) or [Start a Project](/get-started) to discuss your organization's technical needs.`,
      featured_image: '/assets/image.png',
      category: 'ERP & Enterprise',
      tags: ['ERP', 'Software Architecture', 'Enterprise Engineering', 'API Integration'],
      author: 'Rahnoxa Engineering',
      reading_time: '6 min read',
      status: 'PUBLISHED',
      is_ai_generated: 1,
      ai_topic: 'Custom ERP Architecture',
      ai_keyword: 'custom erp software engineering',
      ai_seo_score: 94,
      seo_title: 'Architecting Scalable Custom ERP Systems – Rahnoxa',
      seo_description: 'A comprehensive guide to building modular, secure, and maintainable custom ERP applications.',
      canonical_url: 'https://rahnoxa.pages.dev/blog/architecting-scalable-custom-erp-systems',
      og_image: '/assets/image.png',
      published_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'post-2',
      title: 'Building Real-Time SaaS Applications with React, Node.js & Cloud Edge',
      slug: 'building-real-time-saas-applications',
      excerpt: 'Key architectural decisions for low-latency multi-tenant SaaS products, state replication, and edge routing.',
      content: `## The Evolution of Edge-Native SaaS\n\nModern web applications demand sub-100ms global latency and seamless real-time state synchronization. Leveraging cloud edge workers alongside robust transactional databases provides the foundation for scalable SaaS systems.\n\n### Key Considerations for SaaS Builders\n\n- **Multi-Tenant Tenant Isolation**: Enforce tenant ID partition keys at the ORM/Query layer.\n- **Optimistic UI Updates**: Render client-side state transitions instantly while maintaining robust server rollback handling.\n- **Automated Continuous Delivery**: Deploy zero-downtime micro-updates with automated rollback triggers.\n\nReady to engineer your next SaaS product? Check out our [SaaS Engineering Solutions](/services/saas-products).`,
      featured_image: '/assets/Tech_Startup_Branding.png',
      category: 'SaaS & Cloud',
      tags: ['SaaS', 'React', 'Node.js', 'Edge Architecture'],
      author: 'Rahnoxa Engineering',
      reading_time: '5 min read',
      status: 'PUBLISHED',
      is_ai_generated: 1,
      ai_topic: 'SaaS Product Engineering',
      ai_keyword: 'saas development services',
      ai_seo_score: 92,
      seo_title: 'Building Real-Time SaaS Applications – Rahnoxa',
      seo_description: 'Learn how to build resilient, multi-tenant SaaS products with modern frontend and cloud backends.',
      canonical_url: 'https://rahnoxa.pages.dev/blog/building-real-time-saas-applications',
      og_image: '/assets/Tech_Startup_Branding.png',
      published_at: new Date(Date.now() - 5 * 86400000).toISOString(),
      created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  memoryStore.knowledge_items = [
    {
      id: 'know-company',
      category: 'company',
      title: 'About Rahnoxa',
      content: 'Rahnoxa is a specialized software engineering and technology solutions company. We build custom web applications, mobile apps, enterprise ERP modules, SaaS platforms, and API integrations for modern businesses globally.',
      tags: 'company, overview, about, rahnoxa',
      updated_at: new Date().toISOString(),
    },
    {
      id: 'know-erp',
      category: 'services',
      title: 'ERP & Enterprise Software Development',
      content: 'Rahnoxa designs custom ERP platforms including inventory management, multi-role RBAC, billing, HR modules, reporting, and operational automation.',
      tags: 'erp, enterprise, business software, custom',
      updated_at: new Date().toISOString(),
    },
    {
      id: 'know-web',
      category: 'services',
      title: 'Web & SaaS Development',
      content: 'We engineer full-stack web applications, multi-tenant SaaS platforms, customer portals, and internal tools using React, TypeScript, Node.js, and modern cloud databases.',
      tags: 'web, saas, react, typescript, portals',
      updated_at: new Date().toISOString(),
    },
    {
      id: 'know-mobile',
      category: 'services',
      title: 'Mobile App Development',
      content: 'Cross-platform iOS and Android mobile app development with React Native, Flutter, and native integrations.',
      tags: 'mobile, ios, android, react native, flutter',
      updated_at: new Date().toISOString(),
    },
    {
      id: 'know-pricing',
      category: 'pricing',
      title: 'Pricing & Engagement Models',
      content: 'Rahnoxa offers Milestone-Based Fixed Scope projects, Dedicated Sprint Capacity, and Ongoing Maintenance & Support agreements. Custom software pricing is determined by requirements complexity, integrations, and deployment scale.',
      tags: 'pricing, cost, quote, estimate, contract',
      updated_at: new Date().toISOString(),
    },
    {
      id: 'know-contact',
      category: 'contact',
      title: 'Contact & Discovery',
      content: 'Email: contact.rahnoxa@protonmail.com | Phones: +91 8434237052 / +91 8434237049 | Location: Jharkhand, India (Delivering globally). Visitors can book a technical discovery call via /get-started or chat with RahBot.',
      tags: 'contact, email, phone, location, discovery',
      updated_at: new Date().toISOString(),
    },
    {
      id: 'know-internships',
      category: 'faq',
      title: 'Internship Programs',
      content: 'Rahnoxa offers engineering internships in Web Development, Mobile Dev, AI/ML, Python, React, and Data Science. Applications are accepted at /internship.',
      tags: 'internship, career, training, student, jobs',
      updated_at: new Date().toISOString(),
    },
  ];

  memoryStore.automation_jobs = [
    {
      id: 'job-daily-seo',
      name: 'Daily 18:00 IST SEO Blog Generator',
      schedule: '30 12 * * *', // 12:30 UTC = 18:00 IST
      enabled: 1,
      auto_publish: 0,
      last_run: new Date(Date.now() - 18 * 3600000).toISOString(),
      next_run: new Date(Date.now() + 6 * 3600000).toISOString(),
      status: 'IDLE',
    },
  ];

  memoryStore.automation_runs = [
    {
      id: 'run-init-1',
      job_id: 'job-daily-seo',
      started_at: new Date(Date.now() - 18 * 3600000).toISOString(),
      completed_at: new Date(Date.now() - 18 * 3600000 + 45000).toISOString(),
      status: 'SUCCESS',
      topic: 'Custom ERP Systems & Modular Monoliths',
      keyword: 'custom erp software engineering',
      output_title: 'Architecting Scalable Custom ERP Systems: A Practical Engineering Guide',
      output_post_id: 'post-1',
      error: null,
      created_at: new Date(Date.now() - 18 * 3600000).toISOString(),
    },
  ];

  memoryStore.settings = {
    site_name: 'Rahnoxa',
    site_url: config.siteUrl,
    contact_email: 'contact.rahnoxa@protonmail.com',
    auto_publish_blogs: String(config.autoPublishBlogs),
  };

  memoryStore.initialized = true;
}

export const db = {
  // ── Admins ──
  async findAdminByUsername(username) {
    initMemoryStore();
    if (supabase) {
      const { data } = await supabase
        .from('admins')
        .select('*')
        .or(`username.eq.${username},email.eq.${username}`)
        .single();
      return data || null;
    }
    return memoryStore.admins.find((a) => a.username === username || a.email === username) || null;
  },

  async updateAdminLogin(id) {
    initMemoryStore();
    const now = new Date().toISOString();
    if (supabase) {
      await supabase.from('admins').update({ last_login: now }).eq('id', id);
    }
    const admin = memoryStore.admins.find((a) => a.id === id);
    if (admin) admin.last_login = now;
  },

  // ── Projects ──
  async getProjects(options = {}) {
    initMemoryStore();
    const { status, featured, limit } = options;

    if (supabase) {
      let query = supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (status) query = query.eq('status', status);
      if (featured !== undefined) query = query.eq('featured', featured ? 1 : 0);
      if (limit) query = query.limit(limit);
      const { data } = await query;
      return data || [];
    }

    let list = [...memoryStore.projects];
    if (status) list = list.filter((p) => p.status === status);
    if (featured !== undefined) list = list.filter((p) => Boolean(p.featured) === Boolean(featured));
    if (limit) list = list.slice(0, limit);
    return list;
  },

  async getProjectBySlug(slug) {
    initMemoryStore();
    if (supabase) {
      const { data } = await supabase.from('projects').select('*').eq('slug', slug).single();
      return data || null;
    }
    return memoryStore.projects.find((p) => p.slug === slug) || null;
  },

  async createProject(data) {
    initMemoryStore();
    const id = data.id || `proj-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const now = new Date().toISOString();
    const sanitized = {
      ...data,
      id,
      title: sanitize(data.title),
      short_description: sanitize(data.short_description),
      technologies: Array.isArray(data.technologies) ? data.technologies : ['React', 'Node.js'],
      images: Array.isArray(data.images) ? data.images : ['/assets/image.png'],
      featured: data.featured ? 1 : 0,
      status: data.status || 'PUBLISHED',
      created_at: now,
      updated_at: now,
    };

    if (supabase) {
      const { data: created } = await supabase.from('projects').insert(sanitized).select().single();
      return created || sanitized;
    }

    memoryStore.projects.unshift(sanitized);
    return sanitized;
  },

  async updateProject(id, data) {
    initMemoryStore();
    const now = new Date().toISOString();
    const index = memoryStore.projects.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const merged = { ...memoryStore.projects[index], ...data, updated_at: now };
    memoryStore.projects[index] = merged;

    if (supabase) {
      const { data: updated } = await supabase.from('projects').update(merged).eq('id', id).select().single();
      return updated || merged;
    }

    return merged;
  },

  async deleteProject(id) {
    initMemoryStore();
    if (supabase) {
      await supabase.from('projects').delete().eq('id', id);
    }
    const idx = memoryStore.projects.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    memoryStore.projects.splice(idx, 1);
    return true;
  },

  // ── Blog Posts ──
  async getBlogPosts(options = {}) {
    initMemoryStore();
    const { status, category, limit } = options;

    if (supabase) {
      let query = supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      if (status) query = query.eq('status', status);
      if (category && category !== 'All') query = query.eq('category', category);
      if (limit) query = query.limit(limit);
      const { data } = await query;
      return data || [];
    }

    let list = [...memoryStore.blog_posts];
    if (status) list = list.filter((b) => b.status === status);
    if (category && category !== 'All') list = list.filter((b) => b.category === category);
    list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    if (limit) list = list.slice(0, limit);
    return list;
  },

  async getBlogPostBySlug(slug) {
    initMemoryStore();
    if (supabase) {
      const { data } = await supabase.from('blog_posts').select('*').eq('slug', slug).single();
      return data || null;
    }
    return memoryStore.blog_posts.find((b) => b.slug === slug) || null;
  },

  async createBlogPost(data) {
    initMemoryStore();
    const id = data.id || `post-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const now = new Date().toISOString();
    const newPost = {
      ...data,
      id,
      title: sanitize(data.title),
      excerpt: sanitize(data.excerpt),
      tags: Array.isArray(data.tags) ? data.tags : ['Software', 'Architecture'],
      status: data.status || 'DRAFT',
      published_at: data.status === 'PUBLISHED' ? now : null,
      created_at: now,
      updated_at: now,
    };

    if (supabase) {
      const { data: created } = await supabase.from('blog_posts').insert(newPost).select().single();
      return created || newPost;
    }

    memoryStore.blog_posts.unshift(newPost);
    return newPost;
  },

  async updateBlogPost(slugOrId, data) {
    initMemoryStore();
    const now = new Date().toISOString();
    const index = memoryStore.blog_posts.findIndex((b) => b.id === slugOrId || b.slug === slugOrId);
    if (index === -1) return null;

    const merged = { ...memoryStore.blog_posts[index], ...data, updated_at: now };
    if (data.status === 'PUBLISHED' && !merged.published_at) {
      merged.published_at = now;
    }
    memoryStore.blog_posts[index] = merged;

    if (supabase) {
      const { data: updated } = await supabase
        .from('blog_posts')
        .update(merged)
        .or(`id.eq.${slugOrId},slug.eq.${slugOrId}`)
        .select()
        .single();
      return updated || merged;
    }

    return merged;
  },

  async deleteBlogPost(slugOrId) {
    initMemoryStore();
    if (supabase) {
      await supabase.from('blog_posts').delete().or(`id.eq.${slugOrId},slug.eq.${slugOrId}`);
    }
    const idx = memoryStore.blog_posts.findIndex((b) => b.id === slugOrId || b.slug === slugOrId);
    if (idx === -1) return false;
    memoryStore.blog_posts.splice(idx, 1);
    return true;
  },

  // ── Leads ──
  async getLeads(options = {}) {
    initMemoryStore();
    if (supabase) {
      let query = supabase.from('leads').select('*').order('created_at', { ascending: false });
      if (options.status) query = query.eq('status', options.status);
      const { data } = await query;
      return data || [];
    }

    let list = [...memoryStore.leads];
    if (options.status) list = list.filter((l) => l.status === options.status);
    list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return list;
  },

  async createLead(data) {
    initMemoryStore();
    const id = data.id || `lead-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const now = new Date().toISOString();
    const newLead = {
      ...data,
      id,
      name: sanitize(data.name),
      email: sanitize(data.email),
      phone: data.phone ? sanitize(data.phone) : null,
      company: data.company ? sanitize(data.company) : null,
      project_description: sanitize(data.project_description),
      status: data.status || 'NEW',
      created_at: now,
      updated_at: now,
    };

    if (supabase) {
      const { data: created } = await supabase.from('leads').insert(newLead).select().single();
      return created || newLead;
    }

    memoryStore.leads.unshift(newLead);
    return newLead;
  },

  async updateLead(id, data) {
    initMemoryStore();
    const now = new Date().toISOString();
    const lead = memoryStore.leads.find((l) => l.id === id);
    if (!lead) return null;

    Object.assign(lead, data, { updated_at: now });

    if (supabase) {
      const { data: updated } = await supabase.from('leads').update(data).eq('id', id).select().single();
      return updated || lead;
    }

    return lead;
  },

  // ── Conversations & Messages ──
  async createConversation(sessionId, visitorId) {
    initMemoryStore();
    const id = `conv-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const now = new Date().toISOString();
    const conv = {
      id,
      session_id: sessionId,
      visitor_id: visitorId || null,
      status: 'ACTIVE',
      created_at: now,
      updated_at: now,
    };

    if (supabase) {
      await supabase.from('conversations').insert(conv);
    }
    memoryStore.conversations.unshift(conv);
    return conv;
  },

  async addMessage(conversationId, role, content, metadata = {}) {
    initMemoryStore();
    const id = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const now = new Date().toISOString();
    const msg = {
      id,
      conversation_id: conversationId,
      role,
      content: sanitize(content),
      metadata,
      created_at: now,
    };

    if (supabase) {
      await supabase.from('messages').insert(msg);
    }
    memoryStore.messages.push(msg);
    return msg;
  },

  async getMessages(conversationId) {
    initMemoryStore();
    if (supabase) {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
      return data || [];
    }
    return memoryStore.messages.filter((m) => m.conversation_id === conversationId);
  },

  // ── Knowledge Base ──
  async getKnowledgeItems(category) {
    initMemoryStore();
    if (supabase) {
      let query = supabase.from('knowledge_items').select('*');
      if (category) query = query.eq('category', category);
      const { data } = await query;
      return data || [];
    }
    if (category) return memoryStore.knowledge_items.filter((k) => k.category === category);
    return [...memoryStore.knowledge_items];
  },

  async createKnowledgeItem(data) {
    initMemoryStore();
    const id = data.id || `know-${Date.now()}`;
    const now = new Date().toISOString();
    const item = { ...data, id, updated_at: now };

    if (supabase) {
      const { data: created } = await supabase.from('knowledge_items').insert(item).select().single();
      return created || item;
    }

    memoryStore.knowledge_items.unshift(item);
    return item;
  },

  async updateKnowledgeItem(id, data) {
    initMemoryStore();
    const now = new Date().toISOString();
    const index = memoryStore.knowledge_items.findIndex((k) => k.id === id);
    if (index === -1) return null;

    const merged = { ...memoryStore.knowledge_items[index], ...data, updated_at: now };
    memoryStore.knowledge_items[index] = merged;

    if (supabase) {
      const { data: updated } = await supabase.from('knowledge_items').update(merged).eq('id', id).select().single();
      return updated || merged;
    }

    return merged;
  },

  async deleteKnowledgeItem(id) {
    initMemoryStore();
    if (supabase) {
      await supabase.from('knowledge_items').delete().eq('id', id);
    }
    const idx = memoryStore.knowledge_items.findIndex((k) => k.id === id);
    if (idx === -1) return false;
    memoryStore.knowledge_items.splice(idx, 1);
    return true;
  },

  // ── Automation ──
  async getAutomationJobs() {
    initMemoryStore();
    if (supabase) {
      const { data } = await supabase.from('automation_jobs').select('*');
      return data || [];
    }
    return [...memoryStore.automation_jobs];
  },

  async updateAutomationJob(id, data) {
    initMemoryStore();
    const now = new Date().toISOString();
    const job = memoryStore.automation_jobs.find((j) => j.id === id);
    if (job) Object.assign(job, data);

    if (supabase) {
      await supabase.from('automation_jobs').update(data).eq('id', id);
    }
    return job;
  },

  async getAutomationRuns(limit = 20) {
    initMemoryStore();
    if (supabase) {
      const { data } = await supabase.from('automation_runs').select('*').order('started_at', { ascending: false }).limit(limit);
      return data || [];
    }
    return [...memoryStore.automation_runs].slice(0, limit);
  },

  async recordAutomationRun(runData) {
    initMemoryStore();
    const id = `run-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const now = new Date().toISOString();
    const run = {
      id,
      job_id: runData.job_id || 'job-daily-seo',
      started_at: runData.started_at || now,
      completed_at: runData.completed_at || now,
      status: runData.status || 'SUCCESS',
      topic: runData.topic || 'Technical Topic',
      keyword: runData.keyword || 'Software Engineering',
      output_title: runData.output_title || null,
      output_post_id: runData.output_post_id || null,
      error: runData.error || null,
      created_at: now,
    };

    if (supabase) {
      await supabase.from('automation_runs').insert(run);
    }
    memoryStore.automation_runs.unshift(run);
    return run;
  },

  // ── Dashboard Stats ──
  async getDashboardStats() {
    initMemoryStore();
    const totalProjects = memoryStore.projects.length;
    const publishedProjects = memoryStore.projects.filter((p) => p.status === 'PUBLISHED').length;
    const totalBlogs = memoryStore.blog_posts.length;
    const draftBlogs = memoryStore.blog_posts.filter((b) => b.status === 'DRAFT').length;
    const publishedBlogs = memoryStore.blog_posts.filter((b) => b.status === 'PUBLISHED').length;
    const totalLeads = memoryStore.leads.length;
    const newLeads = memoryStore.leads.filter((l) => l.status === 'NEW').length;
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

  // ── Settings ──
  async getSettings() {
    initMemoryStore();
    return {
      site_name: 'Rahnoxa',
      site_url: config.siteUrl,
      contact_email: 'contact.rahnoxa@protonmail.com',
      auto_publish: config.autoPublishBlogs,
      ai_provider: config.ai.provider,
      ai_model: config.ai.model,
    };
  },

  async updateSettings(newSettings) {
    initMemoryStore();
    Object.assign(memoryStore.settings, newSettings);
    return memoryStore.settings;
  },
};
