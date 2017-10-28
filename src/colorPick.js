// author : Kaden Griffith
// filename : colorPick.js
// description : implements a simple color view and
//               customizer targeting:
//               HTML: <div class="colorPick"></div>
// last update : 10 28 17
let canvas;
let canvas_colorPick_preview_1;
let ctx_1;
let color = [];
let value_red, value_green, value_blue;
window.onload = function() {
  canvas = document.getElementsByClassName('colorPick')[0];
  canvas.innerHTML += "Red: <br>";
  canvas.innerHTML += "0 |<input type='range' min='0' max='255' value='255' class='colorPick_rgbslider RED'></input>| 255<br>";
  canvas.innerHTML += "Green: <br>";
  canvas.innerHTML += "0 |<input type='range' min='0' max='255' value='255' class='colorPick_rgbslider GREEN'></input>| 255<br>";
  canvas.innerHTML += "Blue: <br>";
  canvas.innerHTML += "0 |<input type='range' min='0' max='255' value='255' class='colorPick_rgbslider BLUE'></input>| 255<br>";
  canvas.innerHTML += "<canvas class='colorPick_preview'></canvas>";
  canvas_colorPick_preview_1 = document.getElementsByClassName('colorPick_preview')[0];
  ctx_1 = canvas_colorPick_preview_1.getContext("2d");
  setInterval(update, 1000 / 60);
  console.log('LOADED RESOURCE: colorPick.js -- Working as usual...');
};

function update() {
  value_red = document.getElementsByClassName('RED')[0].value;
  value_green = document.getElementsByClassName('GREEN')[0].value;
  value_blue = document.getElementsByClassName('BLUE')[0].value;
  color = [];
  color.push(value_red);
  color.push(value_green);
  color.push(value_blue);
  ctx_1.beginPath();
  ctx_1.rect(0, 0, canvas_colorPick_preview_1.width, canvas_colorPick_preview_1.height);
  ctx_1.fillStyle = "rgba(" + color[0] + ", " + color[1] + ", " + color[2] +", 1.0)";
  ctx_1.fill();
}
