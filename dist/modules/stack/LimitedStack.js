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
var _LimitedStack_stack, _LimitedStack_current;
Object.defineProperty(exports, "__esModule", { value: true });
class LimitedStack {
    constructor(limit) {
        _LimitedStack_stack.set(this, void 0);
        _LimitedStack_current.set(this, -1);
        this.limit = limit;
        __classPrivateFieldSet(this, _LimitedStack_stack, new Array(limit), "f");
    }
    get head() {
        return this.isEmpty() ? null : __classPrivateFieldGet(this, _LimitedStack_stack, "f")[__classPrivateFieldGet(this, _LimitedStack_current, "f")];
    }
    get count() {
        return __classPrivateFieldGet(this, _LimitedStack_current, "f") + 1;
    }
    push(value) {
        var _a;
        if (__classPrivateFieldGet(this, _LimitedStack_current, "f") + 1 >= this.limit) {
            throw new Error('Stack overflow');
        }
        __classPrivateFieldSet(this, _LimitedStack_current, (_a = __classPrivateFieldGet(this, _LimitedStack_current, "f"), _a++, _a), "f");
        __classPrivateFieldGet(this, _LimitedStack_stack, "f")[__classPrivateFieldGet(this, _LimitedStack_current, "f")] = value;
    }
    take() {
        var _a;
        if (this.isEmpty()) {
            throw new Error('Stack is empty');
        }
        const val = __classPrivateFieldGet(this, _LimitedStack_stack, "f")[__classPrivateFieldGet(this, _LimitedStack_current, "f")];
        delete __classPrivateFieldGet(this, _LimitedStack_stack, "f")[__classPrivateFieldGet(this, _LimitedStack_current, "f")];
        __classPrivateFieldSet(this, _LimitedStack_current, (_a = __classPrivateFieldGet(this, _LimitedStack_current, "f"), _a--, _a), "f");
        return val;
    }
    isEmpty() {
        return __classPrivateFieldGet(this, _LimitedStack_current, "f") < 0;
    }
    get values() {
        const self = this;
        return {
            *[Symbol.iterator]() {
                for (let i = 0; i <= __classPrivateFieldGet(self, _LimitedStack_current, "f"); i++) {
                    yield __classPrivateFieldGet(self, _LimitedStack_stack, "f")[i];
                }
            }
        };
    }
}
exports.default = LimitedStack;
_LimitedStack_stack = new WeakMap(), _LimitedStack_current = new WeakMap();
