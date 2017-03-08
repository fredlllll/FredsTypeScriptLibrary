class ObservableString implements IObservable {
    protected _value: string = null;
    set value(val: string) {
        this._value = val;
        this.changed();
    }
    get value() {
        return this._value;
    }

    constructor(val: string = undefined) {
        if (val) {
            this._value = val;
        }
    }

    toJSON() {
        return { value: this.value };
    }

    onChange = new ScriptEvent(this);
    changed() {
        this.onChange.raise();
    }
}