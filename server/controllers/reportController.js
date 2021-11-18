const ReportService = require('../services/reportService');

class ReportController {
  static async showAll(req, res) {
    try {
      const reports = await ReportService.getAll();
      res.json({ reports });
    } catch (e) {
      res.sendStatus(400);
    }
  }
}

module.exports = ReportController;
