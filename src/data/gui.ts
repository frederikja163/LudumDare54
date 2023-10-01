import { ResourceDisplay } from "../gui/resource_display";
import { BuildBtn } from "../gui/build_btn";

export class Gui {
    private readonly _resourceDisplays: ResourceDisplay[];
    private readonly _buildBtns: BuildBtn[];

    constructor() {
        this._resourceDisplays = [];
        this._buildBtns = [];
    }
    
    public addResourceDisplay(resourceDisplay: ResourceDisplay) {
        this._resourceDisplays.push(resourceDisplay);
        const resourceBar = document.getElementById("resourceBar");
        resourceBar?.appendChild(resourceDisplay.containerElem);
    }

    public addBuildBtn(buildBtn: BuildBtn) {
        this._buildBtns.push(buildBtn);
        const buildBar = document.getElementById("buildBar");
        buildBar?.appendChild(buildBtn.buttonElem);
    }

    public neutralizeBuildBtns() {
        for (const button of this._buildBtns) {
            button.active = false;
        }
    }
}