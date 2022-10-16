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
const helpers_1 = require("./helpers");
const linked_list_1 = require("../linked-list");
const DEFAULT_CAPACITY = 31;
class HashMap {
    constructor(capacity = DEFAULT_CAPACITY) {
        _HashMap_map.set(this, void 0);
        _HashMap_capacity.set(this, void 0);
        if (capacity <= 2 || !(0, helpers_1.checkSimple)(capacity)) {
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
    delete(key) {
        this.checkKey(key);
        const k = key.toString();
        const hash = this.getHash(k);
        this.deleteMapValue(hash, k);
    }
    getHash(key) {
        return (0, helpers_1.stringToNumber)(key) % __classPrivateFieldGet(this, _HashMap_capacity, "f");
    }
    setMapValue(hash, value, distinct) {
        const map = distinct ?? __classPrivateFieldGet(this, _HashMap_map, "f");
        if (map[hash] === undefined) {
            map[hash] = new linked_list_1.LinkedList();
        }
        map[hash].add(value);
        if (map[hash].length > 2) {
            this.rehash();
        }
    }
    getMapValue(hash, key) {
        const item = __classPrivateFieldGet(this, _HashMap_map, "f")[hash];
        if (item !== undefined) {
            for (let val of item.values) {
                if (val[0] === key) {
                    return val[1];
                }
            }
        }
        throw new Error('Key not found');
    }
    deleteMapValue(hash, key) {
        const item = __classPrivateFieldGet(this, _HashMap_map, "f")[hash];
        if (item !== undefined) {
            for (let val of item.values) {
                if (val[0] === key) {
                    item.delete(val);
                    return;
                }
            }
        }
        throw new Error('Key not found');
    }
    rehash() {
        var _a;
        __classPrivateFieldSet(this, _HashMap_capacity, __classPrivateFieldGet(this, _HashMap_capacity, "f") * 2 + 1, "f");
        while (!(0, helpers_1.checkSimple)(__classPrivateFieldGet(this, _HashMap_capacity, "f"))) {
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
    keys() {
        const entities = this.entities();
        return {
            [Symbol.iterator]() {
                return this;
            },
            next() {
                const item = entities.next();
                if (!item.done) {
                    return {
                        done: false,
                        value: item.value[0]
                    };
                }
                else {
                    return {
                        done: true,
                        value: null
                    };
                }
            }
        };
    }
    values() {
        const entities = this.entities();
        return {
            [Symbol.iterator]() {
                return this;
            },
            next() {
                const item = entities.next();
                if (!item.done) {
                    return {
                        done: false,
                        value: item.value[1]
                    };
                }
                else {
                    return {
                        done: true,
                        value: null
                    };
                }
            }
        };
    }
    *entities() {
        for (let item of __classPrivateFieldGet(this, _HashMap_map, "f")) {
            if (item === undefined) {
                continue;
            }
            for (let itemList of item.values) {
                yield itemList;
            }
        }
    }
}
exports.default = HashMap;
_HashMap_map = new WeakMap(), _HashMap_capacity = new WeakMap();
