// filename    : user_interaction.js
// description : Definitions and helper methods
// last update : 10 20 2017

// ADDITIONAL FUNCTIONS
// Controlling Player1
function onKeyDown(event) {
  let key_Code = event.keyCode;
  if(key_Code === 0) { key_Code = event.charCode; }
  switch (key_Code) {
    case 68: // d
      key_D = true;
      break;
    case 83: // s
      key_S = true;
      break;
    case 65: // a
      key_A = true;
      break;
    case 87: // w
      key_W = true;
      break;
    case 32: // space
      key_SPACE = true;
      break;
  }
}

function onKeyUp(event) {
  let key_Code = event.keyCode;
  switch (key_Code) {
    case 68: // d
      key_D = false;
      break;
    case 83: // s
      key_S = false;
      break;
    case 65: // a
      key_A = false;
      break;
    case 87: // w
      key_W = false;
      break;
    case 32: // space
      key_SPACE = false;
      break;
  }
}
// If the window is resized call the engine function to respond
window.addEventListener("resize", function () {
    engine.resize();
});
// @END ADDITIONAL FUNCTIONS
