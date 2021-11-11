import { Dialog } from "./Dialog.js";
export class KeyboardController {
    constructor() {
        this.init();
    }
    init() {
        document.body.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowUp":
                    e.preventDefault();
                    break;
                case "ArrowDown":
                    e.preventDefault();
                    break;
                case "ArrowLeft":
                    e.preventDefault();
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    break;
                case " ":
                    e.preventDefault();
                    Dialog.next();
                    break;
            }
        });
    }
}
