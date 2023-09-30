import P5 from "p5";
import * as Sketch from "./sketch";
import { AntHill } from "./ant_hill";

function sketch(p5: P5){
    const antHill = new AntHill(25, 25);
    p5.setup = () => Sketch.setup(p5, antHill);

    p5.draw = () => Sketch.draw(p5, antHill);
    
    p5.mouseDragged = (event: MouseEvent) => Sketch.mouseDragged(p5, antHill, event);

    p5.keyPressed = () => Sketch.keyPressed(p5, antHill);

    window.addEventListener('resize', event => {
        Sketch.resize(p5, antHill);
    }, true);
}

new P5(sketch);
