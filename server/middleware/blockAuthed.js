function blockAuthed(req, res, next) {
    if (!req.session.user) {
        next();
    } else {
        res.status(400).json({message: 'Вы уже авторизованы......'})
    }
}

module.exports = blockAuthed;
