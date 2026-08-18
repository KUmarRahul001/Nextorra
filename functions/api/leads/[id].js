import { getDB } from '../_db.js';
import { requireAuth } from '../_auth.js';

export async function onRequestPut(context) {
  const auth = await requireAuth(context);
  if (!auth.authenticated) {
    return auth.response;
  }

  const { id } = context.params;
  const { status, notes } = await context.request.json();
  const db = await getDB(context);

  const updated = await db.updateLeadStatus(id, status, notes);
  if (!updated) {
    return new Response(
      JSON.stringify({ error: 'Lead not found' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({ success: true, lead: updated }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
