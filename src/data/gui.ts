import { ResourceDisplay } from "../gui/resource_display";
import { BuildBtn } from "../gui/build_btn";

export class Gui {
    private readonly _resourceDisplays: ResourceDisplay[];
    private readonly _buildBtns: BuildBtn[];

    constructor() {
        this._resourceDisplays = [];
        this._buildBtns = [];
    }

    public get resourceDisplays(): ResourceDisplay[] {
        return this._resourceDisplays;
    }

    public get buildBtns(): BuildBtn[] {
        return this._buildBtns;
    }

    public neutralizeBuildBtns() {
        for (const button of this._buildBtns) {
            button.active = false;
        }
    }
}