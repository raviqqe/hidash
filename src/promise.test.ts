import { describe, expect, it } from "vitest";
import {
  sleep,
  defer,
  asyncArray,
  asyncChunkArray,
  asyncSlice,
} from "./promise.js";

it("sleeps", async () => {
  await sleep(0);
});

it("defers a value", async () => {
  const callback = defer(async (x: number) => x);

  expect(await callback(1)).toBe(1);
  expect(await callback(2)).toBe(1);
  expect(await callback(3)).toBe(2);
  expect(await callback(4)).toBe(3);
});

describe(asyncArray.name, () => {
  it("converts an empty iterable", async () => {
    expect(await asyncArray((async function* () {})())).toEqual([]);
  });

  it("converts an iterable with an element", async () => {
    expect(
      await asyncArray(
        (async function* () {
          yield 1;
        })()
      )
    ).toEqual([1]);
  });

  it("converts an iterable with two elements", async () => {
    expect(
      await asyncArray(
        (async function* () {
          yield 1;
          yield 2;
        })()
      )
    ).toEqual([1, 2]);
  });
});

describe(asyncChunkArray.name, () => {
  it("converts an empty iterable", async () => {
    expect(await asyncChunkArray((async function* () {})())).toEqual([]);
  });

  it("converts an iterable with an element", async () => {
    expect(
      await asyncChunkArray(
        (async function* () {
          yield [1];
        })()
      )
    ).toEqual([1]);
  });

  it("converts an iterable with two elements", async () => {
    expect(
      await asyncChunkArray(
        (async function* () {
          yield [1, 2];
        })()
      )
    ).toEqual([1, 2]);
  });

  it("converts an iterable with two elements in different chunks", async () => {
    expect(
      await asyncChunkArray(
        (async function* () {
          yield [1];
          yield [2];
        })()
      )
    ).toEqual([1, 2]);
  });
});

describe(asyncSlice.name, () => {
  it("slices an empty iterable", async () => {
    expect(
      await asyncArray(asyncSlice(0, 0, (async function* () {})()))
    ).toEqual([]);
  });

  it("slices a iterable with an element", async () => {
    const createIterable = async function* () {
      yield 1;
    };

    expect(await asyncArray(asyncSlice(0, 0, createIterable()))).toEqual([]);
    expect(await asyncArray(asyncSlice(0, 1, createIterable()))).toEqual([1]);
    expect(await asyncArray(asyncSlice(1, 1, createIterable()))).toEqual([]);
  });

  it("slices a iterable with two elements", async () => {
    const createIterable = async function*() {
      yield 1;
      yield 2;
    };

    expect(await asyncArray(asyncSlice(0, 0, createIterable()))).toEqual([]);
    expect(await asyncArray(asyncSlice(0, 1, createIterable()))).toEqual([1]);
    expect(await asyncArray(asyncSlice(0, 2, createIterable()))).toEqual([
      1, 2,
    ]);
    expect(await asyncArray(asyncSlice(1, 1, createIterable()))).toEqual([]);
    expect(await asyncArray(asyncSlice(1, 2, createIterable()))).toEqual([2]);
    expect(await asyncArray(asyncSlice(2, 2, createIterable()))).toEqual([]);
  });
});
