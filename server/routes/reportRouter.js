const router = require('express').Router();
const ReportController = require('../controllers/reportController');
const checkAuth = require('../middleware/checkAuth');

router.route('/').get(checkAuth, ReportController.getReportsForUser);
router.route('/subs').get(ReportController.getSubsReports)
router.route('/top').get(ReportController.getAllReportsForTop)
router.route('/tasks/:id').get(checkAuth, ReportController.getCurrentTaskReports)
router.route('/:id').get(checkAuth, ReportController.getReportById);

router.route('/:id/like').post(checkAuth, ReportController.addLike);
router.route('/:id/comment').post(checkAuth, ReportController.addComment);



module.exports = router;
