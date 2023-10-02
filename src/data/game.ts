import P5 from "p5";
import { AntColony } from "./ant_colony";
import { Camera } from "./camera";
import { AssetList } from "./asset_list";
import { Gui } from "./gui";
import { GameData } from "./gamedata";
import { NotificationList } from "./notificationList";

export enum CursorMode {
    Neutral,
    Dig,
    Fill,
    Queen,
    Residential,
    Farm,
    Training,
}

export class Game {
    private readonly _p5: P5;
    private readonly _assetList: AssetList;
    private readonly _antHill: AntColony;
    private readonly _camera: Camera;
    private readonly _gui: Gui;
    private readonly _gameData: GameData;
    private readonly _notifications: NotificationList;
    private _cursorMode: CursorMode;
    private _canvasIgnoreInput: boolean;
    public get p5(): P5 {
        return this._p5;
    }
    public get assetList(): AssetList {
        return this._assetList;
    }
    public get antHill(): AntColony {
        return this._antHill;
    }
    public get camera(): Camera {
        return this._camera;
    }
    public get gameData(): GameData {
        return this._gameData;
    }
    public get gui(): Gui {
        return this._gui;
    }
    public get cursorMode(): CursorMode {
        return this._cursorMode;
    }
    public set cursorMode(cursorMode: CursorMode) {
        this._cursorMode = cursorMode;
    }
    public get canvasIgnoreInput(): boolean {
        return this._canvasIgnoreInput;
    }
    public set canvasIgnoreInput(canvasIgnoreInput: boolean) {
        this._canvasIgnoreInput = canvasIgnoreInput;
    }
    public get notifications(): NotificationList {
        return this._notifications;
    }
    
    constructor(p5: P5) {
        this._p5 = p5;
        this._assetList = new AssetList();
        this._antHill = new AntColony(this, 100, 100);
        this._camera = new Camera(p5, 100);
        this._gui = new Gui();
        this._notifications = new NotificationList();
        this._gameData = new GameData();
        this._cursorMode = CursorMode.Neutral;
    }
}