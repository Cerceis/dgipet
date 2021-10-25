import { GenerateObjectId } from "../lib/GenerateObjectId.js"

interface ChildElement {
	id: string,
	tags: string[],
	ele: HTMLElement,
}

class ControllerClass{

	public ele: HTMLDivElement = document.createElement('div');
	public listOfChildElement: ChildElement[] = [];

	constructor(){
		this.ele.style.display = "grid";
		this.ele.style.gridTemplateColumns = "1fr";
		this.ele.style.transition = "all .3s";
	}	

	public bind(parent: HTMLElement): void{
		parent.appendChild(this.ele);
	}

	public setColCount(colCount: number): void{
		this.ele.style.gridTemplateColumns = `repeat(${colCount}, 1fr)`;
	}

	public add(childs: HTMLElement[], tags: string[] = []):void {
		childs.forEach(child =>{
			const childId = GenerateObjectId();
			this.listOfChildElement.push({
				id: childId,
				tags: tags,
				ele: child,
			})
			this.ele.appendChild(child)
		})
	}

	public delete(tags: string[] = null): void{
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
		}else{
			this.listOfChildElement.forEach(child => this.ele.removeChild(child.ele))
		}
	}
}

export const Controller = new ControllerClass();
