export class Slider {
    private _name: string;
    private _value: number;
    private _max: number;
    private readonly _containerElem: HTMLDivElement;
    private readonly iconElem: HTMLImageElement;
    private readonly infoElem: HTMLDivElement;
    private readonly inputElem: HTMLInputElement;

    constructor(name: string, iconPath: string, max: number = 1, startValue: number = 0) {
        this._name = name;
        this._max = max;
        this._value = startValue;

        this._containerElem = document.createElement("div");
        this._containerElem.className += "sliderCont";

        this.iconElem = document.createElement("img");
        this.iconElem.src = iconPath;
        this.iconElem.alt = this._name;
        this.iconElem.title = `Play/pause ${this._name} production`;
        this.iconElem.draggable = false;

        this.infoElem = document.createElement("p");
        this.infoElem.textContent = JSON.stringify(this._value);

        this.inputElem = document.createElement("input");
        this.inputElem.type = "range";
        this.inputElem.max = JSON.stringify(this._max);
        this.inputElem.step = "0.001";

        this._containerElem.appendChild(this.iconElem);
        this._containerElem.appendChild(this.infoElem);
        this._containerElem.appendChild(this.inputElem);
    }

    public get value(): number {
        return this._value;
    }

    public set value(value: number) {
        this._value = value;
        this.inputElem.value = JSON.stringify(this._value);
    }

    public get containerElem(): HTMLElement {
        return this._containerElem;
    }
}
