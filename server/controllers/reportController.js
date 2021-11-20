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
        const {images, desc } = req.body;
          console.log(req.body);
          console.log(desc);

        return res.status(200)
      } else {
        console.log('session not');
        res.sendStatus(401);
      }
    } catch(e) {
     res.sendStatus(400)
    }
  }
}

module.exports = ReportController;
