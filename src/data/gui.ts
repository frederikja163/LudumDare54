import { ResourceDisplay } from "../gui/resource_display";
import { BuildBtn } from "../gui/build_btn";

export class Gui {
    private readonly _resourceDisplays: ResourceDisplay[];
    private readonly _buildBtns: BuildBtn[];

    constructor() {
        this._resourceDisplays = [];
        this._buildBtns = [];
    }

    private updateResourceBar() {
        const resourceBar = document.getElementById("resourceBar");

        for (const display of this._resourceDisplays) {
            resourceBar?.appendChild(display.containerElem);
        }
    }

    private updateBuildBar() {
        const buildBar = document.getElementById("buildBar");

        for (const button of this._buildBtns) {
            buildBar?.appendChild(button.buttonElem);
        }
    }

    public addResourceDisplay(resourceDisplay: ResourceDisplay) {
        this._resourceDisplays.push(resourceDisplay);

        this.updateResourceBar();
    }

    public addBuildBtn(buildBtn: BuildBtn) {
        this._buildBtns.push(buildBtn);

        this.updateBuildBar();
    }

    public neutralizeBuildBtns() {
        for (const button of this._buildBtns) {
            button.active = false;
        }
    }
}