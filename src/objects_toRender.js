// filename    : objects_toRender.js
// description : Helper functions to keep main.js less cluttered
// last update : 10 23 2017
function gameObjects() {
  let Puck;
  let Player1;
  let AI;
  let S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, Ground, Top;
  let Light;
  // Player
  let player_height = 1;
  let player_diameter = 5;
  let player_yoff = player_height / 2;
  let player_polygons = 50;
  let player_speed = 0.33;
  let ai_speed = 0.33;
  let player_mass = 2000;
  let player_friction = 0.002;
  let player_restitution = 0.25;
  // Puck
  let puck_height = 0.3;
  let puck_diameter = 3.25;
  let puck_yoff = puck_height / 2;
  let puck_polygons = 50;
  let puck_mass = 4;
  let puck_friction = 0.0001;
  let puck_restitution = 0.3;
  // Ground
  let ground_length = 80;
  let ground_restitution = 1;
  let ground_yoff = -0.5;
  // Walls
  let playarea_height = 25;
  let playarea_yoff = -0.5;
  let playarea_restitution = 1;
  // Goal
  let goal_height = 0.16; // ~Half puck_height
  let goal_width = ground_length / 3;
  // Scores
  let score_blue = 0;
  let score_red = 0;
}
// Used in scene creation
function loadGameObjects(scene) {
  // This creates a light, aiming 0,1,0 - to the sky
  Light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
  Light.intensity = 0.9;
  // This creates the play area
  Ground = BABYLON.Mesh.CreateBox("ground", ground_length, scene);
  Ground.position.y = ground_yoff;
  Ground.scaling.y = 0.01;
  loadMaterial(Ground, "ground", true, [0.7, 0.7, 0.7], scene);
  // This creates the top of the play area
  Top = BABYLON.Mesh.CreateBox("top", ground_length, scene);
  Top.position.y = playarea_height + ground_yoff;
  Top.scaling.y = 0.01;
  loadMaterial(Top, "top", true, [0.7, 0.7, 0.7], scene);
  // This creates the puck
  Puck = BABYLON.Mesh.CreateCylinder("puck", puck_height, puck_diameter, puck_diameter, puck_polygons, 1, scene);
  Puck.position = new BABYLON.Vector3(0, puck_yoff + 10, 0);
  // Set the puck to be on the green
  loadMaterial(Puck, "puck", false, [0.5, 1.0, 0.5], scene);
  // This creates the controlled object
  Player1 = BABYLON.Mesh.CreateCylinder("player1", player_height, player_diameter, player_diameter, player_polygons, 1, scene);
  Player1.position = new BABYLON.Vector3(0, player_yoff, (ground_length / 2) - player_diameter);
  // Set the player red
  loadMaterial(Player1, "player1", false, [1.0, 0.0, 0.0], scene);
  // This creates the opposing player
  AI = BABYLON.Mesh.CreateCylinder("ai", player_height, player_diameter, player_diameter, player_polygons, 1, scene);
  AI.position = new BABYLON.Vector3(0, player_yoff, (-ground_length / 2) + player_diameter);
  // Set the AI blue
  loadMaterial(AI, "ai", false, [0.0, 0.0, 1.0], scene);
  // This creates the boundaries of our play area but something is wrong
  // Appears as RIGHT bounded box
  S1 = BABYLON.MeshBuilder.CreatePlane("side1", playarea_height, scene, false, BABYLON.Mesh.DEFAULTSIDE);
  S1.scaling = new BABYLON.Vector3(ground_length, playarea_height, ground_length);
  S1.rotation.y = Math.PI / 2;
  S1.position.x = (-ground_length / 3);
  S1.position.y = playarea_yoff + (playarea_height / 2);
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S1.visibility = 0.5; S1.showBoundingBox = true; } else { S1.visibility = 0; }
  loadMaterial(S1, "side1", false, [1.0, 1.0, 1.0], scene);
  // Appears as LEFT bounded box
  S2 = BABYLON.MeshBuilder.CreatePlane("side2", playarea_height, scene, false, BABYLON.Mesh.DEFAULTSIDE);
  S2.scaling = new BABYLON.Vector3(ground_length, playarea_height, ground_length);
  S2.rotation.y = Math.PI / 2;
  S2.position.x = ground_length / 3;
  S2.position.y = playarea_yoff + (playarea_height / 2);
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S2.visibility = 0.5; S2.showBoundingBox = true; } else { S2.visibility = 0; }
  loadMaterial(S2, "side2", false, [1.0, 1.0, 1.0], scene);
  // Appears as BACK LEFT bounded box
  S3 = BABYLON.MeshBuilder.CreatePlane("side3", playarea_height, scene, false, BABYLON.Mesh.DEFAULTSIDE);
  S3.scaling = new BABYLON.Vector3(goal_width,  playarea_height, 0);
  S3.position.x = goal_width;
  S3.position.z = (-ground_length / 2);
  S3.position.y = playarea_yoff + (playarea_height / 2);
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S3.visibility = 0.5; S3.showBoundingBox = true; } else { S3.visibility = 0; }
  loadMaterial(S3, "side3", false, [1.0, 1.0, 1.0], scene);
  // Appears as CLOSEST LEFT bounded box
  S4 = BABYLON.MeshBuilder.CreatePlane("side4", playarea_height, scene, false, BABYLON.Mesh.DEFAULTSIDE);
  S4.scaling = new BABYLON.Vector3(goal_width,  playarea_height, 0);
  S4.position.x = goal_width;
  S4.position.z = ground_length / 2;
  S4.position.y = playarea_yoff + (playarea_height / 2);
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S4.visibility = 0.5; S4.showBoundingBox = true; } else { S4.visibility = 0; }
  loadMaterial(S4, "side4", false, [1.0, 1.0, 1.0], scene);
  // Appears as BACK CENTER bounded box
  S5 = BABYLON.MeshBuilder.CreatePlane("side5", playarea_height, scene, false, BABYLON.Mesh.DEFAULTSIDE);
  S5.scaling = new BABYLON.Vector3(goal_width, playarea_height - goal_height, 0);
  S5.position.z = (-ground_length / 2);
  S5.position.y = goal_height + (playarea_height / 2);
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S5.visibility = 0.5; S5.showBoundingBox = true; } else { S5.visibility = 0; }
  loadMaterial(S5, "side5", false, [1.0, 1.0, 1.0], scene);
  // Appears as CLOSEST CENTER bounded box
  S6 = BABYLON.MeshBuilder.CreatePlane("side6", playarea_height, scene, false, BABYLON.Mesh.DEFAULTSIDE);
  S6.scaling = new BABYLON.Vector3(goal_width, playarea_height - goal_height, 0);
  S6.position.z = ground_length / 2;
  S6.position.y = goal_height + (playarea_height / 2);
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S6.visibility = 0.5; S6.showBoundingBox = true; } else { S6.visibility = 0; }
  loadMaterial(S6, "side6", false, [1.0, 1.0, 1.0], scene);
  // Appears as BACK RIGHT bounded box
  S7 = BABYLON.MeshBuilder.CreatePlane("side7", playarea_height, scene, false, BABYLON.Mesh.DEFAULTSIDE);
  S7.scaling = new BABYLON.Vector3(goal_width,  playarea_height, 0);
  S7.position.x = -(goal_width);
  S7.position.z = (-ground_length / 2);
  S7.position.y = playarea_yoff + (playarea_height / 2);
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S7.visibility = 0.5; S7.showBoundingBox = true; } else { S7.visibility = 0; }
  loadMaterial(S7, "side7", false, [1.0, 1.0, 1.0], scene);
  // Appears as CLOSEST RIGHT bounded box
  S8 = BABYLON.MeshBuilder.CreatePlane("side8", playarea_height, scene, false, BABYLON.Mesh.DEFAULTSIDE);
  S8.scaling = new BABYLON.Vector3(goal_width,  playarea_height, 0);
  S8.position.x = -(goal_width);
  S8.position.z = ground_length / 2;
  S8.position.y = playarea_yoff + (playarea_height / 2);
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S8.visibility = 0.5; S8.showBoundingBox = true; } else { S8.visibility = 0; }
  loadMaterial(S8, "side8", false, [1.0, 1.0, 1.0], scene);
  // Appears as FAR RIGHT bounded box
  S9 = BABYLON.MeshBuilder.CreatePlane("side9", playarea_height, scene, false, BABYLON.Mesh.DEFAULTSIDE);
  S9.scaling = new BABYLON.Vector3(ground_length, playarea_height, ground_length);
  S9.rotation.y = Math.PI / 2;
  S9.position.x = -(ground_length / 2);
  S9.position.y = playarea_yoff + (playarea_height / 2);
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S9.visibility = 0.5; S9.showBoundingBox = true; } else { S9.visibility = 0; }
  loadMaterial(S9, "side9", false, [1.0, 1.0, 1.0], scene);
  // Appears as FAR LEFT bounded box
  S10 = BABYLON.MeshBuilder.CreatePlane("side10", playarea_height, scene, false, BABYLON.Mesh.DEFAULTSIDE);
  S10.scaling = new BABYLON.Vector3(ground_length, playarea_height, ground_length);
  S10.rotation.y = Math.PI / 2;
  S10.position.x = ground_length / 2;
  S10.position.y = playarea_yoff + (playarea_height / 2);
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S10.visibility = 0.5; S10.showBoundingBox = true; } else { S10.visibility = 0; }
  loadMaterial(S10, "side10", false, [1.0, 1.0, 1.0], scene);
  // This creates and positions a follow camera
  Camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", Math.PI / 2, Math.PI / 2.5, 18, new BABYLON.Vector3(0, 0, 0), scene);
  Camera.applyGravity = true;
  Camera.checkCollisions = true;
  Camera.rotationOffset = 0;
  Camera.lockedTarget = Player1;
  // Setting Camera
  scene.activeCamera = Camera;
}
// Used in scene creation
function loadGameImposters(scene) {
  // Imposters for Babylon/Cannon's calculations
  Ground.physicsImpostor = new BABYLON.PhysicsImpostor(Ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: ground_restitution }, scene);
  Top.physicsImpostor = new BABYLON.PhysicsImpostor(Top, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: ground_restitution }, scene);
  S1.physicsImpostor = new BABYLON.PhysicsImpostor(S1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: playarea_restitution }, scene);
  S2.physicsImpostor = new BABYLON.PhysicsImpostor(S2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: playarea_restitution }, scene);
  S3.physicsImpostor = new BABYLON.PhysicsImpostor(S3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: playarea_restitution }, scene);
  S4.physicsImpostor = new BABYLON.PhysicsImpostor(S4, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: playarea_restitution }, scene);
  S5.physicsImpostor = new BABYLON.PhysicsImpostor(S5, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: playarea_restitution }, scene);
  S6.physicsImpostor = new BABYLON.PhysicsImpostor(S6, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: playarea_restitution }, scene);
  S7.physicsImpostor = new BABYLON.PhysicsImpostor(S7, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: playarea_restitution }, scene);
  S8.physicsImpostor = new BABYLON.PhysicsImpostor(S8, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: playarea_restitution }, scene);
  S9.physicsImpostor = new BABYLON.PhysicsImpostor(S9, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: playarea_restitution }, scene);
  S10.physicsImpostor = new BABYLON.PhysicsImpostor(S10, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: playarea_restitution }, scene);
  // Player object imposters
  Player1.physicsImpostor = new BABYLON.PhysicsImpostor(Player1, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: player_mass, friction: player_friction, restitution: player_restitution }, scene);
  AI.physicsImpostor = new BABYLON.PhysicsImpostor(AI, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: player_mass, friction: player_friction, restitution: player_restitution }, scene);
  Puck.physicsImpostor = new BABYLON.PhysicsImpostor(Puck, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: puck_mass, friction: puck_friction, restitution: puck_restitution }, scene);
}
// Used in scene creation
function loadMaterial(object, textureid, texture /*Boolean*/, default_color, scene) {
  let _material = new BABYLON.StandardMaterial("texture_" + textureid, scene);
  if(texture && loadTextures) {
    _material.diffuseTexture = new BABYLON.Texture("textures/texture_" + textureid + ".png", scene);
  }else {
    _material.diffuseColor = new BABYLON.Color3(default_color[0], default_color[1], default_color[2]);
  }
  object.material = _material;
}
