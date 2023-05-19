import { describe, expect, it } from "vitest";
import { capitalizeText, isAlphabetic, parseLines } from "./string.js";
import { toArray } from "./promise.js";

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

describe(parseLines.name, () => {
  it("parse a line", async () => {
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

  it("parse lines", async () => {
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

  it("parse a line without a trailing newline", async () => {
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

  it("parse lines without a trailing newline", async () => {
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

  it("parse broken lines", async () => {
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
