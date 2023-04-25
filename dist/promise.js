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
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const defer = (callback) => {
    const cache = {};
    return async (...args) => {
        const key = JSON.stringify(args);
        const lastPromise = cache[key];
        const promise = callback(...args);
        cache[key] = promise;
        return lastPromise !== null && lastPromise !== void 0 ? lastPromise : promise;
    };
};
export const toArray = async (iterable) => {
    var _a, e_1, _b, _c;
    const values = [];
    try {
        for (var _d = true, iterable_1 = __asyncValues(iterable), iterable_1_1; iterable_1_1 = await iterable_1.next(), _a = iterable_1_1.done, !_a;) {
            _c = iterable_1_1.value;
            _d = false;
            try {
                const x = _c;
                values.push(x);
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
    return values;
};
export const toFlatArray = async (iterable) => {
    var _a, e_2, _b, _c;
    const values = [];
    try {
        for (var _d = true, iterable_2 = __asyncValues(iterable), iterable_2_1; iterable_2_1 = await iterable_2.next(), _a = iterable_2_1.done, !_a;) {
            _c = iterable_2_1.value;
            _d = false;
            try {
                const xs = _c;
                values.push(...xs);
            }
            finally {
                _d = true;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = iterable_2.return)) await _b.call(iterable_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return values;
};
export const slice = function (iterable, start, end) {
    return __asyncGenerator(this, arguments, function* () {
        var _a, e_3, _b, _c;
        let count = 0;
        try {
            for (var _d = true, iterable_3 = __asyncValues(iterable), iterable_3_1; iterable_3_1 = yield __await(iterable_3.next()), _a = iterable_3_1.done, !_a;) {
                _c = iterable_3_1.value;
                _d = false;
                try {
                    const x = _c;
                    if (count >= end) {
                        return yield __await(void 0);
                    }
                    else if (count >= start) {
                        yield yield __await(x);
                    }
                    count++;
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = iterable_3.return)) yield __await(_b.call(iterable_3));
            }
            finally { if (e_3) throw e_3.error; }
        }
    });
};
export const flatSlice = (iterable, start, end) => filter((function () {
    return __asyncGenerator(this, arguments, function* () {
        var _a, e_4, _b, _c;
        let count = 0;
        try {
            for (var _d = true, iterable_4 = __asyncValues(iterable), iterable_4_1; iterable_4_1 = yield __await(iterable_4.next()), _a = iterable_4_1.done, !_a;) {
                _c = iterable_4_1.value;
                _d = false;
                try {
                    const xs = _c;
                    if (count >= end) {
                        return yield __await(void 0);
                    }
                    else if (xs.length + count >= start) {
                        yield yield __await(xs.slice(Math.max(start - count, 0), end - count));
                    }
                    count += xs.length;
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = iterable_4.return)) yield __await(_b.call(iterable_4));
            }
            finally { if (e_4) throw e_4.error; }
        }
    });
})(), (xs) => !!xs.length);
export const map = function (iterable, callback) {
    return __asyncGenerator(this, arguments, function* () {
        var _a, e_5, _b, _c;
        try {
            for (var _d = true, iterable_5 = __asyncValues(iterable), iterable_5_1; iterable_5_1 = yield __await(iterable_5.next()), _a = iterable_5_1.done, !_a;) {
                _c = iterable_5_1.value;
                _d = false;
                try {
                    const x = _c;
                    yield yield __await(callback(x));
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = iterable_5.return)) yield __await(_b.call(iterable_5));
            }
            finally { if (e_5) throw e_5.error; }
        }
    });
};
export const filter = function (iterable, check) {
    return __asyncGenerator(this, arguments, function* () {
        var _a, e_6, _b, _c;
        try {
            for (var _d = true, iterable_6 = __asyncValues(iterable), iterable_6_1; iterable_6_1 = yield __await(iterable_6.next()), _a = iterable_6_1.done, !_a;) {
                _c = iterable_6_1.value;
                _d = false;
                try {
                    const x = _c;
                    if (check(x)) {
                        yield yield __await(x);
                    }
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = iterable_6.return)) yield __await(_b.call(iterable_6));
            }
            finally { if (e_6) throw e_6.error; }
        }
    });
};
//# sourceMappingURL=promise.js.map