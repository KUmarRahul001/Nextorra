import { BlogService } from '../services/blog.service.js';
import { verifyAccessToken } from '../config/jwt.js';

function checkTokenValidity(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  try {
    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);
    return Boolean(decoded && decoded.id);
  } catch {
    return false;
  }
}

export class BlogController {
  static async list(req, res, next) {
    try {
      const { category, all } = req.query;
      const isAuth = checkTokenValidity(req.headers.authorization);
      const posts = await BlogService.list({ category, all, isAuth });
      return res.status(200).json({ success: true, posts });
    } catch (err) {
      next(err);
    }
  }

  static async getBySlug(req, res, next) {
    try {
      const isAuth = checkTokenValidity(req.headers.authorization);
      const post = await BlogService.getBySlug(req.params.slug, isAuth);
      return res.status(200).json({ success: true, post });
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const post = await BlogService.create(req.body);
      return res.status(201).json({ success: true, post });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const post = await BlogService.update(req.params.slug, req.body);
      return res.status(200).json({ success: true, post });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      await BlogService.delete(req.params.slug);
      return res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  }
}
