import { getDB, verifyPassword } from '../_db.js';
import { createToken } from '../_auth.js';

export async function onRequestPost(context) {
  try {
    const { username, password } = await context.request.json();

    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: 'Username/Email and Password are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const db = await getDB(context);
    const admin = await db.findAdminByUsername(username);

    if (!admin) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const valid = await verifyPassword(password, admin.password_hash);
    if (!valid) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await db.updateAdminLogin(admin.id);

    const secret = context.env?.AUTH_SECRET || 'rahnoxa_jwt_secret_production_key_2025';
    const token = await createToken(
      {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
      secret
    );

    return new Response(
      JSON.stringify({
        success: true,
        token,
        user: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
