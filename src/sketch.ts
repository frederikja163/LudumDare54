import P5 from "p5";
import { AntColony } from "./data/ant_colony";
import { drawMarchingSquares } from "./marching_squares";
import { CursorMode, Game } from "./data/game";
import { Chamber, ChamberType } from "./data/chamber";
import { TutorialStep } from "./data/gamedata";
const placementThreshold = 0.2;

export function preload(game: Game): void {
    const p5 = game.p5;
    const assetList = game.assetList;

    for (const path of assetList.tiles.dirt.paths) {
        assetList.tiles.dirt.image.push(p5.loadImage(path))
    }
    for (const path of assetList.tiles.colony.paths) {
        assetList.tiles.colony.image.push(p5.loadImage(path))
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
    const data = game.gameData;
    const notifications = game.notifications;

    p5.background(0, 0, 0);
    camera.apply();
    const mouse = camera.getWorldCoords(p5.mouseX, p5.mouseY);
    const x = mouse.x + antHill.width / 2;
    const y = mouse.y + antHill.height / 2;
    const tileX = Math.round(x);
    const tileY = Math.round(y);
    p5.push();
    p5.translate(-antHill.width / 2, -antHill.height / 2);
    p5.noStroke();

    p5.textureMode(p5.NORMAL);
    drawMarchingSquares(game, assetList.tiles.colony.image, -Infinity, Infinity, -Infinity, Infinity, () => true);
    drawMarchingSquares(game, assetList.tiles.dirt.image, -Infinity, Infinity, -Infinity, Infinity, (x, y) => antHill.getTile(x, y) != 0);

    if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT && cursorMode != CursorMode.Neutral && !game.canvasIgnoreInput) {
        const cursorRadius = 0.9;
        const chamber = antHill.getChamber(tileX, tileY);
        switch (cursorMode) {
            case CursorMode.Dig:
                if (data.tileCapacity.value > data.totalTiles.value){
                    if (Math.abs(x % cursorRadius) > placementThreshold && Math.abs(y % cursorRadius) > placementThreshold) {
                        if (antHill.getTile(tileX, tileY) != 0){
                            data.totalTiles.value += 1;
                        }
                        antHill.setTile(tileX, tileY, 0);
                        if (data.tutorialStep.value === TutorialStep.ExcavateTunnel){
                            data.tutorialStep.value += 1;
                        }
                    }
                }
                else{
                    notifications.noTilesLeft.show();
                }
                break;
            case CursorMode.Fill:
                if (Math.abs(x % cursorRadius) > placementThreshold && Math.abs(y % cursorRadius) > placementThreshold) {
                    if (antHill.getTile(tileX, tileY) != 1){
                        data.totalTiles.value -= 1;
                    }
                    antHill.setTile(tileX, tileY, 1);
                }
                break;
            case CursorMode.Queen:
                if (chamber != undefined) {
                    chamber.chamberType = ChamberType.Queen;
                }
                break;
            case CursorMode.Residential:
                if (chamber != undefined) {
                    chamber.chamberType = ChamberType.Residential;
                }
                break;
            case CursorMode.Farm:
                if (chamber != undefined) {
                    chamber.chamberType = ChamberType.Farm;
                }
                break;
            case CursorMode.Training:
                if (chamber != undefined) {
                    chamber.chamberType = ChamberType.Training;
                }
                break;
        }
        antHill.countTiles();
        if (data.queenTiles.value === 0){
            notifications.cannotRemoveQueen.show();
            antHill.setTile(tileX, tileY, 0);
            data.totalTiles.value += 1;
            antHill.getChamber(tileX, tileY)!.chamberType = ChamberType.Queen;
            antHill.countTiles();
        }
    }


    if (p5.keyIsPressed) {
        if (p5.keyIsDown(87) || p5.keyIsDown(38)){
            camera.move(0, p5.deltaTime * 2);
        }
        if (p5.keyIsDown(83) || p5.keyIsDown(40)){
            camera.move(0, -p5.deltaTime * 2);
        }
        if (p5.keyIsDown(68) || p5.keyIsDown(39)){
            camera.move(-p5.deltaTime * 2, 0);
        }
        if (p5.keyIsDown(65) || p5.keyIsDown(37)){
            camera.move(p5.deltaTime * 2, 0);
        }
    }

    antHill.draw();

    p5.pop();
}

export function mouseDragged(game: Game, event: MouseEvent) {
    const p5 = game.p5;
    const camera = game.camera;
    const cursorMode = game.cursorMode;

    if (p5.mouseButton === p5.CENTER || (p5.mouseButton === p5.LEFT && cursorMode === CursorMode.Neutral && !game.canvasIgnoreInput)) {
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
    else if (p5.keyIsDown(p5.ESCAPE)){
        console.log(game.gameData);
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

export function mouseReleased(game: Game) {
    game.canvasIgnoreInput = false;
}