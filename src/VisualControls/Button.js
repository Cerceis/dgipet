var ControlButton = /** @class */ (function () {
    function ControlButton(label, style) {
        if (style === void 0) { style = ""; }
        this.ele = document.createElement("button");
        this.ele.textContent = label;
        this.ele.setAttribute("style", "border-radius:.5em; padding:.5em; font-family:inherit; font-size:20%;" + style);
    }
    ControlButton.prototype.bindFunc = function (func) {
        this.ele.onclick = func;
    };
    return ControlButton;
}());
export { ControlButton };