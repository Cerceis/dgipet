import { Character } from "../../Types/Characters";
import { GenerateObjectId } from "../../lib/GenerateObjectId.js";
import { StatusType } from "../../Types/StatusEffects.js";
import { AttributeOperator } from "../GameEngine/AttributeOperator.js";
//all StatusEffects must have:
// activate()
// deactivate()

export class StatusPoison{
	public trackerId: string = GenerateObjectId()
	public effectStackable: boolean = true;
	public maxStack: number = 3;
	public type: StatusType = "debuff"
	public name: string = "StatusPoison" //This is internal name.
	public label: string = "Poison" //This is that the tooltips display as
	public icon: string = `<g-icon name="skillPoison"></g-icon>`
	public description: string = `
		Take damage periodically. (-5% of current hp)
	`
	public char: Character;

	constructor(char: Character) { this.char = char}
	
	public activate(): void{
		AttributeOperator.set(this.char)._(["hp"], "-5%")
	}

	public deactivate(): void{}
}
	