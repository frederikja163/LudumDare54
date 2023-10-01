import { Button } from "../data/asset_list";

export class BuildBtn {
    private readonly _buttonElem: HTMLButtonElement;
    private readonly iconElem: HTMLImageElement;
    private iconPath: string;
    private activeIconPath: string;
    private _active: boolean = false;

    constructor(name: string, clickAction: (active: boolean) => boolean, button: Button) {
        this.iconPath = button.iconPath;
        this.activeIconPath = button.activePath == undefined ? button.iconPath : button.activePath;

        this._buttonElem = document.createElement("button");
        this._buttonElem.onmousedown = () => {
            this.active = clickAction(this.active);
        };
        this._buttonElem.title = name;

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
    }

    public get active(): boolean {
        return this._active;
    }
}
