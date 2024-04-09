let square = document.getElementById('square');
let score = document.getElementById('score-value');
let timeLeftDisplay = document.getElementById('time-left');
let timeLeft;
let timerId;
let gameIntervalId;
let difficulty;
let color;
let canSpawnSquare = false;
let initialTimeLeft;

function startGame() {
  difficulty = document.getElementById('difficulty').value;
  color = document.getElementById('color').value;

  document.getElementById('start-page').style.display = 'none';
  document.getElementById('game-page').style.display = 'block';

  square.style.backgroundColor = color;

  switch (difficulty) {
    case 'easy':
      initialTimeLeft = 10;
      break;
    case 'medium':
      initialTimeLeft = 4;
      break;
    case 'hard':
      initialTimeLeft = 1;
      break;
    default:
      initialTimeLeft = 10;
  }

  timeLeft = initialTimeLeft;
  timeLeftDisplay.textContent = timeLeft;
  score.textContent = 0;

  timerId = setInterval(updateTimer, 1000);
}

function spawnSquare() {
    if (canSpawnSquare) {
      let maxX, maxY;
      switch (difficulty) {
        case 'easy':
          maxX = 200; 
          maxY = 200; 
          break;
        case 'medium':
          maxX = 500; 
          maxY = 500; 
          break;
        case 'hard':
          maxX = 800; 
          maxY = 800; 
          break;
        default:
          maxX = 200;
          maxY = 200;
      }
  
      let randomX = Math.floor(Math.random() * maxX);
      let randomY = Math.floor(Math.random() * maxY);
  
      square.style.left = `${randomX}px`;
      square.style.top = `${randomY}px`;
      canSpawnSquare = false;
    }
  }

function updateTimer() {
  timeLeft--;
  timeLeftDisplay.textContent = timeLeft;

  if (timeLeft === 0) {
    clearInterval(timerId);
    clearInterval(gameIntervalId);
    alert('Game over!');
    location.reload(); 
  }
}

square.addEventListener('click', function() {
  score.textContent = parseInt(score.textContent) + 1;
  clearInterval(gameIntervalId);
  canSpawnSquare = true;
  spawnSquare();
  gameIntervalId = setInterval(spawnSquare, 1000);

  switch (difficulty) {
    case 'easy':
      timeLeft = 10;
      break;
    case 'medium':
      timeLeft = 4;
      break;
    case 'hard':
      timeLeft = 1;
      break;
    default:
      timeLeft = 10;
  }
  timeLeftDisplay.textContent = timeLeft;
});