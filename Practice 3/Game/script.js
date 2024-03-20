const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d")
const bg_img = new Image();
bg_img.src = "pics/bg.png"
const col_img = document.querySelector("img#column");
let columns = [];


const bird = {
    img: document.querySelector("img#bird"),
    x: 50,
    y: canvas.height/2,
    w: 50,
    h: 35,
}
const SPACE_BTW_COLS = 150
function newColumns(){
    const a = 10;
    const b = canvas.height
    const h = Math.floor(Math.random() * (b-a+1)) + a
    columns = [
        {
            x:canvas.width ,
            y: 0,
            w: 30,
            h: h,
        },
        {
            x: canvas.width,
            y: h + SPACE_BTW_COLS,
            w: 30,
            h: canvas.height - SPACE_BTW_COLS - h,
        }
    ]
}

let lastUpdateTime = performance.now();

function gameLogic(nowtime = performance.now()){
    let dt = (nowtime-lastUpdateTime) / 1000
    lastUpdateTime = nowtime
    update(dt)
    draw()

    requestAnimationFrame(gameLogic);
}

function update(dt){

    bird.y -= 5 * dt;

    console.log(bird.y)
    columns.forEach(e => {
        e.x -= 20 * dt;
    })
    console.log(bird.y)
 
}

function draw(){
    ctx.drawImage(bg_img,0,0,canvas.width,canvas.height);
    ctx.drawImage(bird.img, bird.x, bird.y, bird.w, bird.h);
    columns.forEach(e => {
        ctx.drawImage( col_img, e.x, e.y, e.w, e.h);

    })
}

newColumns();
gameLogic();
