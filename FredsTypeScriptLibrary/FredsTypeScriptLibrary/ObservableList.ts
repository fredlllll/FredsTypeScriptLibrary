class ObservableList<T> implements IObservableList<T>{
    protected _internalArray: T[] = [];
    set internalArray(val: T[]) {
        if (this._internalArray) {
            for (var i = 0; i < this._internalArray.length; i++) {
                this.removeListener(this._internalArray[i]);
            }
        }
        this._internalArray = val;
        if (this._internalArray) {
            for (var i = 0; i < this._internalArray.length; i++) {
                this.addListener(this._internalArray[i]);
            }
        } else {
            this._internalArray = [];
        }
        this.changed();
    }
    get internalArray(): T[] {
        return this._internalArray;
    }

    protected getNewObjectFunc: () => T;
    constructor(getNewObjectFunc: () => T) {
        this.getNewObjectFunc = getNewObjectFunc;
    }

    sortOnChange = false;
    sortFunction = Tools.stdCompare;

    onChange = new ScriptEvent(this);
    changed() {
        if (this.sortOnChange) {
            this._internalArray.sort(this.sortFunction);
        }
        this.onChange.raise();
    }

    toJSON = () => {
        return {
            count: this.count,
            internalArray: this._internalArray,
        };
    }

    protected onChangeListener = (s: any, se: ScriptEvent) => {
        this.changed();
    }

    protected addListener(item) {
        if (item) {
            var iobs = <IObservable><any>item;
            if (iobs.onChange) {
                iobs.onChange.addListener(this.onChangeListener);
            }
        }
    }

    protected removeListener(item) {
        if (item) {
            var iobs = <IObservable><any>item;
            if (iobs.onChange) {
                iobs.onChange.removeListener(this.onChangeListener);
            }
        }
    }

    /*replaceInternalArray(array: T[]) {
        for (var i = 0; i < this._internalArray.length; i++) {
            this.removeListener(this._internalArray[i]);
        }
        this._internalArray = array;
        for (var i = 0; i < this._internalArray.length; i++) {
            this.addListener(this._internalArray[i]);
        }
        this.changed();
    }

    getInternalArray() {
        return this._internalArray;
    }*/

    get count(): number {
        return this._internalArray.length;
    }

    set count(val: number) { //only adds objects as we cant tell what should be deleted when setting count to less
        for (var i = this.count; i < val; i++) {
            this.addLast(this.getNewObjectFunc());
        }
    }

    addFirst(...items: T[]) {
        this.addRangeFirst(items);
    }

    addRangeFirst(items: T[]) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            this.addListener(item);
            this._internalArray.unshift(item);
        }
        this.changed();
    }

    addLast(...items: T[]) {
        this.addRangeLast(items);
    }

    addRangeLast(items: T[]) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            this.addListener(item);
            this._internalArray.push(item);
        }
        this.changed();
    }

    addAfter(item: T, after: T) {
        var index = this._internalArray.indexOf(after);
        this.addListener(item);
        this._internalArray.splice(index, 0, item);
        this.changed();
    }

    addBefore(item: T, before: T) {
        var index = this._internalArray.indexOf(before);
        this.addListener(item);
        if (index == 0) {
            this._internalArray.unshift(item);
        } else {
            this._internalArray.splice(index - 1, 0, item);
        }
        this.changed();
    }

    addAt(item: T, index: number) {
        this.addListener(item);
        if (index == 0) {
            this._internalArray.unshift(item);
        } else {
            this._internalArray.splice(index - 1, 0, item);
        }
        this.changed();
    }

    setAt(item: T, index: number) {
        while (this.count <= index) {
            this.addLast(undefined);
        }
        if (this._internalArray[index]) {
            this.removeListener(this._internalArray[index]);
        }
        this.addListener(item);
        this._internalArray[index] = item;
        this.changed();
    }

    getAt(index: number): T {
        return this._internalArray[index];
    }

    remove(item: T) {
        var index = this._internalArray.indexOf(item);
        this.removeListener(item);
        this.removeAt(index);
        this.changed();
    }

    removeFirst(): T {
        var retval = this._internalArray.shift();
        this.removeListener(retval);
        this.changed();
        return retval;
    }

    removeLast(): T {
        var retval = this._internalArray.pop();
        this.removeListener(retval);
        this.changed();
        return retval;
    }

    removeAt(index: number): T {
        var retval: T = undefined;
        if (index >= 0 && index < this.count) {
            retval = this.getAt(index);
            this.removeListener(retval);
            this._internalArray.splice(index, 1);
            this.changed();
        }
        return retval;
    }
}