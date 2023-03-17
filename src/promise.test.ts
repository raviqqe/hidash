import { describe, expect, it } from "vitest";
import { sleep, defer, asyncArray, asyncChunkArray } from "./promise.js";

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
  it('converts an async iterable into an array', async () => {
    expect(asyncArray((async function*() { })())).toEqual([])
  })
})


describe(asyncChunkArray.name, () => {
  it('converts an empty iterable', async () => {
    expect(asyncChunkArray((async function*() { })())).toEqual([])
  })
})
