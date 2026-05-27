const choices = ["rock","paper","scissors"];

const images = {

  rock:"./assets/img/rock.jpg",

  paper:"./assets/img/paper.jpg",

  scissors:"./assets/img/scissors.jpg"

};

const playerHand =
document.getElementById("playerHand");

const computerHand =
document.getElementById("computerHand");

const playerScoreEl =
document.getElementById("playerScore");

const computerScoreEl =
document.getElementById("computerScore");

const roundNumber =
document.getElementById("roundNumber");

const statusText =
document.getElementById("statusText");

const popup =
document.getElementById("popup");

const popupTitle =
document.getElementById("popupTitle");

const popupDesc =
document.getElementById("popupDesc");

const popupBtn =
document.getElementById("popupBtn");

const popupImage =
document.getElementById("popupImage");

const clickSound =
document.getElementById("clickSound");

const shakeSound =
document.getElementById("shakeSound");

const winSound =
document.getElementById("winSound");

const loseSound =
document.getElementById("loseSound");

const buttons =
document.querySelectorAll(".play-btn");

let playerScore = 0;
let computerScore = 0;
let currentRound = 1;
let gameEnded = false;

/* PRELOAD IMAGE */

Object.values(images).forEach(src=>{

  const img = new Image();

  img.src = src;

});

/* AUDIO FIX */

[
  clickSound,
  shakeSound,
  winSound,
  loseSound
].forEach(audio=>{

  audio.load();

});

/* BUTTON EVENT */

buttons.forEach(button=>{

  button.addEventListener("click",()=>{

    if(gameEnded) return;

    const playerChoice =
    button.dataset.choice;

    const computerChoice =
    choices[Math.floor(Math.random()*3)];

    playRound(
      playerChoice,
      computerChoice
    );

  });

});

/* GAME */

async function playRound(playerChoice,computerChoice){

  disableButtons();

  playAudio(clickSound);

  startShake();

  playAudio(shakeSound);

  await wait(3000);

  stopShake();

  updateHands(
    playerChoice,
    computerChoice
  );

  decideWinner(
    playerChoice,
    computerChoice
  );

  if(!gameEnded){

    enableButtons();

  }

}

/* SHAKE */

function startShake(){

  playerHand.classList.add("shake-player");

  computerHand.classList.add("shake-computer");

}

function stopShake(){

  playerHand.classList.remove("shake-player");

  computerHand.classList.remove("shake-computer");

}

/* UPDATE HAND */

function updateHands(player,computer){

  playerHand.src = images[player];

  computerHand.src = images[computer];

}

/* RESULT */

function decideWinner(player,computer){

  if(player === computer){

    statusText.innerText =
    "Hòa round này 😆";

  }

  else if(

    (player === "rock" &&
    computer === "scissors")

    ||

    (player === "paper" &&
    computer === "rock")

    ||

    (player === "scissors" &&
    computer === "paper")

  ){

    playerScore++;

    playerScoreEl.innerText =
    playerScore;

    statusText.innerText =
    "Bạn thắng round này 🎉";

  }

  else{

    computerScore++;

    computerScoreEl.innerText =
    computerScore;

    statusText.innerText =
    "Nhựt thắng round này 😢";

  }

  checkGame();

}

/* CHECK GAME */

function checkGame(){

  if(playerScore === 3){

    gameEnded = true;

    playAudio(winSound);

    showPopup(

      "🎉 Bạn đã thắng roài, hay dữ luôn 💖🏆",

      "Đỉnh của chóp lun 😆",

      "./assets/img/win-popup.jpg",

      "Chơi Lại"

    );

    return;

  }

  if(computerScore === 3){

    gameEnded = true;

    playAudio(loseSound);

    showPopup(

      "😵 Xui thoai, thử lại i 💖",

      "Không sao hết, trả thù tiếp 🔥",

      "./assets/img/lose-popup.jpg",

      "Trả Thù"

    );

    return;

  }

  if(currentRound >= 5){

    gameEnded = true;

    showPopup(

      "🌌 Vũ trụ đã cho chúng ta hòa nhau 💖",

      "Chưa phân thắng bại lun 😆",

      "./assets/img/draw-popup.jpg",

      "Không Muốn Hòa"

    );

    return;

  }

  currentRound++;

  roundNumber.innerText =
  currentRound;

}

/* POPUP */

function showPopup(
  title,
  desc,
  image,
  buttonText
){

  popup.classList.remove("hidden");

  popupTitle.innerText = title;

  popupDesc.innerText = desc;

  popupImage.src = image;

  popupBtn.innerText = buttonText;

}

/* RESET */

function resetGame(){

  playerScore = 0;

  computerScore = 0;

  currentRound = 1;

  gameEnded = false;

  playerScoreEl.innerText = 0;

  computerScoreEl.innerText = 0;

  roundNumber.innerText = 1;

  statusText.innerText =
  "Chọn chiêu để bắt đầu ✨";

  playerHand.src =
  images.rock;

  computerHand.src =
  images.rock;

  popup.classList.add("hidden");

  enableButtons();

}

/* BUTTON */

function disableButtons(){

  buttons.forEach(btn=>{

    btn.disabled = true;

  });

}

function enableButtons(){

  buttons.forEach(btn=>{

    btn.disabled = false;

  });

}

/* AUDIO */

function playAudio(audio){

  audio.pause();

  audio.currentTime = 0;

  audio.play().catch(()=>{});

}

/* WAIT */

function wait(ms){

  return new Promise(resolve=>{

    setTimeout(resolve,ms);

  });

}

/* RESET BUTTON */

document
.getElementById("resetBtn")
.addEventListener(
  "click",
  resetGame
);

/* POPUP BUTTON */

popupBtn.addEventListener(
  "click",
  resetGame
);

/* AVATAR */

document
.getElementById("avatarUpload")
.addEventListener("change",(e)=>{

  const file =
  e.target.files[0];

  if(!file) return;

  const reader =
  new FileReader();

  reader.onload = function(event){

    document
    .getElementById("playerAvatar")
    .src = event.target.result;

  };

  reader.readAsDataURL(file);

});