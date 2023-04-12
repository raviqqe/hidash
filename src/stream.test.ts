import { describe, expect, it } from "vitest";
import { toArray } from "./promise.js";
import {
  stringsToBytes,
  iterable,
  stream,
  stringsToBytes,
  bytesToStrings,
} from "./stream.js";

describe(iterable.name, () => {
  it("converts a stream into iterable", async () => {
    expect(
      await toArray(
        iterable(
          new ReadableStream({
            start: (controller) => {
              controller.enqueue(1);
              controller.enqueue(2);
              controller.enqueue(3);
              controller.close();
            },
          })
        )
      )
    ).toEqual([1, 2, 3]);
  });
});

describe(stream.name, () => {
  it("converts iterable into a stream", async () => {
    expect(
      await toArray(
        iterable(
          stream(
            (async function* () {
              yield 1;
              yield 2;
              yield 3;
            })()
          )
        )
      )
    ).toEqual([1, 2, 3]);
  });
});

describe(stringsToBytes.name, () => {
  it("converts byte stream to string stream", async () => {
    expect(
      await toArray(
        iterable(
          bytesToStrings(
            stringsToBytes(
              new ReadableStream({
                start: (controller) => {
                  controller.enqueue("foo");
                  controller.enqueue("bar");
                  controller.enqueue("baz");
                  controller.close();
                },
              })
            )
          )
        )
      )
    ).toEqual(["foo", "bar", "baz"]);
  });
});
