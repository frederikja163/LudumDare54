import { ResourceDisplay } from "./resource_display";
import { BuildBtn } from "./build_btn";
import { CursorMode, Game } from "../data/game";
import { Slider } from "./slider";
import { value } from "../data/dynamic_equations";
import { TutorialStep } from "../data/gamedata";

export function initGui(game: Game) {
    const assetList = game.assetList;
    const data = game.gameData;
    const gui = game.gui;

    const welcomeMsgElem = document.getElementById("welcomeMsg");
    if (!welcomeMsgElem){
        throw console.error("Couldn't find welcome message for some reason?!");
    }
    document.getElementById("startTutorial")?.addEventListener("mouseup", () => {
        welcomeMsgElem.style.display = "none";
        data.tutorialStep.value += 1;
    });
    document.getElementById("skipTutorial")?.addEventListener("mouseup", () => {
        welcomeMsgElem.style.display = "none";
        game.gui.slidersPlayPause(false);
        togglePauseTime(game);
        
        data.tutorialStep.value = TutorialStep.Finished;
    });

    const barElems = document.querySelectorAll(".gui");
    barElems.forEach(e => {
        const elem = e as HTMLElement;
        elem.addEventListener("mousedown", () => { game.canvasIgnoreInput = true });
    });

    gui.updateSpawnProgress(data.msPerAnt, data.antSpawnProgress);

    // ResourceBar
    gui.addResourceDisplay(new ResourceDisplay("food", "Food: If you don't have enough your ants will start to die. [Consumption/Production]", data.foodConsumption, data.foodProduction, assetList.resource.foodIconPath));
    gui.addResourceDisplay(new ResourceDisplay("tiles", "Tiles: How many tiles your workers can maintain at once. [Used/Available]", data.totalTiles, data.tileCapacity, assetList.resource.tileIconPath));
    gui.addResourceDisplay(new ResourceDisplay("ants", "Ants: How many ants you can have in total [Current/Total]", data.antsTotal, data.antCapacity, assetList.resource.antPath));
    gui.addResourceDisplay(new ResourceDisplay("queen", "Queen: You can only have one", data.queensActive, value(-1), assetList.resource.queenPath));
    gui.addResourceDisplay(new ResourceDisplay("farmer", "Farmers: Produce food when there is enough farm tiles.", data.farmersTotal, value(-1), assetList.resource.farmerPath));
    gui.addResourceDisplay(new ResourceDisplay("worker", "Workers: Maintains the tiles of your colony.", data.workersTotal, value(-1), assetList.resource.workerPath));
    // gui.addResourceDisplay(new ResourceDisplay("soldier", "Soldiers: Contains the threat level to the colony. [Active/Total]", data.soldiersActive, data.soldiersTotal, assetList.resource.soldierPath));

    // BuildBar
    gui.addBuildBtn(new BuildBtn("dig", "Excavate ant colony.", getSwapCursorModeFunction(game, CursorMode.Dig), assetList.buildBtn.dig));
    gui.addBuildBtn(new BuildBtn("fill", "Remove the ant colony.", getSwapCursorModeFunction(game, CursorMode.Fill), assetList.buildBtn.fill));
    // gui.addBuildBtn(new BuildBtn("queens lair", "Marks chambers as queens lair.", getSwapCursorModeFunction(game, CursorMode.Queen), assetList.buildBtn.queen));
    gui.addBuildBtn(new BuildBtn("residential chamber", "Marks chambers as residential chambers.", getSwapCursorModeFunction(game, CursorMode.Residential), assetList.buildBtn.residential));
    gui.addBuildBtn(new BuildBtn("farm chamber", "Mark chambers as farm chambers.", getSwapCursorModeFunction(game, CursorMode.Farm), assetList.buildBtn.farming));
    // gui.addBuildBtn(new BuildBtn("training chamber", "Mark chambers as training chambers.", getSwapCursorModeFunction(game, CursorMode.Training), assetList.buildBtn.training));
    gui.addBuildBtn(new BuildBtn("ant spawn", "Control ant spawning.", toggleAntSpawnMenu(game), assetList.buildBtn.spawn, updateAntSpawnMenuBtn));

    gui.spawnMenuAddSlider(new Slider(game, TutorialStep.EnableFarmers, "Farmer ants", assetList.spawnMenu.farmerPath, assetList.spawnMenu.farmerDisabledPath, data.farmerSpawnRatio, data.farmerSpawnChance));
    gui.spawnMenuAddSlider(new Slider(game, TutorialStep.EnableWorkers, "Worker ants", assetList.spawnMenu.workerPath, assetList.spawnMenu.workerDisabledPath, data.workerSpawnRatio, data.workerSpawnChance));
    // gui.spawnMenuAddSlider(new Slider(game, TutorialStep.Finished, "Soldier ants", assetList.spawnMenu.soldierPath, assetList.spawnMenu.soldierDisabledPath, data.soldierSpawnRatio, data.soldierSpawnChance));
    gui.slidersPlayPause(true);

    const spawnPauseElem = document.getElementById("spawnPause") as HTMLImageElement;
    const spawnPauseTextElem = document.getElementById("spawnPauseText") as HTMLElement;
    spawnPauseElem?.addEventListener("mousedown", () => togglePauseTime(game));
}

function togglePauseTime(game: Game){
    const assetList = game.assetList;
    const data = game.gameData;
    const gui = game.gui;

    const spawnPauseElem = document.getElementById("spawnPause") as HTMLImageElement;
    const spawnPauseTextElem = document.getElementById("spawnPauseText") as HTMLElement;
    // Pause
    if (spawnPauseElem.alt.includes("Play")) {
        spawnPauseElem.src = assetList.spawnMenu.pauseIconPath;
        spawnPauseElem.alt = "Pause ant production";
        spawnPauseElem.title = "Click to resume ant production";

        spawnPauseTextElem.textContent = "Paused";
        
        data.pauseProduction.value = 1;
    }
    // Play
    else {
        spawnPauseElem.src = assetList.spawnMenu.playIconPath;
        spawnPauseElem.alt = "Play ant production";
        spawnPauseElem.title = "Click to pause ant production";
        
        spawnPauseTextElem.textContent = "Running";
        
        data.pauseProduction.value = 0;

        if (game.gameData.tutorialStep.value === TutorialStep.ContinueGame){
            game.gameData.tutorialStep.value += 1;
        }
    }
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
            if (game.gameData.tutorialStep.value === TutorialStep.SpawnMenu){
                game.gameData.tutorialStep.value += 1;
            }
            
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