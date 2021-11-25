const { Room, RoomUser, User } = require('../db/models');
const sequelize = require('sequelize');

class RoomService {
  static async getRoomsWithRecipients(id, rooms) {
    return await RoomUser.findAll({
      where: {
        [sequelize.Op.and]: [
          {
            room_id: {
              [sequelize.Op.in]: rooms,
            },
          },
          {
            user_id: {
              [sequelize.Op.ne]: id,
            },
          },
        ],
      },
      include: { model: User, attributes: ['id', 'nickname', 'first_name', 'last_name', 'email', 'avatar'] },
      order: [['createdAt', 'DESC']],
    });
  }

  static async getRoom(senderId, recipienttId) {
    const senderRooms = await RoomUser.findAll({ where: { user_id: senderId } });
    const recipientRooms = await RoomUser.findAll({ where: { user_id: recipienttId } });
    const senderRoomsId = senderRooms.map((room) => room.room_id);
    const recipientRoomsId = recipientRooms.map((room) => room.room_id);
    let chat;
    senderRoomsId.forEach((roomId) => {
      if (recipientRoomsId.includes(roomId)) {
        chat = roomId;
      }
    });
    if (!chat) {
      const newRoom = await Room.create();
      await RoomUser.bulkCreate(
        [
          { room_id: newRoom.id, user_id: senderId },
          { room_id: newRoom.id, user_id: recipienttId },
        ],
        { returning: true },
      );
      return { ...newRoom.get({ plain: true }), new: true };
    } else {
      const room = await Room.findOne({ where: { id: chat } });
      return { ...room.get({ plain: true }), new: false };
    }
  }
}

module.exports = RoomService;
