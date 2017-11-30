// filename    : ai.js
// description : Artificial Intelligence helper functions
// last update : 11 27 2017
if(!enableAi) {
  var socket = io.connect();
  socket.on('connect', function() {
    console.log("Connected ai.js");
  });
}
/**
 * Moves ai towards its starting position
 */
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

/**
 * Moves ai's horizontal location towards puck's horizontal location
 */

function AIFollowPuckX() { //sets the ai's x coord to the puck's x coord
  if(AI.position.x < Puck.position.x - .2) {
    AI.position.x += ai_speed;
  } else if(AI.position.x > Puck.position.x + .2){
    AI.position.x -= ai_speed;
  }
}

/**
 * Checks if puck is on ai's side
 * @return {bool} true if puck is on ai's side, false if not
 */

function PuckOnBlueSide() {
  return Puck.position.z < -0.5;
}

/**
 * Checks if user is on ai's side
 * @return {bool} true if player is on ai's side, false if not
 */

function PlayerOnBlueSide() {
  return Player1.position.z < -0.5;
}

/**
 * Checks if puck is behind the ai
 * @return {bool} true if puck is behind the ai, false if not
 */

function PuckBehindAI() {
  return Puck.position.z < AI.position.z - 2;
}

/**
 * Checks if the user is about to hit the back wall (preventing collisions or player falling off play area)
 * @return {bool} true if player is about to hit the back wall, false if not
 */

function PlayerHittingBack() {
  return Player1.position.z > 37;
}

/**
 * Checks if the user is about to hit the left wall (preventing collisions or player falling off play area)
 * @return {bool} true if player is about to hit the left wall, false if not
 */

function PlayerHittingLeft() {
  return Player1.position.x > 24;
}

/**
 * Checks if the user is about to hit the right wall (preventing collisions or player falling off play area)
 * @return {bool} true if player is about to hit the right wall, false if not
 */


function PlayerHittingRight() {
  return Player1.position.x < -24;
}

/**
 * Prevents ai from going onto user's side
 */

function AIBack() {
  if(AI.position.z > -37) {
    AI.position.z -= ai_speed;
  }
}

/**
 * Checks if the puck is stuck in the back left corner (if the ai has trapped it there)
 * @return {bool} true if the puck is there, false if not
 */


function PuckStuckInLeftCorner() {
	return Puck.position.z < -38 && Puck.position.x > 24;
}

/**
 * Checks if the puck is stuck in the back right corner (if the ai has trapped it there)
 * @return {bool} true if the puck is there, false if not
 */

function PuckStuckInRightCorner() {
	return Puck.position.z < -38 && Puck.position.x < -24;
}
