let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");

canvas.style.background = "red";

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

context.fillStyle = "blue";
context.fillRect(50,50,100, 100);
context.fillRect(200,350,100, 100);

context.beginPath();
context.strokeStyle = "blue";
context.arc(400,400,150,0, Math.PI *2, false);
context.stroke();
context.closePath();
