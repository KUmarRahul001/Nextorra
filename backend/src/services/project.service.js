import { db } from '../../database/supabase.js';
import { NotFoundError, BadRequestError } from '../utils/errors.js';

export class ProjectService {
  static async list(filters = {}) {
    return db.getProjects(filters);
  }

  static async getBySlug(slug) {
    const project = await db.getProjectBySlug(slug);
    if (!project) throw new NotFoundError('Project not found');
    return project;
  }

  static async create(data) {
    if (!data.title || !data.category) {
      throw new BadRequestError('Title and category are required');
    }
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return db.createProject({ ...data, slug });
  }

  static async update(id, data) {
    const updated = await db.updateProject(id, data);
    if (!updated) throw new NotFoundError('Project not found');
    return updated;
  }

  static async delete(id) {
    const deleted = await db.deleteProject(id);
    if (!deleted) throw new NotFoundError('Project not found');
    return { id, deleted: true };
  }
}
