import { AutomationService } from '../services/automation.service.js';

export class AutomationController {
  static async getStatus(req, res, next) {
    try {
      const data = await AutomationService.getStatus();
      return res.status(200).json({ success: true, ...data });
    } catch (err) {
      next(err);
    }
  }

  static async updateJob(req, res, next) {
    try {
      const job = await AutomationService.updateJob(req.body);
      return res.status(200).json({ success: true, job });
    } catch (err) {
      next(err);
    }
  }

  static async triggerRun(req, res, next) {
    try {
      const result = await AutomationService.triggerRun();
      return res.status(200).json({
        success: true,
        message: `Generated article '${result.post?.title || 'SEO Article'}' as ${result.post?.status || 'DRAFT'}.`,
        post: result.post,
        run: result.run,
      });
    } catch (err) {
      next(err);
    }
  }
}
