function checkAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.sendStatus(401).json({ message: 'Вы не авторизованы' });
  }
}

module.exports = checkAuth;
