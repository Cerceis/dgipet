import { Emote, EmoteType } from "../../Types/Emote.js"
import { Animation } from '../GameEngine/Animation.js';
import { AttributeElement } from "../../Types/AttributeElement.js"
import { GenerateObjectId } from "../../lib/GenerateObjectId.js";
import { StatusEffects, StatusEffectName } from "../../Types/StatusEffects.js"
import { LevelParser, LevelInfo } from "../GameEngine/LevelParser.js";
import { SkillName ,Skill } from "../../Types/Skills.js";

interface StatusEffectsObj{
	status: StatusEffects,
	trackerId: string,
}

export class Basic{

	public id: string = "";
	public name: string = "";
	public nickName: string = "";
	public emotes: Emote = {
		"idle": ["000", "001"],
		"angry": ["008", "011"],
		"happy": ["003", "007"],
	}
	public experience: number = 0;
	public levelInfo: LevelInfo = LevelParser(this.experience);
	public ele: HTMLImageElement;
	public statusEffects: StatusEffectsObj[] = []
 	public skills: any[] = [] //changed type to any because it's either SkillName or Skill
	public animation: Animation;

	//Intervals
	public interval_hunger: any;

	//Attributes
	public attr_element: AttributeElement = "None";
	public attr_hunger_max: number = 1000;
	public attr_hunger: number = 1000;
	public attr_hungerRate: number = 1; //Fall off per seconds.
	//Hit chance = (selfAccuracy+selfSpeed - enemySpeed) as percentage + 50%.
	//Stats
	/*
		Strength
		- +Physical damage
		- +minor max HP
		- +minor physical defense
		- +minor HP regen
		- +minor hunger rate
	*/
	public attr_str: number = 4;
	/*
		Intelligence
		- +Skill damage
		- +minor max Mana
		- +minor skill defense
		- +minor Mana regen
		- +minor hunger rate
	*/
	public attr_int: number = 4;
	/*
		Dexterity
		- +Accuracy
		- +Minor physical damage
		- +Minor skill damage
	*/
	public attr_dex: number = 4;
	/*
		Concentration
		- +HP regen
		- +MP regen
		- +Speed
	*/
	public attr_con: number = 4;
	/*
		Vitality
		- +Max HP
		- +Max MP
		- +minor physical defense
		- +minor skill defense
	*/
	public attr_vit: number = 4;
	//Stats increase per level
	public str_per_level: number = 1;
	public int_per_level: number = 1;
	public dex_per_level: number = 1;
	public con_per_level: number = 1;
	public vit_per_level: number = 1;

	//These attributes are define after calculation, no load needed
	public attr_health_max: number = 0;
	public attr_health: number = 0;
	public attr_health_regen_rate: number = 0; //Regeneration per turn.
	public attr_mana_max: number = 0;
	public attr_mana: number = 0;
	public attr_mana_regen_rate: number = 0;
	public attr_speed: number = 0;
	public attr_accuracy: number = 0;
	public attr_physical_damage: number = 1;
	public attr_skill_damage: number = 1;
	public attr_physical_defense: number = 1;
	public attr_skill_defense: number = 1;

	public load(data: any): void{
		this.id = data.id;
		this.name = data.name;
		this.nickName = data.nickName;
		this.emotes = data.emotes;
		this.attr_element = data.attr_element;
		this.attr_hunger_max = data.attr_hunger_max;
		this.attr_hunger = data.attr_hunger;
		this.attr_hungerRate = data.attr_hungerRate;
		this.attr_str = data.attr_str;
		this.attr_int = data.attr_int;
		this.attr_dex = data.attr_dex;
		this.attr_con = data.attr_con;
		this.str_per_level = data._str_per_level;
		this.int_per_level = data._int_per_level;
		this.dex_per_level = data._dex_per_level;
		this.con_per_level = data._con_per_level;
		this.vit_per_level = data._vit_per_level;
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

	public async initSkills(): Promise<void>{
		for(let i = 0; i<this.skills.length ; i++){
			this.skills[i] = new (await import(`../Skills/${this.skills[i]}.js`))[this.skills[i]](this)
		}
	}

	public calculateLevel(): void{
		this.levelInfo = LevelParser(this.experience);
		const currentLevel = this.levelInfo.level;
		this.attr_str += currentLevel *  this.str_per_level;
		this.attr_int += currentLevel *  this.int_per_level;
		this.attr_dex += currentLevel *  this.dex_per_level;
		this.attr_con += currentLevel *  this.con_per_level;
		this.attr_vit += currentLevel *  this.vit_per_level;
	}

	public calculateAttribute(): void{
		this.attr_health_max = 100 + this.attr_vit * 10 + this.attr_str * 2
		this.attr_health_regen_rate = 1 + Number(Math.exp(((0.1 * (this.attr_con * 0.5 + this.attr_str * 0.2) ) / 2)).toFixed(3))
		this.attr_mana_max = 100 + this.attr_vit * 10 + this.attr_int * 2
		this.attr_mana_regen_rate = 1 + Number(Math.exp(((0.1 * (this.attr_con * 0.5 + this.attr_int * 0.2) ) / 2)).toFixed(3))

		//Dev
		this.attr_accuracy = 50 + Number(Math.exp(this.attr_dex / 3).toFixed(3))
		this.attr_speed = 50 + Number(Math.exp(this.attr_con / 3).toFixed(3))

		this.attr_physical_damage = 10 + this.attr_str * 2.5
		this.attr_skill_damage = 10 + this.attr_int * 2.5
		this.attr_physical_defense = 5 + this.attr_vit + this.attr_str * 0.1
		this.attr_skill_defense = 5 + this.attr_vit + this.attr_int * 0.1
	}

	public addExp(exp: number): void{
		const previousLevel = this.levelInfo.level;
		this.experience += exp;
		this.calculateLevel();
		this.calculateAttribute();
		//Restore hp/mana to max when leveled.
		if(this.levelInfo.level > previousLevel)
			this.attr_health = this.attr_health_max;
			this.attr_mana = this.attr_mana_max;
	}

	public async addStatusEffect(statusEffectName: StatusEffectName): Promise<StatusEffects>{
		//activationTick is the life of the status per statusEffectsNextTick() call.
		
		const statusEffect = new (await import(`../StatusEffects/${statusEffectName}.js`))[statusEffectName](this)
		//Check if the effect is stackable or extendable
		const hasSameStatusEffectCount: number = this.statusEffects.filter(se => se.status.name === statusEffect.name ).length;
		if(hasSameStatusEffectCount){
			if(statusEffect.effectStackable && hasSameStatusEffectCount < statusEffect.maxStack){
				this.statusEffects.push({
					trackerId: statusEffect.trackerId,
					status: statusEffect,
				})	
				statusEffect.activate()
			}
		}
		else {
			this.statusEffects.push({
				trackerId: statusEffect.trackerId,
				status: statusEffect,
			})
			statusEffect.activate()
		}
			
		return statusEffect
	}
	public removeStatusEffects(statusEffet:StatusEffects): void{
		const id = statusEffet.trackerId;
		const expiredIndex = this.statusEffects.findIndex(status => status.trackerId === id)
		this.statusEffects.splice(expiredIndex, 1);
	}

	public sleep(){
		console.log(`${this.name} is sleeping...`)
	}

	public make(emote: EmoteType):void {
		if(this.emotes && this.emotes[emote]){
			this.animation.setSprite(this.emotes[emote])
		}
	}

}