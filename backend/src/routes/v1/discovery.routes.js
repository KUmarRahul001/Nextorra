import { Router } from 'express';
import { DiscoveryController } from '../../controllers/discovery.controller.js';
import { authenticate, authorize } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/locations', authenticate, authorize('superadmin', 'admin', 'support'), DiscoveryController.getLocations);
router.post('/jobs', authenticate, authorize('superadmin', 'admin', 'support'), DiscoveryController.startJob);
router.post('/url', authenticate, authorize('superadmin', 'admin', 'support'), DiscoveryController.discoverFromUrl);
router.post('/convert', authenticate, authorize('superadmin', 'admin', 'support'), DiscoveryController.convertToLead);
router.get('/export-xlsx', authenticate, authorize('superadmin', 'admin', 'support'), DiscoveryController.exportXlsx);

export default router;
