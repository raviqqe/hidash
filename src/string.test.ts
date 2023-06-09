import { describe, expect, it } from "vitest";
import { toArray } from "./promise.js";
import {
  isLowerCase,
  capitalizeText,
  isAlphabetic,
  parseLines,
  isUpperCase,
} from "./string.js";

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

it("checks if a text is in lower case", () => {
  expect(isLowerCase("")).toBe(true);
  expect(isLowerCase("a")).toBe(true);
  expect(isLowerCase("A")).toBe(false);
  expect(isLowerCase("aA")).toBe(false);
});

it("checks if a text is in upper case", () => {
  expect(isUpperCase("")).toBe(true);
  expect(isUpperCase("a")).toBe(false);
  expect(isUpperCase("A")).toBe(true);
  expect(isUpperCase("aA")).toBe(false);
});

it("capitalizes a text into a sentence case", () => {
  expect(capitalizeText("")).toBe("");
  expect(capitalizeText("a")).toBe("A");
  expect(capitalizeText("aa")).toBe("Aa");
  expect(capitalizeText("a b")).toBe("A b");
});

describe(parseLines.name, () => {
  it("parses a line", async () => {
    expect(
      await toArray(
        parseLines(
          (async function* () {
            yield "a\n";
          })()
        )
      )
    ).toEqual(["a"]);
  });

  it("parses lines", async () => {
    expect(
      await toArray(
        parseLines(
          (async function* () {
            yield "a\n";
            yield "b\n";
          })()
        )
      )
    ).toEqual(["a", "b"]);
  });

  it("parses a line without a trailing newline", async () => {
    expect(
      await toArray(
        parseLines(
          (async function* () {
            yield "a";
          })()
        )
      )
    ).toEqual(["a"]);
  });

  it("parses lines without a trailing newline", async () => {
    expect(
      await toArray(
        parseLines(
          (async function* () {
            yield "a\n";
            yield "b";
          })()
        )
      )
    ).toEqual(["a", "b"]);
  });

  it("parses broken lines", async () => {
    expect(
      await toArray(
        parseLines(
          (async function* () {
            yield "a";
            yield "b";
            yield "\n";
            yield "c";
            yield "d";
            yield "\n";
          })()
        )
      )
    ).toEqual(["ab", "cd"]);
  });
});
