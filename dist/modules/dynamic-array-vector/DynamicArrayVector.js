"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _DynamicArrayVector_vector, _DynamicArrayVector_length, _DynamicArrayVector_capacity;
Object.defineProperty(exports, "__esModule", { value: true });
const MAX_CAPACITY = 4294967295;
class DynamicArrayVector {
    constructor(capacity = 10) {
        _DynamicArrayVector_vector.set(this, void 0);
        _DynamicArrayVector_length.set(this, 0);
        _DynamicArrayVector_capacity.set(this, void 0);
        if (capacity <= 0 || capacity > MAX_CAPACITY) {
            throw new Error('Incorrect capacity array');
        }
        __classPrivateFieldSet(this, _DynamicArrayVector_vector, new Array(capacity), "f");
        __classPrivateFieldSet(this, _DynamicArrayVector_capacity, capacity, "f");
    }
    get capacity() {
        return __classPrivateFieldGet(this, _DynamicArrayVector_capacity, "f");
    }
    get length() {
        return __classPrivateFieldGet(this, _DynamicArrayVector_length, "f");
    }
    push(value) {
        var _a, _b;
        if (__classPrivateFieldGet(this, _DynamicArrayVector_length, "f") === __classPrivateFieldGet(this, _DynamicArrayVector_capacity, "f")) {
            this.expandVector();
        }
        __classPrivateFieldGet(this, _DynamicArrayVector_vector, "f")[__classPrivateFieldSet(this, _DynamicArrayVector_length, (_b = __classPrivateFieldGet(this, _DynamicArrayVector_length, "f"), _a = _b++, _b), "f"), _a] = value;
    }
    get(idx) {
        if (idx >= __classPrivateFieldGet(this, _DynamicArrayVector_capacity, "f")) {
            throw new Error('Index not found');
        }
        return __classPrivateFieldGet(this, _DynamicArrayVector_vector, "f")[idx];
    }
    expandVector() {
        if (__classPrivateFieldGet(this, _DynamicArrayVector_length, "f") >= MAX_CAPACITY) {
            throw new Error('Array is full');
        }
        __classPrivateFieldSet(this, _DynamicArrayVector_capacity, Math.min(MAX_CAPACITY, __classPrivateFieldGet(this, _DynamicArrayVector_length, "f") * 2), "f");
        const newVector = new Array(__classPrivateFieldGet(this, _DynamicArrayVector_capacity, "f"));
        let idx = 0;
        while (idx < __classPrivateFieldGet(this, _DynamicArrayVector_length, "f")) {
            newVector[idx] = __classPrivateFieldGet(this, _DynamicArrayVector_vector, "f")[idx];
            idx++;
        }
        __classPrivateFieldSet(this, _DynamicArrayVector_vector, newVector, "f");
    }
    *[(_DynamicArrayVector_vector = new WeakMap(), _DynamicArrayVector_length = new WeakMap(), _DynamicArrayVector_capacity = new WeakMap(), Symbol.iterator)]() {
        for (let elem of __classPrivateFieldGet(this, _DynamicArrayVector_vector, "f")) {
            yield elem;
        }
    }
}
exports.default = DynamicArrayVector;
