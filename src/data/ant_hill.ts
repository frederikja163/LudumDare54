import { Camera } from "./camera";
import { Chamber } from "./chamber";
import P5 from "p5";

export enum AntHillEvent{
    TilesChanged = "TilesChanged",
}

export class AntHill extends EventTarget{
    private readonly tiles: number[][] = [];
    private readonly chambers: Chamber[] = [];

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
        this.dispatchEvent(new Event(AntHillEvent.TilesChanged))
    }

    constructor(width: number, height: number){
        super();
        for (let y = 0; y < height; y++) {
            this.tiles[y] = [];
            for (let x = 0; x < width; x++) {
                this.tiles[y][x] = 0;
            }
        }
    }

    private updateChamber(x: number, y: number){
        const index = this.chambers.findIndex(c => c.contains(x, y));
        if (index === -1){
            const chamber = new Chamber(this, x, y);
            if (chamber.isValidChamber()){
                this.chambers.push(chamber);
            }
        }
        else if (!this.chambers[index].isValidChamber()){
            this.chambers.splice(index, 1);
        }
    }

    public getChamber(x: number, y: number): Chamber | undefined{
        return this.chambers.find(c => c.contains(x, y));
    }

    public draw(p5: P5, camera: Camera){
        for (let i = 0; i < this.chambers.length; i++){
            const chamber = this.chambers[i];
            p5.randomSeed(i);
            p5.fill(p5.random(0, 256));
            chamber.draw(p5, camera);
        }
    }
}