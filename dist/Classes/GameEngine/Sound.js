export class Sound {
    constructor(src) {
        this.ele = document.createElement("audio");
        this.baseDir = "../../assets/sound-effects/generals/";
        this.ele.src = `${this.baseDir}${src}`;
        this.ele.style.display = "none";
        this.ele.setAttribute("preload", "auto");
        this.ele.setAttribute("controls", "none");
        this.ele.onended = () => document.body.removeChild(this.ele);
        document.body.appendChild(this.ele);
        this.ele.play();
    }
}
