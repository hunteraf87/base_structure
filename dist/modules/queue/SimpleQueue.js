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
var _SimpleQueue_queue;
Object.defineProperty(exports, "__esModule", { value: true });
const linked_list_1 = require("../linked-list");
class SimpleQueue {
    constructor() {
        _SimpleQueue_queue.set(this, void 0);
        __classPrivateFieldSet(this, _SimpleQueue_queue, new linked_list_1.LinkedList(), "f");
    }
    get head() {
        return __classPrivateFieldGet(this, _SimpleQueue_queue, "f").first?.value ?? null;
    }
    push(value) {
        __classPrivateFieldGet(this, _SimpleQueue_queue, "f").add(value);
    }
    shift() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        const first = __classPrivateFieldGet(this, _SimpleQueue_queue, "f").first;
        const val = first.value;
        __classPrivateFieldGet(this, _SimpleQueue_queue, "f").delete(first);
        return val;
    }
    isEmpty() {
        return __classPrivateFieldGet(this, _SimpleQueue_queue, "f").isEmpty();
    }
    get values() {
        const self = __classPrivateFieldGet(this, _SimpleQueue_queue, "f");
        return {
            *[Symbol.iterator]() {
                for (let item of self.values) {
                    yield item;
                }
            }
        };
    }
}
exports.default = SimpleQueue;
_SimpleQueue_queue = new WeakMap();
