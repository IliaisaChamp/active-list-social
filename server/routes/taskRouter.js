const router = require("express").Router();
const TaskController = require('../controllers/taskController')

router
    .route("/")
    .get(TaskController.showAll);

router
    .route('/:id')
    .post(TaskController.userSubscribe)

module.exports = router;
