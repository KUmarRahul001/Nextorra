import { Router } from 'express';
import { db } from '../../../database/supabase.js';
import { requireAuth } from '../../../middleware/auth.js';
import { rateLimiter } from '../../../middleware/rateLimit.js';

const router = Router();

// GET /v1/leads (Admin)
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const { status } = req.query;
    const leads = await db.getLeads({ status });
    res.status(200).json({ success: true, leads });
  } catch (err) {
    next(err);
  }
});

// POST /v1/leads (Public Lead Capture)
router.post(
  '/',
  rateLimiter({ maxRequests: 10, windowSeconds: 600, message: 'Too many submissions. Please wait 10 minutes.' }),
  async (req, res, next) => {
    try {
      const data = req.body || {};
      const { name, email, project_description } = data;

      if (!name || !email || !project_description) {
        return res.status(400).json({
          success: false,
          error: { code: 'MISSING_FIELDS', message: 'Name, email, and project description are required.' },
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({
          success: false,
          error: { code: 'INVALID_EMAIL', message: 'Please provide a valid email address.' },
        });
      }

      const lead = await db.createLead({
        name: name.trim(),
        email: email.trim(),
        phone: data.phone ? data.phone.trim() : null,
        company: data.company ? data.company.trim() : null,
        service: data.service || 'General Software Engineering',
        project_description: project_description.trim(),
        budget: data.budget || 'To be discussed',
        timeline: data.timeline || 'Flexible',
        source: data.source || 'website_contact',
        conversation_id: data.conversation_id || null,
        status: 'NEW',
      });

      res.status(201).json({
        success: true,
        message: 'Your project enquiry has been received. The Rahnoxa engineering team will follow up within 24 hours.',
        leadId: lead.id,
      });
    } catch (err) {
      next(err);
    }
  }
);

// PUT /v1/leads/:id (Admin)
router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const updated = await db.updateLead(req.params.id, { status, notes });
    if (!updated) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Lead not found' } });
    }
    res.status(200).json({ success: true, lead: updated });
  } catch (err) {
    next(err);
  }
});

export default router;
