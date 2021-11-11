import { Character } from "../../Types/Characters";
import { GenerateObjectId } from "../../lib/GenerateObjectId.js";
import { StatusType } from "../../Types/StatusEffects.js";
import { AttributeOperator } from "../GameEngine/AttributeOperator.js";
//all StatusEffects must have:
// activate()
// deactivate()

export class StatusWeaken{
	public trackerId: string = GenerateObjectId()
	public effectStackable: boolean = false;
	public maxStack: number = 1;
	public type: StatusType = "debuff"
	public name: string = "StatusWeaken" //This is internal name.
	public label: string = "Weaken" //This is that the tooltips display as
	public icon: string = ``
	public description: string = `
		description for Weaken
	`
	public char: Character;
	private _cache: any;

	constructor(char: Character) { this.char = char}
	
	public activate(): void{}

	public deactivate(): void{}
}
	