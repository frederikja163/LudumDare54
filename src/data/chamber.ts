import P5 from "p5";
import { AntHill, AntHillEvent, TileEvent } from "./ant_hill";
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
    private readonly xOrigin: number;
    private readonly yOrigin: number;
    private minX: number;
    private maxX: number;
    private minY: number;
    private maxY: number;
    private readonly explored: Set<string> = new Set();
    private readonly discoveredSet: Set<string> = new Set();
    private discovered: Position[] = [];
    private chamberType: ChamberType;

    constructor(game: Game, x: number, y: number){
        this.game = game;
        const antHill = game.antHill;
        this.xOrigin = x;
        this.yOrigin = y;
        this.minX = this.xOrigin;
        this.maxX = this.xOrigin;
        this.minY = this.yOrigin;
        this.maxY = this.yOrigin;
        this.chamberType = ChamberType.Unassigned;

        this.tryDiscoverTile(this.xOrigin, this.yOrigin);
        antHill.addEventListener(AntHillEvent.TilesChanged, this.tileChangedEvent.bind(this));
        this.calcRoom();
    }

    private tileChangedEvent(event: TileEvent){
        if (event.x < this.minX || event.x > this.maxX ||
            event.y < this.minY || event.y > this.maxY){
            return;
        }
        const key = this.getKey(event.x, event.y);
        const chamberType = this.calcChamberType(event.x, event.y);
        if (Chamber.isValidChamber(chamberType)){
            this.discoveredSet.delete(key);
            this.tryDiscoverTile(event.x, event.y);
            this.calcRoom();
            return;
        }
        this.discoveredSet.clear();
        this.discovered = [];
        this.explored.clear();
        this.tryDiscoverTile(this.xOrigin, this.yOrigin);
        this.calcRoom();
    }

    private calcRoom(){
        this.chamberType = this.calcChamberType(this.xOrigin, this.yOrigin);

        if (this.chamberType === ChamberType.Invalid){
            return;
        }

        for (let i = 0; i < this.discovered.length; i++){
            const tile = this.discovered[i];
            this.tryExploreTile(tile.x, tile.y);
        }
        this.discovered = [];
        this.discoveredSet.clear();
    }

    private tryExploreTile(x: number, y: number){        
        const pos: string = this.getKey(x, y);
        if (this.explored.has(pos)){
            return;
        }

        if (this.calcChamberType(x, y) != this.chamberType){
            return;
        }
        this.minX = Math.min(x, this.minX);
        this.maxX = Math.max(x, this.maxX);
        this.minY = Math.min(y, this.minY);
        this.maxY = Math.max(y, this.maxY);

        this.explored.add(pos);
        this.tryDiscoverTile(x, y + 1);
        this.tryDiscoverTile(x + 1, y);
        this.tryDiscoverTile(x, y - 1);
        this.tryDiscoverTile(x - 1, y);
        return;
    }

    private tryDiscoverTile(x: number, y: number){
        const key = this.getKey(x, y);
        if (this.explored.has(key) || this.discoveredSet.has(key)){
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
        drawMarchingSquares(this.game, undefined, this.minX, this.maxX + 2, this.minY, this.maxY + 2, (x, y) => this.explored.has(this.getKey(x, y)));
    }

    public contains(x: number, y: number): boolean{
        return this.explored.has(this.getKey(x, y));
    }

    private static isValidChamber(chamberType: ChamberType): boolean{
        return chamberType != ChamberType.Invalid && chamberType != ChamberType.Hall;
    }

    public isValidChamber(): boolean{
        return this.chamberType != ChamberType.Invalid && this.chamberType != ChamberType.Hall;
    }
}