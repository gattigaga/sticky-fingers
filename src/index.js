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
const $valueErrorGain = document.getElementById("value-error-gain");
const $valueSpeedGain = document.getElementById("value-speed-gain");

const totalWords = 20;
let words = generateWords(totalWords);
let startTime = 0;
let finishTime = 0;
let prevTotalErrors = 0;
let prevSpeed = 0;

const renderStatistics = () => {
  const elapsedTime = finishTime - startTime;
  const speed = elapsedTime ? getSpeed(elapsedTime, words) : 0;
  const totalErrors = getTotalErrors(words);
  const errorGain = totalErrors - prevTotalErrors;
  const speedGain = Number((speed - prevSpeed).toFixed(1));
  let errorGainLabel = errorGain;
  let speedGainLabel = speedGain;
  let errorGainClass = "value small";
  let speedGainClass = "value small";

  if (errorGain > 0) {
    errorGainLabel = `+${errorGain}`;
    errorGainClass += " negative";
  }

  if (errorGain < 0) {
    errorGainLabel = errorGain;
    errorGainClass += " positive";
  }

  if (speedGain > 0) {
    speedGainLabel = `+${speedGain}`;
    speedGainClass += " positive";
  }

  if (speedGain < 0) {
    speedGainLabel = speedGain;
    speedGainClass += " negative";
  }

  prevTotalErrors = totalErrors;
  prevSpeed = speed;

  $valueError.innerText = totalErrors;
  $valueSpeed.innerText = speed;
  $valueErrorGain.innerText = errorGainLabel;
  $valueSpeedGain.innerText = speedGainLabel;
  $valueErrorGain.className = errorGainClass;
  $valueSpeedGain.className = speedGainClass;
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
  const isStart = activeCharIndex === 0;
  const offset = isFinish ? 0 : activeCharIndex + 1;

  if (isStart) {
    startTime = Date.now();
  }

  if (isMatch) {
    if (isFinish) {
      finishTime = Date.now();

      renderStatistics();

      words = generateWords(totalWords);
    } else {
      words = setActiveCharIndex(offset, words);
    }
  } else {
    words = setErrorCharIndex(activeCharIndex, words);
  }

  renderWords();
});

renderStatistics();
renderWords();
