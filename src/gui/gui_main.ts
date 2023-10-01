import { ResourceDisplay } from "./resource_display";
import { BuildBtn } from "./build_btn";
import { CursorMode, Game } from "../data/game";

export function initGui(game: Game) {
    const assetList = game.assetList;

    // ResourceBar
    game.gui.resourceDisplays.push(new ResourceDisplay("food", assetList.foodIconPath));

    game.gui.resourceDisplays.forEach(resourceDisplay => { resourceBarAdd(resourceDisplay) });

    // BuildBar
    game.gui.buildBtns.push(new BuildBtn("dig", getSwapCursorModeFunction(game, CursorMode.Dig), assetList.digIconPath, assetList.digIconActivePath));
    game.gui.buildBtns.push(new BuildBtn("fill", getSwapCursorModeFunction(game, CursorMode.Fill), assetList.fillIconPath, assetList.fillIconActivePath));

    game.gui.buildBtns.forEach(buildBtn => { buildBarAdd(buildBtn) });
}

function getSwapCursorModeFunction(game: Game, cursorMode: CursorMode) {
    return (active) => {
        if (game.cursorMode == cursorMode && active) {
            game.cursorMode = CursorMode.Neutral;
            return false;
        }
        else {
            game.gui.neutralizeBuildBtns();
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
