// filename    : user_interaction.js
// description : Definitions and helper methods
// last update : 10 20 2017
// Keys to check in-game
let key_W = false;
let key_A = false;
let key_S = false;
let key_D = false;
let key_SPACE = false;
let key_P = false;
// Add listeners to detect user input
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);
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
    case 80: // p
      key_P = true;
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
    case 80: // p
      key_P = false;
      break;
  }
}
// If the window is resized call the engine function to respond
window.addEventListener("resize", function () {
    engine.resize();
});
// @END ADDITIONAL FUNCTIONS
