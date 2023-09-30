import P5 from "p5";

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
        return this.tiles[y][x];
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

    getWorldCoords(p5: P5, x: number, y: number): {x: number, y: number}{
        return {
            x: (p5.mouseX + this.camera.x - p5.width/2) / (this.camera.zoom),
            y: (p5.mouseY + this.camera.y - p5.height/2) / (this.camera.zoom)
        };
    }
}