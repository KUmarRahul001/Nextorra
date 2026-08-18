import { getDB } from '../_db.js';
import { requireAuth } from '../_auth.js';
import { checkRateLimit, getClientIP } from '../_rateLimit.js';

export async function onRequestGet(context) {
  const auth = await requireAuth(context);
  if (!auth.authenticated) {
    return auth.response;
  }

  const url = new URL(context.request.url);
  const status = url.searchParams.get('status');

  const db = await getDB(context);
  const leads = await db.getLeads({ status });

  return new Response(
    JSON.stringify({ success: true, leads }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function onRequestPost(context) {
  try {
    const clientIP = getClientIP(context.request);
    const rateCheck = checkRateLimit(`lead_${clientIP}`, 10, 600); // 10 submissions per 10 mins

    if (rateCheck.limited) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'TOO_MANY_SUBMISSIONS',
            message: `Submission rate limit exceeded. Please wait ${rateCheck.retryAfter} seconds.`,
          },
        }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await context.request.json().catch(() => ({}));
    const { name, email, project_description } = data;

    if (!name || !email || !project_description) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'MISSING_FIELDS',
            message: 'Name, email, and project description are required.',
          },
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (name.length > 150 || email.length > 200 || project_description.length > 5000) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'OVERSIZED_INPUT',
            message: 'Payload exceeds maximum field character limit.',
          },
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'INVALID_EMAIL',
            message: 'Please provide a valid email address.',
          },
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const db = await getDB(context);
    const lead = await db.createLead({
      name: name.trim(),
      email: email.trim(),
      phone: data.phone ? data.phone.trim().substring(0, 40) : null,
      company: data.company ? data.company.trim().substring(0, 100) : null,
      service: data.service ? data.service.trim().substring(0, 100) : 'General Software Engineering',
      project_description: project_description.trim(),
      budget: data.budget ? data.budget.trim().substring(0, 80) : 'To be discussed',
      timeline: data.timeline ? data.timeline.trim().substring(0, 80) : 'Flexible',
      source: data.source || 'website_contact',
      conversation_id: data.conversation_id || null,
      status: 'NEW',
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Your project enquiry has been received. The Rahnoxa engineering team will follow up within 24 hours.',
        leadId: lead.id,
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'An unexpected error occurred submitting your lead.',
        },
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
