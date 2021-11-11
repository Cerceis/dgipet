export class ControlInput {
    constructor(label, min, max) {
        this._label = "";
        this._label = label;
        this.ele = document.createElement("div");
        this.ele.style.display = "grid";
        this.ele.style.margin = ".5em 0";
        const text = document.createElement("span");
        text.textContent = this._label;
        this.ele.appendChild(text);
        this.ele_input = document.createElement("input");
        this.ele_input.setAttribute("placeholder", "your name...");
        min !== null && min !== void 0 ? min : this.ele_input.setAttribute("minlength", min.toString());
        max !== null && max !== void 0 ? max : this.ele_input.setAttribute("maxlength", max.toString());
        this.ele_input.setAttribute("style", "border-radius:.5em; padding:.5em; font-family:inherit;");
        this.ele.appendChild(this.ele_input);
    }
    bindEvent(evt, func) {
        this.ele_input.addEventListener(evt, func);
    }
    get value() {
        return this.ele_input.value;
    }
}
