import { db } from '../../database/supabase.js';
import { NotFoundError } from '../utils/errors.js';

export class KnowledgeService {
  static async list(category) {
    return db.getKnowledgeItems(category);
  }

  static async create(data) {
    return db.createKnowledgeItem(data);
  }

  static async update(id, data) {
    const updated = await db.updateKnowledgeItem(id, data);
    if (!updated) throw new NotFoundError('Knowledge item not found');
    return updated;
  }

  static async delete(id) {
    const deleted = await db.deleteKnowledgeItem(id);
    if (!deleted) throw new NotFoundError('Knowledge item not found');
    return { id, deleted: true };
  }
}
