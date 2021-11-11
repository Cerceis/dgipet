import { Character } from "../../../Types/Characters.js";
import { Item } from "./Item.js"
import { ItemRarity } from "../../../Types/ItemRarity.js"
import { ItemCategory } from "../../../Types/ItemCategory.js";
import { AttributeOperator } from "../../GameEngine/AttributeOperator.js";
import { User } from "../../GameEngine/User.js"

export class RawMeat extends Item {

	/*save*/
	public name: string = "Raw Meat";
	public objName: string = "RawMeat"; //Could use as item identifier.
	public description: string = `
		A piece of raw meat. Should cook it before eating it...
	`;
	public itemEffects: string[] = [
		"Increase hunger by 400",
		"Recover HP by 5"
	]
	public itemRarity: ItemRarity = 1;
	public useCount: number = 1;
	public itemIcon: string = "rawMeat"
	public stackable: boolean = true;
	public stackLimit: number = 10;
	public category: ItemCategory = "Consumable";
	public value: number = 5;
	/*No save*/
	public ele_icon: HTMLImageElement = document.createElement("img");

	constructor(){
		super();
		this.ele_icon.src = `${this.iconBaseDir}${this.itemIcon}.png`
		this.ele_icon.width = 24
	}

	public async use(): Promise<boolean>{
		AttributeOperator.set(User.partner)._(["hp"], "+100")
		AttributeOperator.set(User.partner)._(["hunger"], "+400")
		return true
	}

}