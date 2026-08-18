import { Router } from 'express';
import { ProjectController } from '../../controllers/project.controller.js';
import { authenticate, authorize } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/', ProjectController.list);
router.get('/:slug', ProjectController.getBySlug);
router.post('/', authenticate, authorize('superadmin', 'admin'), ProjectController.create);
router.put('/:id', authenticate, authorize('superadmin', 'admin'), ProjectController.update);
router.delete('/:id', authenticate, authorize('superadmin', 'admin'), ProjectController.delete);

export default router;
