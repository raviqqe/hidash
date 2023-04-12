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

export const iterable = function* <T>(
  stream: ReadableStream<T>
): AsyncIterable<T> {
  const reader = stream.getReader();

  for (;;) {}
};
