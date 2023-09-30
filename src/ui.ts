import { ResourceBar } from "./resource_bar";

class Ui {
    constructor() {

    }

    addResourceBar() {
        goldCounter = new ResourceCounter(Resource.Gold, "nah");

        resourceBar = new ResourceBar();
        resourceBar.addCounter(goldCounter);

        document.body.appendChild(resourceBar.container);
    }
}
