import {ILinkedList, LinkedList, ILinkedListItem} from "../linked-list";
import {ISimpleQueue} from "./interfaces";

export default class SimpleQueue<T = unknown> implements ISimpleQueue<T> {
    protected queue: ILinkedList<T>;

    constructor() {
        this.queue = new LinkedList<T>();
    }

    get head(): T | null {
        return this.queue.first?.value ?? null;
    }

    push(value: T): void {
        this.queue.add(value);
    }

    shift(): T {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        const first = <ILinkedListItem<T>>this.queue.first;
        const val = first.value;
        this.queue.delete(first);
        return val;
    }

    isEmpty(): boolean {
        return this.queue.isEmpty();
    }

    get values(): Iterable<T> {
        const self = this.queue;
        return {
            * [Symbol.iterator](): Iterator<T>{
                for (let item of self.values) {
                    yield item;
                }
            }
        }
    }
}