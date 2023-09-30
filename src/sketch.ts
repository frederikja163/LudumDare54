import P5 from "p5";
import { AntHill } from "./ant_hill";

export function setup(p5: P5, antHill: AntHill){
    p5.createCanvas(500, 500);
}

export function draw(p5: P5, antHill: AntHill){
    p5.background(0, 0, 0);
}