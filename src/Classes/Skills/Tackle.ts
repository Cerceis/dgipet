import { Character } from "../../Types/Characters.js"
import { CombatControlType } from "../../Types/CombatControlType.js"
import { gsap } from "../../../exlib/GSAP/index.js"
import { Sound } from "../GameEngine/Sound.js"
import { Dialog } from "../GameEngine/Dialog.js"
import { AttributeOperator } from "../GameEngine/AttributeOperator.js"

export type useType = "type1" | "type2"

export class Tackle{

	public name: string = "Tackle";
	public label: string = "Tackle";
	public manaCost: number = 0;
	public type: CombatControlType = "physical";
	public baseDamage: number = 20;
	public skillIcon: string = `<g-icon name="skillTackle"></g-icon>`
	public soundEffect: string = "sharpPunch.mp3";
	public turnUntilExp: number = -1;
	public description: string = `
		Tackle your enemy, dealing physical damage.
	`

	public char: Character;

	constructor(char: Character){
		this.char = char;
	}
	
	public async use(type: useType = "type1"): Promise<number>{
		return new Promise(async (resolve)=>{
			//Dont change 
			AttributeOperator.set(this.char)._(["mp"], `-${this.manaCost}`)
			//Calculations
			const damage = (this.baseDamage + this.char.attr_physical_damage * 10);
			//Animations / Sounds
			Dialog.setDialog([
				`${this.char.nickName} use ${this.name}`
			])
			await Dialog.untilEnd();
			new Sound(this.soundEffect)
			gsap.to(this.char.ele, {
				x: type === "type1" ? `+=50px` : `-=50px`,
				y: type === "type1" ? `-=50px` : `+=50px`,
				duration: 0.2,
				repeat:1, 
				yoyo: true
			})
			resolve(damage);
		})
	}

}