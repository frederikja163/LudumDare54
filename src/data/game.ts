import P5 from "p5";
import { AntHill } from "./ant_hill";
import { Camera } from "./camera";

export class Game{
    private readonly _camera: Camera;
    private readonly _antHill: AntHill;
    private readonly _p5: P5;
    public get p5(): P5 {
        return this._p5;
    }
    public get camera(): Camera {
        return this._camera;
    }
    public get antHill(): AntHill {
        return this._antHill;
    }

    constructor(p5: P5){
        this._p5 = p5;
        this._antHill = new AntHill(100, 100);
        this._camera = new Camera(p5, 100);
    }
}