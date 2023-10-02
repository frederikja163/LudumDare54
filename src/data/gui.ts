import { ResourceDisplay } from "../gui/resource_display";
import { BuildBtn } from "../gui/build_btn";
import { Slider } from "../gui/slider";

export class Gui {
    private readonly _resourceDisplays: ResourceDisplay[];
    private readonly _buildBtns: BuildBtn[];
    private readonly _spawnSliders: Slider[];

    constructor() {
        this._resourceDisplays = [];
        this._buildBtns = [];
        this._spawnSliders = [];
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

    public spawnMenuAddSlider(slider: Slider) {
        this._spawnSliders.push(slider);
        const spawnMenuElem = document.getElementById("spawnMenu");
        spawnMenuElem?.appendChild(slider.containerElem);
    }

    public neutralizeBuildBtns() {
        for (const button of this._buildBtns) {
            button.active = false;
        }
    }
}