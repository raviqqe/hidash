import { toArray } from "@raviqqe/loscore/async";
import { describe, expect, it } from "vitest";
import { parseLines } from "./string.js";

describe(parseLines.name, () => {
  it("parses a line", async () => {
    expect(
      await toArray(
        parseLines(
          (async function* () {
            yield "a\n";
          })(),
        ),
      ),
    ).toEqual(["a"]);
  });

  it("parses lines", async () => {
    expect(
      await toArray(
        parseLines(
          (async function* () {
            yield "a\n";
            yield "b\n";
          })(),
        ),
      ),
    ).toEqual(["a", "b"]);
  });

  it("parses a line without a trailing newline", async () => {
    expect(
      await toArray(
        parseLines(
          (async function* () {
            yield "a";
          })(),
        ),
      ),
    ).toEqual(["a"]);
  });

  it("parses lines without a trailing newline", async () => {
    expect(
      await toArray(
        parseLines(
          (async function* () {
            yield "a\n";
            yield "b";
          })(),
        ),
      ),
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
          })(),
        ),
      ),
    ).toEqual(["ab", "cd"]);
  });
});
