import { getTotalChars } from "../helpers";

it("returns total chars", () => {
  const words = ["hello", "javascript", "world"];
  const value = getTotalChars(words);
  const expected = 22;

  expect(value).toBe(expected);
});
