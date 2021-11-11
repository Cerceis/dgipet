export class ControlButton{
	public ele: HTMLButtonElement;
	constructor(label: string, icon: string = "", style: string = "", ){
		this.ele = document.createElement("button");
		this.ele.setAttribute(
			"style",
			`
				display:flex;
				justify-content:center;
				align-items:center;
				border-radius:.5em; 
				padding:.5em; 
				font-family:inherit; 
				font-size:100%; 
				width:100%;
				max-width:300px;
			` + style
		);
		if(icon){
			const iconEle = document.createElement("span");
			const labelEle = document.createElement("span");
			iconEle.innerHTML = icon;
			labelEle.innerHTML = label;
			labelEle.setAttribute("style", "width:100%;")
			this.ele.appendChild(iconEle)
			this.ele.appendChild(labelEle)
		}else{
			this.ele.innerHTML = label;
		}
	}
	public bindFunc(func: any): void{
		this.ele.onclick = func;
	}
}