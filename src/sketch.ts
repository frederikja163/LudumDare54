import P5 from "p5";
import { AntHill } from "./ant_hill";
import { drawMarchingSquares } from "./marching_squares";

export function setup(p5: P5, antHill: AntHill) {
    p5.createCanvas(window.innerWidth - 4, window.innerHeight - 4);
}

export function draw(p5: P5, antHill: AntHill){
    p5.background(255, 255, 255);
    p5.scale(10);
    p5.noStroke();
    p5.fill(150, 150, 150);
    drawMarchingSquares(p5, antHill, 0.2);
    p5.fill(100, 100, 100, 100);
    drawMarchingSquares(p5, antHill, 0.5);
    p5.fill(50, 50, 50, 50);
    drawMarchingSquares(p5, antHill, 0.2);
    p5.fill(0, 0, 0, 255);
    drawMarchingSquares(p5, antHill, 0);
}

export function resize(p5: P5, antHill: AntHill) {
    p5.resizeCanvas(window.innerWidth - 4, window.innerHeight - 4);
}