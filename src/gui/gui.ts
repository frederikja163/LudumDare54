import { ResourceDisplay } from "./resource_display";
import { BuildBtn } from "./build_btn";
import { CursorMode, Game } from "../data/game";

export function initGui(game: Game) {
    const assetList = game.assetList;
    // ResourceBar
    resourceBarAdd(new ResourceDisplay("food", assetList.foodIconPath));

    // BuildBar
    buildBarAdd(new BuildBtn("dig", active => { game.cursorMode = (game.cursorMode == CursorMode.Neutral) ? CursorMode.Dig : CursorMode.Neutral }, assetList.digIconPath, assetList.digIconActivePath));
    buildBarAdd(new BuildBtn("fill", active => { game.cursorMode = (game.cursorMode == CursorMode.Neutral) ? CursorMode.Fill : CursorMode.Neutral }, assetList.fillIconPath, assetList.fillIconActivePath));
}

function resourceBarAdd(resourceDisplay: ResourceDisplay) {
    const resourceBar = document.getElementById("resourceBar");
    resourceBar?.appendChild(resourceDisplay.containerElem);
}

function buildBarAdd(buildBtn: BuildBtn) {
    const buildBar = document.getElementById("buildBar");
    buildBar?.appendChild(buildBtn.buttonElem);
}
