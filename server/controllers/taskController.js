const { Task } = require('../db/models');
const TaskService = require('../services/taskService')

class TaskController {
    static async showAll(req, res) {
        try {
            const filter = req.query._filter;
            const tasks = await TaskService.getTasks(filter)
            res.json(tasks)
        } catch(e) {
            res.sendStatus(500)
        }
    }
}

module.exports = TaskController;
