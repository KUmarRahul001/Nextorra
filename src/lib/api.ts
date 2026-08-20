/**
 * Rahnoxa Centralized API Client & Service Gateway
 * Authoritative interface connecting Frontend (React) to Remote Backend (Render Express /v1 Gateway)
 */

const getBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
    const trimmed = envUrl.trim().replace(/\/+$/, '');
    return trimmed.endsWith('/v1') ? trimmed : `${trimmed}/v1`;
  }
  
  // Strict remote-only requirement: Never silently default to localhost in production
  if (import.meta.env.PROD) {
    console.error('❌ [FATAL] VITE_API_URL is missing in production. Configure VITE_API_URL in Cloudflare Pages.');
  }
  return '/v1';
};

const getAuthToken = (): string | null => {
  return localStorage.getItem('rahnoxa_admin_token');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('rahnoxa_admin_token', token);
};

export const clearAuthToken = (): void => {
  localStorage.removeItem('rahnoxa_admin_token');
  localStorage.removeItem('rahnoxa_admin_user');
};

export const getStoredUser = () => {
  const userStr = localStorage.getItem('rahnoxa_admin_user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const setStoredUser = (user: any): void => {
  localStorage.setItem('rahnoxa_admin_user', JSON.stringify(user));
};

async function apiFetch(path: string, options: RequestInit = {}) {
  const baseUrl = getBaseUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${baseUrl}${normalizedPath}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const errMsg = data?.error?.message || data?.error || `HTTP error ${response.status}`;
      throw new Error(errMsg);
    }
    return data;
  } catch (err: any) {
    console.error(`[API Error] Request failed for ${url}:`, err.message);
    throw err;
  }
}

export const api = {
  // ── Auth ──
  async login(credentials: { username: string; password: string }) {
    const res = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (res.token) {
      setAuthToken(res.token);
      setStoredUser(res.user);
    }
    return res;
  },

  async verifyAuth() {
    return apiFetch('/auth/verify');
  },

  async me() {
    return apiFetch('/auth/me');
  },

  async logout() {
    clearAuthToken();
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
  },

  // ── Dashboard Stats ──
  async getDashboardStats() {
    return apiFetch('/dashboard/stats');
  },

  // ── Projects ──
  async getProjects(status?: string, featured?: boolean) {
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (featured !== undefined) params.set('featured', String(featured));
    return apiFetch(`/projects?${params.toString()}`);
  },

  async getProject(slug: string) {
    return apiFetch(`/projects/${slug}`);
  },

  async createProject(data: any) {
    return apiFetch('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateProject(id: string, data: any) {
    return apiFetch(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteProject(id: string) {
    return apiFetch(`/projects/${id}`, {
      method: 'DELETE',
    });
  },

  // ── Blog ──
  async getBlogPosts(options: { category?: string; all?: boolean; status?: string } = {}) {
    const params = new URLSearchParams();
    if (options.category && options.category !== 'All') params.set('category', options.category);
    if (options.all) params.set('all', 'true');
    if (options.status) params.set('status', options.status);
    return apiFetch(`/blog?${params.toString()}`);
  },

  async getBlogPost(slug: string) {
    return apiFetch(`/blog/${slug}`);
  },

  async createBlogPost(data: any) {
    return apiFetch('/blog', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateBlogPost(slug: string, data: any) {
    return apiFetch(`/blog/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteBlogPost(slug: string) {
    return apiFetch(`/blog/${slug}`, {
      method: 'DELETE',
    });
  },

  // ── Leads ──
  async getLeads(status?: string) {
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    return apiFetch(`/leads?${params.toString()}`);
  },

  async submitLead(data: any) {
    return apiFetch('/leads', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateLead(id: string, status: string, notes?: string) {
    return apiFetch(`/leads/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status, notes }),
    });
  },

  // ── Chat (RahBot) ──
  async sendChatMessage(message: string, conversation_id?: string, session_id?: string) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s bounded timeout

    try {
      const res = await apiFetch('/chat', {
        method: 'POST',
        body: JSON.stringify({ message, conversation_id, session_id }),
        signal: controller.signal,
      });
      return res;
    } finally {
      clearTimeout(timeoutId);
    }
  },

  // ── Knowledge ──
  async getKnowledge(category?: string) {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    return apiFetch(`/knowledge?${params.toString()}`);
  },

  async createKnowledge(data: any) {
    return apiFetch('/knowledge', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateKnowledge(id: string, data: any) {
    return apiFetch('/knowledge/${id}', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteKnowledge(id: string) {
    return apiFetch(`/knowledge/${id}`, {
      method: 'DELETE',
    });
  },

  // ── Automation ──
  async getAutomation() {
    return apiFetch('/automation');
  },

  async updateAutomation(data: any) {
    return apiFetch('/automation', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async runAutomation() {
    return apiFetch('/automation/run', {
      method: 'POST',
      body: JSON.stringify({}),
    });
  },

  // ── Media & Image CDN (Cloudinary) ──
  async uploadImage(file: File | Blob, folder = 'rahnoxa/showcases') {
    const baseUrl = getBaseUrl();
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${baseUrl}/upload/image`, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error?.message || 'Failed to upload image to CDN');
    }
    return data;
  },

  // ── Settings ──
  async getSettings() {
    return apiFetch('/settings');
  },

  async updateSettings(data: any) {
    return apiFetch('/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

