const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const UsersController = require('../controllers/usersController');
const multer = require('multer');
const checkAuth = require('../middleware/checkAuth')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img');
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    cb(null, file.fieldname + Date.now() + `.${ext}`);
  },
});
const upload = multer({ storage });


router.route('/:id/tasks').get(UsersController.getUserTasks);
router.route('/:id/follow').post(UsersController.follow);
router.route('/:id/unfollow').post(UsersController.unfollow);
router.route('/:id/followings').get(UsersController.getFollowings);
router
    .route('/:id')
    .put(checkAuth, upload.single('avatar'), UsersController.edit);

module.exports = router;
