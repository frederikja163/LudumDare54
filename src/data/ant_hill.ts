import { Camera } from "./camera";
import { Chamber, ChamberType } from "./chamber";
import P5 from "p5";
import { Game } from "./game";


export class TileEvent extends Event{
    private readonly _x: number;
    private readonly _y: number;

    constructor(x: number, y: number){
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
export enum AntHillEvent{
    TilesChanged = "TilesChanged",
}

export class AntHill extends EventTarget{
    private readonly tiles: number[][] = [];
    private readonly chambers: Chamber[] = [];
    private readonly game: Game;

    public get width(): number{
        return this.tiles[0].length;
    }
    public get height(): number{
        return this.tiles.length;
    }
    public getTile(x: number, y: number): number{
        if (x < 0 || x >= this.width || y < 0 || y >= this.height){
            return -1;
        }
        return this.tiles[y][x];
    }
    public setTile(x: number, y: number, value: number){
        if (x < 0 || x >= this.width || y < 0 || y >= this.height){
            return;
        }
        this.updateChamber(x - 1, y);
        this.updateChamber(x, y - 1);
        this.updateChamber(x + 1, y);
        this.updateChamber(x, y + 1);
        this.tiles[y][x] = value;
        this.dispatchEvent(new TileEvent(x, y));
    }

    constructor(game: Game, width: number, height: number){
        super();
        for (let y = 0; y < height; y++) {
            this.tiles[y] = [];
            for (let x = 0; x < width; x++) {
                this.tiles[y][x] = 1;
            }
        }
        this.game = game;
    }

    private updateChamber(x: number, y: number){
        const index = this.chambers.findIndex(c => c.contains(x, y));
        if (index === -1 && Chamber.calcChamberType(this, ChamberType.Unassigned, x, y) === ChamberType.Unassigned){
            const chamber = new Chamber(this.game, x, y);
            if (chamber.isValidChamber()){
                this.chambers.push(chamber);
            }
        }
        else if (index != -1 && !this.chambers[index].isValidChamber()){
            this.chambers.splice(index, 1);
        }
    }

    public getChamber(x: number, y: number): Chamber | undefined{
        return this.chambers.find(c => c.contains(x, y));
    }

    public draw(){
        const p5 = this.game.p5;
        for (let i = 0; i < this.chambers.length; i++){
            const chamber = this.chambers[i];
            p5.fill(128);
            chamber.draw();
        }
    }
}