const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')
const bg_img = new Image();
bg_img.src = "pics/bg.png"
const col_img = document.querySelector('img#column')
let columns = [];



const bird = {
    img: document.querySelector('img#bird'),
    x: 50,
    y: canvas.height/2,
    w: 45,
    h: 35,
}

const SPACE_BTW_COLS = 150
function newColumns(){
    const a = 10;
    const b = canvas.height/2
    const h = Math.floor(Math.random() * (b-a+1)) + a

    columns = [
        {
            x: canvas.width-100,
            y: 0,
            w: 30,
            h: h,
        }, 
        {
            x: canvas.width-100,
            y: h + SPACE_BTW_COLS,
            w: 30,
            h: canvas.height - SPACE_BTW_COLS - h,
        }
    ]
}

// changing the state of the elemenets (e.g. changing the x position)
let lastUpdateTime = performance.now()

function gameLogic(nowTime = performance.now()){
    let dt = (nowTime-lastUpdateTime) / 1000
    lastUpdateTime = nowTime
    update(dt);
    draw();

    requestAnimationFrame(gameLogic);
}

function update(dt) {
    bird.y += 5 * dt;
}

// rendering the changes

function draw() {
    ctx.drawImage(bg_img, 0,0, canvas.width, canvas.height)
    ctx.drawImage(bird.img,bird.x, bird.y, bird.w, bird.h)

    columns.forEach(e => {
        ctx.drawImage(col_img,e.x, e.y, e.w, e.h)
    })
}

newColumns()
gameLogic();
