// author      : Kaden Griffith
// filename    : onlineBuffer.js
// description : simple socket.io enabler
if(!enableAi) { // See config.js
  // The default for enableAi is false and is used for the following:
  // We can manipulate the script inclusion by manually switching online(true) in config.js
  // and reloading the page locally. If the user calls online(false) after the initial load,
  // the game state will not be changed. In other words, the file will always be included as long as we
  // set the config.js to the mode we want the client to use.
  document.innerHTML += "<script src='/socket.io/socket.io.js' type='text/javascript'></script>";
}
