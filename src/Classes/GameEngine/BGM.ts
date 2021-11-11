export class BGM{
	
	public ele: HTMLAudioElement = document.createElement("audio");
	public baseDir: string = "../../assets/BGM/"

	constructor(src: string){
		this.ele.src = `${this.baseDir}${src}`;
		this.ele.style.display = "none";
		this.ele.setAttribute("preload", "auto");
		this.ele.setAttribute("controls", "none");
		this.ele.setAttribute("loop", "true");
		this.ele.volume = 0.4;
		document.body.appendChild(this.ele);
		this.ele.play();
	}
	
	public destory(): void {
		document.body.removeChild(this.ele);
	}
	
}