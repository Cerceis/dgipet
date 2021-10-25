export class ControlButton{
	public ele: HTMLButtonElement;
	constructor(label: string, style: string = ""){
		this.ele = document.createElement("button");
		this.ele.textContent = label;
		this.ele.setAttribute(
			"style",
			"border-radius:.5em; padding:.5em; font-family:inherit; font-size:20%;" + style
		);
	}
	public bindFunc(func: any): void{
		this.ele.onclick = func;
	}
}