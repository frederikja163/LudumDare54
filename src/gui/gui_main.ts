import { ResourceDisplay } from "./resource_display";
import { BuildBtn } from "./build_btn";
import { CursorMode, Game } from "../data/game";

export function initGui(game: Game) {
    const assetList = game.assetList;
    const gui = game.gui;

    const barElems = document.querySelectorAll(".bar");
    barElems.forEach(e => {
        const elem = e as HTMLElement;
        elem.addEventListener("mousedown", () => { game.canvasIgnoreInput = true });
    });

    // ResourceBar
    gui.addResourceDisplay(new ResourceDisplay("food", assetList.resource.foodIconPath));
    gui.addResourceDisplay(new ResourceDisplay("queen", assetList.resource.queenPath));
    gui.addResourceDisplay(new ResourceDisplay("farmer", assetList.resource.farmerPath));
    gui.addResourceDisplay(new ResourceDisplay("worker", assetList.resource.workerPath));
    gui.addResourceDisplay(new ResourceDisplay("soldier", assetList.resource.soldierPath));

    // BuildBar
    gui.addBuildBtn(new BuildBtn("dig", getSwapCursorModeFunction(game, CursorMode.Dig), assetList.buildBtn.dig));
    gui.addBuildBtn(new BuildBtn("fill", getSwapCursorModeFunction(game, CursorMode.Fill), assetList.buildBtn.fill));
    gui.addBuildBtn(new BuildBtn("queens lair", getSwapCursorModeFunction(game, CursorMode.Queen), assetList.buildBtn.queen));
    gui.addBuildBtn(new BuildBtn("residential chamber", getSwapCursorModeFunction(game, CursorMode.Residential), assetList.buildBtn.residential));
    gui.addBuildBtn(new BuildBtn("farm chamber", getSwapCursorModeFunction(game, CursorMode.Farm), assetList.buildBtn.farming));
    gui.addBuildBtn(new BuildBtn("training chamber", getSwapCursorModeFunction(game, CursorMode.Training), assetList.buildBtn.training));
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
