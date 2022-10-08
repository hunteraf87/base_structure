export type KeyStructure = string | number

export interface Structure<V> {
    set(key: KeyStructure, value: V): void;
    get(key: KeyStructure): V;
}