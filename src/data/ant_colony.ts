import { Camera } from "./camera";
import { Chamber, ChamberType } from "./chamber";
import P5 from "p5";
import { Game } from "./game";


export class TileEvent extends Event {
    private readonly _x: number;
    private readonly _y: number;

    constructor(x: number, y: number) {
        super(AntHillEvent.TilesChanged);
        this._x = x;
        this._y = y;
    }

    public get x(): number {
        return this._x;
    }
    public get y(): number {
        return this._y;
    }
}
export enum AntHillEvent {
    TilesChanged = "TilesChanged",
}

export class AntColony extends EventTarget {
    private readonly tiles: number[][] = [];
    private readonly chambers: Chamber[] = [];
    private readonly game: Game;

    public get width(): number {
        return this.tiles[0].length;
    }
    public get height(): number {
        return this.tiles.length;
    }
    public getTile(x: number, y: number): number {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return -1;
        }
        return this.tiles[y][x];
    }
    public setTile(x: number, y: number, value: number) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return;
        }
        this.tiles[y][x] = value;
        this.updateChamber(x, y);
        this.updateChamber(x - 1, y);
        this.updateChamber(x, y - 1);
        this.updateChamber(x + 1, y);
        this.updateChamber(x, y + 1);
        this.dispatchEvent(new TileEvent(x, y));
    }

    constructor(game: Game, width: number, height: number) {
        super();
        for (let y = 0; y < height; y++) {
            this.tiles[y] = [];
            for (let x = 0; x < width; x++) {
                this.tiles[y][x] = 1;
            }
        }
        this.game = game;
        this.defaultLayout();
    }

    private defaultLayout() {
        const centerX = Math.floor(this.width / 2);
        const centerY = Math.floor(this.height / 2);

        setTimeout(() => {
            this.carveSquare(centerX - 1, centerX + 1, centerY - 1, centerY + 1);
            // this.carveSquare(centerX - 6, centerX - 5, centerY + 1, centerY + 2);
            // this.carveSquare(centerX - 5, centerX - 3, centerY, centerY);
            // this.carveSquare(centerX + 3, centerX + 4, centerY - 4, centerY - 3);
            // this.setTile(centerX +  3, centerY - 2, 0);
            // this.setTile(centerX, centerY, 1);

            this.getChamber(centerX + 1, centerY + 1)!.chamberType = ChamberType.Queen;
            // this.getChamber(centerX - 5, centerY + 1)!.chamberType = ChamberType.Residential;
            // this.getChamber(centerX + 3, centerY - 4)!.chamberType = ChamberType.Farm;
            this.countTiles();
        }, 0);
    }
    private carveSquare(minX: number, maxX: number, minY: number, maxY: number) {
        for (let y = minY; y <= maxY; y++) {
            for (let x = minX; x <= maxX; x++) {
                this.setTile(x, y, 0);
            }
        }
        this.game.gameData.totalTiles.value += (maxX - minX + 1) * (maxY - minY + 1);
    }

    public countTiles() {
        const data = this.game.gameData;
        const counts = new Map<ChamberType, number>();
        counts.set(ChamberType.Unassigned, 0);
        counts.set(ChamberType.Invalid, 0);
        counts.set(ChamberType.Hall, 0);
        counts.set(ChamberType.Queen, 0);
        counts.set(ChamberType.Residential, 0);
        counts.set(ChamberType.Farm, 0);
        counts.set(ChamberType.Training, 0);
        for (let i = 0; i < this.chambers.length; i++) {
            const chamber = this.chambers[i];
            const count = counts.get(chamber.chamberType)!;
            counts.set(chamber.chamberType, count + chamber.size);
        }
        counts.forEach((val, type) => {
            switch (type) {
                case ChamberType.Invalid:
                    break;
                case ChamberType.Unassigned:
                    data.unassignedTiles.value = val;
                    break;
                case ChamberType.Queen:
                    data.queenTiles.value = val;
                    break;
                case ChamberType.Residential:
                    data.residentialTiles.value = val;
                    break;
                case ChamberType.Farm:
                    data.farmTiles.value = val;
                    break;
                case ChamberType.Training:
                    data.trainingTiles.value = val;
                    break;
            }
        });
    }

    private updateChamber(x: number, y: number) {
        const index = this.findChamberIndex(x, y);
        if (index === -1 && Chamber.calcChamberType(this, ChamberType.Unassigned, x, y) != ChamberType.Invalid) {
            const chamber = new Chamber(this.game, x, y);
            if (chamber.isValidChamber()) {
                this.chambers.push(chamber);
            }
        }
        else if (index != -1 && !this.chambers[index].isValidChamber()) {
            this.chambers.splice(index, 1);
        }
    }

    private findChamberIndex(x: number, y: number): number {
        let index = -1;
        for (let i = this.chambers.length - 1; i >= 0; i--) {
            const chamber = this.chambers[i];
            if (index === -1 && chamber.contains(x, y)) {
                index = i;
            }
            else if (index != -1 && chamber.contains(x, y)) {
                if ((chamber.size > this.chambers[index].size || chamber.chamberType != ChamberType.Queen) && this.chambers[index].chamberType === ChamberType.Queen) {
                    this.chambers.splice(i, 1);
                    index -= 1;
                }
                else {
                    this.chambers.splice(index, 1);
                    index = i;
                }
            }
        }
        return index;
    }

    public getChamber(x: number, y: number): Chamber | undefined {
        const index = this.findChamberIndex(x, y);
        return index === -1 ? undefined : this.chambers[index];
    }

    public draw() {
        const p5 = this.game.p5;
        const alpha = 100;

        for (let i = 0; i < this.chambers.length; i++) {
            const chamber = this.chambers[i];
            switch (chamber.chamberType) {
                case ChamberType.Invalid:
                    p5.fill(255, 0, 255, alpha);
                    break;
                case ChamberType.Hall:
                    p5.fill(255, 100, 255, alpha);
                    break;
                case ChamberType.Unassigned:
                    p5.fill(71, 71, 71, alpha);
                    // p5.fill(177, 61, 163, alpha); // Larvae chamber
                    break;
                case ChamberType.Queen:
                    p5.fill(177, 155, 61, alpha);
                    break;
                case ChamberType.Residential:
                    p5.fill(61, 126, 177, alpha);
                    break;
                case ChamberType.Farm:
                    p5.fill(75, 177, 61, alpha);
                    break;
                case ChamberType.Training:
                    p5.fill(177, 62, 61, alpha);
                    break;
            }

            chamber.draw();
        }
    }
}