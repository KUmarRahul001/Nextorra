import { getDB, verifyPassword } from '../_db.js';
import { createToken, getJwtSecret } from '../_auth.js';
import { checkRateLimit, getClientIP } from '../_rateLimit.js';

export async function onRequestPost(context) {
  try {
    const clientIP = getClientIP(context.request);
    const rateCheck = checkRateLimit(`login_${clientIP}`, 5, 300); // 5 attempts per 5 minutes

    if (rateCheck.limited) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'TOO_MANY_ATTEMPTS',
            message: `Too many login attempts. Please wait ${rateCheck.retryAfter} seconds before retrying.`,
          },
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(rateCheck.retryAfter),
          },
        }
      );
    }

    const { username, password } = await context.request.json().catch(() => ({}));

    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'INVALID_REQUEST',
            message: 'Username and password are required.',
          },
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const db = await getDB(context);
    const admin = await db.findAdminByUsername(username.trim());

    if (!admin) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid username or password.',
          },
        }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const isValid = await verifyPassword(password, admin.password_hash);
    if (!isValid) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid username or password.',
          },
        }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await db.updateAdminLogin(admin.id);

    const secret = getJwtSecret(context);
    const token = await createToken(
      {
        id: admin.id,
        username: admin.username,
        role: admin.role || 'admin',
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
          role: admin.role || 'admin',
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected authentication error occurred.',
        },
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
