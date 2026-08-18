import { KnowledgeService } from '../services/knowledge.service.js';

export class KnowledgeController {
  static async list(req, res, next) {
    try {
      const items = await KnowledgeService.list(req.query.category);
      return res.status(200).json({ success: true, items });
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const item = await KnowledgeService.create(req.body);
      return res.status(201).json({ success: true, item });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const item = await KnowledgeService.update(req.params.id, req.body);
      return res.status(200).json({ success: true, item });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      await KnowledgeService.delete(req.params.id);
      return res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  }
}
