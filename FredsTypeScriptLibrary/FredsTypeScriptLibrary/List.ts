class List<T> implements IList<T>{
    protected internalArray: T[] = [];

    sortOnChange = false;
    sortFunction = Tools.stdCompare;

    replaceInternalArray(array: T[]) {
        this.internalArray = array;
    }

    getInternalArray() {
        return this.internalArray;
    }

    get count() {
        return this.internalArray.length;
    }

    addFirst(...items: T[]) {
        this.addRangeFirst(items);
    }

    addRangeFirst(items: T[]) {
        for (var i = 0; i < items.length; i++) {
            this.internalArray.unshift(items[i]);
        }
    }

    addLast(...items: T[]) {
        this.addRangeLast(items);
    }

    addRangeLast(items: T[]) {
        for (var i = 0; i < items.length; i++) {
            this.internalArray.push(items[i]);
        }
    }

    addAfter(item: T, after: T) {
        var index = this.internalArray.indexOf(after);
        this.internalArray.splice(index, 0, item);
    }

    addBefore(item: T, before: T) {
        var index = this.internalArray.indexOf(before);
        if (index == 0) {
            this.internalArray.unshift(item);
        } else {
            this.internalArray.splice(index - 1, 0, item);
        }
    }

    addAt(item: T, index: number) {
        if (index == 0) {
            this.internalArray.unshift(item);
        } else {
            this.internalArray.splice(index - 1, 0, item);
        }
    }

    setAt(item: T, index: number) {
        while (this.count <= index) {
            this.addLast(undefined);
        }
        this.internalArray[index] = item;
    }

    getAt(index: number): T {
        return this.internalArray[index];
    }

    remove(item: T) {
        var index = this.internalArray.indexOf(item);
        this.removeAt(index);
    }

    removeFirst(): T {
        return this.internalArray.shift();
    }

    removeLast(): T {
        return this.internalArray.pop();
    }

    removeAt(index: number): T {
        var retval = undefined;
        if (index >= 0 && index < this.count) {
            retval = this.getAt(index);
            this.internalArray.splice(index, 1);
        }
        return retval;
    }
}