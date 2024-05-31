let btn = document.querySelectorAll(".btn");
let restart = document.querySelector(".restart");
let gameMatrix = document.querySelectorAll(".game > div");
const gameDiv = document.querySelector(".game");
const endGameDiv = document.querySelector(".end");
const nextRoundBtn = document.querySelector(".round");
nextRoundBtn.addEventListener("click", () => {
  endGameDiv.style.zIndex = "-1";
  endGameDiv.style.opacity = "0";
  gameMatrix.forEach((e) => {
    console.log(e.classList.remove("selected"));
    e.querySelector(".after").classList.remove("X--played");
    e.querySelector(".after").classList.remove("O--played");
    pos = 0;
    theMatrix = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  });
});
let TheGame = {};
let winner = {};
let c = 0;
let pos = 0;
let theMatrix = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
let turnMatrix = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];

btn.forEach((e) => {
  e.addEventListener("click", CreateGame);
});
// Create The Game
function CreateGame() {
  let choise;
  let opp;
  let player_2 = {};
  let playerOne;
  let playerTwo;
  let mainGame = document.getElementById("main");
  document.querySelectorAll("input[type = radio]").forEach((e) => {
    e.checked == true ? (choise = e.id) : "";
  });
  this.getAttribute("data-player") == "cpu"
    ? ((playerOne = "You"), (playerTwo = "CPU"))
    : ((playerOne = "P1"), (playerTwo = "P2"));
  TheGame.player_1 = {
    value: choise,
    name: playerOne,
    score: 0,
  };
  choise == "X" ? (opp = "O") : (opp = "X");
  TheGame.player_2 = {
    name: playerTwo,
    value: opp,
    score: 0,
  };
  mainGame.classList.add("disp");
  clearPage(TheGame);
  mainGame.classList.add("disp");

  if (TheGame.player_2.name == "CPU") {
    cpuPlay(TheGame.player_2.value, TheGame);
  }
  gameMatrix.forEach(function (e, i) {
    // e.onhover = e.style.opacity = 0;
    e.setAttribute("value", i);
    e.addEventListener("click", () => test(e, pos, TheGame));
  });
  if (turnMatrix[pos] == "O") {
    el.querySelector(".after").classList.add("O--played");
    gameDiv.classList.add("O--turn");
    gameDiv.classList.remove("X--turn");
  } else {
    gameDiv.classList.add("X--turn");
    gameDiv.classList.remove("O--turn");
  }
  console.log(gameMatrix);
  return TheGame;
}
function clearPage(dd) {
  document.querySelector(".main_create").remove();
  play(dd);
}
function play(game) {
  let player_1 = document.querySelector(".player1_info  span");
  let player_2 = document.querySelector(".player2_info  span");
  let first;

  // Object.keys(game).map((e) => {
  //   // Object.keys(game.e).map((el) => {
  //   //   game.e.value == "X" ? (first = e) : "";
  //   // });
  // })
  Object.entries(game).forEach((e) => {
    e[1].value == "X" ? (first = e) : "";
  });
  player_1.innerText = `(${game.player_1.name})`;
  document.querySelector(
    ".player1_info .value"
  ).innerText = `${game.player_1.value}`;
  player_2.innerText = `(${game.player_2.name})`;
  document.querySelector(
    ".player2_info .value"
  ).innerText = `${game.player_2.value}`;
  console.log(first[1].name);
  console.log(player_1);
  console.log(player_2);

  console.log(game);
}

function turn(el, position, players) {
  if (el.classList.contains("selected") == false) {
    let num = +el.getAttribute("data-value");
    let x = 0;
    el.classList.add("selected");
    num > 2 && num < 6
      ? ((num -= 3), (x = 1))
      : num >= 6
      ? ((num -= 6), (x = 2))
      : "";
    theMatrix[x][num] = turnMatrix[pos];
    console.log(+el.getAttribute("value"));
    if (turnMatrix[position] == "O") {
      el.querySelector(".after").classList.add("O--played");
      gameDiv.classList.add("X--turn");
      gameDiv.classList.remove("O--turn");
    } else {
      gameDiv.classList.add("O--turn");
      gameDiv.classList.remove("X--turn");
      el.querySelector(".after").classList.add("X--played");
    }
    if (!check(theMatrix, el, turnMatrix[pos])) {
      endGameDiv.style.zIndex = "551";
      endGameDiv.style.opacity = "1";
      winner.winnerLitter = turnMatrix[pos];
      endGameDiv.querySelector(".value").innerHTML = winner.winnerLitter;
      for (let [player, playerObj] of Object.entries(TheGame)) {
        if (playerObj.value == turnMatrix[pos]) {
          console.log(playerObj.value);
          console.log(playerObj.value == turnMatrix[pos]);
          endGameDiv.querySelector(".won").innerHTML = playerObj.name + " Won";
          playerObj.score += 1;
          if (turnMatrix[pos] == "X") {
            document.querySelector(".player1_info .num").innerHTML =
              playerObj.score;
          } else {
            document.querySelector(".player2_info .num").innerHTML =
              playerObj.score;
          }
        }
      }
      console.log(TheGame);
    }
    pos++;
  }
}
function check(theMatrix, element, value) {
  let num = +element.getAttribute("value");
  let x;
  if (num > 2 && num < 6) {
    x = 1;
    num -= 3;
  } else if (num >= 6) {
    x = 2;
    num -= 6;
  } else {
    x = 0;
  }
  if (new Set(theMatrix[x]).size == 1 && theMatrix[x][0] != null) {
    return false;
  } else if (
    new Set([theMatrix[0][num], theMatrix[1][num], theMatrix[2][num]]).size ==
      1 &&
    theMatrix[0][num] != null
  ) {
    return false;
  } else if (
    (new Set([theMatrix[0][0], theMatrix[1][1], theMatrix[2][2]]).size == 1 &&
      theMatrix[0][0] != null) ||
    (new Set([theMatrix[0][2], theMatrix[1][1], theMatrix[2][0]]).size == 1 &&
      theMatrix[1][1] != null)
  ) {
    return false;
  } else return true;
}
function cpuPlay(value, theGame) {
  let numd = Math.trunc(Math.random() * 9);
  let element = document.querySelector(`[data-value ="${numd}"]`);
  let x;
  if (turnMatrix[pos] == value) {
    numd > 2 && numd < 6
      ? ((numd -= 3), (x = 1))
      : numd >= 6
      ? ((numd -= 6), (x = 2))
      : (x = 0);
    if (theMatrix[x][numd] === null) {
      console.log("ddd");
      theMatrix[x][numd] = value;
      turn(element, pos, theGame);
    } else cpuPlay(value, theGame);
  }
}
function test(el, position, players) {
  turn(el, position, players);
  if (players.player_2.name == "CPU") {
    cpuPlay(players.player_2.value, players);
  }
}
restart.addEventListener("click", () => {
  let rest = document.querySelector(".rest");
  rest.style.zIndex = "549";
  rest.style.opacity = 1;
});
function restartGame() {
  TheGame = {};
}
