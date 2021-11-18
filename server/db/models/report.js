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
    static associate(models) {
      // define association here
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