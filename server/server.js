const server = require('./sockets')

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
