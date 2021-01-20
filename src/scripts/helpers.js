import randomWords from "random-words";
import { compose, map, flatten, find, findIndex, filter } from "lodash/fp";

/**
 * Get total chars of words.
 * Example: "hello world" words has total 11 chars.
 *
 * @param {Object[]} words Words that contains the chars
 * @return {Number} Total chars
 */
export const getTotalChars = (words) => {
  return compose(
    (chars) => chars.length,
    flatten,
    map((word) => word.chars)
  )(words);
};

/**
 * Get total chars of words that mistyped.
 * Example: "h*llo wor*d" words has total 2 mistyped chars.
 *
 * @param {Object[]} words Words that contains the chars
 * @return {Number} Total mistyped chars
 */
export const getTotalErrors = (words) => {
  return compose(
    (chars) => chars.length,
    filter((char) => char.isError),
    flatten,
    map((word) => word.chars)
  )(words);
};

/**
 * Get your typing speed based on how much words you can correctly
 * type in specified amount of time.
 *
 * @param {Number} time Time in milliseconds
 * @param {Object[]} words Words that contains the chars
 * @return {Number} Typing speed
 */
export const getSpeed = (time, words) => {
  const totalChars = getTotalChars(words);
  const timeInMinutes = time / 60000;
  const result = totalChars / 5 / timeInMinutes;

  return Number(result.toFixed(1));
};

/**
 * Get index of current active char that need to type.
 * Example: the index of active char in "hello *orld" words is 6.
 *
 * @param {Object[]} words Words that contains the chars
 * @return {Number} Index of active char
 */
export const getActiveCharIndex = (words) => {
  return compose(
    findIndex((char) => char.isActive),
    flatten,
    map((word) => word.chars)
  )(words);
};

/**
 * Set index of char that need to be active.
 * There is only one active char in the words.
 *
 * @param {Number} index Index of char that need to be active
 * @param {Object[]} words Words that contains the chars
 * @return {Object[]} Updated words with new active char
 */
export const setActiveCharIndex = (index, words) => {
  let charIndex = 0;

  return words.map((word) => {
    const chars = word.chars.map((char) => {
      const isActive = index === charIndex;
      const isTyped = charIndex < index;

      charIndex++;

      return { ...char, isTyped, isActive };
    });

    return { ...word, chars };
  });
};

/**
 * Set index of char that need to be error.
 * Multiple char errors in the words is possible.
 *
 * @param {Number} index Index of char that need to be error
 * @param {Object[]} words Words that contains the chars
 * @return {Object[]} Updated words with new error char
 */
export const setErrorCharIndex = (index, words) => {
  let charIndex = 0;

  return words.map((word) => {
    const chars = word.chars.map((char) => {
      const isError = index === charIndex || char.isError;

      charIndex++;

      return { ...char, isError };
    });

    return { ...word, chars };
  });
};

/**
 * Generate specified amount of words.
 *
 * @param {Number} totalWords How much words should be generated ?
 * @param {Number} offset Default index of active char
 * @return {Object[]} Words
 */
export const generateWords = (totalWords, offset = 0) => {
  const totalSpaces = totalWords - 1;
  const totalAll = totalSpaces + totalWords;
  const words = randomWords(totalWords);
  let wordIndex = 0;
  let globalCharIndex = 0;

  const results = Array.from({ length: totalAll }).map((_, index) => {
    const isSpace = index % 2 === 1;
    const isLast = index === totalAll - 1;
    const word = isSpace ? "_" : words[wordIndex];

    if (!isSpace) {
      wordIndex++;
    }

    const chars = word.split("").map((char) => {
      const code = isSpace ? 32 : char.charCodeAt(0) - 32;
      const isActive = offset === globalCharIndex;

      globalCharIndex++;

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

/**
 * Check if currently pressed key match with active char.
 *
 * @param {Number} keyCode Code of key that currently pressed
 * @param {Object[]} words Words that contains the chars
 * @return {Boolean} Is match ?
 */
export const isActiveCharMatch = (keyCode, words) => {
  return compose(
    (char) => keyCode === char.code,
    find((char) => char.isActive),
    flatten,
    map((word) => word.chars)
  )(words);
};

/**
 * Check if active char is at the last index.
 *
 * @param {Object[]} words Words that contains the chars
 * @return {Boolean} Is at last ?
 */
export const isActiveCharLast = (words) => {
  const totalChars = getTotalChars(words);
  const convertedFind = find.convert({ cap: false });

  return compose(
    (char) => !!char,
    convertedFind((char, index) => {
      const isActive = char.isActive;
      const isLast = index === totalChars - 1;

      return isActive && isLast;
    }),
    flatten,
    map((word) => word.chars)
  )(words);
};
