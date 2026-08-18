import { db } from '../../database/supabase.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';

export class LeadService {
  static async list(filters = {}) {
    return db.getLeads(filters);
  }

  static async submit(data) {
    const { name, email, project_description } = data;
    if (!name || !email || !project_description) {
      throw new BadRequestError('Name, email, and project description are required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      throw new BadRequestError('Please provide a valid email address');
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

    return {
      message: 'Your project enquiry has been received. The Rahnoxa engineering team will follow up within 24 hours.',
      leadId: lead.id,
    };
  }

  static async updateStatus(id, { status, notes }) {
    const updated = await db.updateLead(id, { status, notes });
    if (!updated) throw new NotFoundError('Lead not found');
    return updated;
  }
}
