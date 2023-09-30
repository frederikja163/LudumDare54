import { ResourceCounter } from "./resource_counter";

class ResourceBar {
    container: HTMLElement;

    constructor() {
        this.container = document.createElement("div");
    }

    addCounter(counter: ResourceCounter) {
        this.container.appendChild(counter.container);
    }
}