import P5 from "p5";
import * as Sketch from "./sketch";
import { AntHill } from "./data/ant_hill";
import { Game } from "./data/game";

function sketch(p5: P5){
    const game = new Game(p5);
    p5.setup = () => Sketch.setup(game);

    p5.draw = () => Sketch.draw(game);
    
    p5.mouseDragged = (event: MouseEvent) => Sketch.mouseDragged(game, event);

    p5.keyPressed = () => Sketch.keyPressed(game);

    window.addEventListener('resize', event => {
        Sketch.resize(game);
    }, true);
}

new P5(sketch);
