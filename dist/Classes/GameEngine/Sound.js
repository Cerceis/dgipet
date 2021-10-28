var Sound = /** @class */ (function () {
    function Sound(src) {
        var _this = this;
        this.ele = document.createElement("audio");
        this.baseDir = "../../assets/sound-effects/generals/";
        this.ele.src = "" + this.baseDir + src;
        this.ele.style.display = "none";
        this.ele.setAttribute("preload", "auto");
        this.ele.setAttribute("controls", "none");
        this.ele.onended = function () { return document.body.removeChild(_this.ele); };
        document.body.appendChild(this.ele);
        this.ele.play();
    }
    return Sound;
}());
export { Sound };
