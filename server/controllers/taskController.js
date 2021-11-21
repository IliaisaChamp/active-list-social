const TaskService = require('../services/taskService');

class TaskController {
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
