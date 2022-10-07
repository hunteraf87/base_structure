export interface LimitedStack<T> {
    readonly limit: number;
    get head(): T | null;
    get count(): number;
    get values(): Iterable<T>;

    push(value: T): void;
    take(): T;
}