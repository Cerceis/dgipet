import { Dialog } from "./Dialog.js";
var KeyboardController = /** @class */ (function () {
    function KeyboardController() {
        this.init();
    }
    KeyboardController.prototype.init = function () {
        document.body.addEventListener("keydown", function (e) {
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
    };
    return KeyboardController;
}());
export { KeyboardController };
