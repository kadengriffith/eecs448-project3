var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(3000, function(){
  console.log('listening to request on port 3000');
} );

// Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection', function(socket){console.log('made socket connection', socket.id);})
