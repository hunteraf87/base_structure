"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const linked_list_1 = require("../linked-list");
class SimpleQueue {
    constructor() {
        this.queue = new linked_list_1.LinkedList();
    }
    get head() {
        return this.queue.first?.value ?? null;
    }
    push(value) {
        this.queue.add(value);
    }
    shift() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        const first = this.queue.first;
        const val = first.value;
        this.queue.delete(first);
        return val;
    }
    isEmpty() {
        return this.queue.isEmpty();
    }
    get values() {
        const self = this.queue;
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
