import P5 from "p5";
import { AntHill, AntHillEvent } from "./ant_hill";
import { Camera } from "./camera";
import { drawMarchingSquares } from "../marching_squares";

export enum ChamberType {
    Invalid = "Invalid",
    Wall = "Wall",
    Hall = "Hall",
    Unassigned = "Unassigned",
}

export class Chamber{
    private static readonly tileCache: Map<string, ChamberType> = new Map();
    private readonly antHill: AntHill;
    private readonly explored: Set<string> = new Set();
    private readonly xOrigin: number;
    private readonly yOrigin: number;
    private chamberType: ChamberType;

    constructor(antHill: AntHill, x: number, y: number){
        this.antHill = antHill;
        this.xOrigin = x;
        this.yOrigin = y;
        this.chamberType = ChamberType.Unassigned;

        this.antHill.addEventListener(AntHillEvent.TilesChanged, this.calcRoom.bind(this));
        this.calcRoom();
    }

    private calcRoom(){
        Chamber.tileCache.clear();
        this.chamberType = this.calcChamberType(this.xOrigin, this.yOrigin);
        this.explored.clear();
        this.tryExploreTile(this.xOrigin, this.yOrigin);
    }

    private tryExploreTile(x: number, y: number){
        if (this.explored.size > 50){
            this.chamberType = ChamberType.Invalid;
            return;
        }
        
        const pos: string = this.getKey(x, y);
        if (this.explored.has(pos)){
            return;
        }

        if (this.calcChamberType(x, y) != this.chamberType){
            return;
        }

        this.explored.add(pos);
        this.tryExploreTile(x, y + 1);
        this.tryExploreTile(x + 1, y);
        this.tryExploreTile(x, y - 1);
        this.tryExploreTile(x - 1, y);
        return;
    }

    private calcChamberType(x: number, y: number) : ChamberType{
        const key = this.getKey(x, y);
        const type = Chamber.tileCache.get(key);
        if (type){
            return type;
        }

        const tileValue = this.antHill.getTile(x, y);
        if (tileValue === -1){
            Chamber.tileCache.set(key, ChamberType.Invalid);
            return ChamberType.Invalid;
        }
        else if (tileValue > 0){
            Chamber.tileCache.set(key, ChamberType.Wall);
            return ChamberType.Wall;
        }
        const top = this.isEmpty(x, y + 1);
        const right = this.isEmpty(x + 1, y);
        const down = this.isEmpty(x, y - 1);
        const left = this.isEmpty(x - 1, y);
        if ((top && right && this.isEmpty(x + 1, y + 1)) ||
            (right && down && this.isEmpty(x + 1, y - 1)) ||
            (down && left && this.isEmpty(x - 1, y - 1)) ||
            (left && top && this.isEmpty(x - 1, y + 1))){
            const type = this.isValidChamber() ? this.chamberType : ChamberType.Unassigned
            Chamber.tileCache.set(key, type);
            return type;
        }
        else{
            Chamber.tileCache.set(key, ChamberType.Hall);
            return ChamberType.Hall;
        }
    }

    private isEmpty(x: number, y: number){
        return this.antHill.getTile(x, y) === 0;
    }

    private getKey(x: number, y: number){
        return x.toString().padStart(5) + y.toString().padStart(5);
    }

    public draw(p5: P5, camera: Camera){
        drawMarchingSquares(p5, this.antHill, camera, (x, y) => this.explored.has(this.getKey(x, y)));
    }

    public contains(x: number, y: number): boolean{
        return this.explored.has(this.getKey(x, y));
    }

    public isValidChamber(): boolean{
        return this.chamberType != ChamberType.Invalid && this.chamberType != ChamberType.Hall && this.chamberType != ChamberType.Wall;
    }
}