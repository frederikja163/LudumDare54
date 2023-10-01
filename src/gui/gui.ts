import { ResourceDisplay } from "./resource_display";
import { BuildBtn } from "./build_btn";
import { CursorMode, Game } from "../data/game";

export function initGui(game: Game) {
    // ResourceBar
    resourceBarAdd(new ResourceDisplay("food", game.assetList.foodIconPath));

    // BuildBar
    buildBarAdd(new BuildBtn("dig", active => { game.cursorMode = active ? CursorMode.Dig : CursorMode.Neutral }, game.assetList.digIconPath, "lol"));
    buildBarAdd(new BuildBtn("fill", active => { game.cursorMode = active ? CursorMode.Fill : CursorMode.Neutral }, game.assetList.fillIconPath));
}

function resourceBarAdd(resourceDisplay: ResourceDisplay) {
    const resourceBar = document.getElementById("resourceBar");
    resourceBar?.appendChild(resourceDisplay.containerElem);
}

function buildBarAdd(buildBtn: BuildBtn) {
    const buildBar = document.getElementById("buildBar");
    buildBar?.appendChild(buildBtn.buttonElem);
}
