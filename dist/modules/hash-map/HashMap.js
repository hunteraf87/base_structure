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
var _HashMap_map, _HashMap_capacity;
Object.defineProperty(exports, "__esModule", { value: true });
const Functions_1 = require("./Functions");
const linked_list_1 = require("../linked-list");
const DEFAULT_CAPACITY = 31;
class HashMap {
    constructor(capacity = DEFAULT_CAPACITY) {
        _HashMap_map.set(this, void 0);
        _HashMap_capacity.set(this, void 0);
        if (capacity <= 2 || !(0, Functions_1.checkSimple)(capacity)) {
            throw new Error('Need simple number for capacity');
        }
        __classPrivateFieldSet(this, _HashMap_capacity, capacity, "f");
        __classPrivateFieldSet(this, _HashMap_map, new Array(capacity), "f");
    }
    get capacity() {
        return __classPrivateFieldGet(this, _HashMap_capacity, "f");
    }
    set(key, value) {
        this.checkKey(key);
        const k = key.toString();
        const hash = this.getHash(k);
        this.setMapValue(hash, [k, value]);
    }
    get(key) {
        this.checkKey(key);
        const k = key.toString();
        const hash = this.getHash(k);
        return this.getMapValue(hash, k);
    }
    getHash(key) {
        return (0, Functions_1.stringToNumber)(key) % __classPrivateFieldGet(this, _HashMap_capacity, "f");
    }
    setMapValue(hash, value, distinct) {
        const map = distinct ?? __classPrivateFieldGet(this, _HashMap_map, "f");
        if (map[hash] === undefined) {
            map[hash] = value;
        }
        else {
            if (Array.isArray(map[hash])) {
                const linkedList = new linked_list_1.LinkedList();
                linkedList.add(map[hash]);
                linkedList.add(value);
                map[hash] = linkedList;
            }
            else {
                const item = map[hash];
                item.add(value);
                if (this.checkReHashing(item)) {
                    this.rehash();
                }
            }
        }
    }
    getMapValue(hash, key) {
        const item = __classPrivateFieldGet(this, _HashMap_map, "f")[hash];
        if (item === undefined) {
            throw new Error('Key not found');
        }
        if (Array.isArray(item)) {
            if (item[0] === key) {
                return item[1];
            }
        }
        else {
            for (let val of item.values) {
                if (val[0] === key) {
                    return val[1];
                }
            }
        }
        throw new Error('Key not found');
    }
    rehash() {
        var _a;
        __classPrivateFieldSet(this, _HashMap_capacity, __classPrivateFieldGet(this, _HashMap_capacity, "f") * 2 + 1, "f");
        while (!(0, Functions_1.checkSimple)(__classPrivateFieldGet(this, _HashMap_capacity, "f"))) {
            __classPrivateFieldSet(this, _HashMap_capacity, (_a = __classPrivateFieldGet(this, _HashMap_capacity, "f"), _a++, _a), "f");
        }
        const newMap = new Array(__classPrivateFieldGet(this, _HashMap_capacity, "f"));
        for (const [key, value] of this.entities()) {
            this.setMapValue(this.getHash(key), [key, value], newMap);
        }
        __classPrivateFieldSet(this, _HashMap_map, newMap, "f");
    }
    checkKey(key) {
        if (!/^[a-zA-Z0-9]+$/.test(key.toString())) {
            throw new Error('Key of map includes only latin symbols or numbers');
        }
    }
    checkReHashing(list) {
        return list.length > 3;
    }
    get keys() {
        const self = this;
        return {
            *[Symbol.iterator]() {
                for (let item of self.entities()) {
                    yield item[0];
                }
            }
        };
    }
    get values() {
        const self = this;
        return {
            *[Symbol.iterator]() {
                for (let item of self.entities()) {
                    yield item[1];
                }
            }
        };
    }
    *entities() {
        for (let item of __classPrivateFieldGet(this, _HashMap_map, "f")) {
            if (item === undefined) {
                continue;
            }
            if (Array.isArray(item)) {
                yield item;
            }
            else {
                for (let itemList of item.values) {
                    yield itemList;
                }
            }
        }
    }
}
exports.default = HashMap;
_HashMap_map = new WeakMap(), _HashMap_capacity = new WeakMap();
