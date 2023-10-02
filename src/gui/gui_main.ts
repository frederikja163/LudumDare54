import { ResourceDisplay } from "./resource_display";
import { BuildBtn } from "./build_btn";
import { CursorMode, Game } from "../data/game";
import { Slider } from "./slider";
import { value } from "../data/dynamic_equations";

export function initGui(game: Game) {
    const assetList = game.assetList;
    const data = game.gameData;
    const gui = game.gui;

    const barElems = document.querySelectorAll(".gui");
    barElems.forEach(e => {
        const elem = e as HTMLElement;
        elem.addEventListener("mousedown", () => { game.canvasIgnoreInput = true });
    });

    // ResourceBar
    gui.addResourceDisplay(new ResourceDisplay("food", "Food [consumption/production]", data.foodConsumption, data.foodProduction, assetList.resource.foodIconPath));
    gui.addResourceDisplay(new ResourceDisplay("queen", "Queen", data.queensActive, value(-1), assetList.resource.queenPath));
    gui.addResourceDisplay(new ResourceDisplay("farmer", "Farmers [Active/Total]", data.farmersActive, data.farmersTotal, assetList.resource.farmerPath));
    gui.addResourceDisplay(new ResourceDisplay("worker", "Workers [Active/Total]", data.workersActive, data.workersTotal, assetList.resource.workerPath));
    gui.addResourceDisplay(new ResourceDisplay("soldier", "Soldiers [Active/Total]", data.soldiersActive, data.soldiersTotal, assetList.resource.soldierPath));

    // BuildBar
    gui.addBuildBtn(new BuildBtn("dig", getSwapCursorModeFunction(game, CursorMode.Dig), assetList.buildBtn.dig));
    gui.addBuildBtn(new BuildBtn("fill", getSwapCursorModeFunction(game, CursorMode.Fill), assetList.buildBtn.fill));
    gui.addBuildBtn(new BuildBtn("queens lair", getSwapCursorModeFunction(game, CursorMode.Queen), assetList.buildBtn.queen));
    gui.addBuildBtn(new BuildBtn("residential chamber", getSwapCursorModeFunction(game, CursorMode.Residential), assetList.buildBtn.residential));
    gui.addBuildBtn(new BuildBtn("farm chamber", getSwapCursorModeFunction(game, CursorMode.Farm), assetList.buildBtn.farming));
    gui.addBuildBtn(new BuildBtn("training chamber", getSwapCursorModeFunction(game, CursorMode.Training), assetList.buildBtn.training));
    gui.addBuildBtn(new BuildBtn("ant spawn", toggleAntSpawnMenu(game), assetList.buildBtn.spawn, updateAntSpawnMenuBtn));

    gui.spawnMenuAddSlider(new Slider("Farmer ants", assetList.spawnMenu.farmerPath, data.farmerSpawnRatio, data.farmerSpawnChance));
    gui.spawnMenuAddSlider(new Slider("Worker ants", assetList.spawnMenu.workerPath, data.workerSpawnRatio, data.workerSpawnChance));
    gui.spawnMenuAddSlider(new Slider("Soldier ants", assetList.spawnMenu.soldierPath, data.soldierSpawnRatio, data.soldierSpawnChance));

    const spawnPauseElem = document.getElementById("spawnPause") as HTMLImageElement;
    spawnPauseElem?.addEventListener("mousedown", () => {
        if (spawnPauseElem.alt.includes("Pause")) {
            spawnPauseElem.src = assetList.spawnMenu.pauseIconPath;
            spawnPauseElem.alt = "Play ant production";
            spawnPauseElem.title = "Play ant production";
        }
        else {
            spawnPauseElem.src = assetList.spawnMenu.playIconPath;
            spawnPauseElem.alt = "Pause ant production";
            spawnPauseElem.title = "Pause ant production";
        }
    });
}

function getSwapCursorModeFunction(game: Game, cursorModeThis: CursorMode): (active: boolean) => boolean {
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

function toggleAntSpawnMenu(game: Game): (active: boolean) => boolean {
    return (active) => {
        const antSpawnElem = document.getElementById("spawnMenu");

        game.cursorMode = CursorMode.Neutral;
        game.gui.neutralizeBuildBtns();

        if (active && antSpawnElem != null) {
            antSpawnElem.style.display = "none";
            return false;
        }
        else if (antSpawnElem != null) {
            antSpawnElem.style.display = "flex";
            return true;
        }
        return false;
    };
}

function updateAntSpawnMenuBtn(active: boolean) {
    const antSpawnElem = document.getElementById("spawnMenu");

    if (active && antSpawnElem != null) {
        antSpawnElem.style.display = "flex";
    }
    else if (antSpawnElem != null) {
        antSpawnElem.style.display = "none";
    }
}