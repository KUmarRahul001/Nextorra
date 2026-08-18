import { Router } from 'express';
import { db } from '../../../database/supabase.js';
import { requireAuth } from '../../../middleware/auth.js';

const router = Router();

// GET /v1/dashboard/stats
router.get('/stats', requireAuth, async (req, res, next) => {
  try {
    const stats = await db.getDashboardStats();
    const recentLeads = await db.getLeads({ limit: 5 });
    const recentBlogs = await db.getBlogPosts({ limit: 5 });
    const automationRuns = await db.getAutomationRuns(5);

    res.status(200).json({
      success: true,
      stats,
      recentLeads,
      recentBlogs,
      automationRuns,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
