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
var _DynamicArray_list, _DynamicArray_length;
Object.defineProperty(exports, "__esModule", { value: true });
const linked_list_1 = require("../linked-list");
class DynamicArray {
    constructor(capacityChunk = 10) {
        _DynamicArray_list.set(this, void 0);
        _DynamicArray_length.set(this, 0);
        this.capacityChunk = capacityChunk;
        __classPrivateFieldSet(this, _DynamicArray_list, new linked_list_1.LinkedList(), "f");
    }
    get length() {
        return __classPrivateFieldGet(this, _DynamicArray_length, "f");
    }
    get isEmpty() {
        return __classPrivateFieldGet(this, _DynamicArray_list, "f").isEmpty();
    }
    get(idx) {
        this.verifyIndex(idx);
        let maxRow = this.capacityChunk - 1;
        for (let arr of __classPrivateFieldGet(this, _DynamicArray_list, "f").values) {
            if (idx <= maxRow) {
                const newIdx = idx % this.capacityChunk;
                return arr[newIdx];
            }
            maxRow += this.capacityChunk;
        }
        throw new Error('Error get element by index');
    }
    set(idx, value) {
        this.verifyIndex(idx);
        let maxRow = this.capacityChunk - 1;
        for (let arr of __classPrivateFieldGet(this, _DynamicArray_list, "f").values) {
            if (idx <= maxRow) {
                const newIdx = idx % this.capacityChunk;
                arr[newIdx] = value;
                break;
            }
            maxRow += this.capacityChunk;
        }
    }
    pop() {
        var _a;
        if (__classPrivateFieldGet(this, _DynamicArray_list, "f").last) {
            const idx = __classPrivateFieldSet(this, _DynamicArray_length, (_a = __classPrivateFieldGet(this, _DynamicArray_length, "f"), --_a), "f") % this.capacityChunk;
            const arr = __classPrivateFieldGet(this, _DynamicArray_list, "f").last.value;
            const value = arr[idx];
            arr[idx] = undefined;
            if (idx === 0) {
                __classPrivateFieldGet(this, _DynamicArray_list, "f").delete(__classPrivateFieldGet(this, _DynamicArray_list, "f").last);
            }
            return value;
        }
        throw new Error('Array is empty');
    }
    push(value) {
        var _a;
        const idxAdd = __classPrivateFieldGet(this, _DynamicArray_length, "f") % this.capacityChunk;
        if (idxAdd === 0) {
            this.addEmptyArray();
        }
        if (__classPrivateFieldGet(this, _DynamicArray_list, "f").last) {
            const tail = __classPrivateFieldGet(this, _DynamicArray_list, "f").last.value;
            tail[idxAdd] = value;
            __classPrivateFieldSet(this, _DynamicArray_length, (_a = __classPrivateFieldGet(this, _DynamicArray_length, "f"), _a++, _a), "f");
        }
    }
    shift() {
        if (__classPrivateFieldGet(this, _DynamicArray_list, "f").first) {
            const value = __classPrivateFieldGet(this, _DynamicArray_list, "f").first.value[0];
            this.moveElements(1, -1);
            return value;
        }
        throw new Error('Array is empty');
    }
    unshift(value) {
        var _a;
        if (!this.isEmpty) {
            this.moveElements(0, 1);
        }
        else {
            this.addEmptyArray();
        }
        if (__classPrivateFieldGet(this, _DynamicArray_list, "f").first) {
            __classPrivateFieldGet(this, _DynamicArray_list, "f").first.value[0] = value;
            if (this.isEmpty) {
                __classPrivateFieldSet(this, _DynamicArray_length, (_a = __classPrivateFieldGet(this, _DynamicArray_length, "f"), _a++, _a), "f");
            }
        }
    }
    get values() {
        const list = __classPrivateFieldGet(this, _DynamicArray_list, "f");
        return {
            *[Symbol.iterator]() {
                for (let arr of list.values) {
                    for (let elem of arr) {
                        yield elem;
                    }
                }
            }
        };
    }
    get items() {
        const list = __classPrivateFieldGet(this, _DynamicArray_list, "f");
        return {
            *[Symbol.iterator]() {
                for (let arr of list.values) {
                    yield arr;
                }
            }
        };
    }
    splice(idx, countDelete, insertArray = []) {
        const offset = insertArray.length - countDelete;
        const moveIdx = idx + countDelete;
        if (offset !== 0) {
            this.moveElements(moveIdx, offset);
        }
        let curIdx = idx;
        for (let newItem of insertArray) {
            this.set(curIdx, newItem);
            curIdx++;
        }
    }
    addEmptyArray() {
        __classPrivateFieldGet(this, _DynamicArray_list, "f").add(new Array(this.capacityChunk));
    }
    moveElements(idxStart, offset) {
        if (offset === 0) {
            return;
        }
        if (offset > 0) {
            let prevLastIdx = __classPrivateFieldGet(this, _DynamicArray_length, "f") - 1;
            this.addItemsByOffset(offset);
            __classPrivateFieldSet(this, _DynamicArray_length, __classPrivateFieldGet(this, _DynamicArray_length, "f") + offset, "f");
            let idx = __classPrivateFieldGet(this, _DynamicArray_length, "f") - 1;
            while (idx >= idxStart + offset) {
                const prev = this.get(prevLastIdx);
                if (prev) {
                    this.set(idx, prev);
                }
                idx--;
                prevLastIdx--;
            }
        }
        else {
            let idx = idxStart + offset > 0 ? idxStart + offset : 0;
            let realOffset = idxStart - idx;
            let prevLastIdx = idxStart;
            while (prevLastIdx < __classPrivateFieldGet(this, _DynamicArray_length, "f") - 1) {
                const prev = this.get(prevLastIdx);
                if (prev) {
                    this.set(idx, prev);
                }
                idx++;
                prevLastIdx++;
            }
            for (let i = 0; i < realOffset; i++) {
                this.pop();
            }
        }
    }
    addItemsByOffset(offset) {
        let rows = Math.ceil(__classPrivateFieldGet(this, _DynamicArray_length, "f") / this.capacityChunk);
        const newRows = Math.ceil((__classPrivateFieldGet(this, _DynamicArray_length, "f") + offset) / this.capacityChunk);
        while (rows < newRows) {
            this.addEmptyArray();
            rows++;
        }
    }
    verifyIndex(idx) {
        if (idx < 0 || idx + 1 > __classPrivateFieldGet(this, _DynamicArray_length, "f")) {
            throw new Error('Index not exists');
        }
    }
}
exports.default = DynamicArray;
_DynamicArray_list = new WeakMap(), _DynamicArray_length = new WeakMap();
