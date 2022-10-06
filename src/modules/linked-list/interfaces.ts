export type ValueType = any

export interface ILinkedListItem {
    value: ValueType;
    next: ILinkedListItem | null;
    prev: ILinkedListItem | null;
}

export interface ILinkedList {
    first: ILinkedListItem | null;
    last: ILinkedListItem | null;

    add(value: ValueType): void;
    find(value: ValueType, strict: boolean): ILinkedListItem | null;
    insertBefore(value: ValueType, itemList: ILinkedListItem): ILinkedListItem;
    insertAfter(value: ValueType, itemList: ILinkedListItem): ILinkedListItem;
    delete(value: ValueType, strict: boolean): boolean;
}