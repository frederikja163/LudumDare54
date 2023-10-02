import P5 from "p5";
import * as Sketch from "./sketch";
import { AntColony } from "./data/ant_colony";
import { Game } from "./data/game";
import * as Gui from "./gui/gui_main";
import * as Gameplay from "./gameplay";

function sketch(p5: P5) {
    const game = new Game(p5);
    p5.preload = () => Sketch.preload(game)

    p5.setup = () => Sketch.setup(game);

    p5.draw = () => Sketch.draw(game);

    p5.mouseDragged = (event: MouseEvent) => Sketch.mouseDragged(game, event);

    p5.keyPressed = () => Sketch.keyPressed(game);

    p5.mouseWheel = (event: WheelEvent) => Sketch.mouseWheel(game, event);

    p5.mouseReleased = () => Sketch.mouseReleased(game);

    window.addEventListener('resize', event => {
        Sketch.resize(game);
    }, true);

    document.addEventListener('contextmenu', event => event.preventDefault());

    Gui.initGui(game);

    Gameplay.initGameplay(game);
}

new P5(sketch);
