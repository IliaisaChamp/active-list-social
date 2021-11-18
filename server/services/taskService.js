const { Task, Sequelize } = require('../db/models');

class TaskService {
  static async getTasks(filter) {
      return filter
        ? await Task.findAll({
            where: {
              title: {
                [Sequelize.Op.like]: `%${filter}%`,
              },
            },
          })
        : await Task.findAll();
  }
}

module.exports = TaskService;
