var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
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
import * as promise from "./promise.js";
export const toStream = (iterable) => new ReadableStream({
    start: async (controller) => {
        var _a, e_1, _b, _c;
        try {
            for (var _d = true, iterable_1 = __asyncValues(iterable), iterable_1_1; iterable_1_1 = await iterable_1.next(), _a = iterable_1_1.done, !_a;) {
                _c = iterable_1_1.value;
                _d = false;
                try {
                    const value = _c;
                    controller.enqueue(value);
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = iterable_1.return)) await _b.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        controller.close();
    },
});
export const toIterable = function (stream) {
    return __asyncGenerator(this, arguments, function* () {
        const reader = stream.getReader();
        for (;;) {
            const result = yield __await(reader.read());
            if (result.done) {
                break;
            }
            yield yield __await(result.value);
        }
    });
};
export const toStringStream = (stream) => {
    const decoder = new TextDecoder();
    return map(stream, (text) => decoder.decode(text));
};
export const toByteStream = (stream) => {
    const encoder = new TextEncoder();
    return map(stream, (text) => encoder.encode(text));
};
export const map = (stream, callback) => toStream(promise.map(toIterable(stream), callback));
//# sourceMappingURL=stream.js.map