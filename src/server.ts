import { createServer } from 'http';
import { parse } from 'url';

import { WSS } from '@singleton/ws-server';
import { app } from './app';

const wss = WSS.init();
const PORT = process.env.PORT || 5000;

let options = {};
const server = createServer(options, app);

server.on('upgrade', function (request, socket, head) {
  const { pathname } = parse(request.url as string);
  if (pathname === '/eth') {
    wss.handleUpgrade(request, socket as never, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({ type: 'ping' }));
  });
}, 1000);

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`);
});
