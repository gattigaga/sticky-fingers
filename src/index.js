import {
  generateWords,
  isActiveCharMatch,
  isActiveCharLast,
  getActiveCharIndex,
  setActiveCharIndex,
  setErrorCharIndex,
  getTotalErrors,
} from "./helpers";

import "normalize.css";
import "./styles/style.scss";

const $wordList = document.getElementById("word-list");
const $valueError = document.getElementById("value-error");
let words = generateWords(20);

const renderStatistics = () => {
  $valueError.innerText = getTotalErrors(words);
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
  const isMatch = isActiveCharMatch(keyCode, words);
  const isFinish = isActiveCharLast(words);
  const activeCharIndex = getActiveCharIndex(words);
  const offset = isFinish ? 0 : activeCharIndex + 1;

  if (isMatch) {
    if (isFinish) {
      renderStatistics();

      words = generateWords(20);
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
