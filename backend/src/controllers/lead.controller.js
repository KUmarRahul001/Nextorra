import { LeadService } from '../services/lead.service.js';

export class LeadController {
  static async list(req, res, next) {
    try {
      const { status } = req.query;
      const leads = await LeadService.list({ status });
      return res.status(200).json({ success: true, leads });
    } catch (err) {
      next(err);
    }
  }

  static async submit(req, res, next) {
    try {
      const result = await LeadService.submit(req.body);
      return res.status(201).json({
        success: true,
        message: result.message,
        leadId: result.leadId,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { status, notes } = req.body;
      const lead = await LeadService.updateStatus(req.params.id, { status, notes });
      return res.status(200).json({ success: true, lead });
    } catch (err) {
      next(err);
    }
  }
}
