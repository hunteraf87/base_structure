import {ILinkedList, ILinkedListItem, ValueType} from "./interfaces";
import {LinkedListItem} from "./LinkedListItem";

export class LinkedList implements ILinkedList {
    public first: ILinkedListItem | null = null;
    public last: ILinkedListItem | null = null;

    add(value: ValueType): void {
        const newItem = new LinkedListItem(value);
        if (this.last) {
            newItem.prev = this.last;
            this.last.next = newItem;
            this.last = newItem;
        } else {
            this.first = newItem;
            this.last = newItem;
        }
    }

    insertBefore(value: ValueType, itemList: LinkedListItem): LinkedListItem {
        const newItem = new LinkedListItem(value);

        newItem.next = itemList;
        newItem.prev = itemList.prev;

        if (newItem.prev instanceof LinkedListItem) {
            newItem.prev.next = newItem;
        }
        if (itemList === this.first) {
            this.first = newItem;
        }

        itemList.prev = newItem;

        return newItem;
    }

    insertAfter(value: ValueType, itemList: LinkedListItem): LinkedListItem {
        const newItem = new LinkedListItem(value);

        newItem.prev = itemList;
        newItem.next = itemList.next;

        if (itemList === this.last) {
            this.last = newItem;
        }

        itemList.next = newItem;

        return newItem;
    }

    find(value: ValueType, strict: boolean = true): LinkedListItem | null {
        for (let itemList of this) {
            if (strict ? value === itemList.value : value == itemList.value) {
                return itemList;
            }
        }
        return null;
    }

    delete(value: ValueType, strict: boolean = true): boolean {
        const findItem = this.find(value, strict);
        if (findItem instanceof LinkedListItem) {
            if (findItem.prev instanceof LinkedListItem) {
                findItem.prev.next = findItem.next;
            } else {
                this.first = findItem.next;
            }
            if (findItem.next instanceof LinkedListItem) {
                findItem.next.prev = findItem.prev;
            } else {
                this.last = findItem.prev;
            }
            return true;
        }
        return false;
    }

    [Symbol.iterator](): Iterator<LinkedListItem> {
        let current = this.first;
        return {
            next() {
                if (current instanceof LinkedListItem) {
                    const value = current;
                    current = current.next;
                    return {
                        done: false,
                        value
                    }
                }
                return {
                    done: true,
                    value: null
                }
            }
        }
    }
}