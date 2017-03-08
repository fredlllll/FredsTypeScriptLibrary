interface IList<T> {
    count: number;

    addFirst: (...items: T[]) => void;
    addRangeFirst: (items: T[]) => void;
    addLast: (...items: T[]) => void;
    addRangeLast: (items: T[]) => void;
    addAfter: (item: T, after: T) => void;
    addBefore: (item: T, before: T) => void;
    addAt: (item: T, index: number) => void;
    setAt: (item: T, index: number) => void;
    getAt: (index: number) => T;
    remove: (item: T) => void;
    removeFirst: () => T;
    removeLast: () => T;
    removeAt: (index: number) => T;
}