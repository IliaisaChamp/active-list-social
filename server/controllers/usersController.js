const { validationResult } = require('express-validator');
const UserService = require('../services/userService');
const { User, Follower, Report } = require('../db/models');
const fsp = require('fs/promises');
const path = require('path');

class UserController {
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
      const reports = await Report.findAll({ where: { user_id } });
      res.status(200).json({ reports });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Неправильный запрос' });
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
      const tasks = entries.map((entry) => ({
        id: entry.task_id,
        title: entry.Task.title,
        img: entry.Task.img,
        isDone: entry.isDone,
      }));
      res.json({ tasks });
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  }

  static async getUser(req, res) {
    const { id } = req.params;
    try {
      const currentUser = await UserService.getUser(id);

      if (currentUser) {
        return res.json(currentUser);
      }
    } catch (error) {
      return res.status(500).json(error);
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
