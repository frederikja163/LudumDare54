import P5 from "p5";
import { AntHill } from "./data/ant_hill";
import { drawMarchingSquares } from "./marching_squares";
import { Game } from "./data/game";
import { Chamber } from "./data/chamber";
const placementThreshold = 0.2;

export function setup(game: Game) {
    const p5 = game.p5;

    p5.createCanvas(window.innerWidth - 4, window.innerHeight - 4, p5.WEBGL);
}

export function draw(game: Game){
    const p5 = game.p5;
    const antHill = game.antHill;
    const camera = game.camera;

    p5.background(0, 0, 0);
    camera.apply();
    const mouse = camera.getWorldCoords(p5.mouseX, p5.mouseY);
    const x = mouse.x + antHill.width / 2;
    const y = mouse.y + antHill.height / 2;
    p5.push();
    p5.translate(-antHill.width/2, -antHill.height/2);
    p5.noStroke();
    
    p5.fill(255, 255, 255);
    drawMarchingSquares(p5, antHill, camera, (x, y) => antHill.getTile(x, y) > 0);
    if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT && !p5.keyIsDown(p5.SHIFT) && !p5.keyIsDown(p5.CONTROL)){
        if (Math.abs(x % 1 - 0.5) > placementThreshold && Math.abs(y % 1 - 0.5) > placementThreshold){
            
            antHill.setTile(Math.round(x), Math.round(y), 1);
        }
        p5.fill(128, 255, 128, 200);
        p5.ellipse(Math.round(x), Math.round(y), 0.1, 0.1);
    }
    else if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT && p5.keyIsDown(p5.SHIFT) && !p5.keyIsDown(p5.CONTROL)){
        if (Math.abs(x % 1 - 0.5) > placementThreshold && Math.abs(y % 1 - 0.5) > placementThreshold){
            
            antHill.setTile(Math.round(x), Math.round(y), 0);
        }
        p5.fill(255, 128, 128, 200);
        p5.ellipse(Math.round(x), Math.round(y), 0.1, 0.1);
    }
    
    p5.fill(0, 0, 255);
    if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT && p5.keyIsDown(p5.CONTROL)){
        const chamber = new Chamber(antHill, Math.round(x), Math.round(y));
        chamber?.draw(p5, camera);
    }

    antHill.draw(p5, camera);

    p5.pop();
}

export function mouseDragged(game: Game, event: MouseEvent){
    const p5 = game.p5;
    const camera = game.camera;

    if (p5.mouseButton == p5.CENTER){
        camera.move(event.movementX, event.movementY);
    }
}

export function resize(game: Game){
    const p5 = game.p5;

    p5.resizeCanvas(window.innerWidth - 4, window.innerHeight - 4);
}

export function keyPressed(game: Game){
    const p5 = game.p5;
    const camera = game.camera;

    if (p5.keyIsDown(187 /*+*/)){
        camera.zoom(1.1);
    }
    else if (p5.keyIsDown(189) /*-*/){
        camera.zoom(1/1.1);
    }
}

