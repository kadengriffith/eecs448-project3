let airStrength = 3.2;
let airForce = 0.22;
// Floats the puck
let init = false;
function air() {
  if(Puck.position.y < airForce) {
    Puck.physicsImpostor.setAngularVelocity(new BABYLON.Quaternion(0, 1.5, 0, 0));
    Puck.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, airStrength, 0), Puck.getAbsolutePosition());
  }
}
