import randomWords from "random-words";

import "normalize.css";
import "./styles/style.scss";

const $wordList = document.getElementById("word-list");
const words = randomWords(25);
const wrongCharIndexes = [];
let activeCharIndex = 0;
let activeCharKey = null;

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

  if (isValid) {
    activeCharIndex++;
    renderWords();
  } else {
    const isNoted = wrongCharIndexes.includes(activeCharIndex);

    if (!isNoted) {
      wrongCharIndexes.push(activeCharIndex);
    }
  }
});

renderWords();
