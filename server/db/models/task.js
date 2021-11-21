'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, UserTask }) {
      // define association here
      // this.hasMany(UserTask, { foreignKey: 'task_id' });
      this.belongsToMany(User, { through: 'UserTasks', foreignKey: 'task_id' });
    }
  }
  Task.init(
    {
      title: DataTypes.STRING,
      img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Task',
    },
  );
  return Task;
};
