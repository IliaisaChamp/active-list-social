const { Op } = require('sequelize');
const { Report, Follower, User, Task, Like, Comment } = require('../db/models');
const UserService = require('../services/userService');

class ReportController {
  static async getCurrentTaskReports(req, res) {
    const { id } = req.params;
    try {
      const reports = await Report.findAll({
        include: [
          { model: User, attributes: ['nickname', 'id', 'avatar'] },
          { model: Task, attributes: ['title'] },
          { model: Like },
          {
            model: Comment,
            include: [{ model: User, attributes: ['nickname', 'avatar'] }],
          },
        ],
        where: {
          task_id: id,
        },
        order: [
          ['createdAt', 'DESC'],
          [Comment, 'createdAt', 'DESC'],
        ],
      });
      return res.json({ reports });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: 'Отчет не найден' });
    }
  }

  static async getAllReportsForTop(req, res) {
    try {
      const reports = await Report.findAll({
        include: [
          { model: User, attributes: ['nickname', 'id', 'avatar'] },
          { model: Task, attributes: ['title'] },
          { model: Like },
          {
            model: Comment,
            include: [{ model: User, attributes: ['nickname', 'avatar'] }],
          },
        ],
        order: [['createdAt', 'DESC']],
      });

      reports.sort((a, b) => -a.Likes.length + b.Likes.length);
      return res.json({ reports });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: 'Отчет не найден' });
    }
  }

  static async getReportById(req, res) {
    const { id } = req.params;
    try {
      const report = await Report.findOne({
        include: [
          { model: User, attributes: ['nickname', 'id', 'avatar'] },
          { model: Task, attributes: ['title'] },
          { model: Like },
          {
            model: Comment,
            include: [{ model: User, attributes: ['nickname', 'avatar'] }],
          },
        ],
        where: {
          id,
        },
        order: [
          ['createdAt', 'DESC'],
          [Comment, 'createdAt', 'DESC'],
        ],
      });
      return res.json(report.get({ plain: true }));
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: 'Отчет не найден' });
    }
  }

  static async create(req, res) {
    const { id } = req.params;
    const photoNames = req.files?.map((el) => el.filename);
    const userTasks = await UserService.getUserTasks(req.session.user.id);
    const hasTask = userTasks.find((el) => Number(el.task_id) === Number(id));
    if (!hasTask) {
      return res.status(400).json({ message: 'Сначала добавь эту цель к себе' });
    }
    try {
      const newReport = await Report.create({
        user_id: req.session.user.id,
        desc: req.body.desc,
        task_id: id,
        images: photoNames,
      });
      return res.status(200).json({ report: newReport, message: 'Отчет успешно создан' });
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка сервера, попробуйте еще раз' });
    }
  }

  static async getReportsForUser(req, res) {
    try {
      const userTasks = await UserService.getUserTasks(req.session.user.id);
      if (!userTasks) {
        return res.status(400).json({ message: 'Отчетов нет' });
      }
      const userTasksIds = userTasks?.map((el) => el.task_id) ?? [];
      const reports = await Report.findAll({
        where: {
          task_id: {
            [Op.in]: userTasksIds,
          },
        },
        include: [
          { model: User, attributes: ['nickname', 'avatar', 'id'] },
          { model: Task, attributes: ['title'] },
          { model: Like },
          { model: Comment, attributes: ['id'] },
        ],
        order: [['createdAt', 'DESC']],
      });
      if (reports) {
        return res.json({ reports });
      }
      return res.status(400).json({ message: 'Отчетов нет' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Ошибка сервера, попробуйте еще раз' });
    }
  }

  static async getSubsReports(req, res) {
    try {
      const userFollowings = await Follower.findAll({
        raw: true,
        where: {
          follower_id: req.session.user.id,
        },
      });
      if (!userFollowings) {
        return res.status(400).json({ message: 'Отчетов нет' });
      }
      const [followingsTasks] = await Promise.all(userFollowings.map((user) => UserService.getUserTasks(user.user_id)));
      const followingsTasksIds = followingsTasks?.map((el) => el.task_id) ?? [];
      const reports = await Report.findAll({
        where: {
          task_id: {
            [Op.in]: followingsTasksIds,
          },
        },
        include: [
          { model: User, attributes: ['nickname', 'avatar', 'id'] },
          { model: Task, attributes: ['title'] },
          { model: Like },
          { model: Comment, attributes: ['id'] },
        ],
        order: [['createdAt', 'DESC']],
      });
      if (reports) {
        return res.json({ reports });
      }
      return res.status(400).json({ message: 'Отчетов нет' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Ошибка сервера, попробуйте еще раз' });
    }
  }

  static async addLike(req, res) {
    const { id } = req.params;
    try {
      const hasLike = await Like.findOne({
        where: {
          report_id: id,
          user_id: req.session.user.id,
        },
      });
      if (hasLike) {
        await hasLike.destroy();
        return res.json({ message: 'Лайк удален' });
      }
      await Like.create({
        report_id: id,
        user_id: req.session.user.id,
      });
      return res.json({ message: 'Лайк поставлен' });
    } catch (e) {
      return res.status(500).json({ message: 'Ошибка сервера, попробуйте пожалуйста еще раз' });
    }
  }

  static async addComment(req, res) {
    const { id } = req.params;
    const { text } = req.body;
    if (!text.trim()) {
      return res.status(400).json({ message: 'Комментарий пустой' });
    }
    try {
      const comment = await Comment.create({
        report_id: id,
        user_id: req.session.user.id,
        text,
      });
      if (comment) {
        return res.json({ comment });
      }
      return res.status(500).json({ message: 'Ошибка сервера, попробуйте пожалуйста еще раз' });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Ошибка сервера, попробуйте пожалуйста еще раз' });
    }
  }
}

module.exports = ReportController;
