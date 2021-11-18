const { Report } = require('../db/models');

class ReportService {
  static async getAll() {
    return await Report.findAll();
  }
}

module.exports = ReportService;
