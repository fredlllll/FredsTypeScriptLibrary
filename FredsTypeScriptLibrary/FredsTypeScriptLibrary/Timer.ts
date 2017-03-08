class Timer {
    elapsedCallback: () => void;
    private _interval: number;
    private _ID: number;
    private _running: boolean = false;

    get interval() {
        return this._interval;
    }

    set interval(val: number) {
        this._interval = val;
        if (this._running) {
            this.stop();
            this.start();
        }
    }

    get running() {
        return this._running;
    }

    start() {
        if (!this._running) {
            this._ID = setInterval(this.internalCallback, this._interval);
            this._running = true;
        }
    }

    stop() {
        if (this._running) {
            clearInterval(this._ID);
            this._running = false;
        }
    }

    private internalCallback() {
        if (this.elapsedCallback instanceof Function) { //so we dont get error spams 
            this.elapsedCallback();
        }
    }
}