import { Character } from "../../Types/Characters";
import { GenerateObjectId } from "../../lib/GenerateObjectId.js";
import { StatusType } from "../../Types/StatusEffects.js";
import { AttributeOperator } from "../GameEngine/AttributeOperator.js";
//all StatusEffects must have:
// activate()
// deactivate()

export class StatusRage{
	
	public trackerId: string = GenerateObjectId()
	public effectStackable: boolean = false;
	public maxStack: number = 1;
	public tickStackable: boolean = false;
	public type: StatusType = "buff"
	public name: string = "StatusRage" //This is internal name.
	public label: string = "Rage" //This is that the tooltips display as
	public icon: string = `<g-icon name="skillRage"></g-icon>`
	public description: string = `
		Increases physical damage for 25%.
	`
	public char: Character;
	private _cache: any;

	constructor(char: Character) {
		this.char = char
	}
	
	public activate(): void{
		this._cache = this.char.attr_physical_damage * 25/100;
		AttributeOperator.set(this.char)._(["phyDmg"], `+${this._cache}`)
	}

	public deactivate(): void{
		AttributeOperator.set(this.char)._(["phyDmg"], `-${this._cache}`)
	}
}