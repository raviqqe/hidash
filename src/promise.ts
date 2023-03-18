export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const defer = <T, F extends (...args: never[]) => Promise<T>>(
  callback: F
): ((...args: Parameters<F>) => Promise<T>) => {
  let cache: Promise<T> | undefined = undefined;

  return async (...args: Parameters<F>): Promise<T> => {
    const lastCache = cache;
    cache = callback(...args);

    return lastCache ?? cache;
  };
};

export const asyncArray = async <T>(
  iterable: AsyncIterable<T>
): Promise<T[]> => {
  const values: T[] = [];

  for await (const x of iterable) {
    values.push(x);
  }

  return values;
};

export const asyncChunkArray = async <T>(
  iterable: AsyncIterable<T[]>
): Promise<T[]> => {
  const values: T[] = [];

  for await (const xs of iterable) {
    values.push(...xs);
  }

  return values;
};

export const asyncSlice = async function* <T>(
  iterable: AsyncIterable<T>,
  start: number,
  end: number
): AsyncIterable<T> {
  let count = 0;

  for await (const x of iterable) {
    if (count >= end) {
      return;
    } else if (count >= start) {
      yield x;
    }

    count++;
  }
};

export const asyncChunkSlice = <T>(
  iterable: AsyncIterable<T[]>,
  start: number,
  end: number
): AsyncIterable<T[]> =>
  asyncFilter(
    (async function* () {
      let count = 0;

      for await (const xs of iterable) {
        if (count >= end) {
          return;
        } else if (xs.length + count >= start) {
          yield xs.slice(start - count, end - count);
        }

        count += xs.length;
      }
    })(),
    (xs) => !!xs.length
  );

export const asyncFilter = async function* <T>(
  iterable: AsyncIterable<T>,
  check: (x: T) => boolean
): AsyncIterable<T> {
  for await (const x of iterable) {
    if (check(x)) {
      yield x;
    }
  }
};
