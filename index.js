import express from 'express';
import socketIO from "socket.io";
const NodeCache = require("node-cache");
const enforce = require('express-sslify');


export default (app, http) => {

  if (process.env.NODE_ENV === 'production') {
    app.use(enforce.HTTPS({
      trustProtoHeader: true
    }));
  }

  app.use(express.static('./dist'));


  const roomCache = new NodeCache({
    stdTTL: 7200
  });


  app.get('/', (req, res) => {
    res.sendFile('dist/index.html', {
      root: __dirname
    });
  })

  app.get('/join', (req, res) => {
    let room = req.query.r;
    let exists = roomCache.has(room);
    if (exists)
      res.sendFile('dist/index.html', {
        root: __dirname
      });
    else
      res.redirect('/404');
  })

  // Node-Cache stats
  app.get('/cache-stats', (req, res) => {
    res.json({
      stats: roomCache.getStats(),
      keys: roomCache.keys()
    });
  })

  app.get('*', (req, res) => {
    res.sendFile('dist/index.html', {
      root: __dirname
    });
  })

  let io = socketIO(http);
  io.on('connection', (socket) => {
    // TODO: maintain a list of hosted rooms
    // user hosts a room
    let isHost = false;
    let hostID = null;
    socket.on('host-room', (reply) => {
      let roomID = Date.now().toString(36);
      socket.leave(socket.id);
      socket.join(roomID);
      hostID = roomID;
      isHost = true;
      roomCache.set(roomID, true);
      reply(roomID);
    });

    // user joins a room
    socket.on('join-room', (roomID, reply) => {
      socket.join(roomID);
      reply(`${socket.id} joined ${roomID}`);
    });

    // Actual color message
    socket.on('color', (color) => {
      for (let key in socket.rooms) {
        io.to(key).emit('color', color);
      }
    });

    // TODO: remove from the list of hosted rooms
    socket.on('disconnect', () => {
      if (isHost)
        roomCache.del(hostID);
    })
  })
}