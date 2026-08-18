import { requireAuth } from '../_auth.js';

export async function onRequestGet(context) {
  const auth = await requireAuth(context);
  if (!auth.authenticated) {
    return auth.response;
  }

  return new Response(
    JSON.stringify({
      valid: true,
      user: auth.user,
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
