enum Resource {
    Gold,
}

class ResourceCounter {
    container: HTMLElement;
    icon: HTMLElement;
    counter: HTMLElement;

    constructor(resource: Resource, iconPath: string) {
        this.container = document.createElement("div");

        this.icon = document.createElement("img");
        this.icon.src = iconPath;

        this.counter = document.createElement("p");

        this.container.appendChild(this.icon);
        this.container.appendChild(this.counter);
    }

    update(count: number) {
        this.counter.textContent = JSON.stringify(count);
    }
}