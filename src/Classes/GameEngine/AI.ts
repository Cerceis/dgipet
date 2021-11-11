import { Character } from "../../Types/Characters.js"
import { GetRandom } from "../../lib/GetRandom.js";
import { ControlResult } from "./Battle.js"

export class AI{

	public char: Character;

	constructor(
		char: Character
	){
		this.char = char;
	}

	public async useSkill(): Promise<ControlResult>{
		return new Promise(async(resolve) => {
			console.log("AI is using random skill")
			const randomSkill = GetRandom(this.char.skills)
			resolve({
				type: randomSkill[0].type,
				damage: await randomSkill[0].use("type2")
			}) 
		})
	}
	
}