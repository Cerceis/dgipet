export class ControlDialog {

	public ele: HTMLDivElement = document.createElement('div');

	constructor(innerContent?: string){
		//Main container
		const eleStyle: string = `
			display:grid;
			justify-content:center;
			align-items:center;
			position:fixed;
			z-index:2;
			top:0;
			left:0;
			height:100vh;
			width:100vw;
		`;
		this.ele.setAttribute("style", eleStyle);
		this.ele.setAttribute("class", "scale-in-center");

		//Inner container
		const innerCon_Style: string = `
			position:relative;
			min-width:300px;
			min-height:200px;
			max-width: 600px;
			border:1px solid white;
			border-radius:.5em;
			background:rgba(35,35,55, .9);
			padding: .5em;
		`;
		const innerCon: HTMLDivElement = document.createElement("div");
		innerCon.setAttribute("style", innerCon_Style);

		//Close button
		const closeBtnStyle: string = `
			position:absolute;
			top:1em;
			right:1em;
			cursor:pointer;
		`;
		const closeBtn: HTMLSpanElement = document.createElement("span");
		closeBtn.setAttribute("style", closeBtnStyle);
		closeBtn.innerHTML = `<i-con name="close"></i-con>`;

		//Events
		this.ele.onclick = () => { this.close() };
		innerCon.onclick = (e) =>{ e.stopPropagation() };
		closeBtn.onclick = () => { this.close() };

		if(innerContent)
			innerCon.innerHTML = innerContent;
		innerCon.appendChild(closeBtn);
		this.ele.appendChild(innerCon);
	
	}

	public open(): void{ document.body.appendChild(this.ele) }
	public close(): void{ document.body.removeChild(this.ele) }
}