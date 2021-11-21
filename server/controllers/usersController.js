const { validationResult } = require('express-validator');
const UserService = require('../services/userService');
const { User, Follower } = require('../db/models');
const fsp = require('fs/promises');
const path = require('path');

class UserController {
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
      await follower.destroy();
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(400);
    }
  }

  static async getFollowings(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findById(id);

      if (Object.keys(user.followings).length) {
        const followings = await Promise.all(
          user.followings.map((friendId) => {
            return User.findById(friendId);
          }),
        );

        res.json(followings);
      } else {
        res.status(404).json({ message: 'У вас нет подписок' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
}

module.exports = UserController;
