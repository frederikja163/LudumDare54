import { Equation } from "../data/gamedata";

export class ResourceDisplay {
    private readonly _containerElem: HTMLDivElement;
    private readonly iconElem: HTMLImageElement;
    private readonly counterElem: HTMLParagraphElement;
    private readonly value: Equation;
    private readonly capacity: Equation;

    constructor(name: string, tooltip: string, value: Equation, capacity: Equation, iconPath: string) {
        this._containerElem = document.createElement("div");
        this.containerElem.className += "resourceDisplay";
        this.value = value;
        this.capacity = capacity;

        this.iconElem = document.createElement("img");
        this.iconElem.src = iconPath;
        this.iconElem.alt = name;
        this.iconElem.title = tooltip;
        this.containerElem.appendChild(this.iconElem);

        this.counterElem = document.createElement("p");
        this.containerElem.appendChild(this.counterElem);
        value.addEventListener("valuechanged", this.updateText.bind(this));
        capacity.addEventListener("valuechanged", this.updateText.bind(this));
    }

    private updateText(){
        if (this.capacity.value === -1){
            this.counterElem.textContent = `${this.value.value}`;
        }
        else{
            this.counterElem.textContent = `${this.value.value}/${this.capacity.value}`;
        }
    }

    public get containerElem(): HTMLElement {
        return this._containerElem;
    }
}