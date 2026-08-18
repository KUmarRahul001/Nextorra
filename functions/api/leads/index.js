import { getDB } from '../_db.js';
import { requireAuth } from '../_auth.js';

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
    JSON.stringify({ leads }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    const { name, email, project_description } = data;

    if (!name || !email || !project_description) {
      return new Response(
        JSON.stringify({ error: 'Name, email, and project description are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const db = await getDB(context);
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
      JSON.stringify({ error: 'Internal server error', details: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
