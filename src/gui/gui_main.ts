import { ResourceDisplay } from "./resource_display";
import { BuildBtn } from "./build_btn";
import { CursorMode, Game } from "../data/game";

export function initGui(game: Game) {
    const assetList = game.assetList;
    const gui = game.gui;

    // ResourceBar
    gui.addResourceDisplay(new ResourceDisplay("food", assetList.foodIconPath));
    gui.addResourceDisplay(new ResourceDisplay("queen", assetList.queenPath));
    gui.addResourceDisplay(new ResourceDisplay("farmer", assetList.farmerPath));
    gui.addResourceDisplay(new ResourceDisplay("worker", assetList.workerPath));
    gui.addResourceDisplay(new ResourceDisplay("soldier", assetList.soldierPath));

    // BuildBar
    gui.addBuildBtn(new BuildBtn("dig", getSwapCursorModeFunction(game, CursorMode.Dig), assetList.digIconPath, assetList.digIconActivePath));
    gui.addBuildBtn(new BuildBtn("fill", getSwapCursorModeFunction(game, CursorMode.Fill), assetList.fillIconPath, assetList.fillIconActivePath));
    gui.addBuildBtn(new BuildBtn("training", getSwapCursorModeFunction(game, CursorMode.Neutral), assetList.trainingIconPath, assetList.trainingIconActivePath));
    gui.addBuildBtn(new BuildBtn("residential", getSwapCursorModeFunction(game, CursorMode.Neutral), assetList.residentialIconPath, assetList.residentialIconActivePath));
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
