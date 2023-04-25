export declare const toStream: <T>(iterable: AsyncIterable<T>) => ReadableStream<T>;
export declare const toIterable: <T>(stream: ReadableStream<T>) => AsyncIterable<T>;
export declare const toStringStream: (stream: ReadableStream<Uint8Array>) => ReadableStream<string>;
export declare const toByteStream: (stream: ReadableStream<string>) => ReadableStream<Uint8Array>;
export declare const map: <T, S>(stream: ReadableStream<T>, callback: (value: T) => S) => ReadableStream<S>;
//# sourceMappingURL=stream.d.ts.map