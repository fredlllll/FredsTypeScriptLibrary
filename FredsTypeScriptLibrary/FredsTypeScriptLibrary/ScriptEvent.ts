class ScriptEvent {
    args: any;
    listeners = new List<(sender: any, event: ScriptEvent) => void>();
    constructor(public owner: any) { }

    addListener(func: (sender: any, event: ScriptEvent) => void) {
        this.listeners.addLast(func);
        if (!func) {
            Tools.log("adding " + func + " to scriptevent");
        }
    }
    removeListener(func: (sender: any, event: ScriptEvent) => void) {
        this.listeners.remove(func);
    }
    raise() {
        var arr = this.listeners.getInternalArray();
        for (var i = 0; i < arr.length; i++) {
            arr[i](this.owner, this);
        }
    }
}