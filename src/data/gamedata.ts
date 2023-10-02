import { value, equation, sum, weightedSum, product } from "./dynamic_equations";

export enum TutorialStep {
    WelcomeMessage,
    MoveCamera,
    ZoomCamera,
    ExcavateTunnel,
    CreateChamber,
    MarkAsResidential,
    ExcavateAnotherChamber,
    MarkAsFarm,
    SpawnMenu,
    EnableFarmers,
    EnableWorkers,
    ContinueGame,
    Finished
}

export class GameData {
    public readonly time = value(0);
    public readonly pauseProduction = value(1);
    public readonly tutorialStep = value(TutorialStep.WelcomeMessage);

    public readonly farmerProduction = value(15);
    public readonly farmProduction = value(5);

    public readonly unassignedTiles = value(0);
    public readonly queenTiles = value(0);
    public readonly residentialTiles = value(0);
    public readonly farmTiles = value(0);
    public readonly trainingTiles = value(0);
    public readonly totalTiles = value(0);

    public readonly queensTotal = value(1);
    public readonly farmersTotal = value(2);
    public readonly workersTotal = value(4);
    public readonly soldiersTotal = value(1);

    public readonly queensActive = this.queensTotal;
    public readonly workersActive = equation([this.totalTiles, this.queensTotal], n => (n[0] - 30 * n[1]));
    public readonly soldiersActive = value(0);

    public readonly queensIdle = equation([this.queensTotal, this.queensActive], n => n[0] - n[1]);
    public readonly workersIdle = equation([this.workersTotal, this.workersActive], n => n[0] - n[1]);;
    public readonly soldiersIdle = equation([this.soldiersTotal, this.soldiersActive], n => n[0] - n[1]);;

    // Farmers cant have more than 1 consumption atm as this would create a circular dependency. Luckily we planned for a consumption of 1.
    public readonly foodConsumption = weightedSum([this.queensActive, this.farmersTotal, this.workersActive, this.soldiersActive, this.queensIdle, this.workersIdle, this.soldiersIdle],
        [8, 1, 3, 2, 1, 1, 1]);
    public readonly farmersActive = equation([this.farmerProduction, this.farmersTotal, this.farmProduction, this.farmTiles, this.foodConsumption],
        // Min(productionBaseOnFarmers, productionBasedOnFarms)
        n => Math.min(Math.min(Math.ceil(n[4] / n[0]), n[1]), Math.ceil(n[3] * n[0] / n[2])));
    public readonly farmersIdle = equation([this.farmersTotal, this.farmersActive], n => n[0] - n[1]);;
    public readonly foodProduction = equation([this.farmerProduction, this.farmersTotal, this.farmProduction, this.farmTiles], n => Math.min(n[0] * n[1], n[2] * n[3]));

    public readonly antsIdle = sum([this.queensIdle, this.farmersIdle, this.workersIdle, this.soldiersIdle]);
    public readonly antsActive = sum([this.queensActive, this.farmersActive, this.workersActive, this.soldiersActive]);
    public readonly antsTotal = sum([this.antsIdle, this.antsActive]);

    // ants/min
    public readonly antProduction = equation([this.queenTiles], n => n[0] < 21 ? 1 : Math.log(n[0] - 20) / Math.log(2));
    public readonly msPerAnt = equation([this.antProduction], n => (1000 * 60) / (n[0] + 1));
    public readonly antSpawnProgress = value(0);
    public readonly antCapacity = product([this.residentialTiles, value(3)]);
    public readonly combatPower = product([this.trainingTiles, this.soldiersActive]);
    public readonly tileCapacity = equation([this.workersTotal, this.queensTotal], n => (3 * n[0] + 30 * n[1]));

    public readonly farmerSpawnRatio = value(100);
    public readonly workerSpawnRatio = value(100);
    public readonly soldierSpawnRatio = value(24);
    public readonly totalSpawnRatio = sum([this.farmerSpawnRatio, this.workerSpawnRatio, this.soldierSpawnRatio]);
    public readonly farmerSpawnChance = equation([this.totalSpawnRatio, this.farmerSpawnRatio], n => n[1] / n[0]);
    public readonly workerSpawnChance = equation([this.totalSpawnRatio, this.workerSpawnRatio], n => n[1] / n[0]);
    public readonly soldierSpawnChance = equation([this.totalSpawnRatio, this.soldierSpawnRatio], n => n[1] / n[0]);
}

