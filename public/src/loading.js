// author      : Kaden Griffith
// filename    : loading.js
// description : a simple DOM image preloader
if(loadTextures) {
  if(!enableAi) {
    var socket = io.connect();
    socket.on('connect', function() {
    console.log("Connected loading.js");
    });
  }
  let total_number_of_images = 26; // This is a manual setting please verify
  let image_count_verification = 0;
  let loaded = false;
  function preload(arrayOfImages) {
    console.log("Preload started.");
    $(arrayOfImages).each(function(){
      $('<img/>')[0].src = this;
      image_count_verification++;
      document.getElementById('loadingCounter').innerHTML = (image_count_verification / total_number_of_images) * 100 + '%';
    });
    if(image_count_verification === total_number_of_images) {
      console.log("SERVER SAYS: Loaded required assets successfully");
      loaded = true;
      document.getElementById('loadingWrapper').style.display = 'none';
    }
  }
  // All desired preloaded images must be present in this array
  preload([
        'assets/fonts/button_background.png',
        'assets/fonts/button_background_hover.png',
        'assets/fonts/score_points_blue.png',
        'assets/fonts/score_points_green.png',
        'assets/fonts/score_points_red.png',
        'assets/fonts/score_points_yellow.png',
        'assets/fonts/score_time_blue.png',
        'assets/fonts/score_time_green.png',
        'assets/fonts/score_time_red.png',
        'assets/fonts/score_time_yellow.png',
        'assets/fonts/score_title_blue.png',
        'assets/fonts/score_title_green.png',
        'assets/fonts/score_title_red.png',
        'assets/fonts/score_title_yellow.png',

        'assets/textures/texture_ai.png',
        'assets/textures/texture_goalLeft.png',
        'assets/textures/texture_goalRight.png',
        'assets/textures/texture_goals.png',
        'assets/textures/texture_ground.png',
        'assets/textures/texture_playerBlue.png',
        'assets/textures/texture_playerGreen.png',
        'assets/textures/texture_playerOnLoad.png',
        'assets/textures/texture_playerRed.png',
        'assets/textures/texture_playerYellow.png',
        'assets/textures/texture_puck.png',
        'assets/textures/texture_sides.png'
  ]);
}else {
  console.log("offline play enabled");
  loaded = true; // No Textures or Sound in offline
  document.getElementById('loadingWrapper').style.display = 'none';
}
