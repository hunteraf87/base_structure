import {
    HashMap as Map,
    KeyMap, HashItem, HashValue
} from './interfaces';
import {checkSimple, stringToNumber} from './Functions'
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

    protected getHash(key: string): number {
        return stringToNumber(key) % this.#capacity;
    }

    protected setMapValue(hash: number, value: HashValue<T>, distinct?: Array<HashItem<T>>): void {
        const map = distinct ?? this.#map;
        if (map[hash] === undefined) {
            map[hash] = value;
        } else {
            if (Array.isArray(map[hash])) {
                const linkedList = new LinkedList<HashValue<T>>();
                linkedList.add(<HashValue<T>>map[hash]);
                linkedList.add(value);
                map[hash] = linkedList;
            } else {
                const item = <LinkedList<HashValue<T>>>map[hash];
                item.add(value);
                if (this.checkReHashing(item)) {
                    this.rehash();
                }
            }
        }
    }

    protected getMapValue(hash: number, key: string): T {
        const item = this.#map[hash];
        if (item === undefined) {
            throw new Error('Key not found')
        }
        if (Array.isArray(item)) {
            if (item[0] === key) {
                return item[1];
            }
        } else {
            for (let val of item.values) {
                if (val[0] === key) {
                    return val[1];
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

    protected checkReHashing(list: LinkedList<HashValue<T>>): boolean {
        return list.length > 3;
    }

    get keys(): Iterable<string> {
        const self = this;
        return {
            * [Symbol.iterator](): Iterator<string> {
                for (let item of self.entities()) {
                    yield item[0];
                }
            }
        }
    }

    get values(): Iterable<T> {
        const self = this;
        return {
            * [Symbol.iterator](): Iterator<T> {
                for (let item of self.entities()) {
                    yield item[1];
                }
            }
        }
    }

    *entities(): Generator<HashValue<T>> {
        for (let item of this.#map) {
            if (item === undefined) {
                continue;
            }
            if (Array.isArray(item)) {
                yield item;
            } else {
                for (let itemList of item.values) {
                    yield itemList;
                }
            }
        }
    }
}