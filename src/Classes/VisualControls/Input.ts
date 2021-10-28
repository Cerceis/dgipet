export class ControlInput{
	private _label: string ="";
	public ele: HTMLDivElement;
	public ele_input: HTMLInputElement;
	constructor(label: string, min?: number, max?: number){
		this._label = label
		this.ele = document.createElement("div");
		this.ele.style.display = "grid";
		this.ele.style.margin = ".5em 0";
		const text = document.createElement("span")
		text.textContent = this._label
		this.ele.appendChild(text);
		this.ele_input = document.createElement("input");
		this.ele_input.setAttribute("placeholder","your name...")
		min ?? this.ele_input.setAttribute("minlength", min.toString());
		max ?? this.ele_input.setAttribute("maxlength", max.toString());
		this.ele_input.setAttribute(
			"style",
			"border-radius:.5em; padding:.5em; font-family:inherit;"
		);
		this.ele.appendChild(this.ele_input);
	}
	
	public bindEvent(evt: string, func: any): void{
		this.ele_input.addEventListener(evt, func);
	}

 	get value(): string{
		return this.ele_input.value;
	}

}