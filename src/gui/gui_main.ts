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
    gui.addBuildBtn(new BuildBtn("queens lair", getSwapCursorModeFunction(game, CursorMode.Queen), assetList.queenIconPath, assetList.queenIconActivePath));
    gui.addBuildBtn(new BuildBtn("residential chamber", getSwapCursorModeFunction(game, CursorMode.Residential), assetList.residentialIconPath, assetList.residentialIconActivePath));
    gui.addBuildBtn(new BuildBtn("farm chamber", getSwapCursorModeFunction(game, CursorMode.Farm), assetList.farmingIconPath, assetList.farmingIconActivePath));
    gui.addBuildBtn(new BuildBtn("training chamber", getSwapCursorModeFunction(game, CursorMode.Training), assetList.trainingIconPath, assetList.trainingIconActivePath));
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
