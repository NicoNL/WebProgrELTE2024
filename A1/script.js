//MENU CONTENT
var Menu = document.querySelector("#Menu");
var Panel = document.querySelector("#Panel");
var Information = document.querySelector("#Information");

let InfoButton = document.querySelector(".InfoButton .infoText");
let closeBUtton = document.querySelector(".closeButton");
let Instructions = document.querySelector(".Instructions")

let nextButton = document.querySelector("#nextButton");
let backButton = document.querySelector("#backButton");
let startButton = document.querySelector("#startButton");
startButton.disabled = true;
let numPlayers = document.querySelector("#numPlayers");
let minutes = document.querySelector("#minutes");
let Players12 = Panel.querySelector("#Players12");
let Players34 = Panel.querySelector("#Players34");
let noTime = document.querySelector(".noTime");
let numReadyPlayers = 0;
let gameOver = false;
let winGame = false;
let gameStarted = false;
let foundItems = 0;
let currentPlayer = 0;
let playersPostions = [];
let currentPlayerPosition;
let Colors = ["red","blue", "green", "orange"]
let cluesPostion = []
let elementPosition = []
let itemArr = []
let clickCount = 3;
let activeDig = false;
let badOasis = 0;
let possibleP = [];
let oasisPositions = [];



//Instructions menu:
InfoButton.addEventListener("click",()=>{
  Instructions.style.display ="block"
})

closeBUtton.addEventListener("click", ()=>{
  Instructions.style.display ="none"
})
nextButton.addEventListener("click", () => {
  //Switching from Menu to players Panel
  Menu.style.display = "none";
  Panel.style.display = "flex";

  //Dividing panels according to the number of players
  let playersNumber = parseInt(numPlayers.value);
  let timeLimit = parseInt(minutes.value);

  if (playersNumber >= 2) {
    HidePlayers34();
  }
  if (playersNumber > 4) {
    playersNumber = 4;
  }
  if (playersNumber < 1) {
    playersNumber = 1;
  }
  if (timeLimit > 15) {
    timeLimit = 15;
  }
  if (timeLimit < 0) {
    timeLimit = 0;
  }
  numPlayers.value = playersNumber;
  minutes.value = timeLimit;

  let time = document.createElement("p");
  time.textContent = timeLimit + ":00";
  Information.insertBefore(time, Information.firstChild);

  playerAreaGenerator(playersNumber);
  //Name entering button creation
  let players = document.querySelectorAll(".player");
  buttonForNameGenerator(players);
  delegationEnterName(players);
});

startButton.addEventListener("click", () => {
  backButton.style.display = "none";
  startButton.style.display = "none";
  //Display objects to find
  let item1 = document.createElement("img");
  item1.src = "Assets/Item 1.png";
  let item2 = document.createElement("img");
  item2.src = "Assets/Item 2.png";
  let item3 = document.createElement("img");
  item3.src = "Assets/Item 3.png";
  Information.appendChild(item1);
  Information.appendChild(item2);
  Information.appendChild(item3);
  //Function to start the countdown in case user wanted a time limit
  let pTime = document.querySelector("#Information p");
  if (minutes.value != 0) {
    countdown(pTime);
  }
  let players = document.querySelectorAll(".player");
  players.forEach((player) => {
    let waterSupply = document.createElement("div");
    waterSupply.classList.add("waterSupply");
    waterSupply.style.display = "inline-flex";
    waterSupply.style.marginRight = "40%";
    let waterImg = document.createElement("img");
    waterImg.src = "Assets/Water.png";
    waterImg.style.width = "20px";
    waterImg.style.height = "20px";
    waterImg.style.margin = "0px";
    let waterNum = document.createElement("p");
    waterNum.style.margin = "0px";
    waterNum.textContent = "6";
    waterSupply.append(waterImg);
    waterSupply.append(waterNum);
    player.appendChild(waterSupply);

    let actions = document.createElement("div");
    actions.classList.add("actions");
    let actionsImg = document.createElement("img");
    actionsImg.src = "Assets/Action Points.png";
    let actionsNum = document.createElement("p");
    actionsNum.textContent = "3";
    actions.append(actionsImg);
    actions.append(actionsNum);
    player.appendChild(actions);

    gameStarted = true;
  });

  game();
  printOasis();
});

backButton.addEventListener("click", () => {
  displayCells();
  gameStarted = false;
  winGame = false;
  gameOver = false;
  startButton.style.display = ""
  numReadyPlayers = 0;
  Menu.style.display = "block";
  Panel.style.display = "none";

  const timerSelector = document.querySelector("#Information p");
  timerSelector.remove();
  Players12.innerHTML = "";
  Players34.innerHTML = "";
  numReadyPlayers = 0;
  startButton.disabled = true;
});
//This enables Start button when all of the names are set
function startGame() {
  if (numReadyPlayers == numPlayers.value) {
    startButton.disabled = false;
  } else {
    startButton.disabled = true;
  }
}
//TABLE CONTENT

let xPlayer, yPlayer;
let PlayGround = document.querySelector("#PlayGround");

let matrix = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

function displayCells() {
  let x = 0;
  let y = 0;
  PlayGround.innerHTML = "";
  matrix.forEach((row) => {
    row.forEach((matrixCell) => {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      let text = document.createElement("p");
      //Adding the coordingtes for each so we can check which one was clicked
      text.textContent = x + "," + y;
      cell.appendChild(text);
      PlayGround.appendChild(cell);
      x++;
    });
    x = 0;
    y++;
  });
}


function game() {
  let players = document.querySelectorAll(".player");
  let firstTurn = true;
  markCurrentPlayer(players[0]);
  let currentCell = firstPlayerPrint("2,2");
  for(let i = 0; i < numPlayers.value;i++){
    playersPostions.push(currentCell);
  }
  clickOnCell(currentCell, "2,2");
}
function firstPlayerPrint(position) {
  digEnabler();
  let cells = document.querySelectorAll(".cell");
  let currentCell = null;
  cells.forEach((cell) => {
    let cellPosition = cell.querySelector("p");
    let p = cellPosition.textContent;
    if (position === p) {
      if(p === "2,2"){
      cell.setAttribute("id", "center");
      }
      cell.style.border = "1.5px solid " + Colors[currentPlayer];
      let playerImg = document.createElement("img");
      playerImg.src = "Assets/Player.png";
      cell.appendChild(playerImg);
      currentCell = cell;
      currentPlayerPosition = cell;
    }
  });
  return currentCell;
}

function clickOnCell(currentCell, position) {
  let cells = document.querySelectorAll(".cell");
  possibleP = possiblePositions(position);
  let newPosition = "";
  let selectedCell = null;

  cells.forEach((cell) => {
    cell.addEventListener("click", (event) => {
      if (gameStarted && gameOver == false && winGame == false && clickCount > 0) {
        selectedCell = event.target;
        let content = event.target.textContent;
        if (possibleP.includes(content) && !event.target.querySelector("img")) {
          deletePlayer(currentPlayerPosition);
          currentCell = selectedCell;
          currentPlayerPosition = selectedCell;
          removeCursor(possibleP);
          newPosition = content;
          let playerImg = document.createElement("img");
          playerImg.src = "Assets/Player.png";
          event.target.appendChild(playerImg);
          if(event.target.style.border == "" || event.target.style.border == "1px solid rgb(183, 169, 145)"){
            event.target.style.border = "1.5px solid " + Colors[currentPlayer];
          }
          position = newPosition;
          possibleP = possiblePositions(position);
          clickDeduction();
        }
      }
    });
  });
}
//Complementary Methods

//All these hides or shows the panels containing each player info

function HidePlayers34() {
  Players34.style.background = "transparent";
  Players34.style.border = "0px";
}
function ShowPlayers34() {
  Players34.style.background = "#ffeccb";
  Players34.style.border = "2px solid #9b8441";
}
function markCurrentPlayer(player){
  switch(currentPlayer){
    case 0:
      player.style.border = "2px solid red";
      break;
    case 1:
      player.style.border = "2px solid blue";
      break;
    case 2:
      player.style.border = "2px solid green";
      break;
    case 3:
      player.style.border = "2px solid orange";
      break;
  }
  // border: 2px solid #9b8441;
}
function unmarkCurrenPlayer(player){
  player.style.border = "2px solid #9b8441";
}
function printOasis(){
  setElemetns();
  let cells = document.querySelectorAll(".cell");
  let position = ""
  for(let i = 0; i < 4;i++){
    let x;
    let y
    do{
      x = Math.floor(Math.random() * 5);
      y = Math.floor(Math.random() * 5);
      position = x + "," + y;
    }while((x === 2 && y === 2) || oasisPositions.includes(position)|| elementPosition.includes(position) || cluesPostion.includes(position))
    oasisPositions.push(position)
    let selectedCell = Array.from(cells).find(cell => cell.textContent == position);
    selectedCell.setAttribute("id","OasisMarker")
  }
  badOasis =  oasisPositions[Math.floor(Math.random() * 5)];
}
function setElemetns(){
  let x;
  let y;
  let position = ""
  let previousX = -1;
  let previousY = -1;
  for(let i = 0; i < 3;i++){
    do{
      x = Math.floor(Math.random() * 5);
      y = Math.floor(Math.random() * 5);
      position = x + "," + y;
    }while( (x === 2 && y === 2) || elementPosition.includes((position))|| y == previousY)
    elementPosition.push(position);
    previousY = y;
  }
  let item;
  for(let i = 0; i < 3;i++){
    do{
      item = Math.floor(Math.random() * 3)+1;
    }while(itemArr.includes((item)))
  itemArr.push(item)
  }
  cluesGenerator()
}
function cluesGenerator(){
  for(let i = 0; i < 3; i++){
    let itemCoor = elementPosition[i];
    let tempstr = itemCoor.split(",");
    let x = parseInt(tempstr[0]);
    let y = parseInt(tempstr[1]);
    let oldY = y
    do{
      y = Math.floor(Math.random() * 5);
      position = x + "," + y;
    }while((x === 2 && y === 2)|| elementPosition.includes(position) || cluesPostion.includes(position))
    cluesPostion.push(position);
    y =oldY
    do{
      x = Math.floor(Math.random() * 5);
      position = x + "," + y;
    }while((x === 2 && y === 2)|| elementPosition.includes(position) || cluesPostion.includes(position))
    cluesPostion.push(position);
 
  }
}
function backgroundChecker(id) {}
function possiblePositions(position) {
  //This functions find all of the possible possitions for the player to move
  let positions = [];
  let coor = position.split(",");
  let x = parseInt(coor[0]);
  let y = parseInt(coor[1]);
  positions.push(x + 1 + "," + y);
  positions.push(x - 1 + "," + y);
  positions.push(x + "," + (y - 1));
  positions.push(x + "," + (y + 1));
  changeCursor(positions);
  return positions;
}

function deletePlayer(currentCell) {
  let img = currentCell.querySelector("img");
  if (img) {
    if(currentCell.style.border == "1.5px solid " + Colors[currentPlayer]){
      currentCell.style.border = "1px solid #b7a991";
    }
    currentCell.removeChild(img);
  }
}
function clickDeduction(){
  clickCount--;
  let players = document.querySelectorAll(".player");
  let actionsDiv = players[currentPlayer].querySelector(".actions")
  let counterText = actionsDiv.querySelector("p")
  counterText.textContent = clickCount;
  if(parseInt(clickCount) === 0){
    let waterSupply = players[currentPlayer].querySelector(".waterSupply")
    let counterTextW = waterSupply.querySelector("p")
    let counterW = parseInt(counterTextW.textContent) - 1;
    counterTextW.textContent = counterW;
    if(counterW === 0){
      gameOver = true;
      let pTime = document.querySelector("#Information p");
      countdown(pTime);
    }
    counterText.textContent = 0;
    savePlayerPosition();
    deletePlayer(currentPlayerPosition);
    removeCursor(possiblePositions(currentPlayerPosition.textContent));
    nextPlayer();

    clickCount = 3;
  }
}
function savePlayerPosition(){
  playersPostions[currentPlayer] = currentPlayerPosition;
}
function nextPlayer(){
  let players = document.querySelectorAll(".player");
  unmarkCurrenPlayer(players[currentPlayer]);
  currentPlayerPosition.style.border = "1.5px solid " + Colors[currentPlayer];
  currentPlayer++;
  if(currentPlayer == (numPlayers.value)){
    currentPlayer = 0;
  }
  digDisabler();
  let Div = players[currentPlayer].querySelector(".actions")
  let cntText = Div.querySelector("p")
  cntText.textContent = 3;
  markCurrentPlayer(players[currentPlayer]);
  currentPlayerPosition = playersPostions[currentPlayer];
  let position = playersPostions[currentPlayer].textContent;
  let currentCell = firstPlayerPrint(position);
  let actionsDiv = players[currentPlayer].querySelector(".actions")
  let counterText = actionsDiv.querySelector("p")
  counterText.textContent = 3;
  clickOnCell(currentCell, currentCell.textContent);

}
//These two functions add and remove Color from the possible cells the player can move to
function changeCursor(positions) {
  let cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    if (positions.includes(cell.textContent)) {
      cell.style.cursor = "pointer";
    }
  });
}
function removeCursor(positions) {
  let cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    if (positions.includes(cell.textContent)) {
      cell.style.cursor = "auto";
    }
  });
}
function digEnabler() {
  let players = document.querySelectorAll(".player");
  let player = players[currentPlayer];
  let actions = player.querySelector(".actions");
  actions.style.cursor = "pointer"
  actions.addEventListener("click", digFunction)
}
function digFunction(){
  let players = document.querySelectorAll(".player");
  let player = players[currentPlayer];
  if(gameOver == false && clickCount > 0){
    if(currentPlayerPosition.id == "Oasis"){
      let waterSupply = player.querySelector(".waterSupply")
      let counterTextW = waterSupply.querySelector("p")
      if(clickCount == 1){
        counterTextW.textContent = 7;
      }else{
        counterTextW.textContent = 6;
      }
      clickDeduction();
    }
    if(currentPlayerPosition.id == "OasisMarker"){
      digOasisMarker();
      clickDeduction();
    }
    if(elementPosition.includes(currentPlayerPosition.textContent) && !currentPlayerPosition.hasAttribute("id")){
      let index = elementPosition.findIndex(item => item === currentPlayerPosition.textContent)
      let id = "Item" + itemArr[index]
      currentPlayerPosition.setAttribute("id", id);
      informationElement(itemArr[index])
      foundItems++;
      clickDeduction();                
      if(foundItems == 3){
        winGame = true;
      }
    }
    if(cluesPostion.includes(currentPlayerPosition.textContent) && !currentPlayerPosition.hasAttribute("id")){
      let index = cluesPostion.findIndex(item => item === currentPlayerPosition.textContent)
      digOnClue(parseInt(index));
    }
    if(!currentPlayerPosition.hasAttribute("id")){
      currentPlayerPosition.setAttribute("id", "hole");
      clickDeduction();
    }
  }
}
function digOnClue(index){
  let itemNum;
  let itemPos;
  let axis;
  let side;
  if(index < 2){
    axis = (index === 0) ? "x" : "y";
    itemNum = itemArr[0];
    itemPos = elementPosition[0];
  }else if(index <4){
    axis = (index === 2) ? "x" : "y";
    itemNum = itemArr[1];
    itemPos = elementPosition[1];
  }else{
    axis = (index === 4) ? "x" : "y";
    itemNum = itemArr[2];
    itemPos = elementPosition[2];
  }
  let str = currentPlayerPosition.textContent;
  let arrStr = str.split(",");
  let posArr = itemPos.split(",");
  if(axis == "x"){
    let tempY = parseInt(arrStr[1]);
    let y = parseInt(posArr[1]);
    if( y > tempY){
      side = "DOWN"
    }else{
      side = "UP"
    }
  }else{
    let tempX = parseInt(arrStr[0]);
    let x = parseInt(posArr[0]);
    if( x > tempX){
      side = "RIGHT"
    }else{
      side = "LEFT"
    }
  }
  let url = "url('Assets/Item " + itemNum + " - clue_" + side + ".png')"
  //"url('Assets/Item 2 - clue_RIGHT.png')"
  currentPlayerPosition.style.backgroundImage = url
}
function informationElement(index){
  var Information = document.querySelector("#Information");
  let imgs = Information.querySelectorAll("img")
  imgs[index-1].style.opacity = "100%"
}
function digDisabler() {
  let players = document.querySelectorAll(".player");
  let previousP = currentPlayer -1;
  if(previousP == -1){
    previousP = 0;
  }
  let p = players[previousP];
  let actions = p.querySelector(".actions");
  actions.style.cursor = "default"
  actions.removeEventListener("click",digFunction);
}
function digOasisMarker(){
  if(currentPlayerPosition.textContent == badOasis){
    currentPlayerPosition.setAttribute("id", "Drought");
  }else{
    currentPlayerPosition.setAttribute("id", "Oasis");

  }
}

//Generators
function playerAreaGenerator(playersNumber) {
  switch (playersNumber) {
    case 1:
      Players12.innerHTML += `<div class="player" style="color: red;"></div>`;
      ShowPlayers34();
      break;
    case 2:
      Players12.innerHTML += `<div class="player" style="color: red;"></div>`;
      Players34.innerHTML += `<div class="player" style="color: blue;"></div>`;
      break;
    case 3:
      Players12.innerHTML += `<div class="player" style="color: red;"></div>`;
      Players12.innerHTML += `<div class="player" style="color: blue;"></div>`;
      Players34.innerHTML += `<div class="player" style="color: green;"></div>`;
      break;
    case 4:
      Players12.innerHTML += `<div class="player" style="color: red;"></div>`;
      Players12.innerHTML += `<div class="player" style="color: blue;"></div>`;
      Players34.innerHTML += `<div class="player" style="color: green;"></div>`;
      Players34.innerHTML += `<div class="player" style="color: orange;"></div>`;
      break;
  }
}
function buttonForNameGenerator(players) {
  let cnt = 1;
  players.forEach((player) => {
    //Name instruction
    let enterName = document.createElement("p");
    enterName.style.fontSize = "12px";
    enterName.textContent = "Write a name";
    enterName.style.margin = "4px 0px 1px 0px";
    //Input declaration
    let playerName = document.createElement("input");
    playerName.classList.add("playerInput");
    playerName.placeholder = "Player " + cnt;
    playerName.type = "text";
    playerName.maxLength = 8;
    playerName.style.width = "60px";
    playerName.style.margin = "0px 0px 5px 0px";
    playerName.style.background = "#e3ceab";
    player.appendChild(enterName);
    player.appendChild(playerName);
    cnt++;
    //Button to assing name to the player
    player.innerHTML += `<button class="buttonName">Enter</button>`;
  });
}
//Functionality for the Name entering of each player
function delegationEnterName(players) {
  players.forEach((player) =>
    addEventListener("click", (event) => {
      let playerInput = player.querySelector(".player .playerInput");
      let playerName = playerInput.value.trim();
      let text = player.querySelector(".player p");
      const target = event.target;
      //.closest was added to just take the closest player div into account
      if (
        target.className === "buttonName" &&
        target.closest(".player") === player
      ) {
        text.style.display = "none";
        playerInput.style.display = "none";
        target.style.display = "none";
        let nameDisplayer = document.createElement("h5");
        if (playerName === "") {
          nameDisplayer.textContent = playerInput.placeholder;
        } else {
          nameDisplayer.textContent = playerInput.value;
        }
        player.appendChild(nameDisplayer);
        numReadyPlayers++;
        startGame();
      }
    })
  );
}
//This functions shows an alert for the player in case he does not want a time-limit
function inputIsZero(input) {
  if (input.value == 0) {
    noTime.style.display = "block";
  } else {
    noTime.style.display = "none";
  }
}

function countdown(pTime) {
  let str = pTime.textContent;
  let parts = str.split(":");
  let minutes = parseInt(parts[0]);
  let seconds = minutes * 60;
  const count = setInterval(function () {

    if (seconds < 0 || gameOver ) {
      clearInterval(count);
      pTime.textContent = "GAMEOVER";
      gameOver = true;
      removeImgs()
    }if (winGame) {
      clearInterval(count);
      pTime.textContent = "VICTORY!";
      removeImgs()
      //hi
    } else if(winGame == false && gameOver == false) {
      currentMin = Math.floor(seconds / 60);
      currentSec = seconds % 60;
      if (currentSec == 0) {
        pTime.textContent = currentMin + ":" + currentSec + "0";
      } else if (currentSec < 10) {
        pTime.textContent = currentMin + ":" + "0" + currentSec;
      } else {
        pTime.textContent = currentMin + ":" + currentSec;
      }
      seconds--;
    }
    //Interval of every 1 second
  }, 1000);
}

function removeImgs(){
  let imgs = Information.querySelectorAll("img");
  imgs.forEach((img)=>{
    img.remove();
  })
  currentPlayer = 0;
  mainMenuBoton();
}
function mainMenuBoton(){
  let mainMenu =  document.createElement("button");
  mainMenu.classList.add("mainMenu")
  mainMenu.textContent = "Menu"
  let buttons = Information.getElementsByClassName("mainMenu")
  if(buttons.length == 0){
    Information.appendChild(mainMenu)
    mainMenu.addEventListener("click",()=>{
      location.reload();
    })
  }
}
//FUNCTIONS DECLARATIONS
displayCells();
