export class ControlInput{
	private _label: string ="";
	public ele: HTMLDivElement;
	public ele_input: HTMLInputElement;
	constructor(label: string, min?: number, max?: number){
		this._label = label
		this.ele = document.createElement("div");
		this.ele.innerText = this._label;
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