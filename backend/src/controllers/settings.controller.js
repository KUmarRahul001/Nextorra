import { SettingsService } from '../services/settings.service.js';

export class SettingsController {
  static async get(req, res, next) {
    try {
      const settings = await SettingsService.get();
      return res.status(200).json({ success: true, settings });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const settings = await SettingsService.update(req.body);
      return res.status(200).json({ success: true, settings });
    } catch (err) {
      next(err);
    }
  }
}
