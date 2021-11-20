const router = require('express').Router();
const ReportController = require('../controllers/reportController');
const uploadReportsPhotos = require('../middleware/uploadReportsPhotos');
const checkAuth = require('../middleware/checkAuth');

router.route('/')
  .get(ReportController.showAll)
  .post(checkAuth, uploadReportsPhotos, ReportController.create);

module.exports = router;
