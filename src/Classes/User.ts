import { Character } from "../Types/Characters.js"

class UserClass{
	public id: string = "";
	public name: string = "";
	public partners: Character[] = [];

	constructor(){
	}

	set setName(name: string){ 
		this.name = name 
		
	}
	get getName(): string{ return this.name }
}


export const User = new UserClass();