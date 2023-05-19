import { describe, expect, it } from "vitest";
import { parse, stringify } from "./csv.js";
import { toArray } from "./promise.js";

describe(parse.name, () => {
  it("parses nothing", async () => {
    expect(
      await toArray(
        parse(
          (async function* () {
            yield "";
          })()
        )
      )
    ).toEqual([]);
  });

  it("parses a row with a cell", async () => {
    expect(
      await toArray(
        parse(
          (async function* () {
            yield "foo\n";
          })()
        )
      )
    ).toEqual([["foo"]]);
  });

  it("parses a row with cells", async () => {
    expect(
      await toArray(
        parse(
          (async function* () {
            yield "foo,42\n";
          })()
        )
      )
    ).toEqual([["foo", "42"]]);
  });

  it("parses rows", async () => {
    expect(
      await toArray(
        parse(
          (async function* () {
            yield "foo,1\n";
            yield "bar,2\n";
          })()
        )
      )
    ).toEqual([
      ["foo", "1"],
      ["bar", "2"],
    ]);
  });

  it("parses a row without a trailing newline", async () => {
    expect(
      await toArray(
        parse(
          (async function* () {
            yield "foo";
          })()
        )
      )
    ).toEqual([["foo"]]);
  });
});

describe(stringify.name, () => {
  it("stringifies rows", async () => {
    expect(
      (
        await toArray(
          stringify(
            parse(
              (async function* () {
                yield "foo\n";
                yield "bar\n";
              })()
            )
          )
        )
      ).join("")
    ).toBe("foo\nbar\n");
  });
});
