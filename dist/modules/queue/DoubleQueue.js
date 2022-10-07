"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
class DoubleQueue extends index_1.SimpleQueue {
    constructor() {
        super();
    }
    get back() {
        return this.queue.last?.value ?? null;
    }
    unshift(value) {
        if (this.isEmpty()) {
            this.queue.add(value);
        }
        else {
            this.queue.insertBefore(value, this.queue.first);
        }
    }
    pop() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        const last = this.queue.last;
        const val = last.value;
        this.queue.delete(last);
        return val;
    }
}
exports.default = DoubleQueue;
