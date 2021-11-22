const { validationResult } = require('express-validator');
const UserService = require('../services/userService');
const { User, Follower, Report, Task } = require('../db/models');
const { Op } = require('sequelize');
const fsp = require('fs/promises');
const path = require('path');

class UserController {
  static async getRecommendation(req, res) {
    try {
      const { id } = req.session.user;
      const recommendedUsers = await UserService.getRecommendedUsers(id)
      res.json({users: recommendedUsers});
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Неправильный ввод данных...' });
    }
  }

  static async getUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findOne({
        where: { id },
        attributes: ['id', 'nickname', 'first_name', 'last_name', 'email', 'isAdmin', 'avatar'],
      });
      res.json({ user });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Неправильный ввод данных...' });
    }
  }
  static async getFollowers(req, res) {
    const id = req.params.id;
    try {
      const result = await User.findOne({
        where: { id },
        include: {
          model: User,
          raw: true,
          as: 'followers',
          attributes: ['id', 'nickname', 'first_name', 'last_name', 'email'],
        },
      });
      const followers = result.followers.map((elem) => {
        const { Followers, ...rest } = elem.get({ plain: true });
        return rest;
      });
      res.status(200).json({ followers });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Неправильный запрос' });
    }
  }

  static async getFollowings(req, res) {
    const id = req.params.id;
    try {
      const result = await User.findOne({
        where: { id },
        include: {
          model: User,
          raw: true,
          as: 'followings',
          attributes: ['id', 'nickname', 'first_name', 'last_name', 'email'],
        },
      });
      const followings = result.followings.map((elem) => {
        const { Followers, ...rest } = elem.get({ plain: true });
        return rest;
      });
      res.status(200).json({ followings });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Неправильный запрос' });
    }
  }

  static async getUserReports(req, res) {
    try {
      const user_id = req.params.id;
      const reports = await Report.findAll({
        where: { user_id },
        include: { model: User, attributes: ['nickname', 'avatar'] },
      });

      console.log(reports);
      if (reports) {
        return res.status(200).json({ reports });
      } else {
        return res.status(400).json({message: 'У вас еще нет отчетов'})
      }
    } catch (e) {
      return res.status(400).json({ message: 'Неправильный запрос' });
    }
  }

  static async edit(req, res) {
    try {
      const id = req.session.user.id;
      const user = await User.findOne({ where: { id } });
      const prevAvatar = user.avatar;

      if (prevAvatar) {
        const pathToAvatar = path.join(process.cwd(), 'public/img', prevAvatar);

        const isFileExist = await fsp
          .access(pathToAvatar)
          .then(() => true)
          .catch(() => false);
        if (isFileExist) {
          await fsp.unlink(pathToAvatar);
        }
      }

      user.avatar = req.file.filename;
      await user.save();
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  }

  static async getUserTasks(req, res) {
    try {
      const userId = req.params.id;
      const entries = await UserService.getUserTasks(userId);
      console.log(entries);

      const tasks = entries.map((entry) => ({
        id: entry.task_id,
        title: entry['Task.title'],
        img: entry['Task.img'],
        isDone: entry.isDone,
      }));
      res.json({ tasks });
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  }

  static async follow(req, res) {
    try {
      const user_id = req.params.id;
      const follower_id = req.session.user.id;
      await Follower.create({ user_id, follower_id });
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  }

  static async unfollow(req, res) {
    try {
      const user_id = req.params.id;
      const follower_id = req.session.user.id;
      const follower = await Follower.findOne({
        where: {
          user_id,
          follower_id,
        },
      });
      if (follower) {
        await follower.destroy();
      }
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  }
}

module.exports = UserController;
