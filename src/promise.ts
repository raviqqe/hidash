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
  start: number,
  end: number,
  iterable: AsyncIterable<T>
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

export const asyncChunkSlice = async function* <T>(
  start: number,
  end: number,
  iterable: AsyncIterable<T[]>
): AsyncIterable<T[]> {
  let count = 0;

  for await (const xs of iterable) {
    if (count >= end) {
      return;
    } else if (count >= start) {
      yield xs.slice(0, end - count);
    }

    count += xs.length;
  }
};
