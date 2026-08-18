import { Router } from 'express';
import { db } from '../../../database/supabase.js';
import { requireAuth } from '../../../middleware/auth.js';

const router = Router();

// GET /v1/settings (Admin)
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const settings = await db.getSettings();
    res.status(200).json({ success: true, settings });
  } catch (err) {
    next(err);
  }
});

// PUT /v1/settings (Admin)
router.put('/', requireAuth, async (req, res, next) => {
  try {
    const updated = await db.updateSettings(req.body);
    res.status(200).json({ success: true, settings: updated });
  } catch (err) {
    next(err);
  }
});

export default router;
