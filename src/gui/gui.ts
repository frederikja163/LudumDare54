import { ResourceDisplay } from "./resource_display";
import { BuildBtn } from "./build_btn";

export function initGui() {
    // ResourceBar
    resourceBarAdd(new ResourceDisplay("food", "../resources/gui/food_icon.png"));

    // BuildBar
    buildBarAdd(new BuildBtn("dig", "", () => { console.log("dig") }));
    buildBarAdd(new BuildBtn("fill", "", () => { console.log("fill") }));
}

function resourceBarAdd(resourceDisplay: ResourceDisplay) {
    const resourceBar = document.getElementById("resourceBar");
    resourceBar?.appendChild(resourceDisplay.containerElem);
}

function buildBarAdd(buildBtn: BuildBtn) {
    const buildBar = document.getElementById("buildBar");
    buildBar?.appendChild(buildBtn.buttonElem);
}
