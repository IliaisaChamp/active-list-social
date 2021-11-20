const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/reports');
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    cb(null, file.fieldname + Date.now() + `.${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.search(/image\/[a-z]{3,4}$/) !== -1) {
      cb(null, true);
    } else {
      cb(new Error('Неправильный тип файла'));
    }
  },
}).any('files');

function uploadReportsPhotos(req, res, next) {
  upload(req, res, (err) => {
    if (err) {
      res.status(415).json({ message: err?.message ?? 'Что-то пошло не так......' });
    } else {
      next();
    }
  });
}
module.exports = uploadReportsPhotos;
