export class BuildBtn {
    private readonly _buttonElem: HTMLButtonElement;
    private readonly iconElem: HTMLImageElement;
    private iconPath: string;
    private activeIconPath: string;
    private _active: boolean = false;

    constructor(name: string, clickAction: (active: boolean) => void, iconPath: string, activeIconPath?: string) {
        this.iconPath = iconPath;
        this.activeIconPath = activeIconPath == undefined ? iconPath : activeIconPath;

        this._buttonElem = document.createElement("button");
        this._buttonElem.onclick = () => clickAction(this.active);
        this._buttonElem.title = name;

        this.iconElem = document.createElement("img");
        //this.iconElem.onclick = this.toggleActive.bind(this);
        // combine theese
        this.iconElem.src = iconPath;
        this.iconElem.alt = name;

        this._buttonElem.appendChild(this.iconElem);
    }

    public get buttonElem(): HTMLElement {
        return this._buttonElem;
    }

    private set active(active: boolean) {
        if (active) {
            this._active = true;
            this.iconElem.src = this.activeIconPath;
        }
        else {
            this._active = false;
            this.iconElem.src = this.iconPath;
        }
    }

    private get active(): boolean {
        return this._active;
    }

    private toggleActive() {
        if (this._active) {
            this.active = false;
        }
        else {
            this.active = true;
        }
    }
}