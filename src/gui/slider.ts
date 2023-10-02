import { AssetList } from "../data/asset_list";
import { Equation, EquationEventType, Value, value } from "../data/dynamic_equations";

export class Slider {
    private _name: string;
    private _max: number;
    private paused: boolean;
    private prePauseVal: number;
    private value: Value;
    private percentageValue: Equation;
    private iconPath: string;
    private iconPausedPath: string;
    private readonly _containerElem: HTMLDivElement;
    private readonly iconElem: HTMLImageElement;
    private readonly infoElem: HTMLDivElement;
    private readonly inputElem: HTMLInputElement;

    constructor(name: string, iconPath: string, iconPausedPath: string, value: Value, percentageValue: Equation, max: number = 100) {
        this._name = name;
        this._max = max;
        this.paused = false;
        this.value = value;
        this.percentageValue = percentageValue;
        this.iconPath = iconPath;
        this.iconPausedPath = iconPausedPath;

        this._containerElem = document.createElement("div");
        this._containerElem.className += "sliderCont";

        this.iconElem = document.createElement("img");
        this.iconElem.src = iconPath;
        this.iconElem.alt = this._name;
        this.iconElem.title = `Play/pause ${this._name} production`;
        this.iconElem.draggable = false;
        this.iconElem.addEventListener("click", () => { this.playPause() });

        this.infoElem = document.createElement("p");
        percentageValue.addEventListener(EquationEventType.ValueChange, () => {
            if (!this.paused) {
                const text = (percentageValue.value * 100).toString().split('.');
                this.infoElem.textContent = `${text[0]}%`;
            }
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

    public playPause(pause?: boolean) {
        if (pause != undefined) {
            this.paused = !pause;
        }

        if (this.paused) {
            this.paused = false;

            this.iconElem.src = this.iconPath;

            this.inputElem.disabled = false;
            this.inputElem.style.setProperty("--sliderGold", "var(--gold)");

            this.value.value = this.prePauseVal;
        }
        else {
            this.paused = true;

            this.iconElem.src = this.iconPausedPath;

            this.inputElem.disabled = true;
            this.inputElem.style.setProperty("--sliderGold", "#808080");

            this.prePauseVal = this.value.value;
            this.value.value = 0.00001;

            this.infoElem.textContent = "Disabled";
        }
    }
}
