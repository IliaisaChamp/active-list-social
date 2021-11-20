const {Report} = require("../db/models");

class ReportController {
  static async showAll(req, res) {
    try {
      const reports = await Report.findAll();
      res.json({ reports });
    } catch (e) {
      res.sendStatus(400);
    }
  }

  static async create(req, res) {
    console.log(req.body);
    // try {

    // } catch(e) {
    //  return res.sendStatus(400)
    // }
  }
}

module.exports = ReportController;
