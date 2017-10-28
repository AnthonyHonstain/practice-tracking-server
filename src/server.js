import Server from 'socket.io';

export function startServer(store) {
  const io = new Server().attach(8090);

  store.subscribe(() => {
    console.log('subscribe', store.getState());
    io.emit('state', store.getState().toJS());
  });

  io.on('connection', (socket) => {
    console.log('connection', store.getState());
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });
}