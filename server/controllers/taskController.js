/* eslint-disable*/
const TaskService = require('../services/taskService');
const { UserTask, Report, Task, User, Category } = require('../db/models');

class TaskController {
  static async completeTask(req, res) {
    try {
      const user_id = req.session.user.id;
      const task_id = req.params.id;
      const task = await UserTask.findOne({ where: { user_id, task_id } });
      const report = await Report.findOne({ where: { user_id, task_id } });
      if (!report) {
        return res.status(400).json({ message: 'Вы должны иметь хотя бы один завершенный отчет по задаче.....' });
      }
      if (task) {
        task.isDone = true;
        await task.save();
        return res.status(200).json({ message: 'Задача выполнена! Поздравляю!' });
      } else {
        return res.status(400).json({ message: 'Вы не подписаны на данную задачу...' });
      }
    } catch (e) {
      return res.status(400).json({ message: 'Неправильный запрос...' });
    }
  }

  static async unsubscribeUser(req, res) {
    try {
      const userId = req.session.user.id;
      const taskId = req.params.id;
      if (userId && taskId) {
        await TaskService.unSubscribe(userId, taskId);
        res.status(200).json({ message: 'Подписка удалена' });
      } else {
        res.sendStatus(401);
      }
    } catch (e) {
      res.sendStatus(400);
    }
  }

  static async subscribeUser(req, res) {
    try {
      const userId = req.session.user.id;
      const taskId = req.params.id;
      const task = await Task.findOne({ where: { id: taskId } });
      if (userId && task) {
        await TaskService.subscribe(userId, taskId);
        res.status(200).json({ message: 'Подписка создана' });
      } else {
        res.status(400).json({ message: 'Неправильные данные' });
      }
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  }

  static async showAll(req, res) {
    try {
      const userId = req.session.user.id;
      const query = await User.findOne({
        where: {
          id: userId,
        },
        include: [{ model: Task }],
      });
      const userTasks = query.Tasks.map((task) => task.id);
      const filter = req.query._filter ? decodeURIComponent(req.query._filter) : false;
      const allTasks = await TaskService.getTasks(filter);
      const tasks = allTasks.filter((task) => !userTasks.includes(task.id));
      res.json({ tasks });
    } catch (e) {
      res.sendStatus(500);
    }
  }

  static async getTaskByID(req, res) {
    const { id } = req.params;
    try {
      const task = await Task.findOne({
        where: {
          id,
        },
      });
      return res.json({ task: task.get({ plain: true }) });
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка сервера, попробуйте еще раз' });
    }
  }

  static async getTasksByCategoryID(req, res) {
    const { id } = req.params;
    try {
      const tasks = await Category.findAll({
        include: Task,
        where: {
          id,
        },
      });
      return res.json(tasks);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Ошибка сервера, попробуйте еще раз' });
    }
  }

  static async getAllCategories(req, res) {
    function getRandom(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    try {
      const categories = await Category.findAll();
      const tags = categories.map((el) => ({ value: el.title, count: getRandom(8, 30), id: el.id }));
      return res.json({ tags });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Ошибка сервера, попробуйте еще раз' });
    }
  }
}

module.exports = TaskController;
