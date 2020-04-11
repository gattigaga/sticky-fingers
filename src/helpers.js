export const getTotalChars = (words) => {
  const totalChars = words.reduce((acc, word) => {
    return acc + word.length;
  }, 0);

  return totalChars + words.length - 1;
};
