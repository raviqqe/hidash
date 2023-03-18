import { describe, expect, it } from "vitest";
import {
  sleep,
  defer,
  asyncArray,
  asyncChunkArray,
  asyncSlice,
  asyncChunkSlice,
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

describe(asyncChunkSlice.name, () => {
  it("slices an empty iterable", async () => {
    expect(
      await asyncArray(asyncChunkSlice((async function* () {})(), 0, 0))
    ).toEqual([]);
  });

  it("slices an iterable with an element", async () => {
    const createIterable = async function* () {
      yield [1];
    };

    expect(await asyncArray(asyncChunkSlice(createIterable(), 0, 0))).toEqual(
      []
    );
    expect(await asyncArray(asyncChunkSlice(createIterable(), 0, 1))).toEqual([
      [1],
    ]);
    expect(await asyncArray(asyncChunkSlice(createIterable(), 1, 1))).toEqual(
      []
    );
  });

  it("slices an iterable with two elements", async () => {
    const createIterable = async function* () {
      yield [1];
      yield [2];
    };

    expect(await asyncArray(asyncChunkSlice(createIterable(), 0, 0))).toEqual(
      []
    );
    expect(await asyncArray(asyncChunkSlice(createIterable(), 0, 1))).toEqual([
      [1],
    ]);
    expect(await asyncArray(asyncChunkSlice(createIterable(), 0, 2))).toEqual([
      [1],
      [2],
    ]);
    expect(await asyncArray(asyncChunkSlice(createIterable(), 1, 1))).toEqual(
      []
    );
    expect(await asyncArray(asyncChunkSlice(createIterable(), 1, 2))).toEqual([
      [2],
    ]);
    expect(await asyncArray(asyncChunkSlice(createIterable(), 2, 2))).toEqual(
      []
    );
  });

  it("slices an iterable with two elementsin a chunk", async () => {
    const createIterable = async function* () {
      yield [1, 2];
    };

    expect(await asyncArray(asyncChunkSlice(createIterable(), 0, 0))).toEqual(
      []
    );
    expect(await asyncArray(asyncChunkSlice(createIterable(), 0, 1))).toEqual([
      [1],
    ]);
    expect(await asyncArray(asyncChunkSlice(createIterable(), 1, 2))).toEqual([
      [2],
    ]);
  });

  it("slices an iterable within a chunk", async () => {
    const createIterable = async function* () {
      yield [1, 2, 3];
    };

    expect(await asyncArray(asyncChunkSlice(createIterable(), 1, 2))).toEqual([
      [2],
    ]);
  });
});
