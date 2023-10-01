import P5 from "p5";
import { AntColony } from "./data/ant_colony";
import { Game } from "./data/game";
import { Camera } from "./data/camera";

type PointOffset = { xOffset: number, yOffset: number };
const TopCenter: PointOffset = { xOffset: 0, yOffset: 0.5 };
const TopRight: PointOffset = { xOffset: 0.5, yOffset: 0.5 };
const RightCenter: PointOffset = { xOffset: 0.5, yOffset: 0 };
const DownRight: PointOffset = { xOffset: 0.5, yOffset: -0.5 };
const DownCenter: PointOffset = { xOffset: 0, yOffset: -0.5 };
const DownLeft: PointOffset = { xOffset: -0.5, yOffset: -0.5 };
const LeftCenter: PointOffset = { xOffset: -0.5, yOffset: 0 };
const TopLeft: PointOffset = { xOffset: -0.5, yOffset: 0.5 };
type MarchingSquare = PointOffset[];
const squares: MarchingSquare[] = [
/*0*/       [],
/*1*/       [DownCenter, DownLeft, LeftCenter],
/*2*/       [RightCenter, DownRight, DownCenter],
/*3*/       [RightCenter, DownRight, DownLeft, LeftCenter],
/*4*/       [TopCenter, TopRight, RightCenter],
/*5*/       [TopCenter, TopRight, RightCenter, DownCenter, DownLeft, LeftCenter],
/*6*/       [TopCenter, TopRight, DownRight, DownCenter],
/*7*/       [TopCenter, TopRight, DownRight, DownLeft, LeftCenter],
/*8*/       [TopCenter, LeftCenter, TopLeft],
/*9*/       [TopCenter,DownCenter,DownLeft, TopLeft],
/*10*/      [TopCenter, RightCenter, DownRight, DownCenter, LeftCenter, TopLeft],
/*11*/      [TopCenter, RightCenter, DownRight, DownLeft, TopLeft],
/*12*/      [TopRight, RightCenter, LeftCenter, TopLeft],
/*13*/      [TopRight, RightCenter, DownCenter, DownLeft, TopLeft],
/*14*/      [TopRight, DownRight, DownCenter, LeftCenter, TopLeft],
/*15*/      [TopRight, DownRight, DownLeft, TopLeft],
];

export function drawMarchingSquares(game: Game, textures: P5.Image[] | undefined, minX: number, maxX: number, minY: number, maxY: number, predicate: (x: number, y: number) => boolean) {
    const p5 = game.p5;
    const antHill = game.antHill;
    const camera = game.camera;

    const point1 = camera.getWorldCoords(0, 0);
    const point2 = camera.getWorldCoords(p5.width, p5.height);
    minX = Math.max(minX, Math.round(point1.x + antHill.width / 2));
    maxX = Math.min(maxX, Math.round(point2.x + antHill.width / 2 + 2));
    minY = Math.max(minY, Math.round(point1.y + antHill.height / 2));
    maxY = Math.min(maxY, Math.round(point2.y + antHill.height / 2 + 2));

    for (let y = minY; y < maxY; y++) {
        for (let x = minX; x < maxX; x++) {
            let binaryValue = 0;
            if (predicate(x - 1, y - 1)) {
                binaryValue += 1 << 0;
            }
            if (predicate(x, y - 1)) {
                binaryValue += 1 << 1;
            }
            if (predicate(x, y)) {
                binaryValue += 1 << 2;
            }
            if (predicate(x - 1, y)) {
                binaryValue += 1 << 3;
            }

            p5.beginShape();
            const square = squares[binaryValue];
            for (const point of square){
                const posX = x - 0.5 + point.xOffset;
                const posY = y - 0.5 + point.yOffset;
                if (textures){
                    p5.randomSeed(x * y * x * y);
                    p5.texture(textures[Math.floor(p5.random(0, textures.length))]);
                    p5.vertex(posX, posY, undefined, point.xOffset + 0.5, point.yOffset + 0.5);
                }else{
                    p5.vertex(posX, posY);
                }
            }
            p5.endShape();

            if (p5.keyIsDown(p5.ALT)) {
                p5.push();
                p5.fill(50);
                p5.ellipse(x - 1, y - 1, .25, .25);
                p5.ellipse(x, y - 1, .25, .25);
                p5.ellipse(x - 1, y, .25, .25);
                p5.ellipse(x, y, .25, .25);
                p5.pop();
            }
        }
    }
}