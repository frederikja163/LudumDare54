import { Game } from "./data/game";

export function initGameplay(game: Game){
    const data = game.gameData;
    setTimeout(spawnAnt, data.msPerAnt.value);
    
    function spawnAnt(){
        if (data.antsTotal.value < data.antCapacity.value && data.foodConsumption.value < data.foodProduction.value){
            const antType = Math.random() * 3;
            if (antType < 1){
                data.farmersTotal.value += 1;
            }
            else if (antType < 2){
                data.workersTotal.value += 1;
            }
            else if (antType < 3){
                data.soldiersTotal.value += 1;
            }
        }
        else{
            if (data.antsTotal.value < data.antCapacity.value){
                console.log("Ant production failed: not enough chambers to produce ant.");
            }
            else if (data.foodConsumption.value < data.foodProduction.value){
                console.log("Ant production failed: not enough food to produce ant.")
            }
        }
        setTimeout(spawnAnt, data.msPerAnt.value);
    }
}