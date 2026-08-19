import { db, verifyPassword } from '../../database/supabase.js';
import { generateAccessToken } from '../config/jwt.js';
import { UnauthorizedError, BadRequestError } from '../utils/errors.js';

export class AuthService {
  static async login({ username, password }) {
    if (!username || !password) {
      throw new BadRequestError('Username and password are required');
    }

    let admin = null;
    try {
      admin = await db.findAdminByUsername(username.trim());
    } catch (dbErr) {
      // In local development without Supabase configured, allow dev admin login
      if (process.env.NODE_ENV !== 'production' && username.trim() === 'admin' && password === 'admin123') {
        admin = {
          id: 'admin-dev-01',
          username: 'admin',
          email: 'contact.rahnoxa@protonmail.com',
          role: 'admin',
          password_hash: null,
        };
      } else {
        throw dbErr;
      }
    }

    if (!admin) {
      throw new UnauthorizedError('Invalid username or password');
    }

    if (admin.password_hash) {
      const isMatch = verifyPassword(password, admin.password_hash);
      if (!isMatch) {
        throw new UnauthorizedError('Invalid username or password');
      }
      await db.updateAdminLogin(admin.id);
    }

    const token = generateAccessToken({
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role || 'admin',
    });

    return {
      token,
      user: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role || 'admin',
      },
    };
  }
}
