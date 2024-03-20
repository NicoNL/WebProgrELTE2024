const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");


ctx.beginPath();
ctx.strokeStyle = "blue";
ctx.moveTo(20,250);
ctx.lineTo(20,20);
ctx.lineTo(500,250);
ctx.clos
ctx.closePath();
ctx.fillStyle = "green";
ctx.fill();
ctx.stroke();

ctx.strokeRect(20,20,50,50);
ctx.beginPath();
ctx.arc(100,75,50,0,2 * Math.PI);
ctx.stroke();



