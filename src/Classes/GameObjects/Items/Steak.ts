import { Item } from "./Item.js"
import { ItemRarity } from "../../../Types/ItemRarity.js"
import { ItemCategory } from "../../../Types/ItemCategory.js";

export class Steak extends Item {

	/*save*/
	public name: string = "Steak";
	public objName: string = "Steak";
	public description: string = `
		A medium rare steak, pink in the middle, yummy.
	`;
	public itemEffects: string[] = [
		"Increase hunger by 800",
		"Recover HP by 5"
	]
	public itemRarity: ItemRarity = 2;
	public useCount: number = 1;
	public itemIcon: string = "steak"
	public stackable: boolean = true;
	public stackLimit: number = 10;
	public category: ItemCategory = "Consumable";
	public value: number = 10;
	/*No save*/
	public ele_icon: HTMLImageElement = document.createElement("img");

	constructor(){
		super();
		this.ele_icon.src = `${this.iconBaseDir}${this.itemIcon}.png`
		this.ele_icon.width = 24
	}

}