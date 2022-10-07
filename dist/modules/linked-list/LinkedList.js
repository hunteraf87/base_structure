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
var _LinkedList_first, _LinkedList_last;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
const LinkedListItem_1 = require("./LinkedListItem");
class LinkedList {
    constructor() {
        _LinkedList_first.set(this, null);
        _LinkedList_last.set(this, null);
    }
    get first() {
        return __classPrivateFieldGet(this, _LinkedList_first, "f");
    }
    get last() {
        return __classPrivateFieldGet(this, _LinkedList_last, "f");
    }
    add(value) {
        const newItem = new LinkedListItem_1.LinkedListItem(value);
        if (__classPrivateFieldGet(this, _LinkedList_last, "f") instanceof LinkedListItem_1.LinkedListItem) {
            newItem.setPrev(__classPrivateFieldGet(this, _LinkedList_last, "f"));
            __classPrivateFieldGet(this, _LinkedList_last, "f").setNext(newItem);
            __classPrivateFieldSet(this, _LinkedList_last, newItem, "f");
        }
        else {
            __classPrivateFieldSet(this, _LinkedList_first, newItem, "f");
            __classPrivateFieldSet(this, _LinkedList_last, newItem, "f");
        }
    }
    insertBefore(value, itemOrValue) {
        const newItem = new LinkedListItem_1.LinkedListItem(value);
        const itemList = itemOrValue instanceof LinkedListItem_1.LinkedListItem ? itemOrValue : this.find(itemOrValue);
        if (itemList === null) {
            throw new Error(`Value '${itemOrValue} not found id list'`);
        }
        newItem.setNext(itemList);
        newItem.setPrev(itemList.prev);
        if (newItem.prev instanceof LinkedListItem_1.LinkedListItem) {
            newItem.prev.setNext(newItem);
        }
        if (itemList === __classPrivateFieldGet(this, _LinkedList_first, "f")) {
            __classPrivateFieldSet(this, _LinkedList_first, newItem, "f");
        }
        itemList.setPrev(newItem);
        return newItem;
    }
    insertAfter(value, itemOrValue) {
        const newItem = new LinkedListItem_1.LinkedListItem(value);
        const itemList = itemOrValue instanceof LinkedListItem_1.LinkedListItem ? itemOrValue : this.find(itemOrValue);
        if (itemList === null) {
            throw new Error(`Value '${itemOrValue} not found id list'`);
        }
        newItem.setPrev(itemList);
        newItem.setNext(itemList.next);
        if (itemList === __classPrivateFieldGet(this, _LinkedList_last, "f")) {
            __classPrivateFieldSet(this, _LinkedList_last, newItem, "f");
        }
        itemList.setNext(newItem);
        return newItem;
    }
    find(value, strict = true) {
        for (let itemList of this.items) {
            if (strict ? value === itemList.value : value == itemList.value) {
                return itemList;
            }
        }
        return null;
    }
    delete(valueOrItem, strict = true) {
        const findItem = valueOrItem instanceof LinkedListItem_1.LinkedListItem ? valueOrItem : this.find(valueOrItem, strict);
        if (findItem instanceof LinkedListItem_1.LinkedListItem) {
            if (findItem.prev instanceof LinkedListItem_1.LinkedListItem) {
                findItem.prev.setNext(findItem.next);
            }
            else {
                __classPrivateFieldSet(this, _LinkedList_first, findItem.next, "f");
            }
            if (findItem.next instanceof LinkedListItem_1.LinkedListItem) {
                findItem.next.setPrev(findItem.prev);
            }
            else {
                __classPrivateFieldSet(this, _LinkedList_last, findItem.prev, "f");
            }
            return true;
        }
        return false;
    }
    isEmpty() {
        return __classPrivateFieldGet(this, _LinkedList_first, "f") === null;
    }
    get items() {
        let current = __classPrivateFieldGet(this, _LinkedList_first, "f");
        return {
            *[Symbol.iterator]() {
                while (current) {
                    yield current;
                    current = current.next;
                }
            }
        };
    }
    get reverseItems() {
        let current = __classPrivateFieldGet(this, _LinkedList_last, "f");
        return {
            *[Symbol.iterator]() {
                while (current) {
                    yield current;
                    current = current.prev;
                }
            }
        };
    }
    get values() {
        const self = this;
        return {
            *[Symbol.iterator]() {
                for (let item of self.items) {
                    yield item.value;
                }
            }
        };
    }
    get reverseValues() {
        const self = this;
        return {
            *[Symbol.iterator]() {
                for (let item of self.reverseItems) {
                    yield item.value;
                }
            }
        };
    }
}
exports.LinkedList = LinkedList;
_LinkedList_first = new WeakMap(), _LinkedList_last = new WeakMap();
