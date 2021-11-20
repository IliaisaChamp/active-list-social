const { Report } = require('../db/models');
const UserService = require('../services/userService');
const {Op} = require('sequelize')

class ReportController {
  static async showAll(req, res) {
    try {
      const reports = await Report.findAll();
      res.json({ reports });
    } catch (e) {
      res.sendStatus(400);
    }
  }

  static async create(req, res) {
    const { id } = req.params;

      const photoNames = req.files?.map((el) => el.filename);

    try {
      const newReport = await Report.create({
        user_id: req.session.user.id,
        desc: req.body.desc,
        task_id: id,
        images: JSON.stringify(photoNames),
      });

      if (newReport) {
        return res.status(200).json({ message: 'Отчет успешно создан' });
      }
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка сервера, попробуйте еще раз' });
    }
  }

  static async getReportsForUser(req, res) {
    try {
      const userTasks = await UserService.getUserTasks(req.session.user.id);
      const userTasksArr = userTasks?.map(el => el.task_id)

      const reports = await Report.findAll({
        where: {
          task_id: {
            [Op.in]: userTasksArr,
          },
        },
      });

      if (reports) {
        return res.json(reports.get({plain: true}));
      } else {
        return res.status(400).json({message: 'Отчетов нет'})
      }
    } catch (error) {
      return res.status(500).json({ message: 'Ошибка сервера, попробуйте еще раз' });
    }
  }
}

module.exports = ReportController;
