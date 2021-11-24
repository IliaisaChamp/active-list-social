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
      order: [['createdAt', 'DESC']]
    });
  }

  static async getRoom(senderId, recipienttId) {
    const senderRooms = await RoomUser.findAll({ where: { user_id: senderId } });
    const recipientRooms = await RoomUser.findAll({ where: { user_id: recipienttId } });
    const senderRoomsId = senderRooms.map((room) => room.room_id);
    const recipientRoomsId = recipientRooms.map((room) => room.room_id);
    let room;
    console.log(senderRoomsId);
    console.log(recipientRoomsId);
    senderRoomsId.forEach((roomId) => {
      if (recipientRoomsId.includes(roomId)) {
        room = roomId;
      }
    });
    console.log('ROOM ->>>', room);
    if (!room) {
      const newRoom = await Room.create();
      console.log('NEW ROOM CREATED ->>>>>>', newRoom);
      await RoomUser.bulkCreate(
        [
          { room_id: newRoom.id, user_id: senderId },
          { room_id: newRoom.id, user_id: recipienttId },
        ],
        { returning: true },
      );
      return newRoom;
    } else {
      return room;
    }
  }
}

module.exports = RoomService;
