import { Router } from 'express';
import authRouter from './auth/index.js';
import dashboardRouter from './dashboard/index.js';
import projectsRouter from './projects/index.js';
import blogRouter from './blog/index.js';
import leadsRouter from './leads/index.js';
import chatRouter from './chat/index.js';
import knowledgeRouter from './knowledge/index.js';
import automationRouter from './automation/index.js';
import settingsRouter from './settings/index.js';

const v1Router = Router();

v1Router.use('/auth', authRouter);
v1Router.use('/dashboard', dashboardRouter);
v1Router.use('/projects', projectsRouter);
v1Router.use('/blog', blogRouter);
v1Router.use('/leads', leadsRouter);
v1Router.use('/chat', chatRouter);
v1Router.use('/knowledge', knowledgeRouter);
v1Router.use('/automation', automationRouter);
v1Router.use('/settings', settingsRouter);

export default v1Router;
