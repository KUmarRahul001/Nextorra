import { Router } from 'express';
import { db } from '../../../database/supabase.js';
import { requireAuth } from '../../../middleware/auth.js';

const router = Router();

// GET /v1/knowledge (Public / Admin)
router.get('/', async (req, res, next) => {
  try {
    const { category } = req.query;
    const items = await db.getKnowledgeItems(category);
    res.status(200).json({ success: true, items });
  } catch (err) {
    next(err);
  }
});

// POST /v1/knowledge (Admin)
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const item = await db.createKnowledgeItem(req.body);
    res.status(201).json({ success: true, item });
  } catch (err) {
    next(err);
  }
});

// PUT /v1/knowledge/:id (Admin)
router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const item = await db.updateKnowledgeItem(req.params.id, req.body);
    if (!item) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Item not found' } });
    }
    res.status(200).json({ success: true, item });
  } catch (err) {
    next(err);
  }
});

// DELETE /v1/knowledge/:id (Admin)
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const deleted = await db.deleteKnowledgeItem(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Item not found' } });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
