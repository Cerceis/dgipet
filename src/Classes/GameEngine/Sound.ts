export class Sound{
	
	public ele: HTMLAudioElement = document.createElement("audio");
	public baseDir: string = "../../assets/sound-effects/generals/"

	constructor(src: string){
		this.ele.src = `${this.baseDir}${src}`;
		this.ele.style.display = "none";
		this.ele.setAttribute("preload", "auto");
		this.ele.setAttribute("controls", "none");
		this.ele.onended = () => document.body.removeChild(this.ele);
		document.body.appendChild(this.ele);
		this.ele.play();
	}
	
}