export declare const sleep: (ms: number) => Promise<void>;
export declare const defer: <T, F extends (...args: never[]) => Promise<T>>(callback: F) => (...args: Parameters<F>) => Promise<T>;
export declare const toArray: <T>(iterable: AsyncIterable<T>) => Promise<T[]>;
export declare const toFlatArray: <T>(iterable: AsyncIterable<T[]>) => Promise<T[]>;
export declare const slice: <T>(iterable: AsyncIterable<T>, start: number, end: number) => AsyncIterable<T>;
export declare const flatSlice: <T>(iterable: AsyncIterable<T[]>, start: number, end: number) => AsyncIterable<T[]>;
export declare const map: <T, S>(iterable: AsyncIterable<T>, callback: (x: T) => S) => AsyncIterable<S>;
export declare const filter: <T>(iterable: AsyncIterable<T>, check: (x: T) => unknown) => AsyncIterable<T>;
//# sourceMappingURL=promise.d.ts.map