import { DashboardService } from '../services/dashboard.service.js';

export class DashboardController {
  static async getStats(req, res, next) {
    try {
      const data = await DashboardService.getStats();
      return res.status(200).json({
        success: true,
        ...data,
      });
    } catch (err) {
      next(err);
    }
  }
}
