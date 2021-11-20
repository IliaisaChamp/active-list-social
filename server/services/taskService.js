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
          order: [['title', 'ASC']],
          where: {
            title: {
              [Sequelize.Op.iLike]: `%${filter}%`,
            },
          },
        })
      : await Task.findAll({
          order: [['title', 'ASC']],
        });
  }
}

module.exports = TaskService;
