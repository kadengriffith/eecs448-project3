let airStrength = 3.2;
let airForce = 0.22;
// Floats the puck
let init = false;

/**
 * Produces a small upward force on the puck, to simulate playing on an actual air hockey table.
 * 
 */

function air() {
  if(Puck.position.y < airForce) {
    Puck.physicsImpostor.setAngularVelocity(new BABYLON.Quaternion(0, 1.5, 0, 0));
    Puck.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, airStrength, 0), Puck.getAbsolutePosition());
  }
}
