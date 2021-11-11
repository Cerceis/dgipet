import { GenerateObjectId } from "../../lib/GenerateObjectId.js"

export class GameObject{
	
	public id: string;

	constructor(){
		this.id = GenerateObjectId();

	}
	
}