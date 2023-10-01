import P5 from "p5";
import { AntHill, AntHillEvent } from "./ant_hill";
import { Camera } from "./camera";
import { drawMarchingSquares } from "../marching_squares";
import { Game } from "./game";

export enum ChamberType {
    Invalid = "Invalid",
    Hall = "Hall",
    Unassigned = "Unassigned",
}

type Position = {x: number, y: number};
export class Chamber{
    private readonly game: Game;
    private readonly exploreNonRooms: boolean;
    private readonly xOrigin: number;
    private readonly yOrigin: number;
    private readonly explored: Set<string> = new Set();
    private readonly discoveredSet: Set<string> = new Set();
    private discovered: Position[] = [];
    private chamberType: ChamberType;

    constructor(game: Game, x: number, y: number){
        this.game = game;
        const antHill = game.antHill;
        this.xOrigin = x;
        this.yOrigin = y;
        this.chamberType = ChamberType.Unassigned;

        antHill.addEventListener(AntHillEvent.TilesChanged, this.calcRoom.bind(this));
        this.calcRoom();
    }

    private calcRoom(){
        this.chamberType = this.calcChamberType(this.xOrigin, this.yOrigin);
        this.explored.clear();
        this.discovered = [];
        this.discoveredSet.clear();

        if (this.chamberType === ChamberType.Invalid){
            return;
        }

        this.tryDiscoverTile(this.xOrigin, this.yOrigin);
        for (let i = 0; i < this.discovered.length; i++){
            const tile = this.discovered[i];
            this.tryExploreTile(tile.x, tile.y);
        }
    }

    private tryExploreTile(x: number, y: number){        
        const pos: string = this.getKey(x, y);
        if (this.explored.has(pos)){
            return;
        }

        if (this.calcChamberType(x, y) != this.chamberType){
            return;
        }

        this.explored.add(pos);
        this.tryDiscoverTile(x, y + 1);
        this.tryDiscoverTile(x + 1, y);
        this.tryDiscoverTile(x, y - 1);
        this.tryDiscoverTile(x - 1, y);
        return;
    }

    private tryDiscoverTile(x: number, y: number){
        const key = this.getKey(x, y);
        if (this.discoveredSet.has(key)){
            return;
        }
        this.discovered.push({x: x, y: y});
        this.discoveredSet.add(key);
    }

    private calcChamberType(x: number, y: number) : ChamberType{
        const antHill = this.game.antHill;
        const tileValue = antHill.getTile(x, y);
        if (tileValue === -1 || tileValue > 0){
            return ChamberType.Invalid;
        }
        const top = this.isEmpty(x, y + 1);
        const right = this.isEmpty(x + 1, y);
        const down = this.isEmpty(x, y - 1);
        const left = this.isEmpty(x - 1, y);
        if ((top && right && this.isEmpty(x + 1, y + 1)) ||
            (right && down && this.isEmpty(x + 1, y - 1)) ||
            (down && left && this.isEmpty(x - 1, y - 1)) ||
            (left && top && this.isEmpty(x - 1, y + 1))){
            return this.isValidChamber() ? this.chamberType : ChamberType.Invalid;
        }
        else{
            return ChamberType.Hall;
        }
    }

    private isEmpty(x: number, y: number){
        const antHill = this.game.antHill;
        return antHill.getTile(x, y) === 0;
    }

    private getKey(x: number, y: number){
        return x.toString().padStart(5) + y.toString().padStart(5);
    }

    public draw(){
        drawMarchingSquares(this.game, undefined, (x, y) => this.explored.has(this.getKey(x, y)));
    }

    public contains(x: number, y: number): boolean{
        return this.explored.has(this.getKey(x, y));
    }

    public isValidChamber(): boolean{
        return this.chamberType != ChamberType.Invalid && this.chamberType != ChamberType.Hall;
    }
}