const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CategoryTask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  CategoryTask.init(
    {
      task_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'CategoryTask',
    },
  );
  return CategoryTask;
};
