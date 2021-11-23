const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
});
//online users sockets
const usersOnline = new Map();

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
  const id = socket.handshake.query.id
  usersOnline.set(socket, id);
  const users = usersOnline.values();
  const uniqueUsers = [...new Set(users)]
  // console.log('after connect', usersOnline)

  io.emit('broadcast-online', { users: uniqueUsers });


  socket.on('disconnect', () => {
    console.log('USER DISCONNECTED', socket.id);
    usersOnline.delete(socket);
    // console.log('after delete', usersOnline)
    const users = usersOnline.values();
    const uniqueUsers = [...new Set(users)]

    io.emit('broadcast-online', { users: uniqueUsers });
  });

});
////////////////////////////////////////////////////////////


module.exports = server;
