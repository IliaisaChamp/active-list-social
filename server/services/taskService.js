const { Task, User, UserTask, Sequelize, Report } = require('../db/models');

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
          include: [
            {
              model: Report,
              attributes: ['id'],
            },
            {
              model: User,
              attributes: ['id'],
            },
          ],
        })
      : await Task.findAll({
          order: [['title', 'ASC']],
          include: [
            {
              model: Report,
              attributes: ['id'],
            },
            {
              model: User,
              attributes: ['id'],
            },
          ],
        });
  }
}

module.exports = TaskService;
