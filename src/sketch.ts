import P5 from "p5";
import { AntHill } from "./data/ant_hill";
import { drawMarchingSquares } from "./marching_squares";
import { Game } from "./data/game";
import { Chamber } from "./data/chamber";
const placementThreshold = 0.2;

export function preload(game: Game): void {
    const p5 = game.p5;
    const assetList = game.assetList;

    for (const path of assetList.dirtPaths){
        assetList.dirt.push(p5.loadImage(path))
    }
}

export function setup(game: Game) {
    const p5 = game.p5;

    p5.createCanvas(window.innerWidth - 4, window.innerHeight - 4, p5.WEBGL);
}

export function draw(game: Game) {
    const p5 = game.p5;
    const antHill = game.antHill;
    const camera = game.camera;
    const assetList = game.assetList;

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

    const point1 = camera.getWorldCoords(0, 0);
    const point2 = camera.getWorldCoords(p5.width, p5.height);
    const minX = Math.max(1, Math.round(point1.x + antHill.width / 2));
    const maxX = Math.min(antHill.width, Math.round(point2.x + antHill.width / 2 + 2));
    const minY = Math.max(1, Math.round(point1.y + antHill.height / 2));
    const maxY = Math.min(antHill.height, Math.round(point2.y + antHill.height / 2 + 2));
    drawMarchingSquares(game, assetList.dirt, minX, maxX, minY, maxY, (x, y) => antHill.getTile(x, y) > 0);
    if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT && !p5.keyIsDown(p5.SHIFT) && !p5.keyIsDown(p5.CONTROL)){
        if (Math.abs(x % 1 - 0.5) > placementThreshold && Math.abs(y % 1 - 0.5) > placementThreshold){
            
            antHill.setTile(Math.round(x), Math.round(y), 1);
        }
        p5.fill(128, 255, 128, 200);
        p5.ellipse(Math.round(x), Math.round(y), 0.1, 0.1);
    }
    else if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT && p5.keyIsDown(p5.SHIFT) && !p5.keyIsDown(p5.CONTROL)){
        antHill.setTile(Math.round(x), Math.round(y), 0);
        p5.fill(255, 128, 128, 200);
        p5.ellipse(Math.round(x), Math.round(y), 0.1, 0.1);
    }

    p5.fill(0, 0, 255);
    if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT && p5.keyIsDown(p5.CONTROL)){
        const chamber = new Chamber(this.game, Math.round(x), Math.round(y));
        chamber?.draw();
    }

    antHill.draw();

    p5.pop();
}

export function mouseDragged(game: Game, event: MouseEvent) {
    const p5 = game.p5;
    const camera = game.camera;

    if (p5.mouseButton == p5.CENTER) {
        camera.move(event.movementX, event.movementY);
    }
}

export function resize(game: Game) {
    const p5 = game.p5;

    p5.resizeCanvas(window.innerWidth - 4, window.innerHeight - 4);
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

