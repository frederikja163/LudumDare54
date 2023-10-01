import { ResourceDisplay } from "./resource_display";
import { BuildBtn } from "./build_btn";
import { CursorMode, Game } from "../data/game";

export function initGui(game: Game) {
    const assetList = game.assetList;
    const gui = game.gui;

    // ResourceBar
    gui.addResourceDisplay(new ResourceDisplay("food", assetList.foodIconPath));

    // BuildBar
    gui.addBuildBtn(new BuildBtn("dig", getSwapCursorModeFunction(game, CursorMode.Dig), assetList.digIconPath, assetList.digIconActivePath));
    gui.addBuildBtn(new BuildBtn("fill", getSwapCursorModeFunction(game, CursorMode.Fill), assetList.fillIconPath, assetList.fillIconActivePath));
    gui.addBuildBtn(new BuildBtn("farm", getSwapCursorModeFunction(game, CursorMode.Farm), assetList.testPath, assetList.testAltPath));
}

function getSwapCursorModeFunction(game: Game, cursorModeThis: CursorMode) {
    return (active) => {
        if (game.cursorMode == cursorModeThis && active) {
            game.cursorMode = CursorMode.Neutral;
            return false;
        }
        else {
            game.gui.neutralizeBuildBtns();
            game.cursorMode = cursorModeThis;
            return true;
        }
    };
}
