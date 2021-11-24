const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const { User, Task } = require('./db/models');
const server = http.createServer(app);
const UserService = require('./services/userService');

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
});
//online users sockets
const usersOnline = new Map();

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);

  const id = socket.handshake.query.id;
  usersOnline.set(socket, id);
  const users = usersOnline.values();
  const uniqueUsers = [...new Set(users)];
  console.log('online', usersOnline.values())
  io.emit('broadcast-online', { users: uniqueUsers });

  socket.on('disconnect', () => {
    console.log('USER DISCONNECTED', socket.id);
    for (const [s, id] of usersOnline) {
      if (s.id === socket.id) {
        usersOnline.delete(s);
      }
    }
    const users = usersOnline.values();
    const uniqueUsers = [...new Set(users)];
    io.emit('broadcast-online', { users: uniqueUsers });
  });
});

//new report notification
io.on('connection', (socket) => {
  socket.on('report-created', async (msg) => {
    console.log(msg);
    const reportOwnerId = msg.user_id;
    const task_id = msg.task_id;
    const taskSubscribers = await Task.findOne({ where: { id: task_id }, include: User });
    const userSubscribers = await UserService.getFollowers(reportOwnerId);
    const userSubscribersId = userSubscribers.map((sub) => sub.id);
    const taskSubscribersId = taskSubscribers.Users.map((user) => user.id);
    const subscribers = [...userSubscribersId, ...taskSubscribersId];
    for (let [s, id] of usersOnline) {
      if (subscribers.includes(Number(id))) {
        s.join('room');
      }
    }
    socket.broadcast.to('room').emit('notification', { message: {message: 'Новый отчет', url: `/reports/${msg.id}`} });
    io.socketsLeave('room');
  });
});

/////////////////////////////logout
io.on('connection', (socket) => {
  socket.on('logout', () => {
    console.log('LOGOUT')
    socket.disconnect();
  });
});
module.exports = server;
