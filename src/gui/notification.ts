export class Notification {
    private title: string;
    private message: string;
    private readonly notiElem: HTMLDivElement;
    private readonly titleElem: HTMLParagraphElement;
    private readonly messageElem: HTMLParagraphElement;

    constructor(title: string, message: string) {
        this.title = title;
        this.message = message;

        this.notiElem = document.createElement("div");
        this.notiElem.style.opacity = "0";

        this.titleElem = document.createElement("p");
        this.titleElem.className += "title";
        this.titleElem.textContent = this.title;

        this.messageElem = document.createElement("p");
        this.messageElem.className += "message";
        this.messageElem.textContent = this.message;

        this.notiElem.appendChild(this.titleElem);
        this.notiElem.appendChild(this.messageElem);
    }

    private hide() {
        this.notiElem.style.opacity = "0";

        setTimeout(() => { this.notiElem.style.display = "none" }, 500);
    }

    public show(duration: number = 10) {
        const notiContElem = document.getElementById("notiCont");
        notiContElem?.appendChild(this.notiElem);

        setTimeout(() => { this.notiElem.style.opacity = "1" }, 1);

        setTimeout(() => { this.hide() }, duration * 1000);
    }
}