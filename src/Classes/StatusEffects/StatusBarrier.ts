import { GenerateObjectId } from "../../lib/GenerateObjectId.js";
import { StatusType } from "../../Types/StatusEffects.js";
import { AttributeOperator } from "../GameEngine/AttributeOperator.js";
//all StatusEffects must have:
// activate()
// deactivate()

export class StatusBarrier{
	public trackerId: string = GenerateObjectId()
	public effectStackable: boolean = false;
	public maxStack: number = 1;
	public type: StatusType = "buff"
	public name: string = "StatusBarrier" //This is internal name.
	public label: string = "Barrier" //This is that the tooltips display as
	public icon: string = ``
	public description: string = `
		description for Barrier
	`
	private _cache: any;

	constructor() {}
	
	public activate(): void{}

	public deactivate(): void{}
}
	