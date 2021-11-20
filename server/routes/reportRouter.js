const router = require('express').Router();
const ReportController = require('../controllers/reportController');

router.route('/').get(ReportController.getReportsForUser);

module.exports = router;
