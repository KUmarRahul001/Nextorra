import { getDB } from '../_db.js';
import { requireAuth } from '../_auth.js';

export async function onRequestGet(context) {
  const auth = await requireAuth(context);
  if (!auth.authenticated) {
    return auth.response;
  }

  const db = await getDB(context);
  return new Response(
    JSON.stringify({
      site_name: 'Rahnoxa',
      site_url: 'https://rahnoxa.pages.dev',
      contact_email: 'contact.rahnoxa@protonmail.com',
      auto_publish: false,
      ai_provider: 'Cloudflare Edge / Semantic Engine',
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function onRequestPut(context) {
  const auth = await requireAuth(context);
  if (!auth.authenticated) {
    return auth.response;
  }

  const data = await context.request.json();
  return new Response(
    JSON.stringify({ success: true, settings: data }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
