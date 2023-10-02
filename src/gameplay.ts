import { Game } from "./data/game";

export function initGameplay(game: Game){
    startAntSpawning(game);
}

function startAntSpawning(game: Game){
    const data = game.gameData;
    
    let lastTime: number = 0;
    requestAnimationFrame(updateAntSpawning);
    function updateAntSpawning(time){
        const deltaTime = time - lastTime;
        data.antSpawnProgress.value += deltaTime;

        if (!trySpawnAnt(game, false)){
            data.antSpawnProgress.value = 0;
        }

        while (data.antSpawnProgress.value > data.msPerAnt.value){   
            trySpawnAnt(game, true);
            data.antSpawnProgress.value -= data.msPerAnt.value;
        }
        lastTime = time;
        requestAnimationFrame(updateAntSpawning);
    }
}

function trySpawnAnt(game: Game, spawn: boolean): boolean{
    const data = game.gameData;

    if (data.antsTotal.value < data.antCapacity.value && data.foodConsumption.value < data.foodProduction.value){
        if (!spawn)
        {
            return true;
        }

        let antType = Math.random();
        if ((antType -= data.farmerSpawnChance.value) < 0){
            data.farmersTotal.value += 1;
        }
        else if ((antType -= data.workerSpawnChance.value) < 0){
            data.workersTotal.value += 1;
        }
        else if ((antType -= data.soldierSpawnChance.value) < 0){
            data.soldiersTotal.value += 1;
        }
        return true;
    }
    else if (spawn && data.antsTotal.value >= data.antCapacity.value) {
        console.log("Ant production failed: not enough chambers to produce ant.");
    }
    else if (spawn && data.foodConsumption.value >= data.foodProduction.value) {
        console.log("Ant production failed: not enough food to produce ant.")
    }
    else if (spawn) {
        console.log("Ant production failed: unknown reason");
    }
    return false;
}