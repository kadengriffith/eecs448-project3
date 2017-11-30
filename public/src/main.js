// filename    : main.js
// description : Main game loop
// last update : 11 27 2017// HTTP Portion
/////////////////////////////////////////
//########################
//  G A M E   S T A R T
//########################
// INITIAL SETTINGS
let showPlayArea = false;
let enableTime = true;
let reloadOnTimeEnd = false; // After time length reload the window
let gravityConst = -9.81; /* -9.81 */
let selfDestruct = false;
let stamina = 100;
let scene;
let loaded = true;
// Time - Match length >= 1
let minutes = 5; // See time.js
document.getElementsByClassName('time')[0].innerHTML = minutes + ":00";
// @END INITIAL SETTINGS
// CONTEXT & ENGINE
let game = document.getElementById('view_GAME');
let engine = new BABYLON.Engine(game, true);
// @END CONTEXT & ENGINE
//runGame();
//function runGame() {
  //SOCKET.IO
  if(!enableAi) {
   var socket = io.connect();
    socket.on('connect', function() {
      console.log("Connected main.js");
    });

    var puckX = 0;
    var puckY = 0;
    var puckZ = 0;
    var puckLVX = 0;
    var puckLVY = 0;
    var puckLVZ = 0;
    var puckAVX = 0;
    var puckAVY = 0;
    var puckAVZ = 0;

    var host = true;

    socket.on('host', function(data) {
      host = data;
    });

    socket.on('start', function(data) {
      game_view();
      socket.emit('start2', {});
    });

    socket.on('start2', function(data) {
     game_view();
    });

    socket.on('puckmove', function(data) {
      //console.log("Puck location received from server, x: " + data.x + " y: " + data.y + " z: " + data.z);
    	  puckX = -data.x;
    	  puckY = data.y;
    	  puckZ = -data.z;
    	  puckLVX = -data.lvx;
    	  puckLVY = data.lvy;
    	  puckLVZ = -data.lvz;
    	  puckAVX = -data.avx;
    	  puckAVY = data.avy;
    	  puckAVZ = -data.avz;
    });

    var adjustedX = 0;
    var adjustedY = 0;
    var adjustedZ = -37;

    socket.on('playermove', function(data) {
      //console.log("Player location received from server, x: " + data.x + " y: " + data.y + " z: " + data.z);
    	adjustedX = -data.x;
    	adjustedY = data.y;
    	adjustedZ = -data.z;
    });
  }
  // // Puck location
  // var puckLocation = function(xval, yval, zval) {
  //   console.log("puck: " + xval + " " + yval + " " + zval);
  // };

  // SCENE INSTANTIATION

  /**
   * Utilizes babylon.js library to instantiate a scene object
   */

    let createScene = function () {
    // Scene Creation
    let scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(100, 100, 100);
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
      let puckSound = new BABYLON.Sound("puckSound", "assets/sounds/sound_puck.wav", scene);
      Player1.physicsImpostor.registerOnPhysicsCollide(Puck.physicsImpostor, function(main, collided) {
        puckSound.play();
      });
    }
    // End of createScene function
    return scene;
  };
  scene = createScene();
  // @END SCENE INSTANTIATION
  if(enableTime && game_seconds === 0) { startSeconds(); } // See time.js
  // UPDATE LOOP
  /**
   * Maniuplates scene object to change camera position, puck, player, ai positions
   */
  engine.runRenderLoop(function () {
    getTeam();
    if(!paused && loaded) { // Else -> present pause menu
      game_view();
      scene.activeCamera = Camera1;
      getScore(); // See time.js
      air();
      // Reset if players fall off the game
      if(Player1.position.y < -20) {
        dropPlayer("p1", "POSITION_INIT");
      }else if(AI.position.y < -20) {
        dropPlayer("ai", "POSITION_INIT");
      }
      if(!enableAi) {
        if(!host) {
      		Puck.position.x = puckX;
      		Puck.position.y = puckY;
      		Puck.position.z = puckZ;

      		Puck.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(puckLVX, puckLVY, puckLVZ));
      		Puck.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(puckAVX, puckAVY, puckAVZ));
      	}
      }
      // Reset the puck if goal
      if(Puck.position.z > ground_length / 2 + puck_diameter && (Puck.position.x < goal_width / 2 || Puck.position.x > (-goal_width / 2 ))) {
        // AI
        Puck.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 0)); // Stop puck
        Puck.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0, 0, 0)); // Stop puck
    	dropPuck("CENTER");
        AI.position = new BABYLON.Vector3(0, player_yoff, (-ground_length / 2) + player_diameter);
        Player1.position = new BABYLON.Vector3(0, player_yoff, (ground_length / 2) - player_diameter);
	setTimeout(score_ai++, 2000);
      }
      if(Puck.position.z < -(ground_length / 2) - puck_diameter && (Puck.position.x < goal_width / 2 || Puck.position.x > (-goal_width / 2 ))) {
        // Red
        Puck.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 0)); // Stop puck
        Puck.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0, 0, 0)); // Stop puck
        dropPuck("CENTER");
        AI.position = new BABYLON.Vector3(0, player_yoff, (-ground_length / 2) + player_diameter);
        Player1.position = new BABYLON.Vector3(0, player_yoff, (ground_length / 2) - player_diameter);
	setTimeout(score_red++, 2000);
      }
      // Catch if bug occurs
      if(Puck.position.y < -20) {
        Puck.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 0)); // Stop puck
        Puck.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0, 0, 0)); // Stop puck
        dropPuck("CENTER");
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
        menu_view(); // Needs fixed for multiplayer
        if(enableAi) {
          paused = true;
          Puck.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 0)); // Stop puck
        }
      }
      if (key_SPACE && stamina > -1) {
          stamina--;
          player_speed = 0.4;
      } else {
        player_speed = 0.22;
        if(stamina < 100) {
          stamina++;
        }
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
      if(enableAi) {
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
                AI.position.x -= ai_speed;
             } else {
                AI.position.x += ai_speed;
              }
              AI.position.z -= ai_speed;
            } else {
              AI.position.z += ai_speed;
            }
          } else {
         		AIBack();
        	}
        	    AIFollowPuckX();
        }
      }else {
        AI.position.x = adjustedX;
        AI.position.y = adjustedY;
        AI.position.z = adjustedZ;
      }
    }else {
      air();
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
    }
    if(selfDestruct) {
      selfDestruct = false;
      scene.dispose();
      //runGame();
      paused = false;
    }

    scene.render();
    // Monitor puck and players
    if(!enableAi) {
      sendPuck(Puck.position.x, Puck.position.y, Puck.position.z,
      Puck.physicsImpostor.getLinearVelocity().x, Puck.physicsImpostor.getLinearVelocity().y, Puck.physicsImpostor.getLinearVelocity().z,
      Puck.physicsImpostor.getAngularVelocity().x, Puck.physicsImpostor.getAngularVelocity().y, Puck.physicsImpostor.getAngularVelocity().z);
      sendPlayer1(Player1.position.x, Player1.position.y, Player1.position.z);
    }
    // Display to the screen ~60fps
  });
//}
// @END UPDATE LOOP
//########################
//  G A M E   E N D  :(
//########################

/**
 * Moves puck to specified location, to be used when puck goes somewhere it shouldn't
 * @param {Vector} loc integer vector representing the desired location
 */

function dropPuck(loc) {
  if(loc === "CENTER") {
    Puck.position.x = 0;
    Puck.position.y = 10;
    Puck.position.z = 0;
  }
  return;
}

/**
 * Places a player in the desired location, used to begin game or reset game after point is scored
 * @param {string} str string designating if the player to be placed is the ai or the user
 * @param {Vector} loc integer vector representing the desired location
 */

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

// Monitor puck
function sendPuck(px, py, pz, vxl, vyl, vzl, vxa, vya, vza) {
  socket.emit('puckmove', {x: px, y: py, z: pz, lvx: vxl, lvy: vyl, lvz: vzl, avx: vxa, avy: vya, avz: vza});
}

// Monitor player 1
function sendPlayer1(px, py, pz) {
  socket.emit('playermove', {x: px, y: py, z: pz});
}

// Enable solo play
function setAi(bool) {
  if(bool) { // Should never be false but a check's a check
    enableAi = bool;
    return;
  }
}

function resetForSolo() {
  /*if(document.getElementById('team_select').value === "null") {
    alert('Please choose a team to start a game.');
    home_view();
  }else {
    setAi(true);
    selfDestruct = true;
  }*/
  enableAi = true;
  game_view();
}

function setPaused(bool) {
  paused = bool;
  game_view();
}
