const router = require('express').Router();
const ReportController = require('../controllers/reportController');
const checkAuth = require('../middleware/checkAuth');

router.route('/').get(checkAuth, ReportController.getReportsForUser);
router.route('/top').get(checkAuth, ReportController.getAllReportsForTop)
router.route('/tasks/:id').get(checkAuth, ReportController.getCurrentTaskReports)
// router.route('/:id').get(ReportController.getReportById);
router.route('/:id').get(checkAuth, ReportController.getReportById);

router.route('/:id/like').post(checkAuth, ReportController.addLike);
router.route('/:id/comment').post(checkAuth, ReportController.addComment);



module.exports = router;
