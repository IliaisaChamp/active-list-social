const { validationResult } = require('express-validator');
const UserService = require('../services/userService');
const { Following, Follower } = require('../db/models');

class UserController {
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
      console.log(e)
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
    if (req.session.user) {
      if (req.session.user.id !== id) {
        try {
          const isSubscribed = await Following.findOne({
            where: {
              user_id: req.session.user.id,
              following_id: id,
            },
          });

          if (!isSubscribed) {
            const F = await Following.create({
              user_id: req.session.user.id,
              following_id: id,
            });
            const Fr = await Follower.create({
              user_id: id,
              follower_id: req.session.user.id,
            });

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
    } else {
      res.status(401).json({ message: 'Не авторизован' });
    }
  }

  static async unfollow(req, res) {
    const { id } = req.params;
    if (req.session.user) {
      if (req.session.user !== id) {
        const isSubscribed = await Follower.findOne({
          where: {
            user_id: id,
            follower_id: req.session.user.id,
          },
        });
        try {
          if (isSubscribed) {
            const currentUserFollowing = await Following.create({
              user_id: req.session.user.id,
              following_id: id,
            });
            await isSubscribed.destroy();
            await currentUserFollowing.destroy();

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
