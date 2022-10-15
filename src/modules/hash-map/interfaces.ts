import {ILinkedList} from "../linked-list";

export type KeyMap = string | number

export type HashValue<T> = [string, T]
export type CollisionValue<T> = ILinkedList<HashValue<T>>
export type HashItem<T> = HashValue<T> | CollisionValue<T>

export interface HashMap<T> {
    // set(key: KeyMap, value: T): void;
    // get(key: KeyMap): T;
}