const { validationResult } = require('express-validator');
const UserService = require('../services/userService');

class CheckController {
  static async register(req, res) {
    console.log(req.body);
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ message: 'Ошибка при регистрации', errors });
      }
      const { nickname, email, password } = req.body;

      if (nickname && email && password) {
        const candidate = await UserService.findByEmail(email);

        if (candidate) {
          return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
        }

        const createdUser = await UserService.createUser(req.body);

        if (createdUser) {
          const { password, ...other } = createdUser;

          req.session.user = {
            ...other,
          };
          return res.json({ user: req.session.user });
        } else {
          console.log('error');
          return res.sendStatus(501);
        }
      } else {
        return res.status(400).json({ message: 'Не все данные заполнены' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password, nickname } = req.body;
      if (email && password && nickname) {
        const currentUser = await UserService.findAndCheck({ email, password });

        if (currentUser) {
          const { password, ...other } = currentUser;

          req.session.user = {
            ...other,
          };

          return res.json({ user: req.session.user });
        } else {
          return res.status(404).json({ message: `Пользователь '${nickname}' не найден` });
        }
      } else {
        return res.status(401).json({ message: 'Данные не заполнены' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static check(req, res) {
    if (req.session.user) {
      return res.json({ user: req.session.user });
    } else {
      return res.status(401).json({message: 'Сессия истекла'});
    }
  }
}

module.exports = CheckController;
