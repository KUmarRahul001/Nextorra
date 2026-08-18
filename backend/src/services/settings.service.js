import { db } from '../../database/supabase.js';

export class SettingsService {
  static async get() {
    return db.getSettings();
  }

  static async update(data) {
    return db.updateSettings(data);
  }
}
