import {
    HashMap as Map,
    KeyMap, HashItem, HashValue
} from './interfaces';
import {checkSimple, stringToNumber} from './helpers'
import {LinkedList} from "../linked-list";

const DEFAULT_CAPACITY = 31;

export default class HashMap<T = unknown> implements Map<T> {
    #map: Array<HashItem<T>>;
    #capacity: number;

    constructor(capacity: number = DEFAULT_CAPACITY) {
        if (capacity <= 2 || !checkSimple(capacity)) {
            throw new Error('Need simple number for capacity')
        }
        this.#capacity = capacity;
        this.#map = new Array(capacity);
    }

    get capacity(): number {
        return this.#capacity;
    }

    set(key: KeyMap, value: T): void {
        this.checkKey(key);
        const k = key.toString();
        const hash = this.getHash(k);
        this.setMapValue(hash, [k, value]);
    }

    get(key: KeyMap): T {
        this.checkKey(key);
        const k = key.toString();
        const hash = this.getHash(k);
        return this.getMapValue(hash, k);
    }

    delete(key: KeyMap): void {
        this.checkKey(key);
        const k = key.toString();
        const hash = this.getHash(k);
        this.deleteMapValue(hash, k);
    }

    protected getHash(key: string): number {
        return stringToNumber(key) % this.#capacity;
    }

    protected setMapValue(hash: number, value: HashValue<T>, distinct?: Array<HashItem<T>>): void {
        const map = distinct ?? this.#map;

        if (map[hash] === undefined) {
            map[hash] = new LinkedList<HashValue<T>>();
        }

        map[hash].add(value);

        if (map[hash].length > 2) {
            this.rehash();
        }
    }

    protected getMapValue(hash: number, key: string): T {
        const item = this.#map[hash];
        if (item !== undefined) {
            for (let val of item.values) {
                if (val[0] === key) {
                    return val[1];
                }
            }
        }
        throw new Error('Key not found');
    }

    protected deleteMapValue(hash: number, key: string): void {
        const item = this.#map[hash];
        if (item !== undefined) {
            for (let val of item.values) {
                if (val[0] === key) {
                    item.delete(val);
                    return;
                }
            }
        }
        throw new Error('Key not found');
    }

    protected rehash() {
        this.#capacity = this.#capacity * 2 + 1;
        while (!checkSimple(this.#capacity)) {
            this.#capacity++;
        }
        const newMap = new Array(this.#capacity);
        for (const [key, value] of this.entities()) {
            this.setMapValue(this.getHash(key), [key, value], newMap);
        }
        this.#map = newMap;
    }

    protected checkKey(key: KeyMap) {
        if (!/^[a-zA-Z0-9]+$/.test(key.toString())) {
            throw new Error('Key of map includes only latin symbols or numbers')
        }
    }

    keys(): IterableIterator<string> {
        const entities = this.entities();
        return {
            [Symbol.iterator]() {
                return this;
            },
            next() {
                const item = entities.next();
                if (!item.done) {
                    return {
                        done: false,
                        value: item.value[0]
                    };
                } else {
                    return {
                        done: true,
                        value: null
                    }
                }
            }
        }
    }

    values(): IterableIterator<T> {
        const entities = this.entities();
        return {
            [Symbol.iterator]() {
                return this;
            },
            next() {
                const item = entities.next();
                if (!item.done) {
                    return {
                        done: false,
                        value: item.value[1]
                    };
                } else {
                    return {
                        done: true,
                        value: null
                    }
                }
            }
        }
    }

    private *entities(): Generator<HashValue<T>> {
        for (let item of this.#map) {
            if (item === undefined) {
                continue;
            }
            for (let itemList of item.values) {
                yield itemList;
            }
        }
    }
}