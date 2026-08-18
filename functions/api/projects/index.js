import { getDB } from '../_db.js';
import { requireAuth } from '../_auth.js';

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const status = url.searchParams.get('status') || 'PUBLISHED';
  const featured = url.searchParams.get('featured') === 'true' ? true : undefined;

  const db = await getDB(context);
  const projects = await db.getProjects({ status, featured });

  return new Response(
    JSON.stringify({ projects }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function onRequestPost(context) {
  const auth = await requireAuth(context);
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const data = await context.request.json();
    if (!data.title || !data.category) {
      return new Response(
        JSON.stringify({ error: 'Title and Category are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const db = await getDB(context);

    const project = await db.createProject({
      ...data,
      slug,
      status: data.status || 'PUBLISHED',
      images: Array.isArray(data.images) ? data.images : (data.images ? [data.images] : ['/assets/image.png']),
      technologies: Array.isArray(data.technologies) ? data.technologies : ['React', 'TypeScript', 'Node.js'],
      services: Array.isArray(data.services) ? data.services : ['full-stack-web-apps'],
    });

    return new Response(
      JSON.stringify({ success: true, project }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
