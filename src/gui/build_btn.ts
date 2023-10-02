import { Button } from "../data/asset_list";

export class BuildBtn {
    private readonly _buttonElem: HTMLButtonElement;
    private readonly iconElem: HTMLImageElement;
    private iconPath: string;
    private activeIconPath: string;
    private _active: boolean = false;
    private changeActiveAction?: (active: boolean) => void;

    constructor(name: string, tooltip: string, clickAction: (active: boolean) => boolean, button: Button, changeActiveAction?: (active: boolean) => void) {
        this.iconPath = button.iconPath;
        this.activeIconPath = button.activePath == undefined ? button.iconPath : button.activePath;
        this.changeActiveAction = changeActiveAction;

        this._buttonElem = document.createElement("button");
        this._buttonElem.addEventListener("mousedown", () => { this.active = clickAction(this.active) });
        this._buttonElem.title = tooltip;

        this.iconElem = document.createElement("img");
        this.iconElem.src = button.iconPath;
        this.iconElem.alt = name;
        this.iconElem.draggable = false;

        this._buttonElem.appendChild(this.iconElem);
    }

    public get buttonElem(): HTMLElement {
        return this._buttonElem;
    }

    public set active(active: boolean) {
        if (active) {
            this._active = true;
            this.iconElem.src = this.activeIconPath;
        }
        else {
            this._active = false;
            this.iconElem.src = this.iconPath;
        }

        if (this.changeActiveAction != undefined) {
            this.changeActiveAction(this._active);
        }
    }

    public get active(): boolean {
        return this._active;
    }
}
