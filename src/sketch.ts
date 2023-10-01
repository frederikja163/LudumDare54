import P5 from "p5";
import { AntHill } from "./data/ant_hill";
import { drawMarchingSquares } from "./marching_squares";
import { CursorMode, Game } from "./data/game";
import { Chamber, ChamberType } from "./data/chamber";
const placementThreshold = 0.2;

export function preload(game: Game): void {
    const p5 = game.p5;
    const assetList = game.assetList;

    for (const path of assetList.dirtPaths) {
        assetList.dirt.push(p5.loadImage(path))
    }
}

export function setup(game: Game) {
    const p5 = game.p5;

    p5.createCanvas(window.innerWidth - 8, window.innerHeight - 8, p5.WEBGL);
}

export function draw(game: Game) {
    const p5 = game.p5;
    const antHill = game.antHill;
    const camera = game.camera;
    const assetList = game.assetList;
    const cursorMode = game.cursorMode;

    p5.background(0, 0, 0);
    camera.apply();
    const mouse = camera.getWorldCoords(p5.mouseX, p5.mouseY);
    const x = mouse.x + antHill.width / 2;
    const y = mouse.y + antHill.height / 2;
    p5.push();
    p5.translate(-antHill.width / 2, -antHill.height / 2);
    p5.noStroke();

    p5.fill(255, 255, 255);
    p5.textureMode(p5.NORMAL);
    drawMarchingSquares(game, assetList.dirt, 1, antHill.width, 1, antHill.height, (x, y) => antHill.getTile(x, y) > 0);

    if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT && cursorMode != CursorMode.Neutral) {
        const cursorRadius = 0.9;

        switch (cursorMode) {
            case CursorMode.Dig:
                if (Math.abs(x % cursorRadius) > placementThreshold && Math.abs(y % cursorRadius) > placementThreshold) {

                    antHill.setTile(Math.round(x), Math.round(y), 0);
                }

                break;

            case CursorMode.Fill:
                if (Math.abs(x % cursorRadius) > placementThreshold && Math.abs(y % cursorRadius) > placementThreshold) {

                    antHill.setTile(Math.round(x), Math.round(y), 1);
                }

                break;

            case CursorMode.Farm:
                const chamber = antHill.getChamber(Math.round(x), Math.round(y));
                if (chamber != undefined) {
                    chamber.chamberType = ChamberType.Farm;
                    console.log(chamber);

                }

                break;

        }
    }

    antHill.draw();

    p5.pop();
}

export function mouseDragged(game: Game, event: MouseEvent) {
    const p5 = game.p5;
    const camera = game.camera;
    const cursorMode = game.cursorMode;

    if (p5.mouseButton === p5.CENTER || (p5.mouseButton === p5.LEFT && cursorMode === CursorMode.Neutral)) {
        camera.move(event.movementX, event.movementY);
    }
}

export function resize(game: Game) {
    const p5 = game.p5;

    p5.resizeCanvas(window.innerWidth - 8, window.innerHeight - 8);
}

export function keyPressed(game: Game) {
    const p5 = game.p5;
    const camera = game.camera;

    if (p5.keyIsDown(187 /*+*/)) {
        camera.zoom(1.1);
    }
    else if (p5.keyIsDown(189) /*-*/) {
        camera.zoom(1 / 1.1);
    }
}

export function mouseWheel(game: Game, event: WheelEvent) {
    const p5 = game.p5;
    const camera = game.camera;

    if (event.deltaY < 0) {
        camera.zoom(1.1);
    }
    else {
        camera.zoom(1 / 1.1);
    }
}
