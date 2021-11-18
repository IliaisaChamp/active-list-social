const router = require("express").Router();
const TaskController = require('../controllers/taskController')

router
    .route("/")
    .get(TaskController.showAll);


module.exports = router;
