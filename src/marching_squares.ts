import P5 from "p5";
import { AntHill } from "./data/ant_hill";
import { Game } from "./data/game";
import { Camera } from "./data/camera";
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

export function drawMarchingSquares(p5: P5, antHill: AntHill, camera: Camera, predicate: (value: number) => boolean) {
    const point1 = camera.getWorldCoords(0, 0);
    const point2 = camera.getWorldCoords(p5.width, p5.height);
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
            if (predicate(lowerLeft)) {
                binaryValue += 1 << 0;
            }
            if (predicate(lowerRight)) {
                binaryValue += 1 << 1;
            }
            if (predicate(upperRight)) {
                binaryValue += 1 << 2;
            }
            if (predicate(upperLeft)) {
                binaryValue += 1 << 3;
            }

            p5.beginShape();
            const square = squares[binaryValue];
            for (const point of square){
                p5.vertex(x - 0.5 + point.xOffset, y - 0.5 + point.yOffset);
            }
            p5.endShape();

            if (DEBUG) {
                p5.fill((predicate(lowerLeft)) ? 0 : 125);
                p5.ellipse(x, y, .25, .25);
                p5.fill((predicate(lowerRight)) ? 0 : 125);
                p5.ellipse(x + 1, y, .25, .25);
                p5.fill((predicate(upperLeft)) ? 0 : 125);
                p5.ellipse(x, y + 1, .25, .25);
                p5.fill((predicate(upperRight)) ? 0 : 125);
                p5.ellipse(x + 1, y + 1, .25, .25);
            }
        }
    }
}