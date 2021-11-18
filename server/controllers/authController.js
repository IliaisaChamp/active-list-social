const { validationResult } = require('express-validator');
const UserService = require('../services/userService');

class CheckController {
  static async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Ошибка при регистрации', errors });
      }

      const { email, first_name, password, last_name } = req.body;

      if (email && first_name && password && last_name) {
        const candidate = await UserService.findByEmail(email);
        console.log(candidate);
        if (candidate) {
          return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
        }

        const createdUser = await UserService.createUser(req.body);

        if (createdUser) {
          req.session.user = {
            id: createdUser.id,
            first_name: createdUser.first_name,
            last_name: createdUser.last_name,
          };
          return res.json({ user: req.session.user });
        } else {
          console.log('error');
          return res.sendStatus(500);
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
      const { email, password } = req.body;
      if (email && password) {
        const currentUser = await UserService.findAndCheck({ email, password });

        if (currentUser) {
          req.session.user = {
            id: currentUser.id,
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
          };

          return res.json({ user: req.session.user });
        } else {
          console.log(currentUser);
          return res
            .status(404)
            .json({ message: `User '${email}' not found or Wrong password` });
        }
      } else {
        return res.status(401).json({ message: 'Данные не заполнены' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }

  static check(req, res) {
    if (req.session.user) {
      return res.json({ user: req.session.user });
    } else {
      return res.sendStatus(401);
    }
  }
}


module.exports = CheckController;
