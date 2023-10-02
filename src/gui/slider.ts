import { Equation, EquationEventType, Value } from "../data/dynamic_equations";

export class Slider {
    private _name: string;
    private _max: number;
    private readonly _containerElem: HTMLDivElement;
    private readonly iconElem: HTMLImageElement;
    private readonly infoElem: HTMLDivElement;
    private readonly inputElem: HTMLInputElement;

    constructor(name: string, iconPath: string, value: Value, percentageValue: Equation, max: number = 100) {
        this._name = name;
        this._max = max;

        this._containerElem = document.createElement("div");
        this._containerElem.className += "sliderCont";

        this.iconElem = document.createElement("img");
        this.iconElem.src = iconPath;
        this.iconElem.alt = this._name;
        this.iconElem.title = `Play/pause ${this._name} production`;
        this.iconElem.draggable = false;

        this.infoElem = document.createElement("p");
        percentageValue.addEventListener(EquationEventType.ValueChange, () => {
            const text = (percentageValue.value * 100).toString().split('.');
            this.infoElem.textContent = `${text[0]}%`;
        });

        this.inputElem = document.createElement("input");
        this.inputElem.type = "range";
        this.inputElem.value = JSON.stringify(value.value);
        this.inputElem.addEventListener("change", () => {
            value.value = parseFloat(this.inputElem.value);
        });
        this.inputElem.max = JSON.stringify(this._max);
        this.inputElem.step = "1";
        this.inputElem.min = "1";

        this._containerElem.appendChild(this.iconElem);
        this._containerElem.appendChild(this.infoElem);
        this._containerElem.appendChild(this.inputElem);
    }

    public get containerElem(): HTMLElement {
        return this._containerElem;
    }
}
