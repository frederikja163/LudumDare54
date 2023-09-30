import P5, { Camera } from "p5";
import { AntHill } from "./ant_hill";
import { Game } from "./game";
const DEBUG = false;

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

export function drawMarchingSquares(game: Game, threshold: number) {
    const p5 = game.p5;
    const antHill = game.antHill

    const point1 = game.camera.getWorldCoords(0, 0);
    const point2 = game.camera.getWorldCoords(p5.width, p5.height);
    const minX = Math.max(1, Math.round(point1.x + antHill.width / 2 - 1));
    const maxX = Math.min(antHill.width, Math.round(point2.x + antHill.width / 2 + 2));
    const minY = Math.min(1, Math.round(point1.y + antHill.height / 2 - 1));
    const maxY = Math.max(antHill.height, Math.round(point2.y + antHill.height / 2 + 2));

    for (let y = minY; y < maxY; y++) {
        for (let x = minX; x < maxX; x++) {
            const lowerLeft = antHill.getTile(x - 1, y - 1);
            const lowerRight = antHill.getTile(x, y - 1);
            const upperLeft = antHill.getTile(x - 1, y);
            const upperRight = antHill.getTile(x, y);

            let binaryValue = 0;
            if (lowerLeft > threshold) {
                binaryValue += 1 << 0;
            }
            if (lowerRight > threshold) {
                binaryValue += 1 << 1;
            }
            if (upperRight > threshold) {
                binaryValue += 1 << 2;
            }
            if (upperLeft > threshold) {
                binaryValue += 1 << 3;
            }

            p5.beginShape();
            const square = squares[binaryValue];
            for (const point of square){
                p5.vertex(x - 0.5 + point.xOffset, y - 0.5 + point.yOffset);
            }
            p5.endShape();

            if (DEBUG) {
                p5.fill((lowerLeft > threshold) ? 0 : 125);
                p5.ellipse(x, y, .25, .25);
                p5.fill((lowerRight > threshold) ? 0 : 125);
                p5.ellipse(x + 1, y, .25, .25);
                p5.fill((upperLeft > threshold) ? 0 : 125);
                p5.ellipse(x, y + 1, .25, .25);
                p5.fill((upperRight > threshold) ? 0 : 125);
                p5.ellipse(x + 1, y + 1, .25, .25);
            }
        }
    }
}