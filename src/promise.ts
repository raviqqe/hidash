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

export const asyncArray = async <T>(iterable: AsyncIterable<T>): Promise<T[]> => {
  const values: T[] = [];

  for await (const value of iterable) {
    values.push(value)
  }

  return values
}
