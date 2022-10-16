import {ILinkedList} from "../linked-list";

export type KeyMap = string | number

export type HashValue<T> = [string, T]
export type HashItem<T> = ILinkedList<HashValue<T>>

export interface HashMap<T> {
    get capacity(): number;

    set(key: KeyMap, value: T): void;
    get(key: KeyMap): T;
    get(key: KeyMap): void;

    keys(): IterableIterator<string>;
    values(): IterableIterator<T>;
}