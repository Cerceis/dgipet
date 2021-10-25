import { GenerateObjectId } from "../lib/GenerateObjectId.js"
/****************************************Types and Interfaces***************************************/
interface ChildElement {
	id: string,
	tags: string[],
	ele: HTMLElement,
}

interface PipeDrawParams{
	child: HTMLElement,
	x: number,
	y: number,
	tags?: string[]
}
interface PipeMoveParams{
	tags: string[],
	x: number,
	y: number,
}
interface PipeDelayParams{
	ms: number
}

interface Pipeline {
	"draw"?: PipeDrawParams,
	"move"?: PipeMoveParams,
	"delay"?: PipeDelayParams,
}

/****************************************Types and Interfaces***************************************/

const transitionSpeed: string = ".3s";

class ScreenClass{

	public ele: HTMLDivElement = document.createElement('div');
	public listOfChildElement: ChildElement[] = [];

	constructor(){
		const eleStyle = `
			width: 100%;
			height: 100%;
			position:absolute;
			border: 1px dashed #747474;
			border-radius: .5em;
		`;
		this.ele.setAttribute("style", eleStyle)
	}	

	public bind(parent: HTMLElement): void{
		parent.appendChild(this.ele);
	}

	public draw(child: HTMLElement, x: number, y: number, tags: string[] = []): void{
		//x, y as percentage
		const childId = GenerateObjectId();
		child.setAttribute("id", childId);
		child.style.position = "absolute";
		child.style.transition = `transform ${transitionSpeed}, top ${transitionSpeed}, left ${transitionSpeed}`;
		child.style.top = `${y}%`;
		child.style.left = `${x}%`;
		child.style.transform = `translate(${-x}%, ${-y}%)`;
		this.listOfChildElement.push({
			id: childId,
			tags: tags,
			ele: child,
		})
		this.ele.appendChild(child)
	}

	public delete(tags: string[] = null): void{
		if(!tags) this.ele.innerHTML = "";
		if(Array.isArray(tags)){
			if(tags.length > 0){
				this.listOfChildElement.forEach(child => {
					let targeted: boolean = false
					tags.forEach(tag => {
						targeted = child.tags.some(childTag => childTag === tag)
					});
					if(targeted){
						this.ele.removeChild(child.ele);
					}
				})	
			}
		}
	}

	public move(tags: string[], x: number, y:number): void{
		const targetedChilds = this.listOfChildElement.filter(child => {
			return tags.some(tag => child.tags.includes(tag));
		})	
		targetedChilds.forEach(child => {
			child.ele.style.top = `${y}%`;
			child.ele.style.left = `${x}%`;
			child.ele.style.transform = `translate(${-x}%, ${-y}%)`;
		})
	}

	public delay(ms: number): Promise<void>{
		return new Promise((resolve)=>{
			setTimeout(resolve, ms)	
		})
	}

	public async pipe(pipelineActions: Pipeline[]): Promise<void>{	
		for(let pipe of pipelineActions){
			const action = Object.keys(pipe)[0];
			const params = pipe[Object.keys(pipe)[0]];
			switch(action){
				case "draw":
					this[action](params.child, params.x, params.y, params.tags ?? []);
					await this.delay(300);
					break
				case "move":
					this.move(params.tags, params.x, params.y);
					await this.delay(300);
					break
				case "delay":
					await this[action](params.ms);
					break
			}
		}
	}
}

export const Screen = new ScreenClass();

/*
	await Screen.pipe([
		{
			move: { tags: ["startBtn"], x:20, y:30 },
		},
		{
			move: { tags: ["testBtn"], x:50, y:77 },
		},
	])
*/