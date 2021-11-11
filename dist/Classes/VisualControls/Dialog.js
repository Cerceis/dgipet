export class ControlDialog {
    constructor(innerContent) {
        this.ele = document.createElement('div');
        //Main container
        const eleStyle = `
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
        const innerCon_Style = `
			position:relative;
			min-width:300px;
			min-height:200px;
			max-width: 600px;
			border:1px solid white;
			border-radius:.5em;
			background:rgba(35,35,55, .9);
			padding: .5em;
		`;
        const innerCon = document.createElement("div");
        innerCon.setAttribute("style", innerCon_Style);
        //Close button
        const closeBtnStyle = `
			position:absolute;
			top:1em;
			right:1em;
			cursor:pointer;
		`;
        const closeBtn = document.createElement("span");
        closeBtn.setAttribute("style", closeBtnStyle);
        closeBtn.innerHTML = `<i-con name="close"></i-con>`;
        //Events
        this.ele.onclick = () => { this.close(); };
        innerCon.onclick = (e) => { e.stopPropagation(); };
        closeBtn.onclick = () => { this.close(); };
        if (innerContent)
            innerCon.innerHTML = innerContent;
        innerCon.appendChild(closeBtn);
        this.ele.appendChild(innerCon);
    }
    open() { document.body.appendChild(this.ele); }
    close() { document.body.removeChild(this.ele); }
}
