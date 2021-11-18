'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Task, User}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'user_id'});
      this.belongsTo(Task, {foreignKey: 'task_id'});
    }
  };
  UserTask.init({
    user_id: DataTypes.INTEGER,
    task_id: DataTypes.INTEGER,
    isDone: DataTypes.BOOLEAN
  },{
    sequelize,
    modelName: 'UserTask',
  });
  return UserTask;
};