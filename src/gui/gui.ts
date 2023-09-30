import { ResourceDisplay } from "./resource_display";
import { BuildBtn } from "./build_btn";
import { CursorMode, Game } from "../data/game";

export function initGui(game: Game) {
    // ResourceBar
    resourceBarAdd(new ResourceDisplay("food", "../assets/gui/food_icon.png"));

    // BuildBar
    buildBarAdd(new BuildBtn("dig", "../assets/gui/dig_icon.png", () => { game.cursorMode = CursorMode.Dig }));
    buildBarAdd(new BuildBtn("fill", "../assets/gui/fill_icon.png", () => { game.cursorMode = CursorMode.Fill }));
}

function resourceBarAdd(resourceDisplay: ResourceDisplay) {
    const resourceBar = document.getElementById("resourceBar");
    resourceBar?.appendChild(resourceDisplay.containerElem);
}

function buildBarAdd(buildBtn: BuildBtn) {
    const buildBar = document.getElementById("buildBar");
    buildBar?.appendChild(buildBtn.buttonElem);
}
