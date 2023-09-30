import P5 from "p5";
import { AntHill } from "./ant_hill";
import { drawMarchingSquares } from "./marching_squares";
const placementThreshold = 0.2;

export function setup(p5: P5, antHill: AntHill) {
    p5.createCanvas(window.innerWidth - 4, window.innerHeight - 4, p5.WEBGL);
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
    const mouse = antHill.getWorldCoords(p5, p5.mouseX, p5.mouseY);
    const x = mouse.x + antHill.width / 2;
    const y = mouse.y + antHill.height / 2;
    if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT && !p5.keyIsDown(p5.SHIFT)){
        if (Math.abs(x % 1 - 0.5) > placementThreshold && Math.abs(y % 1 - 0.5) > placementThreshold){

            antHill.setTile(Math.round(x), Math.round(y), 0);
        }
        p5.fill(128, 255, 128, 200);
        p5.ellipse(Math.round(x), Math.round(y), 0.1, 0.1);
    }
    else if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT && p5.keyIsDown(p5.SHIFT)){
        if (Math.abs(x % 1 - 0.5) > placementThreshold && Math.abs(y % 1 - 0.5) > placementThreshold){

            antHill.setTile(Math.round(x), Math.round(y), 1);
        }
        p5.fill(255, 128, 128, 200);
        p5.ellipse(Math.round(x), Math.round(y), 0.1, 0.1);
    }
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

export function keyPressed(p5: P5, antHill: AntHill): void {
    if (p5.keyIsDown(187 /*+*/)){
        antHill.camera.zoom *= 1.1;
    }
    else if (p5.keyIsDown(189) /*-*/){
        antHill.camera.zoom *= 0.9;
    }
}

