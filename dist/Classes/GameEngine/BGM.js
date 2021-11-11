export class BGM {
    constructor(src) {
        this.ele = document.createElement("audio");
        this.baseDir = "../../assets/BGM/";
        this.ele.src = `${this.baseDir}${src}`;
        this.ele.style.display = "none";
        this.ele.setAttribute("preload", "auto");
        this.ele.setAttribute("controls", "none");
        this.ele.setAttribute("loop", "true");
        this.ele.volume = 0.4;
        document.body.appendChild(this.ele);
        this.ele.play();
    }
    destory() {
        document.body.removeChild(this.ele);
    }
}
