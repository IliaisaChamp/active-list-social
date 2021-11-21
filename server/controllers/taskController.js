const TaskService = require('../services/taskService');
const { UserTask, Report } = require('../db/models');

class TaskController {
  static async completeTask(req, res) {
    try {
      const user_id = req.session.user.id;
      const task_id = req.params.id;
      const task = await UserTask.findOne({ where: { user_id, task_id } });
      const report = await Report.findOne({ where: { user_id, task_id } });
      if (!report) {
        return res.status(400).json({message: 'Вы должны иметь хотя бы один завершенный отчет по задаче.....'})
      }
      if (task) {
        task.isDone = true;
        await task.save();
        res.sendStatus(200);
      } else {
        res.status(400).json({ message: 'Вы не подписаны на данную задачу...' });
      }
    } catch (e) {
      res.status(400).json({ message: 'Неправильный запрос...' });
    }
  }

  static async userUnsubscribe(req, res) {
    try {
      const userId = req.session.user.id;
      const taskId = req.params.id;
      if (userId && taskId) {
        await TaskService.unSubscribe(userId, taskId);
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    } catch (e) {
      res.sendStatus(400);
    }
  }
  static async userSubscribe(req, res) {
    try {
      const userId = req.session.user.id;
      const taskId = req.params.id;
      if (userId && taskId) {
        await TaskService.subscribe(userId, taskId);
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    } catch (e) {
      res.sendStatus(400);
    }
  }
  static async showAll(req, res) {
    try {
      const filter = req.query._filter ? decodeURIComponent(req.query._filter) : false;
      const tasks = await TaskService.getTasks(filter);
      res.json({ tasks });
    } catch (e) {
      res.sendStatus(500);
    }
  }
}

module.exports = TaskController;
