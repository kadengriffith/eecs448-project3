// filename    : main.js
// description : Main game loop
// last update : 10 21 2017

//########################
//  G A M E   S T A R T
//########################
// INITIAL SETTINGS
let player_height = 1;
let player_diameter = 5;
let player_yoff = player_height / 2;
let player_polygons = 50;
let player_speed = 0.33;
let player_mass = 2000;
let player_friction = 0.002;
let player_restitution = 0.25;

let puck_height = 0.3;
let puck_diameter = 3.25;
let puck_yoff = puck_height / 2;
let puck_polygons = 50;
let puck_mass = 2;
let puck_friction = 0.0001;
let puck_restitution = 0.3;

let ground_length = 80;
let ground_restitution = 1;
let ground_yoff = -0.5;

let playarea_height = 20;
let playarea_yoff = -0.5;
let playarea_restitution = 1;
let showPlayArea = false;

let goal_height = 0.2;
let goal_width = ground_length / 4;

let Puck;
let Player1;
let AI;

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
// @END INITIAL SETTINGS
// CONTEXT & ENGINE
let game = document.getElementById('view_GAME');
// let hud = document.getElementById('view_HUD'); USE THIS LATER
let engine = new BABYLON.Engine(game, true);
// let hud_ctx = hud.getContext("2d"); USE THIS LATER
// @END CONTEXT & ENGINE
// SCENE OBJECT INSTANTIATION
let createScene = function () {
  // Scene Creation
  let scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(240, 240, 240);
  // Information for the physics engine
  let gravityVector = new BABYLON.Vector3(0,-9.81, 0);
  let physicsPlugin = new BABYLON.CannonJSPlugin();
  // This creates a light, aiming 0,1,0 - to the sky
  let Light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
  Light.intensity = 0.8;
  // This creates the play area
  let Ground = BABYLON.Mesh.CreateBox("ground", ground_length, scene);
  Ground.position.y = ground_yoff;
  Ground.scaling.y = 0.01;
  // This creates the puck
  Puck = BABYLON.Mesh.CreateCylinder("puck", puck_height, puck_diameter, puck_diameter, puck_polygons, 1, scene);
  Puck.position = new BABYLON.Vector3(0, puck_yoff + 10, 0);
  // Set the puck to be on the green
  let Puck_material = new BABYLON.StandardMaterial("green", scene);
  Puck_material.diffuseColor = new BABYLON.Color3(0.5, 1.0, 0.5);
  Puck.material = Puck_material;
  // This creates the controlled object
  Player1 = BABYLON.Mesh.CreateCylinder("player1", player_height, player_diameter, player_diameter, player_polygons, 1, scene);
  Player1.position = new BABYLON.Vector3(0, player_yoff, (ground_length / 2) - player_diameter);
  // Set the player to be on the red team
  let Player1_material = new BABYLON.StandardMaterial("red", scene);
  Player1_material.diffuseColor = new BABYLON.Color3(1.0, 0, 0);
  Player1.material = Player1_material;
  // This creates the opposing player
  AI = BABYLON.Mesh.CreateCylinder("ai", player_height, player_diameter, player_diameter, player_polygons, 1, scene);
  AI.position = new BABYLON.Vector3(0, player_yoff, (-ground_length / 2) + player_diameter);
  // Set the player to be on the blue team
  let AI_material = new BABYLON.StandardMaterial("blue", scene);
  AI_material.diffuseColor = new BABYLON.Color3(0, 0, 1.0);
  AI.material = AI_material;
  // This creates the boundaries of our play area but something is wrong
  // Appears as RIGHT bounded box
  let S1 = BABYLON.MeshBuilder.CreatePlane("side1", playarea_height, scene, false, BABYLON.Mesh.DEFAULTSIDE);
  S1.position.x = (-ground_length / 3);
  S1.position.y = playarea_yoff + (playarea_height / 2);
  S1.scaling = new BABYLON.Vector3(ground_length, playarea_height, ground_length);
  S1.rotation.y = Math.PI / 2;
  // Use this to view the boundaries
  if(showPlayArea) { S1.visibility = 0.5; S1.showBoundingBox = true; } else { S1.visibility = 0; }
  let S1_material = new BABYLON.StandardMaterial("white", scene);
  S1.material = S1_material;
  // Appears as LEFT bounded box
  let S2 = BABYLON.MeshBuilder.CreatePlane("side2", playarea_height, scene, false, BABYLON.Mesh.DEFAULTSIDE);
  S2.position.x = ground_length / 3;
  S2.position.y = playarea_yoff + (playarea_height / 2);
  S2.scaling = new BABYLON.Vector3(ground_length, playarea_height, ground_length);
  S2.rotation.y = Math.PI / 2;
  // Use this to view the boundaries
  if(showPlayArea) { S2.visibility = 0.5; S2.showBoundingBox = true; } else { S2.visibility = 0; }
  let S2_material = new BABYLON.StandardMaterial("white", scene);
  S2.material = S2_material;
  // Appears as BACK LEFT bounded box
  let S3 = BABYLON.MeshBuilder.CreatePlane("side3", playarea_height, scene, false, BABYLON.Mesh.DEFAULTSIDE);
  S3.position.z = (-ground_length / 2);
  S3.position.y = playarea_yoff + (playarea_height / 2);
  S3.position.x = ground_length / 2 - goal_width / 2;
  S3.scaling = new BABYLON.Vector3(ground_length / 2.2,  playarea_height, 0);
  // Use this to view the boundaries
  if(showPlayArea) { S3.visibility = 0.5; S3.showBoundingBox = true; } else { S3.visibility = 0; }
  let S3_material = new BABYLON.StandardMaterial("white", scene);
  S3.material = S3_material;
  // Appears as CLOSEST LEFT bounded box
  let S4 = BABYLON.MeshBuilder.CreatePlane("side4", playarea_height, scene, false, BABYLON.Mesh.DEFAULTSIDE);
  S4.position.z = ground_length / 2;
  S4.position.y = playarea_yoff + (playarea_height / 2);
  S4.position.x = ground_length / 2 - goal_width / 2;
  S4.scaling = new BABYLON.Vector3(ground_length / 2.2,  playarea_height, 0);
  // Use this to view the boundaries
  if(showPlayArea) { S4.visibility = 0.5; S4.showBoundingBox = true; } else { S4.visibility = 0; }
  let S4_material = new BABYLON.StandardMaterial("white", scene);
  S4.material = S4_material;
  // Appears as BACK CENTER bounded box
  let S5 = BABYLON.MeshBuilder.CreatePlane("side5", playarea_height, scene, false, BABYLON.Mesh.DEFAULTSIDE);
  S5.position.z = (-ground_length / 2);
  S5.position.y = goal_height + (playarea_height / 2);
  S5.scaling = new BABYLON.Vector3(2 * (ground_length / 3), playarea_height - goal_height, 0);
  // Use this to view the boundaries
  if(showPlayArea) { S5.visibility = 0.5; S5.showBoundingBox = true; } else { S5.visibility = 0; }
  let S5_material = new BABYLON.StandardMaterial("white", scene);
  S5.material = S5_material;
  // Appears as CLOSEST CENTER bounded box
  let S6 = BABYLON.MeshBuilder.CreatePlane("side6", playarea_height, scene, false, BABYLON.Mesh.DEFAULTSIDE);
  S6.position.z = ground_length / 2;
  S6.position.y = goal_height + (playarea_height / 2);
  S6.scaling = new BABYLON.Vector3(2 * (ground_length / 3), playarea_height - goal_height, 0);
  // Use this to view the boundaries
  if(showPlayArea) { S6.visibility = 0.5; S6.showBoundingBox = true; } else { S6.visibility = 0; }
  let S6_material = new BABYLON.StandardMaterial("white", scene);
  S6.material = S6_material;
  // Appears as BACK RIGHT bounded box
  let S7 = BABYLON.MeshBuilder.CreatePlane("side7", playarea_height, scene, false, BABYLON.Mesh.DEFAULTSIDE);
  S7.position.z = (-ground_length / 2);
  S7.position.y = playarea_yoff + (playarea_height / 2);
  S7.position.x = -(ground_length / 2 - goal_width / 2);
  S7.scaling = new BABYLON.Vector3(ground_length / 2.2,  playarea_height, 0);
  // Use this to view the boundaries
  if(showPlayArea) { S7.visibility = 0.5; S7.showBoundingBox = true; } else { S7.visibility = 0; }
  let S7_material = new BABYLON.StandardMaterial("white", scene);
  S7.material = S7_material;
  // Appears as CLOSEST RIGHT bounded box
  let S8 = BABYLON.MeshBuilder.CreatePlane("side7", playarea_height, scene, false, BABYLON.Mesh.DEFAULTSIDE);
  S8.position.z = ground_length / 2;
  S8.position.y = playarea_yoff + (playarea_height / 2);
  S8.position.x = -(ground_length / 2 - goal_width / 2);
  S8.scaling = new BABYLON.Vector3(ground_length / 2.2,  playarea_height, 0);
  // Use this to view the boundaries
  if(showPlayArea) { S8.visibility = 0.5; S8.showBoundingBox = true; } else { S8.visibility = 0; }
  let S8_material = new BABYLON.StandardMaterial("white", scene);
  S8.material = S8_material;
  // This creates and positions a follow camera
  let Camera = new BABYLON.FollowCamera("camera1", Player1.position, scene);
  Camera.applyGravity = true;
  Camera.checkCollisions = true;
  Camera.rotationOffset = 0;
  Camera.lockedTarget = Player1;
  // Setting Physics
  scene.activeCamera = Camera;
  // scene.activeCamera.attachControl(game);
  scene.enablePhysics(gravityVector, physicsPlugin);
  // Imposters for Babylon/Cannon's calculations
  Ground.physicsImpostor = new BABYLON.PhysicsImpostor(Ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: ground_restitution }, scene);
  S1.physicsImpostor = new BABYLON.PhysicsImpostor(S1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: playarea_restitution }, scene);
  S2.physicsImpostor = new BABYLON.PhysicsImpostor(S2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: playarea_restitution }, scene);
  S3.physicsImpostor = new BABYLON.PhysicsImpostor(S3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: playarea_restitution }, scene);
  S4.physicsImpostor = new BABYLON.PhysicsImpostor(S4, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: playarea_restitution }, scene);
  S5.physicsImpostor = new BABYLON.PhysicsImpostor(S5, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: playarea_restitution }, scene);
  S6.physicsImpostor = new BABYLON.PhysicsImpostor(S6, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: playarea_restitution }, scene);
  S7.physicsImpostor = new BABYLON.PhysicsImpostor(S7, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: playarea_restitution }, scene);
  S8.physicsImpostor = new BABYLON.PhysicsImpostor(S8, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: playarea_restitution }, scene);
  // Player object imposters
  Player1.physicsImpostor = new BABYLON.PhysicsImpostor(Player1, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: player_mass, friction: player_friction, restitution: player_restitution }, scene);
  AI.physicsImpostor = new BABYLON.PhysicsImpostor(AI, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: player_mass, friction: player_friction, restitution: player_restitution }, scene);
  Puck.physicsImpostor = new BABYLON.PhysicsImpostor(Puck, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: puck_mass, friction: puck_friction, restitution: puck_restitution }, scene);
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
  // Easy in-game reset for debugging
  if(Player1.position.y < -20 || AI.position.y < -20) { window.location.reload(); }
  if(Puck.position.y < -20) {
    Puck.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 0)); // Stop puck
	  Puck.position.x = 0;
    Puck.position.y = 10;
    Puck.position.z = 0;
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
    Player1.position.z -= 1.6 * player_speed;
  }
  // Display to the screen ~60fps
  scene.render();
});
// @END UPDATE LOOP
//########################
//  G A M E   E N D  :(
//########################
