const { Room, RoomUser } = require('../db/models');
const ChatService = require('../services/chatService')

class ChatController {
  static async create(req, res) {
    try {
      const userId = req.session.user.id;
      const clientId = req.body.id;
      const room = await ChatService.getRoom(userId, clientId);

    } catch (e) {
      res.status(400).json({ message: 'Ошибка чата' });
    }
  }
}

module.exports = ChatController;
