import { db } from '../../database/supabase.js';

export class DashboardService {
  static async getStats() {
    const stats = await db.getDashboardStats();
    const recentLeads = await db.getLeads({ limit: 5 });
    const recentBlogs = await db.getBlogPosts({ limit: 5 });
    const automationRuns = await db.getAutomationRuns(5);

    return {
      stats,
      recentLeads,
      recentBlogs,
      automationRuns,
    };
  }
}
