import { ResourceDisplay } from "./resource_display";
import { BuildBtn } from "./build_btn";
import { CursorMode, Game } from "../data/game";

const buildBtns: BuildBtn[] = [];

export function initGui(game: Game) {
    const assetList = game.assetList;
    // ResourceBar
    resourceBarAdd(new ResourceDisplay("food", assetList.foodIconPath));

    // BuildBar
    buildBtns.push(new BuildBtn("dig", getSwapCursorModeFunction(game, CursorMode.Dig), assetList.digIconPath, assetList.digIconActivePath));
    buildBtns.push(new BuildBtn("fill", getSwapCursorModeFunction(game, CursorMode.Fill), assetList.fillIconPath, assetList.fillIconActivePath));

    buildBtns.forEach(buildBtn => { buildBarAdd(buildBtn) });
}

function getSwapCursorModeFunction(game: Game, cursorMode: CursorMode){
    return (active) => {
        if (game.cursorMode == cursorMode && active) {
            game.cursorMode = CursorMode.Neutral;
            return false;
        }
        else {
            neutralizeBuildBtns(buildBtns);
            game.cursorMode = cursorMode;
            return true;
        }
    };
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
    for (const button of buildBtns){
        button.active = false;
    }
}