/// <reference path="jquery.d.ts" />

class UIList {
    protected htmlElements: List<HTMLElement> = new List<HTMLElement>();
    protected _items: IObservableList<IObservable>;
    protected insertionNode: HTMLElement;
    constructor(public container: HTMLElement, public itemPreset: HTMLElement, public newUIListItemFunction: () => UIListItem) {
        this.insertionNode = document.createElement("div");
        container.insertBefore(this.insertionNode, itemPreset);
        Tools.removeElement(itemPreset);//remove from dom
    }

    set items(items: IObservableList<IObservable>) {
        if (this._items) {
            this._items.onChange.removeListener(this.onChangedListener);
        }

        this._items = items;
        if (this._items) {
            this._items.onChange.addListener(this.onChangedListener);
        }
        this.updateUI();
    }

    onChangedListener = (sender: any, event: ScriptEvent) => {
        this.updateUI();
    }

    get items() {
        return this._items;
    }

    updateUI() {
        this.adjustHtmlElementCount();
        for (var i = 0; i < this.items.count; i++) {
            var listItem = <UIListItem>jQuery.data(this.htmlElements.getAt(i), "listItem");
            listItem.context = this.items.getAt(i);
        }
        try {
            jQuery(this.container).listview("refresh");
        } catch (e) {

        }
    }

    adjustHtmlElementCount() {
        while (this.htmlElements.count < this.items.count) { // add
            var newElement = <HTMLElement>this.itemPreset.cloneNode(true);
            newElement.classList.remove("nodisplay");
            var newListItem = this.newUIListItemFunction();
            newListItem.htmlElement = newElement;
            newListItem.parentUIList = this;
            jQuery.data(newElement, "listItem", newListItem);
            this.htmlElements.addLast(newElement);
            this.container.insertBefore(newElement, this.insertionNode);
        }
        while (this.htmlElements.count > this.items.count) { //remove
            var oldElement = this.htmlElements.removeLast();
            jQuery.removeData(oldElement);
            Tools.removeElement(oldElement);
        }
    }
}

class UIListItem {
    htmlElement: HTMLElement;
    parentUIList: UIList;

    protected cntxt = null;
    get context() {
        return this.cntxt;
    }
    set context(val) {
        var old = this.cntxt;
        this.cntxt = val;
        this.onContextAssigned(old, val);
    }
    onContextAssigned(oldValue, newValue) {

    }
}