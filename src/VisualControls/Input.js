var ControlInput = /** @class */ (function () {
    function ControlInput(label, min, max) {
        this._label = "";
        this._label = label;
        this.ele = document.createElement("div");
        this.ele.innerText = this._label;
        this.ele_input = document.createElement("input");
        this.ele_input.setAttribute("placeholder", "your name...");
        min !== null && min !== void 0 ? min : this.ele_input.setAttribute("minlength", min.toString());
        max !== null && max !== void 0 ? max : this.ele_input.setAttribute("maxlength", max.toString());
        this.ele_input.setAttribute("style", "border-radius:.5em; padding:.5em; font-family:inherit;");
        this.ele.appendChild(this.ele_input);
    }
    ControlInput.prototype.bindEvent = function (evt, func) {
        this.ele_input.addEventListener(evt, func);
    };
    Object.defineProperty(ControlInput.prototype, "value", {
        get: function () {
            return this.ele_input.value;
        },
        enumerable: false,
        configurable: true
    });
    return ControlInput;
}());
export { ControlInput };
