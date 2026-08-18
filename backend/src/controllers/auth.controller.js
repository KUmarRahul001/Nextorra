import { AuthService } from '../services/auth.service.js';
import { successResponse } from '../utils/response.js';

export class AuthController {
  static async login(req, res, next) {
    try {
      const result = await AuthService.login(req.body);
      return res.status(200).json({
        success: true,
        token: result.token,
        user: result.user,
      });
    } catch (err) {
      next(err);
    }
  }

  static async verify(req, res) {
    return res.status(200).json({
      valid: true,
      user: req.user,
    });
  }

  static async me(req, res) {
    return successResponse(res, { user: req.user });
  }

  static async logout(req, res) {
    return successResponse(res, { message: 'Session terminated' });
  }
}
