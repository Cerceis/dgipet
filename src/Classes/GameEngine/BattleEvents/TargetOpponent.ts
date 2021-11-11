import { Character } from "../../../Types/Characters.js"
class TargetOpponentClass{
	public class: Character;
	constructor() {}
	public setAs(char: Character){
		this.class = char;
	}
}


export const TargetOpponent = new TargetOpponentClass();