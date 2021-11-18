const { validationResult } = require('express-validator');
const UserService = require('../services/userService');

class UserController {
  static async getUserTasks(req, res) {
    try {
      if (req.session.user) {
        const userId = req.params.id;
        const entries = await UserService.getUserTasks(userId);
        const tasks = entries.map((entry) => ({
          id: entry.task_id,
          title: entry.Task.title,
          img: entry.Task.img,
          isDone: entry.isDone,
        }));
        res.json(tasks);
      } else {
        res.sendStatus(401);
      }
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
    const { id } = req.params;
    const { userId } = req.body;
    if (userId !== req.params.id) {
      try {
        const user = await User.findById(id);
        const currentUser = await User.findById(userId);

        if (!user.followers.includes(userId)) {
          await user.updateOne({ $push: { followers: userId } });
          await currentUser.updateOne({ $push: { followings: id } });
          res.json('Вы подписались');
        } else {
          res.status(403).json('Вы уже подписаны на этого пользователя');
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    } else {
      return res.status(403).json('В не можете подписаться на самого себя');
    }
  }

  static async unfollow(req, res) {
    const { id } = req.params;
    const { userId } = req.body;
    if (userId !== req.params.id) {
      try {
        const user = await User.findById(id);
        const currentUser = await User.findById(userId);

        if (user.followers.includes(userId)) {
          await user.updateOne({ $pull: { followers: userId } });
          await currentUser.updateOne({ $pull: { followings: id } });
          res.json('Вы отписались');
        } else {
          res.status(403).json('Вы уже отписались на этого пользователя');
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    } else {
      return res.status(403).json('В не можете подписаться от самого себя');
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
