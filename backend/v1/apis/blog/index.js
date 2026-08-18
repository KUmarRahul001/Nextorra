import { Router } from 'express';
import { db } from '../../../database/supabase.js';
import { requireAuth } from '../../../middleware/auth.js';

const router = Router();

// GET /v1/blog (Public / Admin with query)
router.get('/', async (req, res, next) => {
  try {
    const { category, all } = req.query;

    let posts;
    if (all === 'true') {
      // Must be authenticated to view all drafts
      if (!req.headers.authorization) {
        return res.status(401).json({
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'Authentication required for draft access.' },
        });
      }
      posts = await db.getBlogPosts({ category });
    } else {
      // Public only gets published posts
      posts = await db.getBlogPosts({ status: 'PUBLISHED', category });
    }

    res.status(200).json({ success: true, posts });
  } catch (err) {
    next(err);
  }
});

// GET /v1/blog/:slug (Public)
router.get('/:slug', async (req, res, next) => {
  try {
    const post = await db.getBlogPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Article not found' } });
    }

    if (post.status !== 'PUBLISHED') {
      // Drafts require authentication
      if (!req.headers.authorization) {
        return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Article is in draft review.' } });
      }
    }

    res.status(200).json({ success: true, post });
  } catch (err) {
    next(err);
  }
});

// POST /v1/blog (Admin)
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const data = req.body;
    if (!data.title || !data.content) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Title and content are required.' },
      });
    }

    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const excerpt = data.excerpt || data.content.substring(0, 160).replace(/[#*`]/g, '') + '...';
    const words = data.content.split(/\s+/).length;
    const reading_time = `${Math.ceil(words / 200)} min read`;

    const post = await db.createBlogPost({
      ...data,
      slug,
      excerpt,
      reading_time,
      status: data.status || 'DRAFT',
    });

    res.status(201).json({ success: true, post });
  } catch (err) {
    next(err);
  }
});

// PUT /v1/blog/:slug (Admin)
router.put('/:slug', requireAuth, async (req, res, next) => {
  try {
    const updated = await db.updateBlogPost(req.params.slug, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Article not found' } });
    }
    res.status(200).json({ success: true, post: updated });
  } catch (err) {
    next(err);
  }
});

// DELETE /v1/blog/:slug (Admin)
router.delete('/:slug', requireAuth, async (req, res, next) => {
  try {
    const deleted = await db.deleteBlogPost(req.params.slug);
    if (!deleted) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Article not found' } });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
