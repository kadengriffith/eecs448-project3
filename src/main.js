// filename    : main.js
// description : Main game loop
// last update : 10 25 2017
//########################
//  G A M E   S T A R T
//########################
// INITIAL SETTINGS
let showPlayArea = true;
let enableTime = true;
let reloadOnTimeEnd = false; // After time length reload the window
let loadTextures = false; // Only true when server-side
let loadSounds = false; // Only true when server-side
let gravityConst = -9.81; /* -9.81 */
// Time - Match length >= 1
let minutes = 5; // See time.js
document.getElementsByClassName('time')[0].innerHTML = minutes + ":00";
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
  // This is our sound
  if(loadSounds) {
    let puckSound = new BABYLON.Sound("puckSound", "img/sounds/sound_puck.wav", scene);
    Player1.physicsImpostor.registerOnPhysicsCollide(Puck.physicsImpostor, function(main, collided) {
      puckSound.play();
    });
  }
  // End of createScene function
  return scene;
};
let scene = createScene();
// @END SCENE INSTANTIATION
if(enableTime && game_seconds === 0) { startSeconds(); } // See time.js
// UPDATE LOOP
engine.runRenderLoop(function () {
  getTeam();
  if(!paused) { // Else -> present pause menu
    game_view();
    scene.activeCamera = Camera1;
    getScore(); // See time.js
    // Reset if players fall off the game
    if(Player1.position.y < -20) {
      dropPlayer("p1", "POSITION_INIT");
    }else if(AI.position.y < -20) {
      dropPlayer("ai", "POSITION_INIT");
    }
    // Reset the puck if goal
    if(Puck.position.z > ground_length / 2 + puck_diameter) {
      // Blue
      Puck.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 0)); // Stop puck
  	  dropPuck("CENTER");
      AI.position = new BABYLON.Vector3(0, player_yoff, (-ground_length / 2) + player_diameter);
      Player1.position = new BABYLON.Vector3(0, player_yoff, (ground_length / 2) - player_diameter);
      setTimeout(score_blue++, 2000);
    }
    if(Puck.position.z < -(ground_length / 2) - puck_diameter) {
      // Red
      Puck.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 0)); // Stop puck
      dropPuck("CENTER");
      AI.position = new BABYLON.Vector3(0, player_yoff, (-ground_length / 2) + player_diameter);
      Player1.position = new BABYLON.Vector3(0, player_yoff, (ground_length / 2) - player_diameter);
      setTimeout(score_red++, 2000);
    }
    // Check keys
    if (key_D) {
      Player1.position.x -= player_speed;
    }
    if (key_S) {
      Player1.position.z += player_speed;
    }
    if (key_A) {
      Player1.position.x += player_speed;
    }
    if (key_W) {
      Player1.position.z -= player_speed;
    }
    if (key_P) {
    	Puck.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 0)); // Stop puck
      dropPuck("CENTER");
    }
    if (key_ESC) {
      menu_view(); // Pause the game
      Puck.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 0)); // Stop puck
    }
    if (key_SPACE) {
      player_speed = 0.66;
    } else {
      player_speed = 0.33;
    }
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
    if(Puck.position.y > 1 && Puck.position.y < 3) {
      AIReturn();
    } else if(PuckStuckInLeftCorner()) {
	  Puck.position.x -= player_speed;
	  Puck.position.z += player_speed;
	} else if(PuckStuckInRightCorner()) {
	  Puck.position.x += player_speed;
	  Puck.position.z += player_speed;
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
      } else {
    		AIBack();
    	}
	    AIFollowPuckX();
    }
  }else {
    // Enter camera sequence
    if(game_seconds > 18 && game_seconds <= 36) {
      scene.activeCamera = Camera3;
      Camera3.alpha += -Math.PI / 1800;
      if(Camera3.beta < (Math.PI / 2.8)) { Camera3.beta += Math.PI / 4000; }
      Camera3.radius += 0.05;
    }else if(game_seconds > 36 && game_seconds <= 60) {
      scene.activeCamera = Camera4;
      Camera4.alpha += Math.PI / 1800;
    }else if(game_seconds > 60 && game_seconds <= 80) {
      scene.activeCamera = Camera5;
      Camera5.alpha += -Math.PI / 3000;
      Camera5.radius += -0.03;
    }else {
      scene.activeCamera = Camera2;
      Camera2.alpha += Math.PI / 1500;
      if(Camera2.beta < Math.PI / 2) { Camera2.beta += Math.PI / 7000; }
    }
    if(game_seconds > 80) {
      // Loop the animation
      // Reset animation frames
      game_seconds = 0;
      Camera2.alpha = Math.PI / 6;
      Camera2.beta= Math.PI / 3;
      Camera3.alpha = Math.PI / 6;
      Camera3.beta = Math.PI / 6;
      Camera3.radius = 14;
      Camera4.alpha = Math.PI / 8;
      Camera4.beta = Math.PI / 2.8;
      Camera5.alpha = Math.PI / 3;
      Camera5.beta = Math.PI / 3;
      Camera5.radius = 80;
    }
    if (key_ESC == true) {
      menu_view(); // Resume the game
    }
  }
  // Display to the screen ~60fps
  scene.render();
});
// @END UPDATE LOOP
//########################
//  G A M E   E N D  :(
//########################
function dropPuck(loc) {
  if(loc === "CENTER") {
    Puck.position.x = 0;
    Puck.position.y = 10;
    Puck.position.z = 0;
  }
  return;
}
function dropPlayer(str, loc) {
  if(loc === "POSITION_INIT") {
    Puck.position.x = 0;
    Puck.position.y = player_yoff;
    if(str === "ai") {
      Puck.position.z = -(ground_length / 2) - player_diameter;
    }else if(str === "p1") {
      Puck.position.z = (ground_length / 2) - player_diameter;
    }
  }
  return;
}
