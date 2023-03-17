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
