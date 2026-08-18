import { getDB } from '../_db.js';
import { requireAuth } from '../_auth.js';

export async function onRequestPut(context) {
  const auth = await requireAuth(context);
  if (!auth.authenticated) {
    return auth.response;
  }

  const { id } = context.params;
  const data = await context.request.json();
  const db = await getDB(context);

  const updated = await db.updateProject(id, data);
  if (!updated) {
    return new Response(
      JSON.stringify({ error: 'Project not found' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({ success: true, project: updated }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function onRequestDelete(context) {
  const auth = await requireAuth(context);
  if (!auth.authenticated) {
    return auth.response;
  }

  const { id } = context.params;
  const db = await getDB(context);
  const deleted = await db.deleteProject(id);

  if (!deleted) {
    return new Response(
      JSON.stringify({ error: 'Project not found' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({ success: true }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
