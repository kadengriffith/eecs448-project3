// filename    : main.js
// description : Main game loop
// last update : 10 20 2017

//########################
//   G A M E   S T A R T
//########################
// INITIAL SETTINGS
let player_height = 1;
let player_diameter = 5;
let player_yoff = player_height / 2;
let player_polygons = 40;
let player_speed = 0.5;

let puck_height = 0.3;
let puck_diameter = 3.25;
let puck_yoff = puck_height / 2;
let puck_polygons = 40;

let ground_length = 80;

  // MOVEMENT
  // Keys to check in-game
  let key_W = false;
  let key_A = false;
  let key_S = false;
  let key_D = false;
  let key_SPACE = false;
  // Add listeners to detect user input
  window.addEventListener("keydown", onKeyDown, false);
  window.addEventListener("keyup", onKeyUp, false);
  // @END MOVEMENT
// @END INITIAL VARS
// CONTEXT & ENGINE
let game = document.getElementById('view_GAME');
// let hud = document.getElementById('view_HUD'); USE THIS LATER
let engine = new BABYLON.Engine(game, true);
// let hud_ctx = hud.getContext("2d"); USE THIS LATER
// @END CONTEXT & ENGINE
// SCENE OBJECT INSTANTIATION

var Puck; //declare puck in higher scope so its velocity can be manipulated in other functions


let createScene = function () {
  // Scene Creation
  let scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(240, 240, 240);
  // Information for the physics engine
  let gravityVector = new BABYLON.Vector3(0,-9.81, 0);
  let physicsPlugin = new BABYLON.CannonJSPlugin();
  // This creates a light, aiming 0,1,0 - to the sky
  let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
  light.intensity = 0.8;
  // This creates the play area
  let ground = BABYLON.Mesh.CreateBox("ground", ground_length, scene);
  ground.position.y = -5;
  ground.scaling.y = 0.1;
  // This creates the puck
  Puck = BABYLON.Mesh.CreateCylinder("puck", puck_height, puck_diameter, puck_diameter, puck_polygons, 1, scene);
  Puck.position = new BABYLON.Vector3(0, puck_yoff + 10, 0);
  let puck_material = new BABYLON.StandardMaterial("green", scene);
  puck_material.diffuseColor = new BABYLON.Color3(0.5, 1.0, 0.5);
  Puck.material = puck_material;
  // This creates the controlled object
  let Player1 = BABYLON.Mesh.CreateCylinder("player1", player_height, player_diameter, player_diameter, player_polygons, 1, scene);
  Player1.position = new BABYLON.Vector3(0, player_yoff, (ground_length / 2) - player_diameter);
  let Player1_material = new BABYLON.StandardMaterial("red", scene);
  Player1_material.diffuseColor = new BABYLON.Color3(1.0, 0, 0);
  Player1.material = Player1_material;
  // This creates the opposing player
  let AI = BABYLON.Mesh.CreateCylinder("AI", player_height, player_diameter, player_diameter, player_polygons, 1, scene);
  AI.position = new BABYLON.Vector3(0, player_yoff, (-ground_length / 2) + player_diameter);
  let AI_material = new BABYLON.StandardMaterial("blue", scene);
  AI_material.diffuseColor = new BABYLON.Color3(0, 0, 1.0);
  AI.material = AI_material;
  // This creates and positions a follow camera
  let camera = new BABYLON.FollowCamera("FollowCam", Player1.position, scene);
  camera.checkCollisions = true;
  camera.applyGravity = true;
  camera.lockedTarget = Player1;
  scene.activeCamera = camera;
  // Setting Physics
  scene.enablePhysics(gravityVector, physicsPlugin);
  Player1.physicsImpostor = new BABYLON.PhysicsImpostor(Player1, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1000, friction: 0.5, restitution: 0.1 }, scene);
  AI.physicsImpostor = new BABYLON.PhysicsImpostor(AI, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1000, friction: 0.5, restitution: 0.1 }, scene);
  Puck.physicsImpostor = new BABYLON.PhysicsImpostor(Puck, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 2, friction: 0.001, restitution: 0.1 }, scene);
  ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.2 }, scene);
  /* This is a function that is called on collision but I couldn't get it to work just yet
  Player1.physicsImpostor.registerOnPhysicsCollide(Puck.physicsImpostor, function(main, collided) {
    collided.setLinearVelocity(new BABYLON.Vector3(0, 0, player_speed));
  });
  */
  // End of createScene function
  return scene;
};
// @END SCENE OBJECT INSTANTIATION
let scene = createScene();
// UPDATE LOOP
engine.runRenderLoop(function () {
  // Register a render loop to repeatedly render the scene
  let player = scene.meshes[2];
  let ai = scene.meshes[3];
  let puck = scene.meshes[1];
  // Easy in-game reset for debugging
  if(player.position.y < -20 || ai.position.y < -20) { window.location.reload(); }
  
  if(puck.position.y < -20) {
    Puck.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 0)); //stop puck
	puck.position.x = 0;
    puck.position.y = 10; //replace puck  /////MAYBE CONSIDER USING WINDOW.LOCATION.RELOAD() SO PLAYER AND AI ARE ALSO RESET IF PUCK GOES OFF TABLE
    puck.position.z = 0;
  }
  // Check keys
  if (key_D == true) {
    if(player.position.x > (-ground_length / 3) + (player_diameter / 2)){
      player.position.x -= player_speed;
    }
  }
  if (key_S == true) {
    // if(player.position.z < (ground_length / 2) - (player_diameter / 2)){
      player.position.z += player_speed;
    // }
  }
  if (key_A == true) {
    if(player.position.x < (ground_length / 3) - (player_diameter / 2)){
      player.position.x += player_speed;
    }
  }
  if (key_W == true) {
    // if(player.position.z > (player_diameter / 2)){
      player.position.z -= player_speed;
    // }
  }
  if (key_SPACE == true) {
    // if(player.position.z > (player_diameter / 2)){
      player.position.z -= 2 * player_speed;
    // }
  }
  // Display to the screen ~60fps
  scene.render();
});
// @END UPDATE LOOP
//########################
//   G A M E   E N D  :(
//########################
