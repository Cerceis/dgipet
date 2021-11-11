import { GenerateObjectId } from "../../lib/GenerateObjectId.js";
export class Animation {
    constructor(size, // Sprite size (Should be in % for responsiveness)
    spriteName, //Folder name of the sprite
    spriteSequence, // 000, 001, 002 ...
    id //Id to prevent duplicates, otherwise will just auto generates one.
    ) {
        this.ele = document.createElement("img");
        this._size = 0;
        this._spriteName = "";
        this._sequence = [];
        this._currentFrame = 0;
        this._baseDir = "../../assets/sprites/";
        if (!id)
            this.id = GenerateObjectId();
        else
            this.id = id;
        this._size = size;
        this._spriteName = spriteName;
        this._sequence = spriteSequence;
        this.ele.setAttribute("width", `${this._size}%`);
        this.init();
    }
    init() {
        this.ele.src = `${this._baseDir}${this._spriteName}/${this._sequence[this._currentFrame]}.png`;
    }
    next() {
        this._currentFrame + 1 <= this._sequence.length - 1 ? this._currentFrame++ : this._currentFrame = 0;
        this.ele.src = `${this._baseDir}${this._spriteName}/${this._sequence[this._currentFrame]}.png`;
    }
    setSprite(sprites) {
        this._currentFrame = 0;
        this._sequence = sprites;
    }
}
