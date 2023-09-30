export class BuildBtn {
    private readonly _buttonElem: HTMLButtonElement;
    private readonly iconElem: HTMLImageElement;
    private _active: boolean = false;

    constructor(name: string, iconPath: string, clickAction: () => void) {
        this._buttonElem = document.createElement("button");
        this._buttonElem.onclick = clickAction;
        this._buttonElem.title = name;

        this.iconElem = document.createElement("img");
        this.iconElem.src = iconPath;
        this.iconElem.alt = name;

        this._buttonElem.appendChild(this.iconElem);
    }

    public get buttonElem(): HTMLElement {
        return this._buttonElem;
    }

    public set active(active: boolean) {
        this._active = active;
        if (active) {
            this.iconElem.style.border = "4px solid #f0f0f0";
        }
        else {
            this.iconElem.style.border = "none";
        }
    }

    public toggleActive() {
        if (this._active) {
            this.active = false;
        }
        else {
            this.active = true;
        }
    }
}