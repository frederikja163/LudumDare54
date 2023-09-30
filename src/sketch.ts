import P5 from "p5";
import { AntHill } from "./ant_hill";

export function setup(p5: P5, antHill: AntHill) {
    p5.createCanvas(window.innerWidth - 4, window.innerHeight - 4);
}

export function draw(p5: P5, antHill: AntHill) {
    p5.background('#0F0F0F');
}

export function resize(p5: P5, antHill: AntHill) {
    p5.resizeCanvas(window.innerWidth - 4, window.innerHeight - 4);
}
