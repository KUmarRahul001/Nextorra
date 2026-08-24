import { Router } from 'express';
import authRoutes from './auth.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import projectRoutes from './project.routes.js';
import blogRoutes from './blog.routes.js';
import leadRoutes from './lead.routes.js';
import chatRoutes from './chat.routes.js';
import knowledgeRoutes from './knowledge.routes.js';
import automationRoutes from './automation.routes.js';
import settingsRoutes from './settings.routes.js';
import uploadRoutes from './upload.routes.js';
import voiceRoutes from './voice.routes.js';
import discoveryRoutes from './discovery.routes.js';
import seoRoutes from './seo.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/projects', projectRoutes);
router.use('/blog', blogRoutes);
router.use('/leads', leadRoutes);
router.use('/chat', chatRoutes);
router.use('/knowledge', knowledgeRoutes);
router.use('/automation', automationRoutes);
router.use('/settings', settingsRoutes);
router.use('/upload', uploadRoutes);
router.use('/voice', voiceRoutes);
router.use('/discovery', discoveryRoutes);
router.use('/seo', seoRoutes);

export default router;
