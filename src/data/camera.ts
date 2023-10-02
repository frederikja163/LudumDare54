import P5 from "p5";
import { GameData, TutorialStep } from "./gamedata";

export class Camera{
    private x: number = 0;
    private y: number = 0;
    private _zoomAmount: number;
    private readonly p5: P5;
    private readonly data: GameData;

    constructor(p5: P5, data: GameData, zoomValue: number){
        this.p5 = p5;
        this.data = data;
        this.zoomAmount = zoomValue;
    }

    public apply(){
        this.p5.translate(-this.x, -this.y);
        this.p5.scale(this.zoomAmount);
    }

    public move(dx: number, dy: number){
        if (this.data.tutorialStep.value === TutorialStep.MoveCamera){
            this.data.tutorialStep.value += 1;
        }
        this.x -= dx;
        this.y -= dy;
    }

    public zoom(factor: number){
        if (this.data.tutorialStep.value === TutorialStep.ZoomCamera){
            this.data.tutorialStep.value += 1;
        }
        this.zoomAmount *= factor;
    }
    
    public get zoomAmount(): number {
        return this._zoomAmount;
    }
    public set zoomAmount(value: number) {
        this._zoomAmount = value;
    }

    public getWorldCoords(x: number, y: number): {x: number, y: number}{
        return {
            x: (x + this.x - this.p5.width/2) / (this.zoomAmount),
            y: (y + this.y - this.p5.height/2) / (this.zoomAmount)
        };
    }
}