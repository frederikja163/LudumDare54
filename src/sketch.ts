import P5 from "p5";
import { AntHill } from "./ant_hill";
import { drawMarchingSquares } from "./marching_squares";

let camera: P5.Camera;

export function setup(p5: P5, antHill: AntHill) {
    p5.createCanvas(window.innerWidth - 4, window.innerHeight - 4, p5.WEBGL);
    camera = p5.createCamera();
    // camera.ortho(-p5.width / 2, -p5.height / 2, 0, 0);
}

export function draw(p5: P5, antHill: AntHill){
    p5.background(255, 255, 255);

    const left = -p5.width / 2 + antHill.camera.x;
    const right = p5.width / 2 + antHill.camera.x;
    const up = -p5.height / 2 - antHill.camera.y;
    const down = p5.height / 2 - antHill.camera.y
    p5.frustum(left / antHill.camera.zoom, right / antHill.camera.zoom, up / antHill.camera.zoom, down / antHill.camera.zoom);

    p5.translate(-p5.width / 2, -p5.height / 2);
    p5.scale(50);
    p5.noStroke();
    p5.fill(0, 0, 0);
    drawMarchingSquares(p5, antHill, 0.8);
    p5.fill(0, 255, 0, 50);
    drawMarchingSquares(p5, antHill, 0.2);
}

export function mouseDragged(p5: P5, antHill: AntHill, event: MouseEvent){
    if (p5.mouseButton == p5.CENTER){
        antHill.camera.x -= event.movementX;
        antHill.camera.y -= event.movementY;
    }
}

export function mouseWheel(p5: P5, antHill: AntHill, event: WheelEvent){
    const zoomDelta = event.deltaY * p5.deltaTime / 10000;
    antHill.camera.zoom -= zoomDelta * antHill.camera.zoom;
}

export function resize(p5: P5, antHill: AntHill) {
    p5.resizeCanvas(window.innerWidth - 4, window.innerHeight - 4);
}
