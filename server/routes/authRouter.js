const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const AuthController = require('../controllers/authController');

router.route('/registration').post(
  [
    check('email', 'email не соответствует формату').normalizeEmail().isEmail(),
    check('first_name', 'поле Имя не может быть пустым').notEmpty(),
    check('last_name', 'поле Фамилия не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть от 6 до 20 символов').isLength({
      min: 6,
      max: 20,
    }),
  ],
  AuthController.register,
);

router.route('/login').post(AuthController.login);
router.route('/check').get(AuthController.check);

router.route('/logout').get((req, res, next) => {
  req.session.destroy();
  console.log(req.session);

  res.clearCookie('sid').sendStatus(200);
});

module.exports = router;
