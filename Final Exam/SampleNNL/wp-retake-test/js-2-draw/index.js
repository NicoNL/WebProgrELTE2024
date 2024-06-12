const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

// starting data / kiinduló adatok

const bowl = {
  x: 300,
  y: 300,
  r: 250,
};



let balls = [

];

// utility functions / segédfüggvények

function init() {
    balls = [];
    for(let id = 1; id < 90; id++)
    {
        const rad = random(20,200);
        const phi = Math.random() * 2 *Math.PI;
        balls.push({
            id,
            x: 300 + Math.round(rad * Math.sin(phi)),
            y: 300 + Math.round(rad * Math.cos(phi)),
            vx: (Math.random() < 0.5 ? 1 : -1) *random(50,500),
            vy: (Math.random() < 0.5 ? 1 : -1) *random(50,500),
            r: 15

        })
    }
}

const random = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

const circleCollision = (c1, c2) =>
  Math.sqrt((c1.x - c2.x) ** 2 + (c1.y - c2.y) ** 2) + c1.r > c2.r;

const calculateReflection = (ball) =>
  reflectInsideSphere(ball.vx, ball.vy, ball.x, ball.y, bowl.x, bowl.y);

const reflectInsideSphere = (vx, vy, x, y, cx, cy) => {
  let collisionVectorX = x - cx;
  let collisionVectorY = y - cy;
  const distance = Math.sqrt(collisionVectorX ** 2 + collisionVectorY ** 2);
  collisionVectorX /= distance;
  collisionVectorY /= distance;
  const dotProduct = vx * collisionVectorX + vy * collisionVectorY;
  const vxPrime = vx - 2 * dotProduct * collisionVectorX;
  const vyPrime = vy - 2 * dotProduct * collisionVectorY;
  return { vx: vxPrime, vy: vyPrime };
};

// time-based animation (from the lecture slide) / időalapú animáció (az előadásdiákból)

let lastFrameTime = performance.now();

function next(currentTime = performance.now()) {
  const dt = (currentTime - lastFrameTime) / 1000;
  lastFrameTime = currentTime;

  update(dt); // update current state / jelenlegi állapot frissítése
  render(); // rerender the frame / képkocka újrarajzolása
  requestAnimationFrame(next);
}

function update(dt) {
    balls.forEach(ball =>{
        ball.x += dt *ball.vx;
        ball.y += dt *ball.vy;
        if(circleCollision(ball,bowl)){
            let { vx, vy} = calculateReflection(ball);
            ball.vx = vx;
            ball.vy = vy;
        }
    })
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.arc(bowl.x, bowl.y, bowl.r, 0, 2 * Math.PI);
  context.lineWidth = 4;
  context.fillStyle = "#eeeeee99";
  //context.fillStyle = "rgba(102, 17, 34, 0.7)";
  context.fill();
  context.stroke();

  balls.map((e) => {
    context.beginPath();
    context.arc(e.x, e.y, e.r, 0, 2 * Math.PI);
    context.lineWidth = 2;
    context.fillStyle = "yellow";
    context.fill();
    //context.fillStyle = "rgba(102, 17, 34, 0.7)";
    context.fillStyle = "black";
    context.fillText(e.id, e.x-6,e.y+3);
    context.stroke();
  });
}
init();
next();
