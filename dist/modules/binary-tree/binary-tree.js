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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _BinaryTree_root;
Object.defineProperty(exports, "__esModule", { value: true });
const binary_node_1 = __importDefault(require("./binary-node"));
const queue_1 = require("../queue");
class BinaryTree {
    constructor(innerArray = []) {
        _BinaryTree_root.set(this, null);
        innerArray.forEach(val => this.insert(val));
    }
    insert(value) {
        if (__classPrivateFieldGet(this, _BinaryTree_root, "f") === null) {
            __classPrivateFieldSet(this, _BinaryTree_root, new binary_node_1.default(value), "f");
        }
        else {
            let current = __classPrivateFieldGet(this, _BinaryTree_root, "f");
            while (true) {
                let parent = current;
                if (current.value > value) {
                    current = current.left;
                    if (current === null) {
                        parent.left = new binary_node_1.default(value);
                        return;
                    }
                }
                else {
                    current = current.right;
                    if (current === null) {
                        parent.right = new binary_node_1.default(value);
                        return;
                    }
                }
            }
        }
    }
    has(value) {
        if (__classPrivateFieldGet(this, _BinaryTree_root, "f") === null) {
            return false;
        }
        let current = __classPrivateFieldGet(this, _BinaryTree_root, "f");
        while (current.value !== value) {
            current = current.value > value ? current.left : current.right;
            if (current === null) {
                return false;
            }
        }
        return true;
    }
    min() {
        if (__classPrivateFieldGet(this, _BinaryTree_root, "f") === null) {
            return null;
        }
        let current = __classPrivateFieldGet(this, _BinaryTree_root, "f");
        while (current.left !== null) {
            current = current.left;
        }
        return current.value;
    }
    max() {
        if (__classPrivateFieldGet(this, _BinaryTree_root, "f") === null) {
            return null;
        }
        let current = __classPrivateFieldGet(this, _BinaryTree_root, "f");
        while (current.right !== null) {
            current = current.right;
        }
        return current.value;
    }
    delete(value) {
        if (__classPrivateFieldGet(this, _BinaryTree_root, "f") === null) {
            return false;
        }
        let parent = null;
        let current = __classPrivateFieldGet(this, _BinaryTree_root, "f");
        while (current.value !== value) {
            parent = current;
            current = current.value > value ? current.left : current.right;
            if (current === null) {
                return false;
            }
        }
        if (parent === null) {
            __classPrivateFieldSet(this, _BinaryTree_root, null, "f");
            return true;
        }
        return this.deleteNode(parent, current);
    }
    deleteNode(parent, node) {
        if (node.left === null && node.right === null) {
            if (parent.left === node) {
                parent.left = null;
            }
            if (parent.right === node) {
                parent.right = null;
            }
            return true;
        }
        if ((node.left === null || node.right === null) && (node.left !== null || node.right !== null)) {
            if (parent.left === node) {
                parent.left = node.left ?? node.right;
            }
            if (parent.right === node) {
                parent.left = node.left ?? node.right;
            }
            return true;
        }
        if (node.left !== null && node.right !== null) {
            let current = node.right;
            let successor = current;
            let parentSuccessor = node;
            if (current.left === null) {
                if (parent.left === node) {
                    parent.left = successor;
                }
                if (parent.right === node) {
                    parent.right = successor;
                }
                successor.left = node.left;
                return true;
            }
            while (successor.left !== null) {
                parentSuccessor = successor;
                successor = successor.left;
            }
            parentSuccessor.left = successor.right === null ? null : successor.right;
            node.value = successor.value;
            return true;
        }
        return false;
    }
    intoIter(generator) {
        return {
            [Symbol.iterator]() {
                return this;
            },
            next(...args) {
                if (generator !== null) {
                    const val = generator.next();
                    if (!val.done) {
                        return {
                            done: false,
                            value: val.value
                        };
                    }
                    else {
                        return {
                            done: true,
                            value: null
                        };
                    }
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
        const generator = __classPrivateFieldGet(this, _BinaryTree_root, "f") === null ? null : __classPrivateFieldGet(this, _BinaryTree_root, "f").values();
        return this.intoIter(generator);
    }
    symmetricalValues() {
        const generator = __classPrivateFieldGet(this, _BinaryTree_root, "f") === null ? null : __classPrivateFieldGet(this, _BinaryTree_root, "f").symmetrical();
        return this.intoIter(generator);
    }
    reversedValues() {
        const generator = __classPrivateFieldGet(this, _BinaryTree_root, "f") === null ? null : __classPrivateFieldGet(this, _BinaryTree_root, "f").reversed();
        return this.intoIter(generator);
    }
    widthValues() {
        return this.intoIter(this.widthGenerator());
    }
    *widthGenerator() {
        if (__classPrivateFieldGet(this, _BinaryTree_root, "f") !== null) {
            const queue = new queue_1.SimpleQueue();
            queue.push(__classPrivateFieldGet(this, _BinaryTree_root, "f"));
            while (true) {
                let item = queue.shift();
                yield item.value;
                if (item.left !== null) {
                    queue.push(item.left);
                }
                if (item.right !== null) {
                    queue.push(item.right);
                }
                if (queue.isEmpty()) {
                    break;
                }
            }
        }
    }
}
exports.default = BinaryTree;
_BinaryTree_root = new WeakMap();
