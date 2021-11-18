const { Task, User, UserTask, Sequelize } = require('../db/models');

class TaskService {
  static async subscribe(userId, taskId) {
    const subscribe = await UserTask.create({ user_id: userId, task_id: taskId });
    return subscribe;
  }

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
