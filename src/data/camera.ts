import P5 from "p5";

export class Camera{
    private x: number = 0;
    private y: number = 0;
    private zoomAmount: number;
    private readonly p5: P5;

    constructor(p5: P5, zoomValue: number){
        this.p5 = p5;
        this.zoomAmount = zoomValue;
    }

    public apply(){
        this.p5.translate(-this.x, -this.y);
        this.p5.scale(this.zoomAmount);
    }

    public move(dx: number, dy: number){
        this.x -= dx;
        this.y -= dy;
    }

    public zoom(factor: number){
        this.zoomAmount *= factor;
    }

    public getWorldCoords(x: number, y: number): {x: number, y: number}{
        return {
            x: (x + this.x - this.p5.width/2) / (this.zoomAmount),
            y: (y + this.y - this.p5.height/2) / (this.zoomAmount)
        };
    }
}