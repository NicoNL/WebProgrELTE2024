//1. Display coverImg
const coverImg = document.querySelector(".coverImg .cover");
let x = Math.floor(Math.random() * (39 - 1)) + 1;
coverImg.src = "assets/sign" + x + ".png";

//2. Min and Max
let currentValue = 15;
const inc = document.querySelector("#signChanger #inc");
const dec = document.querySelector("#signChanger #dec");
const currentImg = document.querySelector("#signChanger #currentSign")

inc.addEventListener('click', increase);
dec.addEventListener('click', decrease);

function increase(){
    if(currentValue < 39){
        currentValue += 1;
        currentImg.src = "assets/sign" + currentValue + ".png";
        buttonDisabler(currentValue);
    }
    else{
        currentValue = 39;
    }
}
function decrease(){
    if(currentValue > 1){
        currentValue -= 1;
        currentImg.src = "assets/sign" + currentValue + ".png";
        buttonDisabler(currentValue);
    }
    else{
        currentValue = 1;
    }
}

function buttonDisabler(x){
    if(currentValue >= 39){
        inc.disabled = true;
    }
    else{
        inc.disabled = false;
    }
    if(currentValue <= 1){
        dec.disabled = true;
    }
    else{
        dec.disabled = false;
    }
    console.log(currentValue)
}

//3. Cover to currentSign
currentImg.addEventListener('click',() =>{
    coverImg.src = currentImg.src;
})

//4. Button hold down feature
let intervalId;

inc.addEventListener('mousedown',() => {
    intervalId = setInterval(() => {
        if(currentValue <39){
            increase();
        }else{
            clearInterval(intervalId)
        }
    },200)
})
inc.addEventListener('mouseup',() => {
    clearInterval(intervalId)
})
dec.addEventListener('mousedown',()=>{
        intervalId = setInterval(() => {
        if(currentValue > 1){
            decrease();
        }
        else{
            clearInterval(intervalId)
        }
    }, 300);
})
dec.addEventListener('mouseup', () => {
    clearInterval(intervalId);
});
