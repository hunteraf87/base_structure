export interface ISimpleQueue<T> {
    get head(): T | null;
    get values(): Iterable<T>;

    push(value: T): void;
    shift(): T;
    isEmpty(): boolean;
}