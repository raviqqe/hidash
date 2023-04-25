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
import { sleep, defer, toArray, toFlatArray, slice, flatSlice, filter, map, } from "./promise.js";
it("sleeps", async () => {
    await sleep(0);
});
describe(defer.name, () => {
    it("defers a value", async () => {
        let x = 0;
        const callback = defer(async () => x++);
        expect(await callback()).toBe(0);
        expect(await callback()).toBe(0);
        expect(await callback()).toBe(1);
        expect(await callback()).toBe(2);
    });
    it("defers values with different arguments", async () => {
        let y = 0;
        const callback = defer(async (x) => x + y++);
        expect(await callback(1)).toBe(1);
        expect(await callback(2)).toBe(3);
        expect(await callback(1)).toBe(1);
        expect(await callback(2)).toBe(3);
        expect(await callback(1)).toBe(3);
        expect(await callback(2)).toBe(5);
        expect(await callback(1)).toBe(5);
        expect(await callback(2)).toBe(7);
    });
});
describe(toArray.name, () => {
    it("converts an empty iterable", async () => {
        expect(await toArray((function () { return __asyncGenerator(this, arguments, function* () { }); })())).toEqual([]);
    });
    it("converts an iterable with an element", async () => {
        expect(await toArray((function () {
            return __asyncGenerator(this, arguments, function* () {
                yield yield __await(1);
            });
        })())).toEqual([1]);
    });
    it("converts an iterable with two elements", async () => {
        expect(await toArray((function () {
            return __asyncGenerator(this, arguments, function* () {
                yield yield __await(1);
                yield yield __await(2);
            });
        })())).toEqual([1, 2]);
    });
});
describe(toFlatArray.name, () => {
    it("converts an empty iterable", async () => {
        expect(await toFlatArray((function () { return __asyncGenerator(this, arguments, function* () { }); })())).toEqual([]);
    });
    it("converts an iterable with an element", async () => {
        expect(await toFlatArray((function () {
            return __asyncGenerator(this, arguments, function* () {
                yield yield __await([1]);
            });
        })())).toEqual([1]);
    });
    it("converts an iterable with two elements", async () => {
        expect(await toFlatArray((function () {
            return __asyncGenerator(this, arguments, function* () {
                yield yield __await([1, 2]);
            });
        })())).toEqual([1, 2]);
    });
    it("converts an iterable with two elements in different chunks", async () => {
        expect(await toFlatArray((function () {
            return __asyncGenerator(this, arguments, function* () {
                yield yield __await([1]);
                yield yield __await([2]);
            });
        })())).toEqual([1, 2]);
    });
});
describe(slice.name, () => {
    it("slices an empty iterable", async () => {
        expect(await toArray(slice((function () { return __asyncGenerator(this, arguments, function* () { }); })(), 0, 0))).toEqual([]);
    });
    it("slices an iterable with an element", async () => {
        const createIterable = function () {
            return __asyncGenerator(this, arguments, function* () {
                yield yield __await(1);
            });
        };
        expect(await toArray(slice(createIterable(), 0, 0))).toEqual([]);
        expect(await toArray(slice(createIterable(), 0, 1))).toEqual([1]);
        expect(await toArray(slice(createIterable(), 1, 1))).toEqual([]);
    });
    it("slices an iterable with two elements", async () => {
        const createIterable = function () {
            return __asyncGenerator(this, arguments, function* () {
                yield yield __await(1);
                yield yield __await(2);
            });
        };
        expect(await toArray(slice(createIterable(), 0, 0))).toEqual([]);
        expect(await toArray(slice(createIterable(), 0, 1))).toEqual([1]);
        expect(await toArray(slice(createIterable(), 0, 2))).toEqual([1, 2]);
        expect(await toArray(slice(createIterable(), 1, 1))).toEqual([]);
        expect(await toArray(slice(createIterable(), 1, 2))).toEqual([2]);
        expect(await toArray(slice(createIterable(), 2, 2))).toEqual([]);
    });
});
describe(flatSlice.name, () => {
    it("slices an empty iterable", async () => {
        expect(await toArray(flatSlice((function () { return __asyncGenerator(this, arguments, function* () { }); })(), 0, 0))).toEqual([]);
    });
    it("slices an iterable with an element", async () => {
        const createIterable = function () {
            return __asyncGenerator(this, arguments, function* () {
                yield yield __await([1]);
            });
        };
        expect(await toArray(flatSlice(createIterable(), 0, 0))).toEqual([]);
        expect(await toArray(flatSlice(createIterable(), 0, 1))).toEqual([[1]]);
        expect(await toArray(flatSlice(createIterable(), 1, 1))).toEqual([]);
    });
    it("slices an iterable with two elements", async () => {
        const createIterable = function () {
            return __asyncGenerator(this, arguments, function* () {
                yield yield __await([1]);
                yield yield __await([2]);
            });
        };
        expect(await toArray(flatSlice(createIterable(), 0, 0))).toEqual([]);
        expect(await toArray(flatSlice(createIterable(), 0, 1))).toEqual([[1]]);
        expect(await toArray(flatSlice(createIterable(), 0, 2))).toEqual([
            [1],
            [2],
        ]);
        expect(await toArray(flatSlice(createIterable(), 1, 1))).toEqual([]);
        expect(await toArray(flatSlice(createIterable(), 1, 2))).toEqual([[2]]);
        expect(await toArray(flatSlice(createIterable(), 2, 2))).toEqual([]);
    });
    it("slices an iterable with two elements in a chunk", async () => {
        const createIterable = function () {
            return __asyncGenerator(this, arguments, function* () {
                yield yield __await([1, 2]);
            });
        };
        expect(await toArray(flatSlice(createIterable(), 0, 0))).toEqual([]);
        expect(await toArray(flatSlice(createIterable(), 0, 1))).toEqual([[1]]);
        expect(await toArray(flatSlice(createIterable(), 1, 2))).toEqual([[2]]);
    });
    it("slices an iterable within a chunk", async () => {
        const createIterable = function () {
            return __asyncGenerator(this, arguments, function* () {
                yield yield __await([1, 2, 3]);
            });
        };
        expect(await toArray(flatSlice(createIterable(), 1, 2))).toEqual([[2]]);
    });
    it("slices an iterable with four elements in two chunks", async () => {
        const createIterable = function () {
            return __asyncGenerator(this, arguments, function* () {
                yield yield __await([1, 2]);
                yield yield __await([3, 4]);
            });
        };
        expect(await toArray(flatSlice(createIterable(), 0, 0))).toEqual([]);
        expect(await toArray(flatSlice(createIterable(), 0, 1))).toEqual([[1]]);
        expect(await toArray(flatSlice(createIterable(), 1, 1))).toEqual([]);
        expect(await toArray(flatSlice(createIterable(), 1, 2))).toEqual([[2]]);
        expect(await toArray(flatSlice(createIterable(), 1, 3))).toEqual([
            [2],
            [3],
        ]);
        expect(await toArray(flatSlice(createIterable(), 1, 4))).toEqual([
            [2],
            [3, 4],
        ]);
        expect(await toArray(flatSlice(createIterable(), 2, 2))).toEqual([]);
        expect(await toArray(flatSlice(createIterable(), 2, 3))).toEqual([[3]]);
        expect(await toArray(flatSlice(createIterable(), 2, 4))).toEqual([[3, 4]]);
        expect(await toArray(flatSlice(createIterable(), 3, 3))).toEqual([]);
        expect(await toArray(flatSlice(createIterable(), 3, 4))).toEqual([[4]]);
    });
});
describe(map.name, () => {
    it("maps a function to nothing", async () => {
        expect(await toArray(map((function () { return __asyncGenerator(this, arguments, function* () { }); })(), () => true))).toEqual([]);
    });
    it("maps a function to values", async () => {
        expect(await toArray(map((function () {
            return __asyncGenerator(this, arguments, function* () {
                yield yield __await(2);
                yield yield __await(3);
            });
        })(), (x) => x * x))).toEqual([4, 9]);
    });
});
describe(filter.name, () => {
    it("slices an empty iterable", async () => {
        expect(await toArray(filter((function () { return __asyncGenerator(this, arguments, function* () { }); })(), () => true))).toEqual([]);
    });
    it("slices an iterable with an element", async () => {
        const createIterable = function () {
            return __asyncGenerator(this, arguments, function* () {
                yield yield __await(1);
            });
        };
        expect(await toArray(filter(createIterable(), (x) => x > 1))).toEqual([]);
        expect(await toArray(filter(createIterable(), (x) => x <= 1))).toEqual([1]);
    });
    it("slices an iterable with two elements", async () => {
        const createIterable = function () {
            return __asyncGenerator(this, arguments, function* () {
                yield yield __await(1);
                yield yield __await(2);
            });
        };
        expect(await toArray(filter(createIterable(), (x) => x < 2))).toEqual([1]);
        expect(await toArray(filter(createIterable(), (x) => x > 1))).toEqual([2]);
    });
});
//# sourceMappingURL=promise.test.js.map