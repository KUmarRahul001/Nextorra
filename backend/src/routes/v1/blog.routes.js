import { Router } from 'express';
import { BlogController } from '../../controllers/blog.controller.js';
import { authenticate, authorize } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/', BlogController.list);
router.get('/:slug', BlogController.getBySlug);
router.post('/', authenticate, authorize('superadmin', 'admin', 'editor'), BlogController.create);
router.put('/:slug', authenticate, authorize('superadmin', 'admin', 'editor'), BlogController.update);
router.delete('/:slug', authenticate, authorize('superadmin', 'admin'), BlogController.delete);

export default router;
