const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const UsersController = require('../controllers/usersController');

router.route('/:id');

router.route('/:id/tasks').get(UsersController.getUserTasks);


router.route('/:id/follow').post(UsersController.follow);
router.route('/:id/unfollow').post(UsersController.unfollow);
router.route('/:id/followings').get(UsersController.getFollowings);

module.exports = router;
