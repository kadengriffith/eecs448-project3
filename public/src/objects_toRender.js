// filename    : objects_toRender.js
// description : Helper functions to keep main.js less cluttered
// last update : 11 27 2017
//
let Puck, Player1, AI;
let _color; // Used to load textures
let S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16, Ground, /* Ground2, */ Top;
let Light;
let Camera1, Camera2, Camera3, Camera4, Camera5;
// Player
let player_height = 1;
let player_diameter = 5.5;
let player_yoff = player_height / 2;
let player_polygons = 50;
let player_speed = 0.22;
let ai_speed = 0.22;
let player_mass = 2600;
let player_friction = 0.008;
let player_restitution = 0;
// Puck
let puck_height = 0.3;
let puck_diameter = 3.2;
let puck_yoff = puck_height / 2;
let puck_polygons = 50;
let puck_mass = 6.33;
let puck_friction = 0;
let puck_restitution = 0.95;
// Ground
let ground_length = 80;
let ground_restitution = 0;
let ground_yoff = -0.5;
// Walls
let playarea_height = 2;
let boundary_height = 25;
let playarea_yoff = 0.5;
let playarea_restitution = 1;
let playarea_localOpacity = 0.95;
// Goal
let goal_height = 2.5;
let goal_width = ground_length / 3;
// Scores
let score_ai = 0;
let score_red = 0;
//
// Used in scene creation
/**
 * Gives each shape and surface is appropriate size, color, position. Controls lighting and camera placement.
 * @param {scene} scene scene object containing all gameplay elements
 */
function loadGameObjects(scene) {
  let puck_skin = "puck"; // Now we can dynamically load textures to fit themes
  // This creates a light
  Light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
  Light.intensity = 0.9;
  // This creates the play area
  Ground = BABYLON.Mesh.CreateBox("ground", 2 * goal_width + 0.1, scene);
  Ground.position.y = ground_yoff;
  Ground.scaling.z = 1.5;
  Ground.scaling.y = 0.01;
  loadMaterial(Ground, "ground", loadTextures, false, [0.7, 0.7, 0.7], scene);
  // This creates the top of the play area
  Top = BABYLON.Mesh.CreateBox("top", 2 * goal_width, scene);
  Top.position.y = boundary_height;
  Top.scaling.z = 1.5;
  Top.scaling.y = 0.01;
  loadMaterial(Top, "top", false, false, [0.7, 0.7, 0.7], scene);
  Top.visibility = 0;
  // This creates the puck
  Puck = BABYLON.Mesh.CreateCylinder("puck", puck_height, puck_diameter, puck_diameter, puck_polygons, 1, scene);
  Puck.position = new BABYLON.Vector3(0, puck_yoff + 10, 0);
  // Set the puck material
  loadMaterial(Puck, puck_skin, loadTextures, false, [1.0, 1.0, 1.0], scene);
  // This creates the controlled object
  Player1 = BABYLON.Mesh.CreateCylinder("player1", player_height, player_diameter, player_diameter, player_polygons, 1, scene);
  Player1.position = new BABYLON.Vector3(0, player_yoff, (ground_length / 2) - player_diameter);
  // Set the player material
  loadMaterial(Player1, "playerOnLoad", loadTextures, false, [1.0, 1.0, 1.0], scene);
  // This creates the opposing player
  AI = BABYLON.Mesh.CreateCylinder("ai", player_height, player_diameter, player_diameter, player_polygons, 1, scene);
  AI.position = new BABYLON.Vector3(0, player_yoff, (-ground_length / 2) + player_diameter);
  // Set the AI material
  loadMaterial(AI, "ai", loadTextures, false, [0.4, 0.4, 0.4], scene);
  // Appears as RIGHT LOW bounded box
  S1 = BABYLON.Mesh.CreateBox("side1", playarea_height, scene);
  S1.scaling = new BABYLON.Vector3(ground_length / 2, playarea_height, 0.005);
  S1.rotation.y = (-Math.PI / 2);
  S1.position.x = (-ground_length / 3);
  S1.position.y = playarea_yoff + (playarea_height / 2);
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S1.showBoundingBox = true; } else {
    loadMaterial(S1, "sides", loadTextures, loadTextures, [0, 0, 0], scene);
  }
  // Appears as LEFT LOW bounded box
  S2 = BABYLON.Mesh.CreateBox("side2", playarea_height, scene);
  S2.scaling = new BABYLON.Vector3(ground_length / 2, playarea_height, 0.005);
  S2.rotation.y = Math.PI / 2;
  S2.position.x = ground_length / 3;
  S2.position.y = playarea_yoff + (playarea_height / 2);
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S2.showBoundingBox = true; } else {
    loadMaterial(S2, "sides", loadTextures, loadTextures, [1.0, 1.0, 1.0], scene);
  }
  // Appears as BACK LEFT LOW bounded box
  S3 = BABYLON.Mesh.CreateBox("side3", playarea_height, scene);
  S3.scaling = new BABYLON.Vector3(goal_width / 4,  playarea_height, 0.005);
  S3.position.x = goal_width / 2 + goal_width / 4;
  S3.position.z = (-ground_length / 2);
  S3.position.y = playarea_yoff + (playarea_height / 2);
  S3.rotation.y = Math.PI;
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S3.showBoundingBox = true; } else {
    loadMaterial(S3, "goalLeft", loadTextures, loadTextures, [1.0, 1.0, 1.0], scene);
  }
  // Appears as CLOSEST LEFT LOW bounded box
  S4 = BABYLON.Mesh.CreateBox("side4", playarea_height, scene);
  S4.scaling = new BABYLON.Vector3(goal_width / 4,  playarea_height, 0.005);
  S4.position.x = goal_width / 2 + goal_width / 4;
  S4.position.z = ground_length / 2;
  S4.position.y = playarea_yoff + (playarea_height / 2);
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S4.showBoundingBox = true; } else {
    loadMaterial(S4, "goalLeft", loadTextures, loadTextures, [1.0, 1.0, 1.0], scene);
    S4.material.alpha = playarea_localOpacity;
  }
  // Appears as BACK CENTER LOW bounded box
  S5 = BABYLON.Mesh.CreateBox("side5", playarea_height, scene);
  S5.scaling = new BABYLON.Vector3(goal_width / 2, 22 * playarea_height / 32, 0.005);
  S5.position.z = (-ground_length / 2);
  S5.position.y = goal_height - (6 * playarea_height / 32);
  S5.rotation.y = Math.PI;
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S5.showBoundingBox = true; } else {
    loadMaterial(S5, "goals", loadTextures, loadTextures, [0.5, 0.5, 0.5], scene);
  }
  // Appears as CLOSEST CENTER LOW bounded box
  S6 = BABYLON.Mesh.CreateBox("side6", playarea_height, scene);
  S6.scaling = new BABYLON.Vector3(goal_width / 2, 22 * playarea_height / 32, 0.005);
  S6.position.z = ground_length / 2;
  S6.position.y = goal_height - (6 * playarea_height / 32);
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S6.showBoundingBox = true; } else {
    loadMaterial(S6, "goals", loadTextures, loadTextures, [1.0, 1.0, 1.0], scene);
    S6.material.alpha = playarea_localOpacity;
  }
  // Appears as BACK RIGHT LOW bounded box
  S7 = BABYLON.Mesh.CreateBox("side7", playarea_height, scene);
  S7.scaling = new BABYLON.Vector3(goal_width / 4,  playarea_height, 0.005);
  S7.position.x = -(goal_width / 2 + goal_width / 4);
  S7.position.z = (-ground_length / 2);
  S7.position.y = playarea_yoff + (playarea_height / 2);
  S7.rotation.y = Math.PI;
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S7.showBoundingBox = true; } else {
    loadMaterial(S7, "goalRight", loadTextures, loadTextures, [1.0, 1.0, 1.0], scene);
  }
  // Appears as CLOSEST RIGHT LOW bounded box
  S8 = BABYLON.Mesh.CreateBox("side8", playarea_height, scene);
  S8.scaling = new BABYLON.Vector3(goal_width / 4,  playarea_height, 0.005);
  S8.position.x = -(goal_width / 2 + goal_width / 4);
  S8.position.z = ground_length / 2;
  S8.position.y = playarea_yoff + (playarea_height / 2);
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S8.showBoundingBox = true; } else {
    loadMaterial(S8, "goalRight", loadTextures, loadTextures, [1.0, 1.0, 1.0], scene);
    S8.material.alpha = playarea_localOpacity;
  }
  // Appears as RIGHT bounded box
  S9 = BABYLON.Mesh.CreateBox("side9", playarea_height, scene);
  S9.scaling = new BABYLON.Vector3(ground_length / 2, boundary_height / 2, 0.005);
  S9.rotation.y = (-Math.PI / 2);
  S9.position.x = (-ground_length / 3);
  S9.position.y = boundary_height / 2;
  S9.visibility = 0;
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S9.showBoundingBox = true; } else {
    loadMaterial(S9, "sides", false, false, [1.0, 1.0, 1.0], scene);
  }
  // Appears as LEFT bounded box
  S10 = BABYLON.Mesh.CreateBox("side10", playarea_height, scene);
  S10.scaling = new BABYLON.Vector3(ground_length / 2, boundary_height / 2, 0.005);
  S10.rotation.y = Math.PI / 2;
  S10.position.x = ground_length / 3;
  S10.position.y = playarea_yoff + (boundary_height / 2);
  S10.visibility = 0;
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S10.showBoundingBox = true; } else {
    loadMaterial(S10, "sides", false, false, [1.0, 1.0, 1.0], scene);
  }
  // Appears as BACK LEFT bounded box
  S11 = BABYLON.Mesh.CreateBox("side11", playarea_height, scene);
  S11.scaling = new BABYLON.Vector3(goal_width / 4,  boundary_height / 2, 0.005);
  S11.position.x = goal_width / 2 + goal_width / 4;
  S11.position.z = (-ground_length / 2);
  S11.position.y = playarea_yoff + (boundary_height / 2);
  S11.rotation.y = Math.PI;
  S11.visibility = 0;
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S11.showBoundingBox = true; } else {
    loadMaterial(S11, "goalLeft", false, false, [1.0, 1.0, 1.0], scene);
  }
  // Appears as CLOSEST LEFT bounded box
  S12 = BABYLON.Mesh.CreateBox("side12", playarea_height, scene);
  S12.scaling = new BABYLON.Vector3(goal_width / 4,  boundary_height / 2, 0.005);
  S12.position.x = goal_width / 2 + goal_width / 4;
  S12.position.z = ground_length / 2;
  S12.position.y = playarea_yoff + (boundary_height / 2);
  S12.visibility = 0;
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S12.showBoundingBox = true; } else {
    loadMaterial(S12, "goalLeft", false, false, [1.0, 1.0, 1.0], scene);
  }
  // Appears as BACK CENTER bounded box
  S13 = BABYLON.Mesh.CreateBox("side13", playarea_height, scene);
  S13.scaling = new BABYLON.Vector3(goal_width / 2, boundary_height / 2 - goal_height / 4, 0.005);
  S13.position.z = (-ground_length / 2);
  S13.position.y = boundary_height / 2 + goal_height / 4;
  S13.rotation.y = Math.PI;
  S13.visibility = 0;
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S13.showBoundingBox = true; } else {
    loadMaterial(S13, "goals", false, false, [1.0, 1.0, 1.0], scene);
  }
  // Appears as CLOSEST CENTER bounded box
  S14 = BABYLON.Mesh.CreateBox("side14", playarea_height, scene);
  S14.scaling = new BABYLON.Vector3(goal_width / 2, boundary_height / 2 - goal_height / 4, 0.005);
  S14.position.z = ground_length / 2;
  S14.position.y = boundary_height / 2 + goal_height / 4;
  S14.visibility = 0;
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S14.showBoundingBox = true; } else {
    loadMaterial(S14, "goals", false, false, [1.0, 1.0, 1.0], scene);
  }
  // Appears as BACK RIGHT bounded box
  S15 = BABYLON.Mesh.CreateBox("side15", playarea_height, scene);
  S15.scaling = new BABYLON.Vector3(goal_width / 4,  boundary_height / 2, 0.005);
  S15.position.x = -(goal_width / 2 + goal_width / 4);
  S15.position.z = (-ground_length / 2);
  S15.position.y = playarea_yoff + (boundary_height / 2);
  S15.rotation.y = Math.PI;
  S15.visibility = 0;
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S15.showBoundingBox = true; } else {
    loadMaterial(S7, "goalRight", false, false, [1.0, 1.0, 1.0], scene);
  }
  // Appears as CLOSEST RIGHT bounded box
  S16 = BABYLON.Mesh.CreateBox("side16", playarea_height, scene);
  S16.scaling = new BABYLON.Vector3(goal_width / 4,  boundary_height / 2, 0.005);
  S16.position.x = -(goal_width / 2 + goal_width / 4);
  S16.position.z = ground_length / 2;
  S16.position.y = playarea_yoff + (boundary_height / 2);
  S16.visibility = 0;
  // Use showPlayArea to view the boundaries
  if(showPlayArea) { S16.showBoundingBox = true; } else {
    loadMaterial(S16, "goalRight", false, false, [1.0, 1.0, 1.0], scene);
  }
  // This creates and positions a follow camera for the main game
  Camera1 = new BABYLON.ArcRotateCamera("ArcRotateCamera", Math.PI / 2, Math.PI / 2.5, 14, new BABYLON.Vector3(0, 0, 0), scene);
  Camera1.applyGravity = true;
  Camera1.checkCollisions = true;
  Camera1.rotationOffset = 0;
  Camera1.lockedTarget = Player1;
  // This creates and positions a camera for the menu
  Camera2 = new BABYLON.ArcRotateCamera("ArcRotateCamera", Math.PI / 6, Math.PI / 3, 120, new BABYLON.Vector3(0, 0, 0), scene);
  Camera2.rotationOffset = Math.PI / 2;
  Camera2.lockedTarget = new BABYLON.Vector3(0, 0, 0);
  // This creates and positions a camera for the menu
  Camera3 = new BABYLON.ArcRotateCamera("ArcRotateCamera", Math.PI / 6, Math.PI / 6, 14, new BABYLON.Vector3(0, 0, 0), scene);
  Camera3.rotationOffset = -Math.PI / 6;
  Camera3.lockedTarget = Puck;
  // This creates and positions a camera for the menu
  Camera4 = new BABYLON.ArcRotateCamera("ArcRotateCamera", Math.PI / 8, Math.PI / 2.8, 60, new BABYLON.Vector3(0, 0, 0), scene);
  Camera4.rotationOffset = -Math.PI;
  Camera4.lockedTarget = new BABYLON.Vector3(0, 0, 0);
  // This creates and positions a camera for the menu
  Camera5 = new BABYLON.ArcRotateCamera("ArcRotateCamera", Math.PI / 3, Math.PI / 3, 90, new BABYLON.Vector3(0, 0, 0), scene);
  Camera5.lockedTarget = new BABYLON.Vector3(0, 0, 0);
  // Setting game camera
  scene.activeCamera = Camera2;
}
// Used in scene creation
/**
 * Creates hitboxes for each object and wall, enables use of physics engine. Gives puck and players their physical properties
 * @param {scene} scene scene object containing all gameplay elements
 */
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
  S11.physicsImpostor = new BABYLON.PhysicsImpostor(S11, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: playarea_restitution }, scene);
  S12.physicsImpostor = new BABYLON.PhysicsImpostor(S12, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: playarea_restitution }, scene);
  S13.physicsImpostor = new BABYLON.PhysicsImpostor(S13, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: playarea_restitution }, scene);
  S14.physicsImpostor = new BABYLON.PhysicsImpostor(S14, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: playarea_restitution }, scene);
  S15.physicsImpostor = new BABYLON.PhysicsImpostor(S15, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: playarea_restitution }, scene);
  S16.physicsImpostor = new BABYLON.PhysicsImpostor(S16, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: playarea_restitution }, scene);
  // Player object imposters
  Player1.physicsImpostor = new BABYLON.PhysicsImpostor(Player1, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: player_mass, friction: player_friction, restitution: player_restitution }, scene);
  AI.physicsImpostor = new BABYLON.PhysicsImpostor(AI, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: player_mass, friction: player_friction, restitution: player_restitution }, scene);
  Puck.physicsImpostor = new BABYLON.PhysicsImpostor(Puck, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: puck_mass, friction: puck_friction, restitution: puck_restitution }, scene);
}
// Used in scene creation
/**
 * Pulls texture from server, or from parameters, and applies it to specified object
 * @param {mesh} object object to be textured
 * @param {string} textureid name of texture
 * @param {boolean} texture true if texture exists, false if not
 * @param {boolean} hasAlpha true if texture is at all transparent, false if not
 * @param {array} default_color array representing default color info in rgb format
 * @param {scene} scene scene object containing all gameplay elements
 *
 */
function loadMaterial(object /*BABYLON mesh*/, textureid /*title of the texture*/, texture /*Boolean*/, hasAlpha /*Boolean*/, default_color /*Array*/, scene /*BABYLON scene*/) {
  let _material = new BABYLON.StandardMaterial("texture_" + textureid, scene);
  if(texture && loadTextures) {
    _material.diffuseTexture = new BABYLON.Texture("assets/textures/texture_" + textureid + ".png", scene);
    if(hasAlpha) {
    	_material.diffuseTexture.hasAlpha = true;
    	_material.opacityTexture = new BABYLON.Texture("assets/textures/texture_" + textureid + ".png", scene);
    	_material.bumpTexture = new BABYLON.Texture("assets/textures/texture_" + textureid + ".png", scene);
    	_material.ambientColor = new BABYLON.Color3(default_color[0], default_color[1], default_color[2]);
      _material.backFaceCulling = false;
    }else {
    	_material.specularColor = new BABYLON.Color3(default_color[0], default_color[1], default_color[2]);
    }
  }else {
    _material.diffuseColor = new BABYLON.Color3(default_color[0], default_color[1], default_color[2]);
  }
  object.material = _material;
}
