/* eslint-disable */
const { Room, User, Message, RoomUser } = require('../db/models');
const RoomService = require('../services/RoomService');

class RoomController {
  static async changeRoomStatus(req, res) {
    try {
      const user_id = req.session.user.id;
      const room_id = req.params.id;
      const status = req.body.hasMessages;
      const entry = await RoomUser.findOne({ where: { user_id, room_id } });
      if (!entry) {
        res.sendStatus(200);
      } else {
        entry.hasMessages = status;
        await entry.save();
        res.sendStatus(200);
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка чата' });
    }
  }

  static async deleteRoom(req, res) {
    try {
      const user_id = req.session.user.id;
      const room_id = req.params.id;
      const roomUser = RoomUser.findOne({ where: { user_id, room_id } });
      if (roomUser) {
        const room = await Room.findOne({ where: { id: room_id } });
        if (room) {
          await room.destroy();
        }
        res.status(200).json({ message: 'Комната удалена' });
      } else {
        res.status(400).json({ message: 'Ошибка чата' });
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка чата' });
    }
  }

  static async getUserRooms(req, res) {
    try {
      const { id } = req.session.user;
      const entrys = await RoomUser.findAll({ where: { user_id: id } });
      const result = {};
      entrys.forEach((entry) => (result[entry.room_id] = entry.hasMessages));
      const user = await User.findOne({ where: { id }, include: Room });
      const rooms = user.Rooms.map((room) => room.id);
      const roomsWithUsers = await RoomService.getRoomsWithRecipients(id, rooms);
      const formattedRooms = roomsWithUsers.map((el) => ({ id: el.room_id, user: el.User.dataValues, hasMessages: result[el.room_id] }));
      res.json({ rooms: formattedRooms });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка чата' });
    }
  }

  static async getRoomMessages(req, res) {
    try {
      /// /if user in RoomUsers ...... need check
      const room_id = req.params.id;
      const messages = await Message.findAll({
        where: { room_id },
        include: { model: User, attributes: ['id', 'nickname', 'first_name', 'last_name', 'email', 'avatar'] },
      });
      res.status(200).json({ messages });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка чата' });
    }
  }

  static async createMessage(req, res) {
    try {
      const user_id = req.session.user.id;
      const room_id = req.params.id;
      const newMessage = await Message.create({ text: req.body.message, room_id, user_id });
      const plainMessage = newMessage.get({ plain: true });
      const user = await User.findOne({
        where: { id: user_id },
        attributes: ['id', 'nickname', 'first_name', 'last_name', 'email', 'avatar'],
      });
      plainMessage.User = user.get({ plain: true });
      res.json({ message: newMessage });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка чата' });
    }
  }

  static async createRoom(req, res) {
    try {
      const senderId = req.session.user.id;
      const recipientId = req.body.id;
      const room = await RoomService.getRoom(senderId, recipientId);
      const entries = await RoomUser.findAll({ where: { room_id: room.id } });
      const roomMembers = entries.map((entry) => entry.user_id);
      res.status(200).json({ room, members: roomMembers });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка чата' });
    }
  }

  static async showUsers(req, res) {
    try {
      const { id } = req.params;
      const room = await Room.findOne({
        where: { id },
        include: { model: User, attributes: ['id', 'nickname', 'first_name', 'last_name', 'email', 'avatar'] },
      });
      const users = room.Users.map((user) => user.get({ plain: true }));
      res.status(200).json({ users });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = RoomController;
