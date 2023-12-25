let submit = document.getElementById("submit");

let playerO = "O";
let playerX = "X";

const submitted = () => {
  playerO = document.getElementById("playerO").value;
  playerX = document.getElementById("playerX").value;
};

submit.addEventListener("click", submitted);

let button = document.querySelectorAll(".box");

let reset = document.querySelector("#Reset");

let x = true;

let wincomment = document.querySelector("h3");

let count = 0;

let win = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

button.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("putting xoxo");
    if (x === true) {
      box.innerText = "X";
      x = false;
      if (muted === false) {
        xsound();
      }
    } else {
      box.innerText = "O";
      x = true;
      if (muted === false) {
        osound();
      }
    }
    box.disabled = true;
    count++;

    if (count == 9) {
      gamedraw();
    }
    checkwinner();
  });
});

reset.addEventListener("click", () => {
  button.forEach((box) => {
    box.innerText = "";
  });
  enable();
  wincomment.innerText = "";
  count = 0;
});

const gamedraw = () => {
  wincomment.innerText =
    "Game is Draw!!! " + playerX + " and " + playerO + " both are winner!!!";
  if (muted === false) {
      winsound();
    }
    confetti();
};

const checkwinner = () => {
  for (let pattern of win) {
    let first = button[pattern[0]].innerText;
    let second = button[pattern[1]].innerText;
    let third = button[pattern[2]].innerText;

    if (first != "" && second != "" && third != "") {
      if (first == second && second == third) {
        console.log("winner is " + first);
        disable();
        if (first === "X") {
          wincomment.innerText = "winner is " + playerX + "!!!";
        } else {
          wincomment.innerText = "winner is " + playerO + "!!!";
        }
        if (muted === false) {
          winsound();
        }
        confetti();
      }
    }
  }
};

const disable = () => {
  for (const box of button) {
    box.disabled = true;
  }
};

const enable = () => {
  for (const box of button) {
    box.disabled = false;
  }
};

const xsound = () => {
  let audio = new Audio("xsound.wav");
  audio.play();
};

const osound = () => {
  let audio = new Audio("osound.wav");
  audio.play();
};

const winsound = () => {
  let audio = new Audio("win.wav");
  audio.play();
};

let mute = document.querySelector(".span");
let muted = false;

mute.addEventListener("click", () => {
  if (muted === true) {
    mute.style.backgroundImage = 'url("sound.png")';
    muted = false;
  } else {
    mute.style.backgroundImage = 'url("nosound.png")';
    muted = true;
  }
});
