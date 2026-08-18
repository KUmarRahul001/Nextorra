import { ProjectService } from '../services/project.service.js';
import { successResponse } from '../utils/response.js';

export class ProjectController {
  static async list(req, res, next) {
    try {
      const { status, featured, limit } = req.query;
      const projects = await ProjectService.list({
        status: status || 'PUBLISHED',
        featured: featured === 'true' ? true : undefined,
        limit: limit ? parseInt(limit, 10) : undefined,
      });
      return res.status(200).json({ success: true, projects });
    } catch (err) {
      next(err);
    }
  }

  static async getBySlug(req, res, next) {
    try {
      const project = await ProjectService.getBySlug(req.params.slug);
      return res.status(200).json({ success: true, project });
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const project = await ProjectService.create(req.body);
      return res.status(201).json({ success: true, project });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const project = await ProjectService.update(req.params.id, req.body);
      return res.status(200).json({ success: true, project });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      await ProjectService.delete(req.params.id);
      return res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  }
}
