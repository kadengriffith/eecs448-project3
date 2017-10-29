// filename    : ai.js
// description : Artificial Intelligence helper functions
// last update : 10 25 2017
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
    AI.position.x += ai_speed * 1.2;
  } else if(AI.position.x > Puck.position.x + .2){
    AI.position.x -= ai_speed * 1.2;
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

function AIBack() {
  if(AI.position.z > -37) {
    AI.position.z -= ai_speed;
  }
}