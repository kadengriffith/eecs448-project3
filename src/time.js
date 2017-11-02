// filename    : time.js
// description : Timeline helper functions; Scoring
// last update : 10 23 2017
let game_seconds = 0;
let seconds = 0;
// let minutes = 5; See main.js
let paused = true;
function startSeconds() {
  seconds = 0;
  setInterval(function(){
    if(!paused) {
      if(seconds % 60 === 0) {
        seconds = 0;
        if(minutes > 0) { minutes--; } else {
          return;
        }
      }
      if(minutes < 0 && seconds < 1) {
        document.getElementsByClassName("time")[0].innerHTML = "0:00";
        if(reloadOnTimeEnd) { window.location.reload(); }
      }else {
        calculated_sec = 59 - seconds;
        if(calculated_sec > 9) {
          document.getElementsByClassName("time")[0].innerHTML = minutes + ":" + calculated_sec;
        }else {
          document.getElementsByClassName("time")[0].innerHTML = minutes + ":0" + calculated_sec;
        }
      }
      seconds++;
    }
    game_seconds++;
  }, 1000 /* One Second */);
}
// Used for displaying score to HUD
function getScore() {
  document.getElementsByClassName("score")[0].innerHTML = score_red;
  document.getElementsByClassName("score")[1].innerHTML = score_blue;
}
// Used to check if time is over @return true/false
function timeIsUp() {
  if (minutes == 0 && seconds == 0) {
    return true;
  } else {
    return false;
  }
}
