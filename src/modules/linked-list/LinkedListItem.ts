import {ILinkedListItem, ValueType} from "./interfaces";

export class LinkedListItem implements ILinkedListItem {
    public value: ValueType;
    public next: ILinkedListItem | null = null;
    public prev: ILinkedListItem | null = null;

    constructor(value: ValueType) {
        this.value = value
    }
}