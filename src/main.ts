import P5 from "p5";
import * as Sketch from "./sketch";
import { AntHill } from "./ant_hill";
import { Ui } from "./ui";

function sketch(p5: P5) {
    const antHill = new AntHill();
    p5.setup = () => Sketch.setup(p5, antHill);

    p5.draw = () => Sketch.draw(p5, antHill);

    window.addEventListener('resize', event => {
        Sketch.resize(p5, antHill);
    }, true);

    ui: Ui = new Ui();
    ui.addResourceBar();
}

new P5(sketch);
