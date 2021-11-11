import { GameObject } from "../GameObject.js"
import { ItemRarity } from "../../../Types/ItemRarity.js"

export class Item extends GameObject {
	[x: string]: any;

	public name: string = "";
	public iconBaseDir: string = "./assets/images/gameIcons/"
	public value: number = 1;
	public itemIcon: string = ""
	public itemRarity: ItemRarity = 1;
	public description: string = ``;
	public itemEffects: string[] = []

	constructor(){
		super();
	}


}