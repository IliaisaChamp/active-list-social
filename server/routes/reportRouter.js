const router = require('express').Router();
const ReportController = require('../controllers/reportController');

router.route('/')
    .get(ReportController.showAll)
    .post(ReportController.create)

module.exports = router;