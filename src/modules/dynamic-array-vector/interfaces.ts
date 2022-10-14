export interface ArrayVector<T> extends Iterable<T> {
    get length(): number;
    get capacity(): number;

    push(value: T): void;
    get(idx: number): T | undefined;
}