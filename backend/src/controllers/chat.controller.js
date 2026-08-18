import { ChatService } from '../services/chat.service.js';

export class ChatController {
  static async sendMessage(req, res, next) {
    try {
      const result = await ChatService.handleMessage(req.body);
      return res.status(200).json({
        success: true,
        ...result,
      });
    } catch (err) {
      next(err);
    }
  }
}
