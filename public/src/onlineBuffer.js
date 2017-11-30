if(!enableAi) { // See loading.js
  // Can only be loaded without socket if client has our files.
  // The default for enableAi is false and is used this way on load.
  // We can manipulate if the script is included by manually switching enableAi to True
  // and reloading the page locally (in other words don't do this for server side)
  document.getElementById('Body').innerHTML += "<script src='/socket.io/socket.io.js'></script>";
}
