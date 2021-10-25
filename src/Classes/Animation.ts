export class Animation{
	public ele: HTMLImageElement = document.createElement("img");
	private _size: number = 0;
	private _spriteName: string = "";
	private _sequence: string[] = []
	private _currentFrame: number = 0;
	constructor(
			size:number, // Sprite size (Should be in % for responsiveness)
			spriteName: string, //Folder name of the sprite
			spriteSequence: string[] // 000, 001, 002 ...
		){
		this._size = size;
		this._spriteName = spriteName;
		this._sequence = spriteSequence;
		this.ele.setAttribute("width", `${this._size}%`)
		//this.ele.height = this._size;
		this.init();
	}

	private init():void {
		this.ele.src = `../../assets/sprites/${this._spriteName}/${this._sequence[this._currentFrame]}.png`
	}
	public next(): void{
		this._currentFrame + 1 <= this._sequence.length-1 ? this._currentFrame ++ : this._currentFrame = 0;
		this.ele.src = `../../assets/sprites/${this._spriteName}/${this._sequence[this._currentFrame]}.png`
	}
	public setSprite(sprites: string[]): void{
		this._currentFrame = 0;
		this._sequence = sprites;
	}
}