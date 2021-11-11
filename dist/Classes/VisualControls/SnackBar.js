import { GenerateObjectId } from "../../lib/GenerateObjectId.js";
class _Snackbar {
    constructor(title, content, top = "0px") {
        this.ele = document.createElement("div");
        const eleStyle = `
			position:fixed;
			top:${top};
			right:0;
			width:200px;
			height:100px;
			margin:1em;
			word-break: break-word;
			line-height:16px;
			overflow: hidden;
			transition: all .2s;
			background: url("./assets/images/WoodenBoard.png") no-repeat 0 0;
			z-index: 10;
		`;
        this.ele.setAttribute("style", eleStyle);
        this.ele.classList.toggle("slide-in-right", true);
        const titleEle = document.createElement("div");
        const titleEleStyle = `
			font-size:12px;
			padding-top: .7em;
			padding-bottom: .2em;
			padding-left: .8em;
			padding-right: .8em;
			white-space: nowrap;
		`;
        titleEle.setAttribute("style", titleEleStyle);
        titleEle.innerHTML = title;
        const hrEle = document.createElement("hr");
        const hrEleStyle = `
			width: 180px;
			margin: 0 9px;
			opacity: .2;
		`;
        hrEle.setAttribute("color", "lightgray");
        hrEle.setAttribute("style", hrEleStyle);
        const innerEle = document.createElement("div");
        const innerEleStyle = `
			display: flex;
			align-items: center;
			font-size:8px;
			padding-bottom: .3em;
			padding-left: 1.3em;
			padding-right: 1.3em;
			overflow: hidden;
			height: 70px;
		`;
        innerEle.setAttribute("style", innerEleStyle);
        innerEle.innerHTML = content;
        this.ele.appendChild(titleEle);
        this.ele.appendChild(hrEle);
        this.ele.appendChild(innerEle);
    }
}
export class ControlSnackbar {
    constructor() {
        this._queue = [];
    }
    add(title = "", content = "", life = 0) {
        const newId = GenerateObjectId();
        const tmp = new _Snackbar(title, content, this._queue.length > 0 ? `${(this._queue.length * 108)}px` : `0px`);
        this._queue.push({
            id: newId,
            data: tmp
        });
        document.body.appendChild(tmp.ele);
        if (life > 0) {
            setTimeout(() => {
                tmp.ele.classList.toggle("slide-out-left", true);
                setTimeout(() => {
                    const targetIndex = this._queue.findIndex((ele) => ele.id === newId);
                    this._queue.splice(targetIndex, 1);
                    document.body.removeChild(tmp.ele);
                    //Move next child up
                    if (this._queue.length > 0) {
                        const remainingQueue = this._queue.length;
                        for (let i = 0; i < remainingQueue; i++)
                            this._queue[i].data.ele.style.top = `${Number(this._queue[i].data.ele.style.top.split("px")[0]) - 108}px`;
                    }
                }, 200); //Side out animation time 
            }, life);
        }
    }
}
export const Snackbar = new ControlSnackbar();
