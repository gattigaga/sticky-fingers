import {
  generateWords,
  isActiveCharMatch,
  isActiveCharLast,
  getActiveCharIndex,
  setActiveCharIndex,
  setErrorCharIndex,
  getTotalErrors,
  getSpeed,
} from "./helpers";

import "normalize.css";
import "./styles/style.scss";

const $wordList = document.getElementById("word-list");
const $valueSpeed = document.getElementById("value-speed");
const $valueError = document.getElementById("value-error");
const totalWords = 20;
let words = generateWords(totalWords);
let startTime = 0;
let finishTime = 0;

const renderStatistics = () => {
  const elapsedTime = finishTime - startTime;
  const speed = elapsedTime ? getSpeed(elapsedTime, words) : 0;

  $valueError.innerText = getTotalErrors(words);
  $valueSpeed.innerText = speed;
};

const renderWords = () => {
  $wordList.innerHTML = "";

  words.forEach((word) => {
    const $p = document.createElement("p");

    $p.className = "word";

    word.chars.forEach((char) => {
      const $span = document.createElement("span");
      let spanClass = "char";

      if (word.isSpace) {
        spanClass += " space";
      }

      if (char.isTyped) {
        spanClass += " typed";
      }

      if (char.isError) {
        spanClass += " error";
      }

      if (char.isActive) {
        spanClass += " active";
      }

      $span.className = spanClass;
      $span.innerText = char.text;

      $p.appendChild($span);
    });

    $wordList.appendChild($p);
  });
};

document.addEventListener("keydown", (event) => {
  const keyCode = event.keyCode;
  const activeCharIndex = getActiveCharIndex(words);
  const isMatch = isActiveCharMatch(keyCode, words);
  const isFinish = isActiveCharLast(words);
  const isStart = activeCharIndex === 1;
  const offset = isFinish ? 0 : activeCharIndex + 1;

  if (isMatch) {
    if (isFinish) {
      finishTime = Date.now();

      renderStatistics();

      words = generateWords(totalWords);
    } else {
      if (isStart) {
        startTime = Date.now();
      }

      words = setActiveCharIndex(offset, words);
    }
  } else {
    words = setErrorCharIndex(activeCharIndex, words);
  }

  renderWords();
});

renderStatistics();
renderWords();
