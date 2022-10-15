import {ILinkedList, ListItemOrNull, ILinkedListItem} from "./interfaces";
import LinkedListItem from "./LinkedListItem";

export default class LinkedList<T = unknown> implements ILinkedList<T> {
    #first: ListItemOrNull<T> = null;
    #last: ListItemOrNull<T> = null;
    #length: number = 0;

    get first(): ListItemOrNull<T> {
        return this.#first;
    }

    get last(): ListItemOrNull<T> {
        return this.#last;
    }

    get length(): number {
        return this.#length;
    }

    add(value: T): void {
        const newItem = new LinkedListItem(value);
        if (this.#last instanceof LinkedListItem) {
            newItem.setPrev(this.#last);
            this.#last.setNext(newItem);
            this.#last = newItem;
        } else {
            this.#first = newItem;
            this.#last = newItem;
        }
        this.#length++;
    }

    insertBefore(value: T, before: T): ILinkedListItem<T>
    insertBefore(value: T, itemList: ILinkedListItem<T>): ILinkedListItem<T>;
    insertBefore(value: T, itemOrValue: ILinkedListItem<T> | T): ILinkedListItem<T> {
        const newItem = new LinkedListItem(value);
        const itemList = itemOrValue instanceof LinkedListItem ? itemOrValue : this.find(<T>itemOrValue);

        if (itemList === null) {
            throw new Error(`Value '${itemOrValue} not found id list'`)
        }

        newItem.setNext(itemList);
        newItem.setPrev(itemList.prev);

        if (newItem.prev instanceof LinkedListItem) {
            newItem.prev.setNext(newItem);
        }
        if (itemList === this.#first) {
            this.#first = newItem;
        }

        itemList.setPrev(newItem);
        this.#length++;

        return newItem;
    }

    insertAfter(value: T, after: T): ILinkedListItem<T>
    insertAfter(value: T, itemList: ILinkedListItem<T>): ILinkedListItem<T>;
    insertAfter(value: T, itemOrValue: ILinkedListItem<T> | T): ILinkedListItem<T> {
        const newItem = new LinkedListItem(value);
        const itemList = itemOrValue instanceof LinkedListItem ? itemOrValue : this.find(<T>itemOrValue);

        if (itemList === null) {
            throw new Error(`Value '${itemOrValue} not found id list'`)
        }

        newItem.setPrev(itemList);
        newItem.setNext(itemList.next);

        if (itemList === this.#last) {
            this.#last = newItem;
        }

        itemList.setNext(newItem);
        this.#length++;

        return newItem;
    }

    find(value: T, strict: boolean = true): ListItemOrNull<T> {
        for (let itemList of this.items) {
            if (strict ? value === itemList.value : value == itemList.value) {
                return itemList;
            }
        }
        return null;
    }

    delete(value: ILinkedListItem<T>): boolean;
    delete(value: T, strict?: boolean): boolean;
    delete(valueOrItem: ILinkedListItem<T> | T, strict: boolean = true): boolean {
        const findItem = valueOrItem instanceof LinkedListItem ? valueOrItem : this.find(<T>valueOrItem, strict);
        if (findItem instanceof LinkedListItem) {
            if (findItem.prev instanceof LinkedListItem) {
                findItem.prev.setNext(findItem.next);
            } else {
                this.#first = findItem.next;
            }
            if (findItem.next instanceof LinkedListItem) {
                findItem.next.setPrev(findItem.prev);
            } else {
                this.#last = findItem.prev;
            }
            this.#length--;
            return true;
        }
        return false;
    }

    isEmpty(): boolean {
        return this.#first === null;
    }

    get items(): Iterable<ILinkedListItem<T>> {
        let current = this.#first;
        return {
            * [Symbol.iterator](): Iterator<ILinkedListItem<T>> {
                while (current) {
                    yield current;
                    current = current.next
                }
            }
        }
    }

    get reverseItems(): Iterable<ILinkedListItem<T>> {
        let current = this.#last;
        return {
            * [Symbol.iterator](): Iterator<ILinkedListItem<T>> {
                while (current) {
                    yield current;
                    current = current.prev
                }
            }
        }
    }

    get values(): Iterable<T> {
        const self = this;
        return {
            * [Symbol.iterator](): Iterator<T> {
                for(let item of self.items) {
                    yield item.value;
                }
            }
        }
    }

    get reverseValues(): Iterable<T> {
        const self = this;
        return {
            * [Symbol.iterator](): Iterator<T> {
                for(let item of self.reverseItems) {
                    yield item.value;
                }
            }
        }
    }
}