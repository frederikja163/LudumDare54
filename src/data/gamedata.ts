import { value, equation, sum, weightedSum, product } from "./dynamic_equations";

export class GameData{
    public readonly queensTotal = value(1);
    public readonly farmersTotal = value(0);
    public readonly workersTotal = value(0);
    public readonly soldiersTotal = value(0);

    public readonly queensActive = this.queensTotal;
    public readonly farmersActive = value(0);
    public readonly workersActive = value(0);
    public readonly soldiersActive = value(0);

    public readonly queensIdle = equation([this.queensTotal, this.queensActive], n => n[0] - n[1]);
    public readonly farmersIdle = equation([this.farmersTotal, this.farmersActive], n => n[0] - n[1]);;
    public readonly workersIdle = equation([this.workersTotal, this.workersActive], n => n[0] - n[1]);;
    public readonly soldiersIdle = equation([this.soldiersTotal, this.soldiersActive], n => n[0] - n[1]);;

    public readonly queenTiles = value(0);
    public readonly residentialTiles = value(0);
    public readonly farmerTiles = value(0);
    public readonly trainingTiles = value(0);

    public readonly antsIdle = sum([this.queensIdle, this.farmersIdle, this.workersIdle, this.soldiersIdle]);
    public readonly antsActive = sum([this.queensActive, this.farmersActive, this.workersActive, this.soldiersActive]);
    public readonly antsTotal = sum([this.antsIdle, this.antsActive]);
    public readonly totalTiles = sum([this.queenTiles,this.farmerTiles,this.residentialTiles,this.trainingTiles]);

    public readonly foodConsumption = weightedSum([this.queensActive, this.farmersActive, this.workersActive, this.soldiersActive, this.antsIdle],
        [10, 1, 3, 2, 1]);
    public readonly foodProduction = equation([this.farmersActive, this.farmerTiles], n => Math.min(30 * n[0], 45 * n[1]));
    public readonly antProduction = this.queenTiles; // ants/min
    public readonly msPerAnt = equation([this.antProduction], n => (1000 * 60) / (n[0] + 1));
    public readonly antCapacity = product([this.residentialTiles, value(5)]);
    public readonly combatPower = product([this.trainingTiles, this.soldiersActive]);
    public readonly tileCapacity = product([value(10), sum([this.workersActive, this.workersIdle])]);
}

