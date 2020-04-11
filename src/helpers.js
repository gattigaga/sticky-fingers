import randomWords from "random-words";

export const getTotalChars = (words) => {
  const totalChars = words.reduce((acc, word) => {
    return acc + word.length;
  }, 0);

  return totalChars + words.length - 1;
};

export const generateWords = (totalWords) => {
  const totalSpaces = totalWords - 1;
  const totalAll = totalSpaces + totalWords;
  const words = randomWords(totalWords);
  let wordIndex = 0;

  const results = Array.from({ length: totalAll }).map((_, index) => {
    const isSpace = index % 2 === 1;
    const isLast = index === totalAll - 1;
    const word = isSpace ? "_" : words[wordIndex];

    if (!isSpace) {
      wordIndex++;
    }

    const chars = word.split("").map((char, charIndex) => {
      const code = isSpace ? 32 : char.charCodeAt(0) - 32;
      const isActive = index === 0 && charIndex === 0;

      return {
        text: char,
        code: code,
        isTyped: false,
        isError: false,
        isActive,
      };
    });

    return {
      text: word,
      speed: 0,
      isLast,
      isSpace,
      chars,
    };
  });

  return results;
};
