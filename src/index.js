import randomWords from "random-words";

import "normalize.css";
import "./styles/style.scss";

const words = randomWords(25);
const activeCharIndex = 0;
const $wordList = document.getElementById("word-list");

const renderWords = () => {
  let charIndex = 0;

  words.forEach((word, index) => {
    const isLast = index === words.length - 1;
    const $p = document.createElement("p");

    $p.className = "word";

    word.split("").forEach((char) => {
      const isActive = charIndex === activeCharIndex;
      const isTyped = charIndex < activeCharIndex;
      const $span = document.createElement("span");
      let spanClass = "char";

      if (isTyped) spanClass += " typed";
      if (isActive) spanClass += " active";

      $span.className = spanClass;
      $span.innerText = char;

      charIndex++;

      $p.appendChild($span);
    });

    $wordList.appendChild($p);

    if (!isLast) {
      const isActive = charIndex === activeCharIndex;
      const $p = document.createElement("p");
      const $span = document.createElement("span");

      $p.className = "word";
      $span.className = isActive ? "char space active" : "char space";
      $span.innerText = "_";

      charIndex++;

      $p.appendChild($span);
      $wordList.appendChild($p);
    }
  });
};

renderWords();
