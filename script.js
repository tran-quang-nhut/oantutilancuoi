const choices = {

  rock:"Rock.png",
  paper:"Paper.png",
  scissors:"Scissors.png"
};

/* SCORE */

let win = 0;
let lose = 0;
let draw = 0;

let totalRounds = 0;

const MAX_ROUNDS = 10;

const TARGET_WIN = 3;

let isPlaying = false;

let gameEnded = false;

/* ELEMENTS */

const playerImg =
document.getElementById(
  "playerImg"
);

const computerImg =
document.getElementById(
  "computerImg"
);

const resultText =
document.getElementById(
  "result"
);

const continueBtn =
document.getElementById(
  "continueBtn"
);

const roundText =
document.getElementById(
  "roundText"
);

const winScore =
document.getElementById(
  "winScore"
);

const loseScore =
document.getElementById(
  "loseScore"
);

const drawScore =
document.getElementById(
  "drawScore"
);

/* POPUP */

const winPopup =
document.getElementById(
  "winPopup"
);

const losePopup =
document.getElementById(
  "losePopup"
);

/* AUDIO */

const battleSound =
document.getElementById(
  "battleSound"
);

/* UNLOCK AUDIO MOBILE */

let audioUnlocked = false;

function unlockAudio(){

  if(audioUnlocked) return;

  battleSound.play()
  .then(() => {

    battleSound.pause();

    battleSound.currentTime = 0;

    audioUnlocked = true;
  })
  .catch(() => {});
}

document.addEventListener(
  "touchstart",
  unlockAudio,
  { once:true }
);

document.addEventListener(
  "click",
  unlockAudio,
  { once:true }
);

/* RANDOM */

function randomChoice(){

  const arr = [
    "rock",
    "paper",
    "scissors"
  ];

  return arr[
    Math.floor(Math.random()*3)
  ];
}

/* START GAME */

async function startGame(choice){

  if(isPlaying) return;

  if(gameEnded) return;

  if(totalRounds >= MAX_ROUNDS)
  return;

  isPlaying = true;

  continueBtn.style.display =
  "none";

  resultText.innerHTML =
  "⏳ Đang ra kéo búa bao...";

  /* RESET AUDIO */

  try{

    battleSound.pause();

    battleSound.currentTime = 0;

    await battleSound.play();

  }

  catch(err){

    console.log(err);
  }

  /* 3 SECOND ANIMATION */

  const duration = 3000;

  const interval = 300;

  const loops =
  duration / interval;

  for(let i = 0; i < loops; i++){

    playerImg.src =
    choices[randomChoice()];

    computerImg.src =
    choices[randomChoice()];

    playerImg.classList.add(
      "battle-animation"
    );

    computerImg.classList.add(
      "battle-animation"
    );

    setTimeout(() => {

      playerImg.classList.remove(
        "battle-animation"
      );

      computerImg.classList.remove(
        "battle-animation"
      );

    },250);

    await new Promise(resolve =>
      setTimeout(resolve,interval)
    );
  }

  /* FINAL RESULT */

  const computerChoice =
  randomChoice();

  playerImg.src =
  choices[choice];

  computerImg.src =
  choices[computerChoice];

  totalRounds++;

  roundText.innerHTML =
  `${totalRounds} / ${MAX_ROUNDS}`;

  let result = "";

  /* DRAW */

  if(choice === computerChoice){

    draw++;

    result =
    "🤝 Hòa rồi!";
  }

  /* WIN */

  else if(

    (choice === "rock" &&
    computerChoice === "scissors")

    ||

    (choice === "paper" &&
    computerChoice === "rock")

    ||

    (choice === "scissors" &&
    computerChoice === "paper")
  ){

    win++;

    result =
    "🎉 Bạn thắng!";

    launchConfetti();
  }

  /* LOSE */

  else{

    lose++;

    result =
    "😵 Bạn thua!";
  }

  resultText.innerHTML =
  result;

  winScore.innerHTML = win;

  loseScore.innerHTML = lose;

  drawScore.innerHTML = draw;

  continueBtn.style.display =
  "inline-block";

  /* WIN POPUP */

  if(win >= TARGET_WIN){

    gameEnded = true;

    setTimeout(() => {

      winPopup.classList.add(
        "show"
      );

      launchConfetti();

    },700);
  }

  /* LOSE POPUP */

  else if(

    totalRounds >= MAX_ROUNDS
    &&
    win < TARGET_WIN
  ){

    gameEnded = true;

    setTimeout(() => {

      losePopup.classList.add(
        "show"
      );

    },700);
  }

  isPlaying = false;
}

/* CONTINUE */

continueBtn.addEventListener(
  "click",
  () => {

    if(gameEnded) return;

    resultText.innerHTML =
    "Chọn vũ khí 👇";

    continueBtn.style.display =
    "none";
  }
);

/* CLOSE POPUP */

document.getElementById(
  "closeWin"
).onclick = () => {

  winPopup.classList.remove(
    "show"
  );
};

document.getElementById(
  "closeLose"
).onclick = () => {

  losePopup.classList.remove(
    "show"
  );
};

/* CONFETTI */

function launchConfetti(){

  for(let i = 0; i < 20; i++){

    const confetti =
    document.createElement("div");

    confetti.classList.add(
      "confetti"
    );

    confetti.style.left =
    Math.random()*100 + "vw";

    confetti.style.animationDuration =
    (Math.random()*2 + 2) + "s";

    document.body.appendChild(
      confetti
    );

    setTimeout(() => {

      confetti.remove();

    },4000);
  }
}