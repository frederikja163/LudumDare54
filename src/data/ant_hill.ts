export enum AntHillEvent{
    TilesChanged = "TilesChanged",
}

export class AntHill extends EventTarget{
    private readonly tiles: number[][] = [];

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
}