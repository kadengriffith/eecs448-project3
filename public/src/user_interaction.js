// filename    : user_interaction.js
// description : Definitions and helper methods
// last update : 11 27 2017
// var socket = io.connect('http://localhost:3000');
if(!enableAi) {
  var socket = io.connect();
  socket.on('connect', function() {
    console.log("Connected user_interaction.js");
  });
}
// Keys to check in-game
let key_W = false;
let key_A = false;
let key_S = false;
let key_D = false;
let key_SPACE = false;
let key_P = false;
let key_ESC = false;
// Add listeners to detect user input
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);
// ADDITIONAL FUNCTIONS
// Controlling Player1

/**
 * Detects when specified keys are pressed and performs specified action
 * @param {event} event thing that should happen when button is pressed
 */

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
    case 27: // escape
      key_ESC = true;
      break;
  }
}

/**
 * Detects when specified keys are released and performs specified action
 * @param {event} event thing that should happen when button is released
 */

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
    case 27: // escape
      key_ESC = false;
      break;
  }
}
// Manipulates the team label on the HUD

/**
 * Reads info from menu regarding team selection, sets fields accordingly (fields including puck color, scoreboard color, scoreboard text)
 */

function getTeam() {
  let team = document.getElementById('team_select').value;
  if(team === "RED") {
    let text = document.getElementById('player_scoreDisplay');
    text.innerHTML = "RED";
    _color = "red";
    if(loadTextures) {
      let _material = new BABYLON.StandardMaterial("texture_playerRed", scene);
      _material.diffuseTexture = new BABYLON.Texture("assets/textures/texture_playerRed.png", scene);
      _material.specularColor = new BABYLON.Color3(1.0, 1.0, 1.0);
      Player1.material = _material;
    }
    text.style.color = "#e74c3c";
    loadGraphics(_color);
  }
  if(team === "GREEN") {
    let text = document.getElementById('player_scoreDisplay');
    text.innerHTML = "GREEN";
    _color = "green";
    if(loadTextures) {
      let _material = new BABYLON.StandardMaterial("texture_playerGreen", scene);
      _material.diffuseTexture = new BABYLON.Texture("assets/textures/texture_playerGreen.png", scene);
      _material.specularColor = new BABYLON.Color3(1.0, 1.0, 1.0);
      Player1.material = _material;
    }
    text.style.color = "#27ae60";
    loadGraphics(_color);
  }
  if(team === "BLUE") {
    let text = document.getElementById('player_scoreDisplay');
    text.innerHTML = "BLUE";
    _color = "blue";
    if(loadTextures) {
      let _material = new BABYLON.StandardMaterial("texture_playerBlue", scene);
      _material.diffuseTexture = new BABYLON.Texture("assets/textures/texture_playerBlue.png", scene);
      _material.specularColor = new BABYLON.Color3(1.0, 1.0, 1.0);
      Player1.material = _material;
    }
    text.style.color = "#2980b9";
    loadGraphics(_color);
  }
  if(team === "YELLOW") {
    let text = document.getElementById('player_scoreDisplay');
    text.innerHTML = "YELLOW";
    _color = "yellow";
    if(loadTextures) {
      let _material = new BABYLON.StandardMaterial("texture_playerYellow", scene);
      _material.diffuseTexture = new BABYLON.Texture("assets/textures/texture_playerYellow.png", scene);
      _material.specularColor = new BABYLON.Color3(1.0, 1.0, 1.0);
      Player1.material = _material;
    }
    text.style.color = "#f1c40f";
    loadGraphics(_color);
  }
}

/**
 * Pulls pictures from server and sets puck color, scoreboard color accordingly
 * @param {string} color color of the team the player chose
 */

function loadGraphics(color) {
  let image_ = document.getElementsByClassName('scoreTitle')[0];
  image_.style.backgroundImage = "url('assets/fonts/score_title_" + color + ".png')";
  image_ = document.getElementsByClassName('scorePoints')[0];
  image_.style.backgroundImage = "url('assets/fonts/score_points_" + color + ".png')";
  image_ = document.getElementsByClassName('time')[0];
  image_.style.backgroundImage = "url('assets/fonts/score_time_" + color + ".png')";
}
// If the window is resized call the engine function to respond
window.addEventListener("resize", function () {
    engine.resize();
});
// @END ADDITIONAL FUNCTIONS
