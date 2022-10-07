"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _LinkedListItem_next, _LinkedListItem_prev;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedListItem = void 0;
class LinkedListItem {
    constructor(value) {
        _LinkedListItem_next.set(this, null);
        _LinkedListItem_prev.set(this, null);
        this.value = value;
    }
    get next() {
        return __classPrivateFieldGet(this, _LinkedListItem_next, "f");
    }
    get prev() {
        return __classPrivateFieldGet(this, _LinkedListItem_prev, "f");
    }
    setNext(item) {
        __classPrivateFieldSet(this, _LinkedListItem_next, item, "f");
    }
    setPrev(item) {
        __classPrivateFieldSet(this, _LinkedListItem_prev, item, "f");
    }
}
exports.LinkedListItem = LinkedListItem;
_LinkedListItem_next = new WeakMap(), _LinkedListItem_prev = new WeakMap();
