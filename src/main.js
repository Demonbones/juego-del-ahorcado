const btnStart = document.querySelector(".ahorcado__btn-start");
const canvas = document.querySelector(".ahorcado__ilustration");
const wrongLetters = document.querySelector(".ahorcado__wrong-letters");
const containerMatch = document.querySelector(".ahorcado__match-letters");
const label = document.getElementById("ahorcado__label");
const input = document.getElementById("hiddenInput");
const modal = document.querySelector(".status-modal");
const modalTitle = document.querySelector(".status__title");
const modalMessage = document.querySelector(".status__message");
const modalImg = document.querySelector(".status__img");
const modalBtn = document.querySelector(".status-btn");
const modalSpan = document.createElement("span");
import { lose, win } from "./texts-modal.js";
import arrayWords from "./palabras";
let word;
let winer = [];

const ctx = canvas.getContext("2d");

const bodyParts = [
  [4, 2, 1, 1],
  [4, 3, 1, 2],
  [3, 5, 1, 1],
  [5, 5, 1, 1],
  [3, 3, 1, 1],
  [5, 3, 1, 1],
];
function randomWord(arrayWords) {
  let indexRandom = Math.floor(Math.random() * arrayWords.length);
  let word = arrayWords[indexRandom];
  return word;
}

function containerwords(word) {
  if (containerMatch.children.length > 0) containerMatch.innerHTML = "";

  let letters = word.split("");

  letters.forEach(() => {
    let span = document.createElement("span");
    span.innerText = " ";
    containerMatch.appendChild(span);
  });
  return word;
}

function startGame() {
  const isTouchDevice = Boolean(navigator.maxTouchPoints);
  wrongLetters.innerHTML = "";
  ctx.canvas.width = 120;
  ctx.canvas.height = 160;
  ctx.fillStyle = "#d95d39";
  ctx.scale(20, 20);
  ctx.fillRect(0, 7, 4, 1);
  ctx.fillRect(1, 0, 1, 8);
  ctx.fillRect(1, 0, 4, 1);
  ctx.fillRect(4, 1, 1, 1);

  word = randomWord(arrayWords);
  containerwords(word);
  console.log(word);
  winer = [];

  if (isTouchDevice) {
    input.focus();
    document.addEventListener("input", handleKeyPreesTouch);
    label.classList.add("horcado__label");
  } else {
    document.addEventListener("keyup", handleKeyPrees);
  }
}

function handleKeyPreesTouch() {
  input.focus();
  const key = input.value.toLowerCase();
  winOrLose(key, word);
  input.value = "";
}

function handleKeyPrees(event) {
  const key = event.key;
  winOrLose(key, word);
}
function handleModal() {
  modal.classList.toggle("status-modal--active");
  startGame();
}

btnStart.addEventListener("click", startGame);

function winOrLose(key, word) {
  if (key.length === 1 && /[a-z]/i.test(key)) {
    if (word.includes(key)) {
      for (let i = 0; i <= word.length; i++) {
        if (word[i] === key) {
          containerMatch.children[i].innerHTML = word[i];

          winer[i] = word[i];
        }
      }
    } else {
      if (wrongLetters.textContent.length === 0) {
        wrongLetters.innerHTML += key;
        ctx.fillStyle = "white";
        ctx.fillRect(...bodyParts[wrongLetters.innerText.length - 1]);
      }
      if (wrongLetters.textContent.length > 0) {
        if (wrongLetters.textContent.includes(key)) {
          return;
        } else {
          wrongLetters.innerHTML += key;
          ctx.fillStyle = "white";
          ctx.fillRect(...bodyParts[wrongLetters.innerText.length - 1]);
        }
      }

      if (wrongLetters.innerText.length >= 6) {
        modalTitle.innerHTML = lose.title;
        modalMessage.innerHTML = lose.message;
        modalSpan.innerHTML = word;
        modalMessage.appendChild(modalSpan).classList.add("status__word");
        modalImg.src = lose.urlImage;
        modalBtn.innerHTML = lose.textBtn;
        modalBtn.addEventListener("click", handleModal);
        modal.classList.toggle("status-modal--active");
        document.removeEventListener("keyup", handleKeyPrees);
        document.removeEventListener("input", handleKeyPreesTouch);
      }
    }

    if (winer.join("") === word) {
      modalTitle.innerHTML = win.title;
      modalMessage.innerHTML = win.message;
      modalSpan.innerHTML = word;
      modalMessage.appendChild(modalSpan).classList.add("status__word");
      modalImg.src = win.urlImage;
      modalBtn.innerHTML = win.textBtn;
      modalBtn.addEventListener("click", handleModal);
      modal.classList.toggle("status-modal--active");
      document.removeEventListener("keyup", handleKeyPrees);
      document.removeEventListener("input", handleKeyPreesTouch);
    }
  }
}
