const choices = ["rock", "paper", "scissors"];

const playerHand = document.getElementById("playerHand");
const computerHand = document.getElementById("computerHand");

const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");

const roundNumber = document.getElementById("roundNumber");
const statusText = document.getElementById("statusText");

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupDesc = document.getElementById("popupDesc");
const popupBtn = document.getElementById("popupBtn");
const popupImage = document.getElementById("popupImage");

const clickSound = document.getElementById("clickSound");
const shakeSound = document.getElementById("shakeSound");
const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");

const buttons = document.querySelectorAll(".choice-btn");

let playerScore = 0;
let computerScore = 0;
let currentRound = 1;
let gameEnded = false;

const images = {
  rock:"assets/img/rock.jpg",
  paper:"assets/img/paper.jpg",
  scissors:"assets/img/scissors.jpg"
};

buttons.forEach(btn=>{

  btn.addEventListener("click",()=>{

    if(gameEnded) return;

    clickSound.play();

    const playerChoice = btn.dataset.choice;
    const computerChoice =
      choices[Math.floor(Math.random()*3)];

    startBattleAnimation(playerChoice,computerChoice);

  });

});

function startBattleAnimation(playerChoice,computerChoice){

  disableButtons();

  playerHand.classList.add("shake-player");
  computerHand.classList.add("shake-computer");

  shakeSound.currentTime = 0;
  shakeSound.play();

  setTimeout(()=>{

    playerHand.classList.remove("shake-player");
    computerHand.classList.remove("shake-computer");

    playerHand.src = images[playerChoice];
    computerHand.src = images[computerChoice];

    decideWinner(playerChoice,computerChoice);

    enableButtons();

  },3000);

}

function decideWinner(player,computer){

  let result = "";

  if(player === computer){

    result = "Hòa 😆";

  }

  else if(
    (player==="rock" && computer==="scissors") ||
    (player==="paper" && computer==="rock") ||
    (player==="scissors" && computer==="paper")
  ){

    playerScore++;
    result = "Bạn thắng round này 🎉";

  }

  else{

    computerScore++;
    result = "Nhựt thắng round này 😢";

  }

  statusText.innerText = result;

  playerScoreEl.innerText = playerScore;
  computerScoreEl.innerText = computerScore;

  checkGame();

}

function checkGame(){

  if(playerScore === 3){

    gameEnded = true;

    winSound.play();

    showPopup(
      "🎉 Bạn đã thắng roài, hay dữ luôn 💖🏆",
      "Đỉnh của chóp lun nè ✨",
      "assets/img/win-popup.jpg",
      "Chơi Lại"
    );

  }

  else if(computerScore === 3){

    gameEnded = true;

    loseSound.play();

    showPopup(
      "😵 Xui thoai, thử lại i 💖✨",
      "Không sao hết, trả thù tiếp nè 🔥",
      "assets/img/lose-popup.jpg",
      "Trả Thù"
    );

  }

  else{

    currentRound++;

    if(currentRound <= 5){
      roundNumber.innerText = currentRound;
    }

  }

}

function showPopup(title,desc,image,buttonText){

  popup.classList.remove("hidden");

  popupTitle.innerText = title;
  popupDesc.innerText = desc;
  popupImage.src = image;

  popupBtn.innerText = buttonText;

}

popupBtn.addEventListener("click",resetGame);

document.getElementById("resetBtn")
.addEventListener("click",resetGame);

function resetGame(){

  playerScore = 0;
  computerScore = 0;
  currentRound = 1;
  gameEnded = false;

  playerScoreEl.innerText = 0;
  computerScoreEl.innerText = 0;
  roundNumber.innerText = 1;

  statusText.innerText = "Game mới bắt đầu ✨";

  playerHand.src = images.rock;
  computerHand.src = images.rock;

  popup.classList.add("hidden");

}

function disableButtons(){

  buttons.forEach(btn=>{
    btn.disabled = true;
    btn.style.opacity = 0.5;
  });

}

function enableButtons(){

  buttons.forEach(btn=>{
    btn.disabled = false;
    btn.style.opacity = 1;
  });

}

document.getElementById("avatarUpload")
.addEventListener("change",(e)=>{

  const file = e.target.files[0];

  if(file){

    const reader = new FileReader();

    reader.onload = function(event){

      document.getElementById("playerAvatar")
      .src = event.target.result;

    };

    reader.readAsDataURL(file);

  }

});