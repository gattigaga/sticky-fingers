import { getSpeed } from "../helpers";

it("returns speed in wpm", () => {
  const words = [
    {
      text: "poetry",
      speed: 0,
      isLast: false,
      isSpace: false,
      chars: [
        {
          text: "p",
          code: 80,
          isTyped: false,
          isError: false,
          isActive: true,
        },
        {
          text: "o",
          code: 79,
          isTyped: false,
          isError: false,
          isActive: false,
        },
        {
          text: "e",
          code: 69,
          isTyped: false,
          isError: false,
          isActive: false,
        },
        {
          text: "t",
          code: 84,
          isTyped: false,
          isError: false,
          isActive: false,
        },
        {
          text: "r",
          code: 82,
          isTyped: false,
          isError: false,
          isActive: false,
        },
        {
          text: "y",
          code: 89,
          isTyped: false,
          isError: false,
          isActive: false,
        },
      ],
    },
    {
      text: "_",
      speed: 0,
      isLast: false,
      isSpace: true,
      chars: [
        {
          text: "_",
          code: 32,
          isTyped: false,
          isError: false,
          isActive: false,
        },
      ],
    },
    {
      text: "rocky",
      speed: 0,
      isLast: false,
      isSpace: false,
      chars: [
        {
          text: "r",
          code: 82,
          isTyped: false,
          isError: false,
          isActive: false,
        },
        {
          text: "o",
          code: 79,
          isTyped: false,
          isError: false,
          isActive: false,
        },
        {
          text: "c",
          code: 67,
          isTyped: false,
          isError: false,
          isActive: false,
        },
        {
          text: "k",
          code: 75,
          isTyped: false,
          isError: false,
          isActive: false,
        },
        {
          text: "y",
          code: 89,
          isTyped: false,
          isError: false,
          isActive: false,
        },
      ],
    },
    {
      text: "_",
      speed: 0,
      isLast: false,
      isSpace: true,
      chars: [
        {
          text: "_",
          code: 32,
          isTyped: false,
          isError: false,
          isActive: false,
        },
      ],
    },
    {
      text: "except",
      speed: 0,
      isLast: true,
      isSpace: false,
      chars: [
        {
          text: "e",
          code: 69,
          isTyped: false,
          isError: false,
          isActive: false,
        },
        {
          text: "x",
          code: 88,
          isTyped: false,
          isError: false,
          isActive: false,
        },
        {
          text: "c",
          code: 67,
          isTyped: false,
          isError: false,
          isActive: false,
        },
        {
          text: "e",
          code: 69,
          isTyped: false,
          isError: false,
          isActive: false,
        },
        {
          text: "p",
          code: 80,
          isTyped: false,
          isError: false,
          isActive: false,
        },
        {
          text: "t",
          code: 84,
          isTyped: false,
          isError: false,
          isActive: false,
        },
      ],
    },
  ];

  const value = getSpeed(10000, words);
  const expected = 22.8;

  expect(value).toBe(expected);
});
