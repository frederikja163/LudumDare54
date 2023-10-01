import P5 from "p5";
import { AntHill } from "./ant_hill";
import { Camera } from "./camera";
import { AssetList } from "./asset_list";

export enum CursorMode {
    Neutral,
    Dig,
    Fill,
}

export class Game {
    private readonly _p5: P5;
    private readonly _assetList: AssetList;
    private readonly _antHill: AntHill;
    private readonly _camera: Camera;
    private _cursorMode: CursorMode;
    public get p5(): P5 {
        return this._p5;
    }
    public get assetList(): AssetList {
        return this._assetList;
    }
    public get antHill(): AntHill {
        return this._antHill;
    }
    public get camera(): Camera {
        return this._camera;
    }
    public get cursorMode(): CursorMode {
        return this._cursorMode;
    }
    public set cursorMode(cursorMode: CursorMode) {
        this._cursorMode = cursorMode;

    }

    constructor(p5: P5) {
        this._p5 = p5;
        this._assetList = new AssetList();
        this._antHill = new AntHill(this, 100, 100);
        this._camera = new Camera(p5, 100);
        this._cursorMode = CursorMode.Neutral;
    }
}