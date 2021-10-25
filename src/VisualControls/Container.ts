export class ControlContainer{
	public ele: HTMLDivElement = document.createElement("div");
	constructor(childs: HTMLElement[] = [], style: string = ""){
		this.ele.setAttribute(
			"style",
			"display:grid;"+style,
		);
		childs.forEach(child => {
			this.ele.appendChild(child)
		});
	}
	public add(childs: HTMLElement[]): void{
		childs.forEach(child => {
			this.ele.appendChild(child)
		});
	}
}