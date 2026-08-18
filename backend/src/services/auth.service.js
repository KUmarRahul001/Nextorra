import { db, verifyPassword } from '../../database/supabase.js';
import { generateAccessToken } from '../config/jwt.js';
import { UnauthorizedError, BadRequestError } from '../utils/errors.js';

export class AuthService {
  static async login({ username, password }) {
    if (!username || !password) {
      throw new BadRequestError('Username and password are required');
    }

    const admin = await db.findAdminByUsername(username.trim());
    if (!admin) {
      throw new UnauthorizedError('Invalid username or password');
    }

    const isMatch = verifyPassword(password, admin.password_hash);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid username or password');
    }

    await db.updateAdminLogin(admin.id);

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
