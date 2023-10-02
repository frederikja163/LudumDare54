import { EquationEventType } from "./data/dynamic_equations";
import { Game } from "./data/game";
import { TutorialStep } from "./data/gamedata";

export function initGameplay(game: Game){
    const data = game.gameData;
    const notification = game.notifications;
    data.tutorialStep.addEventListener(EquationEventType.ValueChange, () => {
        const step = data.tutorialStep.value;

        switch (step){
            case TutorialStep.WelcomeMessage:
                break;
            case TutorialStep.ExcavateTunnel:
                notification.excavateTunnel.show(-1);
                break;
            case TutorialStep.CreateChamber:
                notification.excavateTunnel.hide();
                notification.createChamber.show(-1);
                break;
            case TutorialStep.MarkAsResidential:
                break;
            case TutorialStep.ExcavateAnotherChamber:
                break;
            case TutorialStep.MarkAsFarm:
                break;
            case TutorialStep.Finished:
                break;
        }
    })

    startAntSpawning(game);
}

function startAntSpawning(game: Game){
    const data = game.gameData;
    
    let lastTime: number = 0;
    requestAnimationFrame(updateAntSpawning);
    function updateAntSpawning(time){
        const deltaTime = time - lastTime;

        if (!data.pauseProduction.value){
            data.antSpawnProgress.value += deltaTime;
            
            if (!trySpawnAnt(game, false)){
                data.antSpawnProgress.value = 0;
            }
            
            while (data.antSpawnProgress.value > data.msPerAnt.value){   
                trySpawnAnt(game, true);
                data.antSpawnProgress.value -= data.msPerAnt.value;
            }
        }
        lastTime = time;
        requestAnimationFrame(updateAntSpawning);
    }
}

function trySpawnAnt(game: Game, spawn: boolean): boolean{
    const data = game.gameData;
    const notification = game.notifications;

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
    // Notifications are sat continuosly while supposed to show. So hide them immidiatly.
    else if (data.antsTotal.value >= data.antCapacity.value) {
        notification.missingResidential.show(.5);
    }
    else if (data.foodConsumption.value >= data.foodProduction.value) {
        notification.missingFood.show(.5);
    }
    else {
        notification.antProductionFailed.show(.5);
    }
    return false;
}