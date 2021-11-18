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
    try {
      if (req.session.user) {
        const userId = req.session.user.id;
        const {taskId, desc } = req.body;
        const images = '';
      } else {
        res.sendStatus(401);
      }
    } catch(e) {
     res.sendStatus(400)
    }
  }
}

module.exports = ReportController;
