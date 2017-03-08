interface IObservable {
    onChange: ScriptEvent;
    changed(): void;
}