const { Report, Follower, User, Task, UserTasks } = require('../db/models');
const UserService = require('../services/userService');
const { Op } = require('sequelize');


class ReportController {
  static async getReportById(req, res) {
    const { id } = req.params;
    try {
      const report = await Report.findOne({
        include: [
          { model: User, attributes: ['nickname', 'id'] },
          { model: Task, attributes: ['title'] },
        ],
        where: {
          id,
        },
      });
      return res.json(report.get({ plain: true }));
    } catch (e) {
      return res.status(400).json({ message: 'Отчет не найден' });
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
        images: photoNames,
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

      const userFollowings = await Follower.findAll({
        raw: true,
        where: {
          follower_id: req.session.user.id,
        },
      });

      const [followingsTasks] = await Promise.all(
        userFollowings.map((user) => {
          return UserService.getUserTasks(user.user_id);
        }),
      );

      if (!userTasks && !userFollowings) {
        return res.status(400).json({ message: 'Отчетов нет' });
      }

      const userTasksIds = userTasks?.map((el) => el.task_id);
      const followingsTasksIds = followingsTasks?.map((el) => el.task_id);

      const tasksIdSet = new Set([...userTasksIds, ...followingsTasksIds]);
      const reports = await Report.findAll({
        where: {
          task_id: {
            [Op.in]: [...tasksIdSet],
          },
        },
        include: [
          { model: User, attributes: ['nickname', 'avatar', 'id'] },
          { model: Task, attributes: ['title'] },
        ],
        order: [['updatedAt', 'DESC']],
      });

      if (reports) {
        return res.json({ reports });
      } else {
        return res.status(400).json({ message: 'Отчетов нет' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Ошибка сервера, попробуйте еще раз' });
    }
  }


  
  
  





}

module.exports = ReportController;
