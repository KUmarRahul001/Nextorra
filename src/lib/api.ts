/**
 * Rahnoxa Centralized API Client & Service Gateway
 */

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

async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(endpoint, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || `HTTP error ${response.status}`);
    }
    return data;
  } catch (err: any) {
    // If backend function is unreachable, provide graceful fallback for frontend stability
    console.warn(`API call to ${endpoint} returned:`, err.message);
    throw err;
  }
}

export const api = {
  // ── Auth ──
  async login(credentials: { username: string; password: string }) {
    const res = await apiFetch('/api/auth/login', {
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
    return apiFetch('/api/auth/verify');
  },

  // ── Dashboard Stats ──
  async getDashboardStats() {
    return apiFetch('/api/dashboard/stats');
  },

  // ── Projects ──
  async getProjects(status?: string, featured?: boolean) {
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (featured !== undefined) params.set('featured', String(featured));
    return apiFetch(`/api/projects?${params.toString()}`);
  },

  async createProject(data: any) {
    return apiFetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateProject(id: string, data: any) {
    return apiFetch(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteProject(id: string) {
    return apiFetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });
  },

  // ── Blog ──
  async getBlogPosts(options: { category?: string; all?: boolean; status?: string } = {}) {
    const params = new URLSearchParams();
    if (options.category && options.category !== 'All') params.set('category', options.category);
    if (options.all) params.set('all', 'true');
    if (options.status) params.set('status', options.status);
    return apiFetch(`/api/blog?${params.toString()}`);
  },

  async getBlogPost(slug: string) {
    return apiFetch(`/api/blog/${slug}`);
  },

  async createBlogPost(data: any) {
    return apiFetch('/api/blog', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateBlogPost(slug: string, data: any) {
    return apiFetch(`/api/blog/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteBlogPost(slug: string) {
    return apiFetch(`/api/blog/${slug}`, {
      method: 'DELETE',
    });
  },

  // ── Leads ──
  async getLeads(status?: string) {
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    return apiFetch(`/api/leads?${params.toString()}`);
  },

  async submitLead(data: any) {
    return apiFetch('/api/leads', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateLead(id: string, status: string, notes?: string) {
    return apiFetch(`/api/leads/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status, notes }),
    });
  },

  // ── Chat (RahBot) ──
  async sendChatMessage(message: string, conversation_id?: string, session_id?: string) {
    return apiFetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message, conversation_id, session_id }),
    });
  },

  // ── Knowledge ──
  async getKnowledge(category?: string) {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    return apiFetch(`/api/knowledge?${params.toString()}`);
  },

  async createKnowledge(data: any) {
    return apiFetch('/api/knowledge', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateKnowledge(data: any) {
    return apiFetch('/api/knowledge', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteKnowledge(id: string) {
    return apiFetch(`/api/knowledge?id=${id}`, {
      method: 'DELETE',
    });
  },

  // ── Automation ──
  async getAutomation() {
    return apiFetch('/api/automation');
  },

  async updateAutomation(data: any) {
    return apiFetch('/api/automation', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async runAutomation() {
    return apiFetch('/api/automation/run', {
      method: 'POST',
      body: JSON.stringify({}),
    });
  },

  // ── Settings ──
  async getSettings() {
    return apiFetch('/api/settings');
  },

  async updateSettings(data: any) {
    return apiFetch('/api/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};
