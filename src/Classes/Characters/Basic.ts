import { Emote } from "../../Types/Emote.js"
export class Basic{

	public name: string = "";
	public nickName: string = "";
	public emotes: Emote = {
		"idle": ["000", "001"],
		"angry": ["008", "011"],
		"happy": ["003", "007"],
	}

	constructor(){}

	public eat(){
		console.log(`${this.name} is eating...`)
	}

	public sleep(){
		console.log(`${this.name} is sleeping...`)
	}
}