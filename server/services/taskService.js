const { Task, User, UserTask, Sequelize } = require('../db/models');

class TaskService {
  static async unSubscribe(userId, taskId) {
    const subscribe = await UserTask.findOne({
      where: {
        user_id: userId,
        task_id: taskId,
      },
    });
    if (subscribe) {
      await subscribe.destroy();
    }
    return true;
  }

  static async subscribe(userId, taskId) {
    return await UserTask.create({ user_id: userId, task_id: taskId });
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
