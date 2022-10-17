"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BinaryNode {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.value = value;
    }
    *values() {
        yield this.value;
        if (this.left !== null) {
            yield* this.left.values();
        }
        if (this.right !== null) {
            yield* this.right.values();
        }
    }
    *symmetrical() {
        if (this.left !== null) {
            yield* this.left.symmetrical();
        }
        yield this.value;
        if (this.right !== null) {
            yield* this.right.symmetrical();
        }
    }
    *reversed() {
        if (this.left !== null) {
            yield* this.left.reversed();
        }
        if (this.right !== null) {
            yield* this.right.reversed();
        }
        yield this.value;
    }
}
exports.default = BinaryNode;
