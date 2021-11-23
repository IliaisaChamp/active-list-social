const router = require('express').Router();
const checkAuth = require('../middleware/checkAuth')
const ChatController = require('../controllers/chatController')

router
    .route('/')
    .post(checkAuth, ChatController.create)
module.exports = router;