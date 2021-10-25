var Animation = /** @class */ (function () {
    function Animation(size, // Sprite size (Should be in % for responsiveness)
    spriteName, //Folder name of the sprite
    spriteSequence // 000, 001, 002 ...
    ) {
        this.ele = document.createElement("img");
        this._size = 0;
        this._spriteName = "";
        this._sequence = [];
        this._currentFrame = 0;
        this._size = size;
        this._spriteName = spriteName;
        this._sequence = spriteSequence;
        this.ele.setAttribute("width", this._size + "%");
        //this.ele.height = this._size;
        this.init();
    }
    Animation.prototype.init = function () {
        this.ele.src = "../../assets/sprites/" + this._spriteName + "/" + this._sequence[this._currentFrame] + ".png";
    };
    Animation.prototype.next = function () {
        this._currentFrame + 1 <= this._sequence.length - 1 ? this._currentFrame++ : this._currentFrame = 0;
        this.ele.src = "../../assets/sprites/" + this._spriteName + "/" + this._sequence[this._currentFrame] + ".png";
    };
    Animation.prototype.setSprite = function (sprites) {
        this._currentFrame = 0;
        this._sequence = sprites;
    };
    return Animation;
}());
export { Animation };
