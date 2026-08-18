import { getDB } from '../_db.js';
import { requireAuth } from '../_auth.js';

export async function onRequestGet(context) {
  const auth = await requireAuth(context);
  if (!auth.authenticated) {
    return auth.response;
  }

  const db = await getDB(context);
  const jobs = await db.getAutomationJobs();
  const runs = await db.getAutomationRuns(30);

  return new Response(
    JSON.stringify({ jobs, runs }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function onRequestPut(context) {
  const auth = await requireAuth(context);
  if (!auth.authenticated) {
    return auth.response;
  }

  const data = await context.request.json();
  const db = await getDB(context);
  const updated = await db.updateAutomationJob(data.id || 'job-daily-seo', data);

  return new Response(
    JSON.stringify({ success: true, job: updated }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
