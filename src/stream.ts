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

export const iterable = <T>(stream: ReadableStream<T>): AsyncIterable<T> => {
  return new ReadableStream({
    start: (controller) => {
      console.log();
    },
  });
};
