import { expect, it } from "vitest"
import { capitalizeText, isAlphabetic } from "./string.js";

it("detects if a string is alphabetic", () => {
  expect(isAlphabetic("")).toBe(true);
  expect(isAlphabetic("a")).toBe(true);
  expect(isAlphabetic("A")).toBe(true);
  expect(isAlphabetic("α")).toBe(true);
  expect(isAlphabetic("Α")).toBe(true);
  expect(isAlphabetic(" ")).toBe(false);
  expect(isAlphabetic("あ")).toBe(false);
  expect(isAlphabetic(",")).toBe(false);
  expect(isAlphabetic("aa")).toBe(true);
  expect(isAlphabetic("a ")).toBe(false);
});

it("capitalizes a text into a sentence case", () => {
  expect(capitalizeText("")).toBe("");
  expect(capitalizeText("a")).toBe("A");
  expect(capitalizeText("aa")).toBe("Aa");
  expect(capitalizeText("a b")).toBe("A b");
});

