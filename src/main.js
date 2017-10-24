// filename    : main.js
// description : Main game loop
// last update : 10 23 2017
//########################
//  G A M E   S T A R T
//########################
// INITIAL SETTINGS
let showPlayArea = false;
let loadTextures = false;
// Time - See time.js
let minutes = 5; // Match length >= 1
// @END INITIAL SETTINGS
// CONTEXT & ENGINE
let game = document.getElementById('view_GAME');
let engine = new BABYLON.Engine(game, true);
// @END CONTEXT & ENGINE
// SCENE INSTANTIATION
let createScene = function () {
  // Scene Creation
  let scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(240, 240, 240);
  // Information for the physics engine
  let gravityVector = new BABYLON.Vector3(0,-9.81, 0);
  let physicsPlugin = new BABYLON.CannonJSPlugin();
  // Load all the objects necessary
  loadGameObjects(scene); // See objects_toRender.js
  // Enable physics
  scene.enablePhysics(gravityVector, physicsPlugin);
  // Load all the imposters necessary
  loadGameImposters(scene); // See objects_toRender.js
  /* This is a function that is called on collision but I couldn't get it to work just yet
  Player1.physicsImpostor.registerOnPhysicsCollide(Puck.physicsImpostor, function(main, collided) {
    main.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
  });
  */
  // End of createScene function
  return scene;
};
let scene = createScene();
// @END SCENE INSTANTIATION
startSeconds(); // See time.js
// UPDATE LOOP
function AIReturn() { //sends ai back to starting position
  if(AI.position.x > 0) {
    AI.position.x -= ai_speed;
  } else {
    AI.position.x += ai_speed;
  }

  if(AI.position.z > -35) {
    AI.position.z -= ai_speed;
  } else {
    AI.position.z += ai_speed;
  }
}

function AIFollowPuckX() { //sets the ai's x coord to the puck's x coord
  if(AI.position.x < Puck.position.x - .2) {
    AI.position.x += ai_speed;
  } else if(AI.position.x > Puck.position.x + .2){
    AI.position.x -= ai_speed;
  }
}

function PuckOnBlueSide() {
  return Puck.position.z < -0.5;
}

function PlayerOnBlueSide() {
  return Player1.position.z < -0.5;
}

function PuckBehindAI() {
  return Puck.position.z < AI.position.z - 2;
}

function PlayerHittingBack() {
  return Player1.position.z > 37;
}

function PlayerHittingLeft() {
  return Player1.position.x > 24;
}

function PlayerHittingRight() {
  return Player1.position.x < -24;
}

engine.runRenderLoop(function () {
  getScore(); // See time.js
  // Easy in-game reset for debugging
  if(Player1.position.y < -20 || AI.position.y < -20) { window.location.reload(); }
  // Reset the puck if goal
  if(Puck.position.y < -20) {
    Puck.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 0)); // Stop puck
	  Puck.position.x = 0;
    Puck.position.y = 10;
    Puck.position.z = 0;
    AI.position = new BABYLON.Vector3(0, player_yoff, (-ground_length / 2) + player_diameter);
    Player1.position = new BABYLON.Vector3(0, player_yoff, (ground_length / 2) - player_diameter);
  }
  if(Puck.position.z > ground_length / 2 + puck_diameter) {
    Puck.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 0)); // Stop puck
	  Puck.position.x = 0;
    Puck.position.y = 10;
    Puck.position.z = 0;
    AI.position = new BABYLON.Vector3(0, player_yoff, (-ground_length / 2) + player_diameter);
    Player1.position = new BABYLON.Vector3(0, player_yoff, (ground_length / 2) - player_diameter);
    setTimeout(score_blue++, 2000);
  }
  if(Puck.position.z < -(ground_length / 2) - puck_diameter) {
    Puck.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 0)); // Stop puck
	  Puck.position.x = 0;
    Puck.position.y = 10;
    Puck.position.z = 0;
    AI.position = new BABYLON.Vector3(0, player_yoff, (-ground_length / 2) + player_diameter);
    Player1.position = new BABYLON.Vector3(0, player_yoff, (ground_length / 2) - player_diameter);
    setTimeout(score_red++, 2000);
  }
  // Check keys
  if (key_D == true) {
    Player1.position.x -= player_speed;
  }
  if (key_S == true) {
    Player1.position.z += player_speed;
  }
  if (key_A == true) {
    Player1.position.x += player_speed;
  }
  if (key_W == true) {
    Player1.position.z -= player_speed;
  }
  if (key_SPACE == true) {
    player_speed = 0.66;
  } else {
    player_speed = 0.33;
  }
  // Display to the screen ~60fps

  //prevent player1 from going to places that cause problems

  if(PlayerOnBlueSide()) {
    Player1.position.z += player_speed;
  }

  if(PlayerHittingBack()) {
    Player1.position.z -= player_speed;
  }

  if(PlayerHittingLeft()) {
    Player1.position.x -= player_speed;
  }

  if(PlayerHittingRight()) {
    Player1.position.x += player_speed;
  }

  //control ai

  AIFollowPuckX();

  if(Puck.position.y > 11) {
    AIReturn();
  } else {

    if(PuckOnBlueSide()) { //if the puck is on the blue side
      if(Puck.position.z < AI.position.z) { //if the puck is behind the ai
        if(Puck.position.x < 0) { //if the puck is on one side of the arena
          AI.position.x -= ai_speed * 1.2;
        } else {
          AI.position.x += ai_speed * 1.2;
        }
        AI.position.z -= ai_speed * 1.2;
      } else {
        AI.position.z += ai_speed;
      }
    }
  }
  scene.render();
});
// @END UPDATE LOOP
//########################
//  G A M E   E N D  :(
//########################
