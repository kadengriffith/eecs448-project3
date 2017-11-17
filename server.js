var express = require('express');
var socket = require('socket.io');

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
  console.log("made socket connection: " + socket.id);

  // When this user emits, client side: socket.emit('puckmove',some data);
  socket.on('puckmove', function(data) {
    // Data comes in as whatever was sent, including objects
    console.log("Received: 'puckmove' " + data.x + " " + data.y);

    // Send it to all of the clients
    socket.broadcast.emit('puckmove', data);
  });

  socket.on('disconnect', function() {
    console.log("Client has disconnected " + socket.id);
  });
}
);
