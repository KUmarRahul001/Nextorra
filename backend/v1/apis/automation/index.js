import { Router } from 'express';
import { db } from '../../../database/supabase.js';
import { requireAuth } from '../../../middleware/auth.js';
import { executeDailySEOAutomation } from '../../../jobs/seoScheduler.js';

const router = Router();

// GET /v1/automation (Admin)
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const jobs = await db.getAutomationJobs();
    const runs = await db.getAutomationRuns(30);
    res.status(200).json({ success: true, jobs, runs });
  } catch (err) {
    next(err);
  }
});

// PUT /v1/automation (Admin)
router.put('/', requireAuth, async (req, res, next) => {
  try {
    const data = req.body;
    const updated = await db.updateAutomationJob(data.id || 'job-daily-seo', data);
    res.status(200).json({ success: true, job: updated });
  } catch (err) {
    next(err);
  }
});

// POST /v1/automation/run (Admin Manual Execution)
router.post('/run', requireAuth, async (req, res, next) => {
  try {
    const result = await executeDailySEOAutomation();
    res.status(200).json({
      success: true,
      message: `Generated article '${result.post?.title || 'SEO Article'}' as ${result.post?.status || 'DRAFT'}.`,
      post: result.post,
      run: result.run,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: { code: 'AUTOMATION_FAILED', message: err.message },
    });
  }
});

export default router;
