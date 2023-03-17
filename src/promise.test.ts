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
  it('converts an empty iterable', async () => {
    expect(await asyncArray((async function*() { })())).toEqual([])
  })

  it('converts an iterable with an element', async () => {
    expect(await asyncArray((async function*() { yield 1 })())).toEqual([1])
  })

  it('converts an iterable with two elements', async () => {
    expect(await asyncArray((async function*() {
      yield 1;
      yield 2;
    })())).toEqual([1, 2])
  })
})


describe(asyncChunkArray.name, () => {
  it('converts an empty iterable', async () => {
    expect(await asyncChunkArray((async function*() { })())).toEqual([])
  })

  it('converts an iterable with an element', async () => {
    expect(await asyncChunkArray((async function*() {
      yield [1];
    })())).toEqual([1])
  })

  it('converts an iterable with two elements', async () => {
    expect(await asyncChunkArray((async function*() {
      yield [1, 2];
    })())).toEqual([1, 2])
  })
})
