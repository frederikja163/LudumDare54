export type Camera = {x: number, y: number, zoom: number}

export class AntHill{
    private readonly tiles: number[][] = [];
    private readonly _camera: Camera;

    public get width(): number{
        return this.tiles[0].length;
    }
    public get height(): number{
        return this.tiles.length;
    }
    public getTile(x: number, y: number): number{
        return this.tiles[x][y];
    }
    public setTile(x: number, y: number, value: number){
        this.tiles[y][x] = value;
    }

    public get camera(): Camera{
        return this._camera;
    }

    constructor(width: number, height: number){
        for (let y = 0; y < height; y++) {
            this.tiles[y] = [];
            for (let x = 0; x < width; x++) {
                this.tiles[y][x] = Math.random();
            }
        }
        this._camera = {x: 0, y: 0, zoom: 100};
    }
}