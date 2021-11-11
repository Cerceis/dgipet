import { User } from "../../GameEngine/User.js"
import { Item } from "./Item.js"
import { ItemRarity } from "../../../Types/ItemRarity.js"
import { ItemCategory } from "../../../Types/ItemCategory.js";

export class SkillBook extends Item {

	/*save*/
	public name: string = "Skill Book";
	public objName: string = "SkillBook"; //Will update into SkillBook-<SkillName>
	public description: string = `
		A Skill book.
	`;
	public itemEffects: string[] = []
	public itemRarity: ItemRarity = 3;
	public useCount: number = 1;
	public itemIcon: string = "skillBook"
	public stackable: boolean = false;
	public stackLimit: number = 1;
	public category: ItemCategory = "Consumable";
	public value: number = 100;
	/*No save*/
	public ele_icon: HTMLImageElement = document.createElement("img");
	private _skill: any;

	constructor(skillName: string){
		super();
		this.ele_icon.src = `${this.iconBaseDir}${this.itemIcon}.png`
		this.ele_icon.width = 24
		this.name = `Skill Book [${skillName}]`
		this.objName = `SkillBook${skillName}`
		this.initSkillBook(skillName)
	}
	
	public async initSkillBook(skillName: string): Promise<void>{
		const skill = new (await import(`../../Skills/${skillName}.js`))[skillName](User.partner)
		this._skill = skill
	}

	public async use(): Promise<boolean>{
		//Check skill not learnt yet
		User.partner.skills.push(this._skill)
		return true
	}

}