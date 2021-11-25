import { GenerateObjectId } from "../../lib/GenerateObjectId.js";
class ControllerClass {
    constructor() {
        this.ele = document.createElement('div');
        this.listOfChildElement = [];
        this.ele.style.display = "grid";
        this.ele.style.gap = ".5em";
        this.ele.style.justifyItems = "center";
        this.ele.style.gridTemplateColumns = "1fr";
        this.ele.style.transition = "all .3s";
    }
    bind(parent) {
        parent.appendChild(this.ele);
    }
    setColCount(colCount) {
        this.ele.style.gridTemplateColumns = `repeat(${colCount}, 1fr)`;
    }
    add(childs, tags = []) {
        childs.forEach(child => {
            const childId = GenerateObjectId();
            this.listOfChildElement.push({
                id: childId,
                tags: tags,
                ele: child,
            });
            this.ele.appendChild(child);
        });
    }
    delete(tags = null) {
        if (Array.isArray(tags)) {
            if (tags.length > 0) {
                this.listOfChildElement.forEach(child => {
                    let targeted = false;
                    tags.forEach(tag => {
                        targeted = child.tags.some(childTag => childTag === tag);
                    });
                    if (targeted) {
                        this.ele.removeChild(child.ele);
                    }
                });
            }
        }
        else {
            this.listOfChildElement = [];
            this.ele.innerHTML = "";
        }
    }
    hide(hide = true) {
        if (hide)
            this.ele.style.display = "none";
        else
            this.ele.style.display = "grid";
    }
}
export const Controller = new ControllerClass();
