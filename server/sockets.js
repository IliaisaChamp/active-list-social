const { User } = require('./db/models');
const { Op } = require('sequelize');
const sessionParser = require('./session');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ clientTracking: false, noServer: true });
const map = new Map();

function upgrade(req, socket, head) {
  console.log('Парсинг сессии...');

  sessionParser(req, {}, () => {
    if (!req.session.user) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    console.log('Парсинг сессии завершен успешно');

    wss.handleUpgrade(req, socket, head, function (ws) {
      wss.emit('connection', ws, req);
    });
  });
}

async function connection(ws, req) {
  const userId = req.session.user.id;
  map.set(userId, ws);

  const usersId = [...map.keys()];

  const connectedUsers = await User.findAll({
    where: { id: { [Op.in]: usersId } },
    attributes: ['id', 'name'],
  });

  for (let [userId, userWs] of map) {
    userWs.send(
      JSON.stringify({
        type: 'connectedUsers',
        payload: connectedUsers,
      }),
    );
  }

  // ws.on('message', (message) => {
  //   const dataFromClient = JSON.parse(message);

  //   switch (dataFromClient.type) {
  //     case 'message':
  //       const isSave = MessageService.save(dataFromClient.payload, req.session.user.id);

  //       for (let [userid, userWs] of map) {
  //         userWs.send(
  //           JSON.stringify({
  //             type: 'broadcast',
  //             payload: {
  //               message: dataFromClient.payload,
  //               name: req.session.user.name,
  //               date: Date.now()
  //             },
  //           }),
  //         );
  //       }
  //       break;

  //     default:
  //       break;
  //   }
  // });

  ws.on('close', function () {
    map.delete(userId);
    for (let [userid, userWs] of map) {
      userWs.send(
        JSON.stringify({
          type: 'userOut',
          payload: userId,
        }),
      );
    }
  });
}

module.exports = { upgrade, connection, wss };
