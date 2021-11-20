const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/usersController');
const checkAuth = require('../middleware/checkAuth');
const uploadAvatar = require('../middleware/uploadAvatar')

router.route('/:id/tasks').get(UsersController.getUserTasks);
router.route('/:id/follow').post(checkAuth, UsersController.follow);
router.route('/:id/unfollow').post(checkAuth, UsersController.unfollow);
router.route('/:id').put(checkAuth, uploadAvatar, UsersController.edit);

module.exports = router;
