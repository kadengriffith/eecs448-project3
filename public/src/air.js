let airStrength = 1.66;
let airForce = 0.2;
// Floats the puck
function air() {
  if(Puck.position.y < airForce) {
    Puck.physicsImpostor.setAngularVelocity(new BABYLON.Quaternion(0,1,0,0));
    Puck.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, airStrength, 0), Puck.getAbsolutePosition());
  }
}
