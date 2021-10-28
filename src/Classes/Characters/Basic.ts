import { Emote } from "../../Types/Emote.js"
import { AttributeElement } from "../../Types/AttributeElement.js"
import { GenerateObjectId } from "../../lib/GenerateObjectId.js";

export class Basic{

	public id: string = "";
	public name: string = "";
	public nickName: string = "";
	public emotes: Emote = {
		"idle": ["000", "001"],
		"angry": ["008", "011"],
		"happy": ["003", "007"],
	}
	public ele: HTMLImageElement;

	//Intervals
	public interval_hunger: any;

	//Attributes
	public attr_element: AttributeElement = "None";
	public attr_hunger_max: number = 1000;
	public attr_hunger: number = 1000;
	public attr_hungerRate: number = 1; //Fall off per seconds.
	public attr_health_max: number = 100;
	public attr_health: number = 100;
	public attr_health_regen_rate: number = 5; //Regeneration per turn.
	public attr_mana_max: number = 100;
	public attr_mana: number = 100;
	public attr_mana_regen_rate: number = 1;

	public load(data: any): void{
		this.id = data.id;
		this.name = data.name;
		this.nickName = data.nickName;
		this.emotes = data.emotes;
		this.attr_element = data.attr_element;
		this.attr_hunger_max = data.attr_hunger_max;
		this.attr_hunger = data.attr_hunger;
		this.attr_hungerRate = data.attr_hungerRate;
		this.attr_health_max = data.attr_health_max;
		this.attr_health = data.attr_health;
		this.attr_health_regen_rate = data.attr_health_regen_rate;
		this.attr_mana_max = data.attr_mana_max;
		this.attr_mana = data.attr_mana;
		this.attr_mana_regen_rate = data.attr_mana_regen_rate;
	}

	constructor(){
		this.id = GenerateObjectId()
		this.initHunger()
	}

	public initHunger(): void{
		this.interval_hunger = setInterval(()=>{
			if(this.attr_hunger - this.attr_hungerRate < 0){
				this.attr_hunger = 0;
				clearInterval(this.interval_hunger);
			}
			this.attr_hunger -= this.attr_hungerRate;
			//console.log(`${this.name}'s hunger: ${this.attr_hunger}/${this.attr_hunger_max}`);
		}, 1000)
	}

	public eat(){
		console.log(`${this.name} is eating...`)
	}

	public sleep(){
		console.log(`${this.name} is sleeping...`)
	}

}