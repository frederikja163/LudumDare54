import P5 from "p5";
import { AntHill } from "./ant_hill";
import { drawMarchingSquares } from "./marching_squares";

let camera: P5.Camera;

export function setup(p5: P5, antHill: AntHill) {
    p5.createCanvas(window.innerWidth - 4, window.innerHeight - 4, p5.WEBGL);
    camera = p5.createCamera();
}

export function draw(p5: P5, antHill: AntHill){
    p5.background(255, 255, 255);

    p5.translate(-antHill.camera.x, -antHill.camera.y);
    p5.scale(antHill.camera.zoom);

    p5.push();
    p5.translate(-antHill.width/2, -antHill.height/2);
    p5.noStroke();
    p5.fill(0, 0, 0);
    drawMarchingSquares(p5, antHill, 0.5);
    p5.pop();
}

export function mouseDragged(p5: P5, antHill: AntHill, event: MouseEvent){
    if (p5.mouseButton == p5.CENTER){
        antHill.camera.x -= event.movementX;
        antHill.camera.y -= event.movementY;
    }
}

export function resize(p5: P5, antHill: AntHill) {
    p5.resizeCanvas(window.innerWidth - 4, window.innerHeight - 4);
}
export function mouseClicked(p5: P5, antHill: AntHill): void {
    const mouse = antHill.getWorldCoords(p5, p5.mouseX, p5.mouseY);

    const x = Math.round(mouse.x + antHill.width / 2);
    const y = Math.round(mouse.y + antHill.height / 2);
    console.log(x, y);
    if (p5.mouseButton === p5.LEFT && !p5.keyIsDown(p5.SHIFT)){
        antHill.setTile(x, y, 0);
    }
    else if (p5.mouseButton === p5.LEFT && p5.keyIsDown(p5.SHIFT)){
        antHill.setTile(x, y, 1);
    }
}

export function keyPressed(p5: P5, antHill: AntHill): void {
    if (p5.keyIsDown(187 /*+*/)){
        antHill.camera.zoom *= 1.1;
    }
    else if (p5.keyIsDown(189) /*-*/){
        antHill.camera.zoom *= 0.9;
    }
}

