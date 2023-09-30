import { ResourceDisplay } from "./resource_display";

export function initGui() {
    let resourceBar = document.getElementById("resourceBar");

    let foodDisplay = new ResourceDisplay("../assets/gui/food_icon.png");
    foodDisplay.counter = 1000;

    resourceBar?.appendChild(foodDisplay.containerElem);
}
