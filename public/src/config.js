// author      : Kaden Griffith
// filename    : config.js
// description : determiner for online/offline play
/*
for server: online(true);
for offline mode: online(false);
*/
let loadTextures;
let loadSounds;
let enableAi;
// Prevents user override in console
let initialLoad = true; // Unless of course you know this variable name...

function online(bool) {
  if(bool && initialLoad) {
    loadTextures = true;
    loadSounds = false;
    enableAi = false;
    initialLoad = false;
  }else {
    if(initialLoad) {
      loadTextures = false;
      loadSounds = false;
      enableAi = true;
      initialLoad = false;
    }
  }
}

online(true); // Adjust modes here
