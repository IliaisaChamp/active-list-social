'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Task, Like, Comment }) {
      this.hasMany(Like, { foreignKey: 'report_id' });
      this.hasMany(Comment, { foreignKey: 'report_id' });
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Task, { foreignKey: 'task_id' });
    }
  };
  Report.init({
    task_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    images: DataTypes.JSON,
    desc: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};
