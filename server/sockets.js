/*eslint-disable*/
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
// online users sockets
const usersOnline = new Map();

io.on('connection', (socket) => {
  const { id } = socket.handshake.query;
  usersOnline.set(socket, id);
  const users = usersOnline.values();
  const uniqueUsers = [...new Set(users)];
  io.emit('broadcast-online', { users: uniqueUsers });

  socket.on('disconnect', () => {
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

// new report notification
io.on('connection', (socket) => {
  socket.on('report-created', async (report) => {
    const reportOwnerId = report.user_id;
    const { task_id } = report;
    const taskSubscribers = await Task.findOne({ where: { id: task_id }, include: User });
    const userSubscribers = await UserService.getFollowers(reportOwnerId);
    const userSubscribersId = userSubscribers.map((sub) => sub.id);
    const taskSubscribersId = taskSubscribers.Users.map((user) => user.id);
    const subscribers = [...userSubscribersId, ...taskSubscribersId];
    for (const [s, id] of usersOnline) {
      if (subscribers.includes(Number(id))) {
        s.join('room');
      }
    }
    socket.broadcast.to('room').emit('notification', { message: { message: 'Новый отчет', url: `/reports/${report.id}` } });
    io.socketsLeave('room');
  });
});

/// //////////////////////////logout
io.on('connection', (socket) => {
  socket.on('logout', () => {
    socket.disconnect();
  });
});

/// ////chat
io.on('connection', (socket) => {
  socket.on('create-message', (msg) => {
    const { users, message, room } = msg;
    for (const [s, id] of usersOnline) {
      if (users.includes(Number(id))) {
        s.join('room');
      }
    }
    io.to('room').emit('new-message', { message, room });
    io.socketsLeave('room');
  });
});
module.exports = server;
