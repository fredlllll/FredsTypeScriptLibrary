class LocationWatcher {
    updateCallback: (position:Position) => void;
    private _ID: number;
    private _running: boolean = false;

    private pos: Position;
    get position() {
        return this.pos;
    }

    get running() {
        return this._running;
    }

    start() {
        if (!this._running) {
            this._ID = navigator.geolocation.watchPosition(this.internalCallback, this.errorCallback);
            this._running = true;
        }
    }

    stop() {
        if (this._running) {
            clearInterval(this._ID);
            this._running = false;
        }
    }

    private internalCallback(position: Position) {
        this.pos = position;
        if (this.updateCallback instanceof Function) {
            this.updateCallback(position);
        }
    }

    private errorCallback(error: PositionError) {
        Tools.log(error);
    }
}