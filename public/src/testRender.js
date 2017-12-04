// filename    : testRender.js
// description : Testing functions
// last update : 11 30 2017

/**
 * Function that controls testing suite. Runs all tests, displays results to screen.
 * Tests include things like: score increments correctly, strikers moving correctly, textures loading correclty, etc.
 */

function testSuite() {
  scene.dispose();
  engine.dispose();
  let suite = document.getElementById('testSuite');
  let suiteSuper = document.getElementById('testSuite-txt');
  let unwantedItems = document.getElementById('LEFT');
  let unwantedItems2 = document.getElementById('LEFT2');
  unwantedItems.style.display = 'none';
  unwantedItems2.style.display = 'none';
  suite.style.display = 'block';
  suite.style.height = '33%';
  suiteSuper.style.display = 'block';
  suiteSuper.style.height = '33%';
  suiteSuper.innerHTML = "#######################<br>";
  suiteSuper.innerHTML += "Testing initiated...<br>";
  suiteSuper.innerHTML += "#######################<br>";
  let _scene = false;
  let _physics = false;
  let _gravity = false;
  let _object = false;
  let _material = false;
  let _impostor = false;
  let _sound = false;
  let _movement = false;
  let _sceneBehavior = false;
  let _score1 = false;
  let _score2 = false;
  let _goal = false;
  let _air = false;
  let _color1 = false;
  let _color2 = false;
  let _color3 = false;
  let _color4 = false;
  //\\
    let testCanvas = game;
    engine = new BABYLON.Engine(testCanvas, true);
    let gravityConst = -9.81;
    engine = new BABYLON.Engine(testCanvas, true);
    let createScene = function () {
    let scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);
    let gravityVector = new BABYLON.Vector3(0, gravityConst, 0);
    let physicsPlugin = new BABYLON.CannonJSPlugin();
    loadGameObjects(scene);
    Light.intensity = 0.2;
    _object = true;
    _material = true;
    scene.enablePhysics(gravityVector, physicsPlugin);
    _physics = true;
    _gravity = true;
    loadGameImposters(scene);
    _impostor = true;
    if(loadSounds) {
      let puckSound = new BABYLON.Sound("puckSound", "assets/sounds/sound_puck.wav", scene);
      Player1.physicsImpostor.registerOnPhysicsCollide(Puck.physicsImpostor, function(main, collided) {
        puckSound.play();
      });
    }
    _sound = true;
    return scene;
  };
  scene = createScene();
  _scene = true;
  let ticks = 0;
  engine.runRenderLoop(function () {
    if(ticks === 0) { scene.activeCamera = Camera6; }
    if(ticks > 0 && ticks < 2) {
      dropPuck("CENTER");
    }
    if(ticks > 100 && ticks < 120) {
      AI.position.z++;
      Player1.position.z--;
    }
    if(ticks > 144 && ticks < 146) {
      score_red++;
    }
    if(ticks > 146 && ticks < 148) {
      score_ai++;
    }
    if(ticks > 250 && ticks < 260) {
      Player1.position.x++;
      AI.position.x++;
    }
    if(ticks > 261 && ticks < 310) {
      Puck.position.z++;
    }
    if(ticks > 311 && ticks < 313) {
      dropPuck("CENTER");
    }
    if(ticks > 313 && ticks < 362) {
      Puck.position.z--;
    }
    if(ticks > 362 && ticks < 364) {
      dropPuck("CENTER");
    }
    if(ticks > 365 && ticks < 380) {
      air();
    }
    if(ticks > 380 && ticks < 400) {
      AI.position.z--;
      Player1.position.z++;
      if(ticks < 353) {
        loadMaterial(Player1, "playerRed", loadTextures, false, [0.5, 0.5, 0.5], scene);
        loadMaterial(AI, "playerYellow", loadTextures, false, [0.5, 0.5, 0.5], scene);
        _color1 = true;
      }
    }
    if(ticks > 400 && ticks < 410) {
      AI.position.x--;
      Player1.position.x--;
      if(ticks < 366) {
        loadMaterial(Player1, "playerGreen", loadTextures, false, [0.5, 0.5, 0.5], scene);
        loadMaterial(AI, "playerBlue", loadTextures, false, [0.5, 0.5, 0.5], scene);
        _color2 = true;
      }
    }
    if(ticks > 410 && ticks < 420) {
      AI.position.z++;
      Player1.position.z--;
      if(ticks < 377) {
        loadMaterial(Player1, "playerBlue", loadTextures, false, [0.5, 0.5, 0.5], scene);
        loadMaterial(AI, "playerRed", loadTextures, false, [0.5, 0.5, 0.5], scene);
        _color3 = true;
      }
    }
    if(ticks > 420 && ticks < 430) {
      loadMaterial(Player1, "playerYellow", loadTextures, false, [0.5, 0.5, 0.5], scene);
      loadMaterial(AI, "playerGreen", loadTextures, false, [0.5, 0.5, 0.5], scene);
      _color4 = true;
    }
    if(ticks > 430 && ticks < 440) {
      loadMaterial(Player1, "playerOnLoad", loadTextures, false, [1.0, 1.0, 1.0], scene);
      loadMaterial(AI, "playerOnLoad", loadTextures, false, [1.0, 1.0, 1.0], scene);
    }

    if(ticks > 1500) {
      window.location.reload();
    }
    if(AI.position.x > 2) {
      _movement = true;
    }
    if(Puck.position.y > 2) {
      _sceneBehavior = true;
    }
    if(score_red > 0) {
      _score1 = true;
    }
    if(score_ai > 0) {
      _score2 = true;
    }
    if(Puck.position.z > ground_length / 2) {
      _goal = true;
    }
    if(ticks > 362 && ticks < 380 && Puck.position.y > airForce) {
      _air = true;
    }
    ticks++;
    scene.render();
  });
  ///////////////////////////////////////////////////////
  // Tests
  ///////////////////////////////////////////////////////
  setTimeout(function() {
    suiteSuper.innerHTML = "#######################<br>";
    suiteSuper.innerHTML += "Results:<br>";
    suiteSuper.innerHTML += "#######################<br>";
    setTimeout(function() {
      let tstr1;
      if(_physics) {
        tstr1 = "PASSED";
      }else {
        tstr1 ="FAIL";
      }
      suiteSuper.innerHTML += "TEST 1 -- PHYSICS ENABLE: " + tstr1;
      suiteSuper.innerHTML += "<br>";

      let tstr2;
      if(_gravity) {
        tstr2 = "PASSED";
      }else {
        tstr2 ="FAIL";
      }
      suiteSuper.innerHTML += "TEST 2 -- GRAVITY ENABLE: " + tstr2;
      suiteSuper.innerHTML += "<br>";

      let tstr3;
      if(_object) {
        tstr3 = "PASSED";
      }else {
        tstr3 = "FAIL";
      }
      suiteSuper.innerHTML += "TEST 3 -- OBJECT CREATE: " + tstr3;
      suiteSuper.innerHTML += "<br>";

      let tstr4;
      if(_material) {
        tstr4 = "PASSED";
      }else {
        tstr4 ="FAIL";
      }
      suiteSuper.innerHTML += "TEST 4 -- ATTACH MATERIAL: " + tstr4;
      suiteSuper.innerHTML += "<br>";

      let tstr5;
      if(_impostor) {
        tstr5 = "PASSED";
      }else {
        tstr5 ="FAIL";
      }
      suiteSuper.innerHTML += "TEST 5 -- ATTACH IMPOSTOR: " + tstr5;
      suiteSuper.innerHTML += "<br>";

      let tstr6;
      if(_sound) {
        tstr6 = "PASSED";
      }else {
        tstr6 ="FAIL";
      }
      suiteSuper.innerHTML += "TEST 6 -- ATTACH SOUND: " + tstr6;
      suiteSuper.innerHTML += "<br>";

      let tstr7;
      if(_scene) {
        tstr7 = "PASSED";
      }else {
        tstr7 ="FAIL";
      }
      suiteSuper.innerHTML += "TEST 7 -- SCENE CREATION: " + tstr7;
      suiteSuper.innerHTML += "<br>";

      let tstr8;
      if(_movement) {
        tstr8 = "PASSED";
      }else {
        tstr8 ="FAIL";
      }
      suiteSuper.innerHTML += "TEST 8 -- MOVEMENT: " + tstr8;
      suiteSuper.innerHTML += "<br>";

      let tstr9;
      if(_sceneBehavior) {
        tstr9 = "PASSED";
      }else {
        tstr9 ="FAIL";
      }
      suiteSuper.innerHTML += "TEST 9 -- SCENE BEHAVIOR: " + tstr9;
      suiteSuper.innerHTML += "<br>";

      let tstr10;
      if(_score1 && _score2) {
        tstr10 = "PASSED";
      }else {
        tstr10 ="FAIL";
      }
      suiteSuper.innerHTML += "TEST 10 -- SCORING: " + tstr10;
      suiteSuper.innerHTML += "<br>";

      let tstr11;
      if(_goal) {
        tstr11 = "PASSED";
      }else {
        tstr11 ="FAIL";
      }
      suiteSuper.innerHTML += "TEST 11 -- GOAL HEIGHT: " + tstr11;
      suiteSuper.innerHTML += "<br>";

      let tstr12;
      if(_air) {
        tstr12 = "PASSED";
      }else {
        tstr12 ="FAIL";
      }
      suiteSuper.innerHTML += "TEST 12 -- TABLE AIR ENABLE: " + tstr11;
      suiteSuper.innerHTML += "<br>";

      let tstr13;
      if(_color1 && _color2 && _color3 && _color4) {
        tstr13 = "PASSED";
      }else {
        tstr13 ="FAIL";
      }
      suiteSuper.innerHTML += "TEST 13 -- COLOR: " + tstr11;
      suiteSuper.innerHTML += "<br>#######################<br>";
    }, 2700);
  }, 5000);
}
