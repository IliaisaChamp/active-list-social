'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsToMany(User, { through: 'RoomUsers', foreignKey: 'room_id' });
    }
  }
  Room.init(
    {
      desc: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Room',
    },
  );
  return Room;
};
