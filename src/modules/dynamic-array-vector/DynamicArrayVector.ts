import {ArrayVector} from "./interfaces";

const MAX_CAPACITY = 4294967295;

export default class DynamicArrayVector<T = unknown> implements ArrayVector<T> {
    #vector: Array<T>;
    #length: number = 0;
    #capacity: number;

    constructor(capacity: number = 10) {
        if (capacity <= 0 || capacity > MAX_CAPACITY) {
            throw new Error('Incorrect capacity array');
        }
        this.#vector = new Array(capacity)
        this.#capacity = capacity;
    }

    get capacity(): number {
        return this.#capacity;
    }

    get length(): number {
        return this.#length;
    }

    push(value: T): void {
        if (this.#length === this.#capacity) {
            this.expandVector();
        }
        this.#vector[this.#length++] = value;
    }

    get(idx: number): T | undefined {
        if (idx >= this.#capacity) {
            throw new Error('Index not found');
        }
        return this.#vector[idx];
    }

    private expandVector(): void {
        if (this.#length >= MAX_CAPACITY) {
            throw new Error('Array is full');
        }
        this.#capacity = Math.min(MAX_CAPACITY, this.#length * 2);
        const newVector = new Array(this.#capacity);
        let idx = 0;
        while (idx < this.#length) {
            newVector[idx] = this.#vector[idx];
            idx++;
        }
        this.#vector = newVector;
    }

    * [Symbol.iterator](): Iterator<T> {
        for (let elem of this.#vector) {
            yield elem;
        }
    }
}