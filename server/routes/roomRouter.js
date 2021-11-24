const router = require('express').Router();
const checkAuth = require('../middleware/checkAuth');
const RoomController = require('../controllers/roomController');

router
    .route('/')
    .post(checkAuth, RoomController.createRoom)
    .get(checkAuth, RoomController.getUserRooms);

router
    .route('/:id/users')
    .get(checkAuth, RoomController.showUsers);

router
    .route('/:id/messages')
    .post(checkAuth, RoomController.createMessage)
    .get(checkAuth, RoomController.getRoomMessages);
module.exports = router;
