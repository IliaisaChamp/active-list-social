const router = require("express").Router();
const TaskController = require('../controllers/taskController')

router
    .route("/")
    .get(TaskController.showAll);

router.route('/:id/subscribe')
    .post(TaskController.userSubscribe)
    .delete(TaskController.userUnsubscribe)


module.exports = router;
