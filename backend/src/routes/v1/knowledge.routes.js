import { Router } from 'express';
import { KnowledgeController } from '../../controllers/knowledge.controller.js';
import { authenticate, authorize } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/', KnowledgeController.list);
router.post('/', authenticate, authorize('superadmin', 'admin'), KnowledgeController.create);
router.put('/:id', authenticate, authorize('superadmin', 'admin'), KnowledgeController.update);
router.delete('/:id', authenticate, authorize('superadmin', 'admin'), KnowledgeController.delete);

export default router;
