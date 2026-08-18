import { getDB } from '../_db.js';
import { requireAuth } from '../_auth.js';

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const category = url.searchParams.get('category');

  const db = await getDB(context);
  const items = await db.getKnowledgeItems(category);

  return new Response(
    JSON.stringify({ items }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function onRequestPost(context) {
  const auth = await requireAuth(context);
  if (!auth.authenticated) {
    return auth.response;
  }

  const data = await context.request.json();
  const db = await getDB(context);

  const item = await db.createKnowledgeItem(data);
  return new Response(
    JSON.stringify({ success: true, item }),
    { status: 201, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function onRequestPut(context) {
  const auth = await requireAuth(context);
  if (!auth.authenticated) {
    return auth.response;
  }

  const data = await context.request.json();
  const db = await getDB(context);

  const item = await db.updateKnowledgeItem(data.id, data);
  return new Response(
    JSON.stringify({ success: true, item }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function onRequestDelete(context) {
  const auth = await requireAuth(context);
  if (!auth.authenticated) {
    return auth.response;
  }

  const url = new URL(context.request.url);
  const id = url.searchParams.get('id');
  const db = await getDB(context);

  await db.deleteKnowledgeItem(id);
  return new Response(
    JSON.stringify({ success: true }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
