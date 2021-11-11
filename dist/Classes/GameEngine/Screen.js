var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GenerateObjectId } from "../../lib/GenerateObjectId.js";
import { gsap } from "../../../exlib/GSAP/index.js";
/****************************************Types and Interfaces***************************************/
export class ScreenClass {
    constructor() {
        this.ele = document.createElement('div');
        this.listOfChildElement = [];
        const eleStyle = `
			width: 100%;
			height: 100%;
			position:absolute;
			border: 1px dashed #747474;
			border-radius: .5em;
			overflow: hidden;
		`;
        this.ele.setAttribute("style", eleStyle);
    }
    bind(parent) {
        this.parent = parent;
        this.parent.appendChild(this.ele);
    }
    draw(child, x, y, tags = [], noTranslate = false) {
        //x, y as percentage
        const childId = GenerateObjectId();
        child.setAttribute("id", childId);
        if (noTranslate)
            gsap.set(child, { position: "absolute", left: `${x}%`, top: `${y}%` });
        else
            gsap.set(child, { position: "absolute", x: `${-x}%`, y: `${-y}%`, left: `${x}%`, top: `${y}%` });
        this.listOfChildElement.push({
            id: childId,
            tags: tags,
            ele: child,
        });
        this.ele.appendChild(child);
    }
    delete(tags = null) {
        if (!tags)
            this.ele.innerHTML = "";
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
    }
    destory() {
        this.parent.removeChild(this.ele);
    }
    delay(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    pipe(pipelineActions) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            for (let pipe of pipelineActions) {
                const action = Object.keys(pipe)[0];
                const params = pipe[Object.keys(pipe)[0]];
                switch (action) {
                    case "draw":
                        this[action](params.child, params.x, params.y, (_a = params.tags) !== null && _a !== void 0 ? _a : []);
                        yield this.delay(300);
                        break;
                    case "delay":
                        yield this[action](params.ms);
                        break;
                }
            }
        });
    }
}
export const Screen = new ScreenClass();
/*
    await Screen.pipe([
        {
            move: { tags: ["startBtn"], x:20, y:30 },
        },
        {
            move: { tags: ["testBtn"], x:50, y:77 },
        },
    ])
*/ 
