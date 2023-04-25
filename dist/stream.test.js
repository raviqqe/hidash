var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
import { describe, expect, it } from "vitest";
import { toArray } from "./promise.js";
import { toIterable, toStream, toByteStream, toStringStream, } from "./stream.js";
describe(toIterable.name, () => {
    it("converts a stream into iterable", async () => {
        expect(await toArray(toIterable(new ReadableStream({
            start: (controller) => {
                controller.enqueue(1);
                controller.enqueue(2);
                controller.enqueue(3);
                controller.close();
            },
        })))).toEqual([1, 2, 3]);
    });
});
describe(toStream.name, () => {
    it("converts iterable into a stream", async () => {
        expect(await toArray(toIterable(toStream((function () {
            return __asyncGenerator(this, arguments, function* () {
                yield yield __await(1);
                yield yield __await(2);
                yield yield __await(3);
            });
        })())))).toEqual([1, 2, 3]);
    });
});
describe(toByteStream.name, () => {
    it("converts byte stream to string stream", async () => {
        expect(await toArray(toIterable(toStringStream(toByteStream(new ReadableStream({
            start: (controller) => {
                controller.enqueue("foo");
                controller.enqueue("bar");
                controller.enqueue("baz");
                controller.close();
            },
        })))))).toEqual(["foo", "bar", "baz"]);
    });
});
//# sourceMappingURL=stream.test.js.map