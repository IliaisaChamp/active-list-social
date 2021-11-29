const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Task, Report, Like, Comment, Room, Message }) {
      this.hasMany(Report, { foreignKey: 'user_id' });
      this.hasMany(Like, { foreignKey: 'user_id' });
      this.hasMany(Comment, { foreignKey: 'user_id' });
      this.belongsToMany(User, { through: 'Followers', foreignKey: 'follower_id', as: 'followings' });
      this.belongsToMany(User, { through: 'Followers', foreignKey: 'user_id', as: 'followers' });
      this.belongsToMany(Task, { through: 'UserTasks', foreignKey: 'user_id' });
      // chat
      this.belongsToMany(Room, { through: 'RoomUsers', foreignKey: 'user_id' });
      this.hasMany(Message, { foreignKey: 'user_id' });
    }
  }
  User.init(
    {
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
      decs: DataTypes.TEXT,
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
