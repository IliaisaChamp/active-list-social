const { Task } = require('../db/models');
const TaskService = require('../services/taskService');

class TaskController {
  static async userSubscribe(req, res) {
    // if (req.session.user) {
    //     const userId = req.session.user.id;
    try {
      const userId = 1;
      const taskId = req.params.id;
      const subscribe = await TaskService.subscribe(userId, taskId);
      res.sendStatus(200)
    } catch(e) {
        res.sendStatus(400)
    }
  }

  static async showAll(req, res) {
    try {
      const filter = req.query._filter;
      const tasks = await TaskService.getTasks(filter);
      res.json(tasks);
    } catch (e) {
      res.sendStatus(500);
    }
  }
}

module.exports = TaskController;
