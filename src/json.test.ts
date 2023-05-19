import { expect, it } from "vitest";
import { parseLines } from "./json.js";
import { toArray } from "./promise.js";

it("parses nothing", async () => {
  expect(
    await toArray(
      parseLines(
        (async function* () {
          yield "";
        })()
      )
    )
  ).toEqual([]);
});

it("parses a JSON", async () => {
  expect(
    await toArray(
      parseLines(
        (async function* () {
          yield "{}";
        })()
      )
    )
  ).toEqual([{}]);
});

it("parses a JSON with a trailing newline", async () => {
  expect(
    await toArray(
      parseLines(
        (async function* () {
          yield "{}\n";
        })()
      )
    )
  ).toEqual([{}]);
});

it("parses two JSONs", async () => {
  expect(
    await toArray(
      parseLines(
        (async function* () {
          yield "{}\n{}";
        })()
      )
    )
  ).toEqual([{}, {}]);
});

it("parses two JSONs in different yields", async () => {
  expect(
    await toArray(
      parseLines(
        (async function* () {
          yield "{}\n{";
          yield "}";
        })()
      )
    )
  ).toEqual([{}, {}]);
});

it("parses two JSONs with a newline delta", async () => {
  expect(
    await toArray(
      parseLines(
        (async function* () {
          yield "{}";
          yield "\n";
          yield "{}";
        })()
      )
    )
  ).toEqual([{}, {}]);
});

it("parses three JSONs", async () => {
  expect(
    await toArray(
      parseLines(
        (async function* () {
          yield "{}\n{}\n{}";
        })()
      )
    )
  ).toEqual([{}, {}, {}]);
});
