var express = require('express');
var socket = require('socket.io');
var waitingCount = 0;
// App setup
var app = express();
var server = app.listen(3000, '0.0.0.0', function(){
  console.log('listening to port :' + 3000);
} );

// Static files
app.use(express.static('public'));
//Socket setup
var io = socket(server);

io.on('connection', function(socket){
  //console.log("made socket connection: " + socket.id);

  if(Object.keys(io.clients().sockets).length > 7) {
    socket.broadcast.emit('host', false);
  }

  // When this user emits, client side: socket.emit('puckmove',some data);
  socket.on('puckmove', function(data) {
    // Data comes in as whatever was sent, including objects
    //console.log("Puck location received from client id: " + socket.id + " x: " + data.x + " y: " + data.y + " z: " + data.z);

    // Send it to all of the clients
    socket.broadcast.emit('puckmove', data);
  });

  socket.on('playermove', function(data) {
    //console.log("Player location received from client id: " + socket.id + " x: " + data.x + " y: " + data.y + " z: " + data.z);
    socket.broadcast.emit('playermove', data);
  });

  socket.on('start', function(data) {
    socket.broadcast.emit('start', data);
  });

  socket.on('waiting', function(data) {
    if(waitingCount == 0) {
      waitingCount++;
    } else if(waitingCount == 1) {
      socket.broadcast.emit('start', data);
    }
  });

  socket.on('start2', function(data) {
    socket.broadcast.emit('start2', data);
  });

  socket.on('disconnect', function() {
    //console.log("Client has disconnected " + socket.id);
    waitingCount = 0;
  });

  // Score incrementing
  socket.on('score', function(data) {
    io.of('/').emit('score', data);
  });

}
);
