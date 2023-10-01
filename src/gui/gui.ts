import { ResourceDisplay } from "./resource_display";
import { BuildBtn } from "./build_btn";
import { CursorMode, Game } from "../data/game";

export function initGui(game: Game) {
    const assetList = game.assetList;
    // ResourceBar
    resourceBarAdd(new ResourceDisplay("food", assetList.foodIconPath));

    // BuildBar
    buildBarAdd(new BuildBtn("dig", active => {
        if (game.cursorMode == CursorMode.Dig && active) {
            game.cursorMode = CursorMode.Neutral;
            return false;
        }
        else if (game.cursorMode == CursorMode.Neutral && !active) {
            game.cursorMode = CursorMode.Dig;
            return true;
        }
        return false;
    }, assetList.digIconPath, assetList.digIconActivePath));

    buildBarAdd(new BuildBtn("fill", active => {
        if (game.cursorMode == CursorMode.Fill && active) {
            game.cursorMode = CursorMode.Neutral;
            return false;
        }
        else if (game.cursorMode == CursorMode.Neutral && !active) {
            game.cursorMode = CursorMode.Fill;
            return true;
        }
        return false;
    }, assetList.fillIconPath, assetList.fillIconActivePath));
}

function resourceBarAdd(resourceDisplay: ResourceDisplay) {
    const resourceBar = document.getElementById("resourceBar");
    resourceBar?.appendChild(resourceDisplay.containerElem);
}

function buildBarAdd(buildBtn: BuildBtn) {
    const buildBar = document.getElementById("buildBar");
    buildBar?.appendChild(buildBtn.buttonElem);
}
