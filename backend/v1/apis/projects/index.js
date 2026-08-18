import { Router } from 'express';
import { db } from '../../../database/supabase.js';
import { requireAuth } from '../../../middleware/auth.js';

const router = Router();

// GET /v1/projects (Public)
router.get('/', async (req, res, next) => {
  try {
    const status = req.query.status || 'PUBLISHED';
    const featured = req.query.featured === 'true' ? true : undefined;

    const projects = await db.getProjects({ status, featured });
    res.status(200).json({ success: true, projects });
  } catch (err) {
    next(err);
  }
});

// GET /v1/projects/:slug (Public)
router.get('/:slug', async (req, res, next) => {
  try {
    const project = await db.getProjectBySlug(req.params.slug);
    if (!project) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Project not found' } });
    }
    res.status(200).json({ success: true, project });
  } catch (err) {
    next(err);
  }
});

// POST /v1/projects (Admin)
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const data = req.body;
    if (!data.title || !data.category) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Title and category are required.' },
      });
    }

    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const project = await db.createProject({
      ...data,
      slug,
      status: data.status || 'PUBLISHED',
    });

    res.status(201).json({ success: true, project });
  } catch (err) {
    next(err);
  }
});

// PUT /v1/projects/:id (Admin)
router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const updated = await db.updateProject(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Project not found' } });
    }
    res.status(200).json({ success: true, project: updated });
  } catch (err) {
    next(err);
  }
});

// DELETE /v1/projects/:id (Admin)
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const deleted = await db.deleteProject(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Project not found' } });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
