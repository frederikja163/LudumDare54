import { ResourceDisplay } from "./resource_display";
import { BuildBtn } from "./build_btn";
import { CursorMode, Game } from "../data/game";

const buildBtns: BuildBtn[] = [];

export function initGui(game: Game) {
    const assetList = game.assetList;
    // ResourceBar
    resourceBarAdd(new ResourceDisplay("food", assetList.foodIconPath));

    // BuildBar
    buildBtns.push(new BuildBtn("dig", active => {
        if (game.cursorMode == CursorMode.Dig && active) {
            game.cursorMode = CursorMode.Neutral;
            return false;
        }
        else {
            neutralizeBuildBtns(buildBtns);
            game.cursorMode = CursorMode.Dig;
            return true;
        }
    }, assetList.digIconPath, assetList.digIconActivePath));

    buildBtns.push(new BuildBtn("fill", active => {
        if (game.cursorMode == CursorMode.Fill && active) {
            game.cursorMode = CursorMode.Neutral;
            return false;
        }
        else {
            neutralizeBuildBtns(buildBtns);
            game.cursorMode = CursorMode.Fill;
            return true;
        }
    }, assetList.fillIconPath, assetList.fillIconActivePath));

    buildBtns.forEach(buildBtn => { buildBarAdd(buildBtn) });
}

function resourceBarAdd(resourceDisplay: ResourceDisplay) {
    const resourceBar = document.getElementById("resourceBar");
    resourceBar?.appendChild(resourceDisplay.containerElem);
}

function buildBarAdd(buildBtn: BuildBtn) {
    const buildBar = document.getElementById("buildBar");
    buildBar?.appendChild(buildBtn.buttonElem);
}

function neutralizeBuildBtns(buildBtns: BuildBtn[]) {
    buildBtns.forEach(buildBtn => { buildBtn.active = false });
}