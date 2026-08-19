import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import { config } from '../config/env.js';

// Supabase client instance (Remote PostgreSQL is the single source of truth)
export let supabase = null;

if (config.supabaseUrl && config.supabaseServiceKey) {
  try {
    supabase = createClient(config.supabaseUrl, config.supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  } catch (err) {
    console.error('❌ Failed to initialize Supabase client:', err.message);
  }
}

/**
 * Ensure Supabase client is initialized; throw controlled error if unconfigured.
 */
function getClient() {
  if (!supabase) {
    throw new Error('DATABASE_UNAVAILABLE: Remote Supabase PostgreSQL instance is not configured or reachable.');
  }
  return supabase;
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

export const db = {
  async checkHealth() {
    if (!supabase) return { status: 'unconfigured', error: 'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY' };
    try {
      const { error } = await supabase.from('site_settings').select('id').limit(1);
      if (error && error.code !== 'PGRST116') {
        // Test fallback query on projects
        const { error: pErr } = await supabase.from('projects').select('id').limit(1);
        if (pErr) throw pErr;
      }
      return { status: 'ok', database: 'supabase_postgresql' };
    } catch (err) {
      return { status: 'error', error: err.message };
    }
  },

  // ── Admins ──
  async findAdminByUsername(username) {
    const client = getClient();
    const { data, error } = await client
      .from('admins')
      .select('*')
      .or(`username.eq.${username},email.eq.${username}`)
      .maybeSingle();

    if (error) {
      console.error('[Database Error] findAdminByUsername:', error.message);
      throw new Error(`Database error: ${error.message}`);
    }
    return data;
  },

  async updateAdminLogin(id) {
    const client = getClient();
    const now = new Date().toISOString();
    const { error } = await client.from('admins').update({ last_login: now }).eq('id', id);
    if (error) console.error('[Database Error] updateAdminLogin:', error.message);
  },

  async createAdmin(data) {
    const client = getClient();
    const id = data.id || `admin-${Date.now()}`;
    const now = new Date().toISOString();
    const adminRecord = {
      id,
      username: data.username.trim(),
      email: data.email.trim(),
      password_hash: data.password_hash,
      role: data.role || 'admin',
      created_at: now,
    };
    const { data: created, error } = await client.from('admins').insert(adminRecord).select().single();
    if (error) throw new Error(`Database error creating admin: ${error.message}`);
    return created;
  },

  // ── Projects ──
  async getProjects(options = {}) {
    const client = getClient();
    const { status, featured, limit } = options;

    let query = client.from('projects').select('*').order('created_at', { ascending: false });
    if (status) query = query.eq('status', status);
    if (featured !== undefined) query = query.eq('featured', featured ? 1 : 0);
    if (limit) query = query.limit(limit);

    const { data, error } = await query;
    if (error) throw new Error(`Database error fetching projects: ${error.message}`);
    return data || [];
  },

  async getProjectBySlug(slugOrId) {
    const client = getClient();
    const { data, error } = await client
      .from('projects')
      .select('*')
      .or(`slug.eq.${slugOrId},id.eq.${slugOrId}`)
      .maybeSingle();
    if (error) throw new Error(`Database error fetching project: ${error.message}`);
    return data;
  },

  async createProject(data) {
    const client = getClient();
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

    const { data: created, error } = await client.from('projects').insert(sanitized).select().single();
    if (error) throw new Error(`Database error creating project: ${error.message}`);
    return created;
  },

  async updateProject(id, data) {
    const client = getClient();
    const now = new Date().toISOString();
    const updateData = { ...data, updated_at: now };

    const { data: updated, error } = await client.from('projects').update(updateData).eq('id', id).select().single();
    if (error) throw new Error(`Database error updating project: ${error.message}`);
    return updated;
  },

  async deleteProject(id) {
    const client = getClient();
    const { error } = await client.from('projects').delete().eq('id', id);
    if (error) throw new Error(`Database error deleting project: ${error.message}`);
    return true;
  },

  // ── Blog Posts ──
  async getBlogPosts(options = {}) {
    const client = getClient();
    const { status, category, limit } = options;

    let query = client.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (status) query = query.eq('status', status);
    if (category && category !== 'All') query = query.eq('category', category);
    if (limit) query = query.limit(limit);

    const { data, error } = await query;
    if (error) throw new Error(`Database error fetching blog posts: ${error.message}`);
    return data || [];
  },

  async getBlogPostBySlug(slug) {
    const client = getClient();
    const { data, error } = await client.from('blog_posts').select('*').eq('slug', slug).maybeSingle();
    if (error) throw new Error(`Database error fetching article: ${error.message}`);
    return data;
  },

  async createBlogPost(data) {
    const client = getClient();
    const id = data.id || `post-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const now = new Date().toISOString();
    const newPost = {
      ...data,
      id,
      title: sanitize(data.title),
      excerpt: sanitize(data.excerpt),
      tags: Array.isArray(data.tags) ? data.tags : ['Software Engineering'],
      status: data.status || 'DRAFT',
      published_at: data.status === 'PUBLISHED' ? now : null,
      created_at: now,
      updated_at: now,
    };

    const { data: created, error } = await client.from('blog_posts').insert(newPost).select().single();
    if (error) throw new Error(`Database error creating article: ${error.message}`);
    return created;
  },

  async updateBlogPost(slugOrId, data) {
    const client = getClient();
    const now = new Date().toISOString();
    const updateData = { ...data, updated_at: now };
    if (data.status === 'PUBLISHED' && !updateData.published_at) {
      updateData.published_at = now;
    }

    const { data: updated, error } = await client
      .from('blog_posts')
      .update(updateData)
      .or(`id.eq.${slugOrId},slug.eq.${slugOrId}`)
      .select()
      .single();

    if (error) throw new Error(`Database error updating article: ${error.message}`);
    return updated;
  },

  async deleteBlogPost(slugOrId) {
    const client = getClient();
    const { error } = await client.from('blog_posts').delete().or(`id.eq.${slugOrId},slug.eq.${slugOrId}`);
    if (error) throw new Error(`Database error deleting article: ${error.message}`);
    return true;
  },

  // ── Leads ──
  async getLeads(options = {}) {
    const client = getClient();
    let query = client.from('leads').select('*').order('created_at', { ascending: false });
    if (options.status) query = query.eq('status', options.status);

    const { data, error } = await query;
    if (error) throw new Error(`Database error fetching leads: ${error.message}`);
    return data || [];
  },

  async createLead(data) {
    const client = getClient();
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

    const { data: created, error } = await client.from('leads').insert(newLead).select().single();
    if (error) throw new Error(`Database error recording lead: ${error.message}`);
    return created;
  },

  async updateLead(id, data) {
    const client = getClient();
    const now = new Date().toISOString();
    const updateData = { ...data, updated_at: now };

    const { data: updated, error } = await client.from('leads').update(updateData).eq('id', id).select().single();
    if (error) throw new Error(`Database error updating lead: ${error.message}`);
    return updated;
  },

  // ── Conversations & Messages ──
  async createConversation(sessionId, visitorId) {
    const client = getClient();
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

    const { data, error } = await client.from('conversations').insert(conv).select().single();
    if (error) throw new Error(`Database error creating conversation: ${error.message}`);
    return data || conv;
  },

  async addMessage(conversationId, role, content, metadata = {}) {
    const client = getClient();
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

    const { data, error } = await client.from('messages').insert(msg).select().single();
    if (error) throw new Error(`Database error saving message: ${error.message}`);
    return data || msg;
  },

  async getMessages(conversationId) {
    const client = getClient();
    const { data, error } = await client
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) throw new Error(`Database error fetching messages: ${error.message}`);
    return data || [];
  },

  // ── Knowledge Base ──
  async getKnowledgeItems(category) {
    const client = getClient();
    let query = client.from('knowledge_items').select('*');
    if (category) query = query.eq('category', category);

    const { data, error } = await query;
    if (error) throw new Error(`Database error fetching knowledge items: ${error.message}`);
    return data || [];
  },

  async createKnowledgeItem(data) {
    const client = getClient();
    const id = data.id || `know-${Date.now()}`;
    const now = new Date().toISOString();
    const item = { ...data, id, updated_at: now };

    const { data: created, error } = await client.from('knowledge_items').insert(item).select().single();
    if (error) throw new Error(`Database error creating knowledge item: ${error.message}`);
    return created;
  },

  async updateKnowledgeItem(id, data) {
    const client = getClient();
    const now = new Date().toISOString();
    const updateData = { ...data, updated_at: now };

    const { data: updated, error } = await client.from('knowledge_items').update(updateData).eq('id', id).select().single();
    if (error) throw new Error(`Database error updating knowledge item: ${error.message}`);
    return updated;
  },

  async deleteKnowledgeItem(id) {
    const client = getClient();
    const { error } = await client.from('knowledge_items').delete().eq('id', id);
    if (error) throw new Error(`Database error deleting knowledge item: ${error.message}`);
    return true;
  },

  // ── Automation ──
  async getAutomationJobs() {
    const client = getClient();
    const { data, error } = await client.from('automation_jobs').select('*');
    if (error) throw new Error(`Database error fetching automation jobs: ${error.message}`);
    return data || [];
  },

  async updateAutomationJob(id, data) {
    const client = getClient();
    const { data: updated, error } = await client.from('automation_jobs').update(data).eq('id', id).select().single();
    if (error) throw new Error(`Database error updating automation job: ${error.message}`);
    return updated;
  },

  async getAutomationRuns(limit = 20) {
    const client = getClient();
    const { data, error } = await client.from('automation_runs').select('*').order('started_at', { ascending: false }).limit(limit);
    if (error) throw new Error(`Database error fetching automation runs: ${error.message}`);
    return data || [];
  },

  async recordAutomationRun(runData) {
    const client = getClient();
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

    const { data, error } = await client.from('automation_runs').insert(run).select().single();
    if (error) throw new Error(`Database error recording automation run: ${error.message}`);
    return data || run;
  },

  // ── Dashboard Stats ──
  async getDashboardStats() {
    const client = getClient();
    const [pRes, bRes, lRes, cRes, aRes] = await Promise.all([
      client.from('projects').select('id, status', { count: 'exact' }),
      client.from('blog_posts').select('id, status', { count: 'exact' }),
      client.from('leads').select('id, status', { count: 'exact' }),
      client.from('conversations').select('id', { count: 'exact' }),
      client.from('automation_runs').select('*').order('started_at', { ascending: false }).limit(1),
    ]);

    const projects = pRes.data || [];
    const blogs = bRes.data || [];
    const leads = lRes.data || [];

    return {
      projects: {
        total: projects.length,
        published: projects.filter((p) => p.status === 'PUBLISHED').length,
      },
      blogs: {
        total: blogs.length,
        draft: blogs.filter((b) => b.status === 'DRAFT').length,
        published: blogs.filter((b) => b.status === 'PUBLISHED').length,
      },
      leads: {
        total: leads.length,
        new: leads.filter((l) => l.status === 'NEW').length,
      },
      chat: {
        conversations: cRes.data ? cRes.data.length : 0,
      },
      automation: {
        lastRun: aRes.data && aRes.data.length > 0 ? aRes.data[0] : null,
      },
    };
  },

  // ── Settings ──
  async getSettings() {
    const client = getClient();
    const { data } = await client.from('site_settings').select('*').maybeSingle();
    return (
      data || {
        site_name: 'Rahnoxa',
        site_url: config.siteUrl,
        contact_email: 'contact.rahnoxa@protonmail.com',
        auto_publish_blogs: config.autoPublishBlogs,
      }
    );
  },

  async updateSettings(newSettings) {
    const client = getClient();
    const { data, error } = await client.from('site_settings').upsert({ id: 'global', ...newSettings }).select().single();
    if (error) throw new Error(`Database error updating settings: ${error.message}`);
    return data;
  },
};
