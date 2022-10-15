export interface ILinkedListItem<T> {
    value: T;
    get next(): ILinkedListItem<T> | null;
    get prev(): ILinkedListItem<T> | null;
    setNext(item: ILinkedListItem<T>): void;
    setPrev(item: ILinkedListItem<T>): void;
}

export interface ILinkedList<T> {
    get first(): ILinkedListItem<T> | null;
    get last(): ILinkedListItem<T> | null;
    get length(): number;
    get items(): Iterable<ILinkedListItem<T>>;
    get reverseItems(): Iterable<ILinkedListItem<T>>;
    get values(): Iterable<T>;
    get reverseValues(): Iterable<T>;

    add(value: T): void;
    find(value: T, strict: boolean): ILinkedListItem<T> | null;

    insertBefore(value: T, before: T): ILinkedListItem<T>;
    insertBefore(value: T, itemList: ILinkedListItem<T>): ILinkedListItem<T>;

    insertAfter(value: T, after: T): ILinkedListItem<T>;
    insertAfter(value: T, itemList: ILinkedListItem<T>): ILinkedListItem<T>;

    delete(value: ILinkedListItem<T>): boolean;
    delete(value: T, strict?: boolean): boolean;

    isEmpty(): boolean;
}

export type ListItemOrNull<T> = ILinkedListItem<T> | null;