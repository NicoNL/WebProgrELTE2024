let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");

canvas.style.background = "red";
let h = window.innerHeight;
let w = window.innerWidth;

canvas.width = h;
canvas.height = w;

class Circle{
    constructor(x,y,r,color,text,speed) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.text = text;
        this.speed = speed;
        
        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }
    draw(context){
        context.beginPath();
        context.strokeStyle = this.color
        context.fillText(this.text, this.x ,this.y);
        context.textAlign = "center"
        context.textBaseLine = "middle"
        context.font = "20px Arial"
        //context.strokeText(this.text,this.x,this.y)
        context.lineWidth = 3;
        context.arc(this.x,this.y,this.r,0,Math.PI * 2, false);
        context.stroke();
    }
    update(){
        context.clearRect(0,0,window.innerWidth,window.innerHeight)
        this.draw(context);

        if( (this.x + this.r)  > window.innerWidth){
            this.dx = -this.dx
        }
        if((this.x - this.r)  < 0){
            this.dx = -this.dx
        }
        if((this.y - this.r)  < 0){
            this.dy = -this.dy
        }
        if((this.y + this.r)  > window.innerHeight){
            this.dy = -this.dy
        }
        this.x += this.dx;
        this.y += this.dy;
    }
}

let cnt = 1;

let allCircles = [];

let randomx = Math.random() * window.innerHeight;
let randomy = Math.random() * window.innerWidth

let c1 = new Circle(100,100, 50, "black",cnt,1);

c1.draw(context);

let updateCircle = function() {
    requestAnimationFrame(updateCircle);
    console.log(c1.y)
    c1.update();
}
updateCircle();
// let createCircle =  function(circle){
//     circle.draw(context);
// }

// for (var numbers = 0; numbers <10; numbers++){
//     let randomx = Math.random() * window.innerHeight;
//     let randomy = Math.random() * window.innerWidth

//     let my_circle = new Circle(randomx,randomy, 50, "black",cnt,1);
//     allCircles.push(my_circle);
//     createCircle(allCircles[numbers]);
//     cnt++;
// }



// my_circle.draw(context);
// c1.draw(context);