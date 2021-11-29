const { validationResult } = require('express-validator');
const UserService = require('../services/userService');

class CheckController {
  static async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.errors[0].msg, errors });
      }
      const { nickname, email, password } = req.body;

      if (nickname && email && password) {
        const emailCheck = await UserService.findByEmail(email);
        const nickNameCheck = await UserService.findByNickname(nickname);
        if (emailCheck) {
          return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
        }

        if (nickNameCheck) {
          return res.status(400).json({ message: 'Пользователь с таким nickname уже существует' });
        }

        const createdUser = await UserService.createUser(req.body);

        if (createdUser) {
          const { password: clear, ...other } = createdUser;

          req.session.user = {
            ...other,
          };
          return res.json({ user: req.session.user });
        }
        console.log('error');
        return res.sendStatus(501);
      }
      return res.status(400).json({ message: 'Не все данные заполнены' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const currentUser = await UserService.findAndCheck({ email, password });

        if (currentUser) {
          const { password: clear, ...other } = currentUser;

          req.session.user = {
            ...other,
          };

          return res.json({ user: req.session.user });
        }
        return res.status(404).json({ message: 'Пользователь c таким email не найден или неверный пароль' });
      }
      return res.status(401).json({ message: 'Данные не заполнены' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }

  static async check(req, res) {
    if (req.session.user) {
      const { id } = req.session.user;
      const { password, ...user } = await UserService.getUser(id);
      return res.json({ user });
    }
    return res.status(401).json({ message: 'Сессия истекла' });
  }
}

module.exports = CheckController;
