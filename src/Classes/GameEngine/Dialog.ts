type GlossaryType = "text" | "function"
interface Glossary{
	tag: string,
	type: GlossaryType,
	value: any
}
//Static Class
export class Dialog{
	static _renderSpeed: number = 50;
	static dialogs: string[] = [];
	static glossaries: Glossary[] = [];
	static currentDialog: number = 0;
	static breakDialog: boolean = false;
	static rendering: boolean = false;
	static dialogEnded: boolean = false;
	static renderEventList: any = {};
	static autoPlay: boolean = false;

	static ele: HTMLDivElement = document.createElement("div");
	static ele_text: HTMLDivElement = document.createElement("div");
	static ele_sound: HTMLAudioElement = document.createElement("audio");
	static ele_dialogCursor: HTMLImageElement = document.createElement("img");
	//static ele_layer: HTMLDivElement = document.createElement("div");
	static ele_autoPlay: HTMLButtonElement = document.createElement("button");

	constructor(){
		Dialog.ele.style.transition = "all .3s";
		Dialog.ele.style.width = "100%";
		Dialog.ele.style.height = "100%";
		Dialog.ele.style.zIndex = "2";
		//Add a layer so player won't be able to select text;
		Dialog.ele_autoPlay.textContent = "Auto";
		Dialog.ele_autoPlay.setAttribute("style",`
			position:absolute;
			top:-20px; right:0;
		`);
		Dialog.ele.appendChild(Dialog.ele_autoPlay);
		//
		const ele_textStyle: string = `
			position:absolute; height:100%; 
			padding:1.5em; border-radius:.5em;
			width:100%; background:rgba(77,77,77,.7); 
			box-sizing:border-box; overflow-y:scroll;
			font-size: min(24px, 1.5vw);
		`;
		Dialog.ele_text.setAttribute("style", ele_textStyle);
		Dialog.ele.appendChild(Dialog.ele_text);
		//Insert dialog cursor
		const ele_dialogCursorStyle: string = "position:absolute; bottom:-1.5em; right:0;";
		Dialog.ele_dialogCursor.setAttribute("style", ele_dialogCursorStyle);
		Dialog.ele_dialogCursor.src = "../../assets/visuals/dialogCursor.gif";
		Dialog.ele.appendChild(Dialog.ele_dialogCursor);
		//Create sound effect;
		Dialog.ele_sound.src = "../../assets/sound-effects/generals/dialog.wav";
		Dialog.ele_sound.setAttribute("preload", "auto");
		Dialog.ele_sound.setAttribute("controls", "none");
		Dialog.ele_sound.setAttribute("loop", "true");
		Dialog.ele_sound.style.display = "none";
		document.body.appendChild(Dialog.ele_sound);
		//Set click events
		this.initEvents();
	}
	static setDialog(dialogs: string[], autoStart: boolean = true): void{
		this.currentDialog = 0;
		this.dialogs = dialogs;
		this.dialogEnded = false;
		if(autoStart) Dialog.render();
	}
	static clear(): void{
		this.currentDialog = 0;
		this.dialogs = [];
		this.dialogEnded = false;
		this.ele_text.textContent = ""; 
	}
	static delay(tick: number): Promise<void>{
		return new Promise((resolve) => {
			setTimeout(()=>{
				resolve()
			}, tick)	
		})
	}
	private initEvents(): void{
		Dialog.ele_text.onclick = this.next;
		Dialog.ele_autoPlay.onclick = () =>{ 
			Dialog.autoPlay = !Dialog.autoPlay;
			if(Dialog.autoPlay && !Dialog.rendering)
				_dialog.next();
			else if(Dialog.autoPlay && Dialog.rendering)
				Dialog.breakDialog = true;
			if(Dialog.autoPlay)
				Dialog.ele_autoPlay.style.boxShadow = "0 0 5px inset blue";
			else Dialog.ele_autoPlay.style.boxShadow = "";
		}
	}
	static async render(): Promise<void>{
		this.toggleCursor(true);
		this.ele_text.textContent = ""; 
		let targetDialog = this.dialogs[this.currentDialog];
		targetDialog = Dialog.parser(targetDialog);
		this.rendering = true;
		this.ele_sound.play();
		for(let i = 0; i < targetDialog.length ; i++){
			if(this.renderEventList[i] && this.renderEventList[i].value)
				this.renderEventList[i].value()
			this.ele_text.textContent += targetDialog[i]; 
			await this.delay(this._renderSpeed)
			if(this.breakDialog) break;
		}		
		this.ele_sound.pause();
		//Render full text when broke out
		if(this.breakDialog){
			this.ele_text.textContent = targetDialog;
		}
		this.breakDialog = false;
		this.rendering = false;
		this.renderEventList = {};
		if(this.autoPlay) {
			await this.delay(2000)
			_dialog.next();
		}
	}
	public next(): void{
		if(Dialog.rendering){
			Dialog.breakDialog = true
		}else{
			if(Dialog.currentDialog + 1 <= Dialog.dialogs.length - 1 ){
				Dialog.currentDialog++ 
				Dialog.render()
			}else{
				Dialog.dialogEnded = true;
				Dialog.toggleCursor(false);
			}
		}
	}
	static next(): void{
		_dialog.next()
	}
	static untilEnd(): Promise<void>{
		let flagCheckInterval: any;
		return new Promise((resolve)=>{
			flagCheckInterval = setInterval(()=>{
				if(Dialog.dialogEnded){
					clearInterval(flagCheckInterval);
					resolve()
				}
			}, 100)
		})
	}
	static toggleCursor(state: boolean): void{
		state ? Dialog.ele_dialogCursor.style.display = "block" : Dialog.ele_dialogCursor.style.display = "none";
	}
	static setHeight(height: number): void{
		Dialog.ele.style.height = `${height}%`;
	}
	static addGlossary(glossaries: Glossary[]): void{
		Dialog.glossaries = [...Dialog.glossaries, ...glossaries];
	}
	static parser(dialog: string): string{
		let tagMap: any = {};
		let tagFound: boolean = false;
		let validTag: boolean = false;
		let currentCommandIndex: number = 0;
		let currentCommandTag: string[] = [];

		let parsingGlossary: Glossary[] = [];

		function isValidDecorator(input: string): boolean{
			const decorators = ["#", "@"]
			if(decorators.includes(input)) return true
			return false
		}
		
		for(let i = 0; i<dialog.length ; i++){
			const currentValue = dialog[i]
			if(tagFound && !validTag && !isValidDecorator(currentValue)){
				tagFound = false;
				validTag = false;
				currentCommandTag = []
				currentCommandIndex = 0;
			}
			if(tagFound && isValidDecorator(currentValue)){
				validTag = true;
			}
			if(tagFound && currentValue === " "){
				currentCommandTag = currentCommandTag.slice(2, currentCommandTag.length)
				const tag = currentCommandTag.join("")
				const targetGlossary = this.glossaries.filter(glo => glo.tag === tag)[0]
				parsingGlossary.push(targetGlossary);
				tagMap[tag] = 
				tagFound = false;
				validTag = false;
			}
			if(currentValue === "[") {
				currentCommandIndex = i;
				tagFound = true;
			};
			if(tagFound){
				currentCommandTag.push(currentValue)
			}
		}

		if(!parsingGlossary) return dialog
		parsingGlossary.forEach(glo => {
			if(glo.type === "text"){
				dialog = dialog.replace(`[#${glo.tag}`, glo.value);
			}
			if(glo.type === "function"){
				const startIndex = dialog.indexOf(`[@${glo.tag}`)
				const eventIndex = startIndex - 1 >= 0 ? startIndex - 1 : 0;
				this.renderEventList[eventIndex] = glo;
				dialog = dialog.replace(`[@${glo.tag}`, "");
			}
		});
		return dialog		
	}
}
const _dialog = new Dialog();