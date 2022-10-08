
module.exports = (server) => {
  const { Server } = require('socket.io');
  const io = new Server(server)

  io.on('connection', function (socket) {
    console.log('a user connected');
  });
};
