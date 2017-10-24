// filename    : time.js
// description : Timeline helper functions
// last update : 10 23 2017

let game_seconds = 0;
let seconds = 0;
// let minutes = 5; See main.js

function startSeconds() {
  setInterval(function(){
    game_seconds++;
    seconds++;
    if(game_seconds === 1) { minutes--; }
    if(seconds % 60 === 0 && (minutes >= 0 || seconds > 0)) {
      seconds = 0;
      minutes--;
    }
    calculated_sec = 60 - seconds;
    if(calculated_sec > 9) {
      document.getElementsByClassName("time")[0].innerHTML = minutes + ":" + calculated_sec;
    }else {
      document.getElementsByClassName("time")[0].innerHTML = minutes + ":0" + calculated_sec;
    }
  }, 1000);
}
