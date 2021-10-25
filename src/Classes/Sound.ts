export class Sound{
	
	public ele: HTMLAudioElement = document.createElement("audio");

	constructor(src: string){
		this.ele.src = src;
		this.ele.style.display = "none";
		this.ele.setAttribute("preload", "auto");
		this.ele.setAttribute("controls", "none");
		this.ele.onended = () => document.body.removeChild(this.ele);
		document.body.appendChild(this.ele);
		this.ele.play();
	}
	
}