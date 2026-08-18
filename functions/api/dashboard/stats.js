import { getDB } from '../_db.js';
import { requireAuth } from '../_auth.js';

export async function onRequestGet(context) {
  const auth = await requireAuth(context);
  if (!auth.authenticated) {
    return auth.response;
  }

  const db = await getDB(context);
  const stats = await db.getDashboardStats();
  const recentLeads = await db.getLeads({ limit: 5 });
  const recentBlogs = await db.getBlogPosts({ limit: 5 });
  const automationRuns = await db.getAutomationRuns(5);

  return new Response(
    JSON.stringify({
      stats,
      recentLeads,
      recentBlogs,
      automationRuns,
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
