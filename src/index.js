import randomWords from "random-words";

import "normalize.css";
import "./styles/style.scss";

const $wordList = document.getElementById("word-list");
let wrongCharIndexes = [];
let words = randomWords(20);
let activeCharIndex = 0;
let activeCharKey = null;

const getTotalChars = (words) => {
  return words.reduce((acc, word) => {
    return acc + word.length;
  }, 0);
};

const renderWords = () => {
  let charIndex = 0;

  $wordList.innerHTML = "";

  words.forEach((word, index) => {
    const isLast = index === words.length - 1;
    const $p = document.createElement("p");

    $p.className = "word";

    word.split("").forEach((char) => {
      const isActive = charIndex === activeCharIndex;
      const isTyped = charIndex < activeCharIndex;
      const isError = wrongCharIndexes.includes(charIndex);
      const $span = document.createElement("span");
      let spanClass = "char";

      if (isTyped) {
        spanClass += " typed";
      }

      if (isError) {
        spanClass += " error";
      }

      if (isActive) {
        spanClass += " active";
        activeCharKey = char.charCodeAt(0) - 32;
      }

      $span.className = spanClass;
      $span.innerText = char;

      charIndex++;

      $p.appendChild($span);
    });

    $wordList.appendChild($p);

    if (!isLast) {
      const isActive = charIndex === activeCharIndex;
      const isError = wrongCharIndexes.includes(charIndex);
      const $p = document.createElement("p");
      const $span = document.createElement("span");
      let spanClass = "char space";

      if (isError) {
        spanClass += " error";
      }

      if (isActive) {
        spanClass += " active";
        activeCharKey = 32;
      }

      $p.className = "word";
      $span.className = spanClass;
      $span.innerText = "_";

      charIndex++;

      $p.appendChild($span);
      $wordList.appendChild($p);
    }
  });
};

document.addEventListener("keydown", (event) => {
  const keyCode = event.keyCode;
  const isValid = keyCode === activeCharKey;
  const totalChars = getTotalChars(words) + words.length - 1;
  const isFinish = activeCharIndex === totalChars - 1;

  if (isValid) {
    activeCharIndex++;

    if (isFinish) {
      wrongCharIndexes = [];
      words = randomWords(20);
      activeCharIndex = 0;
    }

    renderWords();
  } else {
    const isNoted = wrongCharIndexes.includes(activeCharIndex);

    if (!isNoted) {
      wrongCharIndexes.push(activeCharIndex);
    }
  }
});

renderWords();
