import { map } from "./promise.js";

export const stream = <T>(iterable: AsyncIterable<T>): ReadableStream<T> => {
  return new ReadableStream({
    start: async (controller) => {
      for await (const value of iterable) {
        controller.enqueue(value);
      }

      controller.close();
    },
  });
};

export const iterable = async function* <T>(
  stream: ReadableStream<T>
): AsyncIterable<T> {
  const reader = stream.getReader();

  for (;;) {
    const result = await reader.read();

    if (result.done) {
      break;
    }

    yield result.value;
  }
};

export const stringsToBytes = (
  values: ReadableStream<Uint8Array>
): ReadableStream<string> => {
  const decoder = new TextDecoder();

  return stream(map(iterable(values), (text) => decoder.decode(text)));
};
