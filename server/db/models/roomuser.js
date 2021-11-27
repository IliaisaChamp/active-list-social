const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RoomUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  RoomUser.init(
    {
      room_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      hasMessages: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'RoomUser',
    },
  );
  return RoomUser;
};
