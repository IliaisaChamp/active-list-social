const router = require("express").Router();
const TaskController = require('../controllers/taskController')
const ReportController = require('../controllers/reportController');
const uploadReportsPhotos = require('../middleware/uploadReportsPhotos');
const checkAuth = require('../middleware/checkAuth');

router
    .route("/")
    .get(checkAuth, TaskController.showAll);

router.route('/:id/subscribe')
    .post(TaskController.subscribeUser)
    .delete(TaskController.unsubscribeUser)

router.route('/:id/report').post(checkAuth, uploadReportsPhotos, ReportController.create);
router.route('/:id/completed').post(checkAuth, TaskController.completeTask);


module.exports = router;
