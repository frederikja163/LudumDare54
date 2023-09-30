export class BuildBtn {
    private readonly _buttonElem: HTMLButtonElement;
    private readonly iconElem: HTMLImageElement;

    constructor(name: string, iconPath: string, clickAction: () => void) {
        this._buttonElem = document.createElement("button");
        this._buttonElem.onclick = clickAction;

        this.iconElem = document.createElement("img");
        this.iconElem.src = iconPath;
        this.iconElem.alt = name;

        this._buttonElem.appendChild(this.iconElem);
    }

    public get buttonElem(): HTMLElement {
        return this._buttonElem;
    }
}