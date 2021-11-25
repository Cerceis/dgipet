export class ControlContainer {
    constructor(childs = [], style = "") {
        this.ele = document.createElement("div");
        this.ele.setAttribute("style", "display:grid; gap:.5em;" + style);
        childs.forEach(child => {
            this.ele.appendChild(child);
        });
    }
    add(childs) {
        childs.forEach(child => {
            this.ele.appendChild(child);
        });
    }
}
