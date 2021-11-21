const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const AuthController = require('../controllers/authController');
const blockAuthed = require('../middleware/blockAuthed')

router.route('/registration').post(
    blockAuthed,
  [
    check('email', 'email не соответствует формату').normalizeEmail().isEmail(),
    check('password', 'Пароль должен быть от 6 до 20 символов').isLength({
      min: 6,
      max: 20,
    }),
    check('nickname', 'Никнейм должен быть от 3 до 20 символов').isLength({
      min: 3,
      max: 20,
    }),
  ],
  AuthController.register,
);

router.route('/login').post(blockAuthed, AuthController.login);
router.route('/check').get(AuthController.check);

router.route('/logout').get((req, res, next) => {
  req.session.destroy();
  console.log(req.session);

  res.clearCookie('sid').sendStatus(200);
});

module.exports = router;
