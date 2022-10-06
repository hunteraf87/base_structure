"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
const LinkedListItem_1 = require("./LinkedListItem");
class LinkedList {
    constructor() {
        this.first = null;
        this.last = null;
    }
    add(value) {
        const newItem = new LinkedListItem_1.LinkedListItem(value);
        if (this.last) {
            newItem.prev = this.last;
            this.last.next = newItem;
            this.last = newItem;
        }
        else {
            this.first = newItem;
            this.last = newItem;
        }
    }
    insertBefore(value, itemList) {
        const newItem = new LinkedListItem_1.LinkedListItem(value);
        newItem.next = itemList;
        newItem.prev = itemList.prev;
        if (newItem.prev instanceof LinkedListItem_1.LinkedListItem) {
            newItem.prev.next = newItem;
        }
        if (itemList === this.first) {
            this.first = newItem;
        }
        itemList.prev = newItem;
        return newItem;
    }
    insertAfter(value, itemList) {
        const newItem = new LinkedListItem_1.LinkedListItem(value);
        newItem.prev = itemList;
        newItem.next = itemList.next;
        if (itemList === this.last) {
            this.last = newItem;
        }
        itemList.next = newItem;
        return newItem;
    }
    find(value, strict = true) {
        for (let itemList of this) {
            if (strict ? value === itemList.value : value == itemList.value) {
                return itemList;
            }
        }
        return null;
    }
    delete(value, strict = true) {
        const findItem = this.find(value, strict);
        if (findItem instanceof LinkedListItem_1.LinkedListItem) {
            if (findItem.prev instanceof LinkedListItem_1.LinkedListItem) {
                findItem.prev.next = findItem.next;
            }
            else {
                this.first = findItem.next;
            }
            if (findItem.next instanceof LinkedListItem_1.LinkedListItem) {
                findItem.next.prev = findItem.prev;
            }
            else {
                this.last = findItem.prev;
            }
            return true;
        }
        return false;
    }
    [Symbol.iterator]() {
        let current = this.first;
        return {
            next() {
                if (current instanceof LinkedListItem_1.LinkedListItem) {
                    const value = current;
                    current = current.next;
                    return {
                        done: false,
                        value
                    };
                }
                return {
                    done: true,
                    value: null
                };
            }
        };
    }
}
exports.LinkedList = LinkedList;
