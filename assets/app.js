const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

const backgroundMusic = document.getElementById('song');
const crashmusic = document.getElementById('crash');


startScreen.addEventListener("click", start);

let player = {
  speed: 3 , score : 0
};

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
  e.preventDefault();
  keys[e.key] = true;
  // console.log(e.key);
  // console.log(keys);
}

function keyUp(e) {
  e.preventDefault();
  keys[e.key] = false;
  // console.log(e.key);
  // console.log(keys);
}

function isCollide(a,b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();

  if(!((aRect.top>bRect.bottom)||(aRect.bottom<bRect.top)||(aRect.right<bRect.left)||(aRect.left>bRect.right))){
    endGame();
    crashmusic.playbackRate = 5;
    crashmusic.play();
    return true
  }   
  return false

}

function movelines() {
  let lines = document.querySelectorAll('.lines');

  lines.forEach(function (item) { 

    if (item.y > 700) { 
      item.y -= 750;
    }
    item.y += player.speed+1;
    item.style.top = item.y + "px";
  }) 
}

//Left Lines
function leftlines() {
  let leftlines = document.querySelectorAll('.leftlines');

  leftlines.forEach(function (item) { 

    if (item.y > 700) { 
      item.y -= 750;
    }
    item.y += player.speed+1;
    item.style.top = item.y + "px";
  }) 
}

//Right Lines
function rightlines() {
  let rightlines = document.querySelectorAll('.rightlines');

  rightlines.forEach(function (item) { 

    if (item.y > 700) { 
      item.y -= 750;
    }
    item.y += player.speed+1;
    item.style.top = item.y + "px";
  }) 
}


function endGame() {
  player.start = false;
  startScreen.classList.remove("hide");
  startScreen.innerHTML = "Game Over <br> your Final Score is " + player.score + "<br> Press here to Restart the Game.";

  backgroundMusic.pause();
}

function moveEnemy(car) {
  let enemy = document.querySelectorAll('.enemy');

  enemy.forEach(function (item) { 

    if (isCollide(car, item)) { 
      console.log("Boom Hit");
      endGame();
    }
      
      
    if (item.y >= 700) { 
      item.y = -300;
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  }) 
}


function gamePlay() {
  // console.log("hey i am clicked");
  let car = document.querySelector('.car');
  let road = gameArea.getBoundingClientRect();
  // console.log(road);

  if (player.start) {

    movelines();
    leftlines();
    rightlines();
    moveEnemy(car);

    if (keys.ArrowUp && player.y > (road.top ) ) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown  && player.y < (road.bottom - 70)) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < (road.width - 50)) {
      player.x += player.speed;
    }

    car.style.top = player.y + "px";
    car.style.left = player.x + "px";

    window.requestAnimationFrame(gamePlay);
    console.log(player.score++);

    player.score++;
    let ps = player.score -2;
    score.innerText = "Score : " + ps;
  }
}

function start() {
  // gameArea.classList.remove("hide");
  score.classList.remove("hide");
  startScreen.classList.add("hide");
  gameArea.innerHTML = "";

  player.start = true;
  player.score = 0;

  window.requestAnimationFrame(gamePlay);

  for (x = 0; x < 5; x++) { 
    let roadline = document.createElement('div');
    roadline.setAttribute('class', 'lines');
    roadline.y = (x * 150);
    roadline.style.top = roadline.y + "px";
    gameArea.appendChild(roadline);
  }
  //updateLeft Lines
  for (x = 0; x < 5; x++) { 
    let roadlines = document.createElement('div');
    roadlines.setAttribute('class', 'leftlines');
    roadlines.y = (x * 150);
    roadlines.style.top = roadlines.y + "px";
    gameArea.appendChild(roadlines);
  }
  //rightLines
  for (x = 0; x < 5; x++) { 
    let roadlines = document.createElement('div');
    roadlines.setAttribute('class', 'rightlines');
    roadlines.y = (x * 150);
    roadlines.style.top = roadlines.y + "px";
    gameArea.appendChild(roadlines);
  }
  

  let car = document.createElement("div");
  car.setAttribute("class", "car");
  // car.innerText = "Hey I am car";
  gameArea.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  
  // console.log("Top postion " + car.offsetTop);
  // console.log("Left postion " + car.offsetLeft);

  for (x = 0; x < 3; x++) { 
    let enemycar = document.createElement('div');
    enemycar.setAttribute('class', 'enemy');
    enemycar.y = ((x+1)*350) * -1;
    enemycar.style.top = enemycar.y + "px";
    enemycar.style.backgroundColor = randomColor();
    enemycar.style.left = Math.floor(Math.random() * 350) + "px";
    gameArea.appendChild(enemycar);
  }

  function randomColor() { 
    function c() { 
      let hex = Math.floor(Math.random() * 256).toString(16);
      return ("0"+String(hex)).substr(-2);
    }
    return "#" + c() + c() + c();
  }

  backgroundMusic.currentTime = 0; // Reset the music to the beginning
  backgroundMusic.play();
}


// Add this variable to keep track of the game's pause state
let isPaused = false;

function pauseGame() {
  const pauseButton = document.querySelector(".pauseButton");

  if (isPaused) {
    // Resume the game
    isPaused = false;
    pauseButton.innerText = "Pause";
    backgroundMusic.play(); // Resume background music
    gamePlay(); // Resume the game loop
  } else {
    // Pause the game
    isPaused = true;
    pauseButton.innerText = "Resume";
    backgroundMusic.pause(); // Pause background music
  }
}
