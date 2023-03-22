export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const defer = <T, F extends (...args: never[]) => Promise<T>>(
  callback: F
): ((...args: Parameters<F>) => Promise<T>) => {
  const cache: Record<string, Promise<T>> = {};

  return async (...args: Parameters<F>): Promise<T> => {
    const key = JSON.stringify(args);
    const lastPromise = cache[key];
    const promise = callback(...args);
    cache[key] = promise;

    return lastPromise ?? promise;
  };
};

export const toArray = async <T>(iterable: AsyncIterable<T>): Promise<T[]> => {
  const values: T[] = [];

  for await (const x of iterable) {
    values.push(x);
  }

  return values;
};

export const toFlatArray = async <T>(
  iterable: AsyncIterable<T[]>
): Promise<T[]> => {
  const values: T[] = [];

  for await (const xs of iterable) {
    values.push(...xs);
  }

  return values;
};

export const slice = async function* <T>(
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

export const flatSlice = <T>(
  iterable: AsyncIterable<T[]>,
  start: number,
  end: number
): AsyncIterable<T[]> =>
  filter(
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

export const filter = async function* <T>(
  iterable: AsyncIterable<T>,
  check: (x: T) => unknown
): AsyncIterable<T> {
  for await (const x of iterable) {
    if (check(x)) {
      yield x;
    }
  }
};
