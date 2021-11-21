const router = require('express').Router();
const ReportController = require('../controllers/reportController');
const checkAuth = require('../middleware/checkAuth');

router.route('/').get(checkAuth, ReportController.getReportsForUser);

router.route('/:id').get(checkAuth, ReportController.getReportById);

module.exports = router;
