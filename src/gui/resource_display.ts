export class ResourceDisplay {
    private readonly _containerElem: HTMLDivElement;
    private readonly iconElem: HTMLImageElement;
    private readonly counterElem: HTMLParagraphElement;
    private _counter: number;

    constructor(name: string, iconPath: string) {
        this._containerElem = document.createElement("div");
        this.containerElem.className += "resourceDisplay";

        this.iconElem = document.createElement("img");
        this.iconElem.src = iconPath;
        this.iconElem.alt = name;
        this.iconElem.title = name;
        this.containerElem.appendChild(this.iconElem);

        this.counterElem = document.createElement("p");
        this.counter = 0;
        this.containerElem.appendChild(this.counterElem);
    }

    public get counter(): number {
        return this._counter;
    }

    public set counter(value: number) {
        this._counter = value;
        this.counterElem.textContent = JSON.stringify(value);
    }

    public get containerElem(): HTMLElement {
        return this._containerElem;
    }
}