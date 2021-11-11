import { Basic } from './Basic.js';
import { Animation } from '../GameEngine/Animation.js';

export class BlackGrowmon extends Basic{
	
	public name: string = "BlackGrowmon";
	public tier: number = 3;

	constructor(size: number = 25){
		super();
		this.nickName = this.name
		//Init animations
		this.animation = new Animation(size, this.name, this.emotes.idle, this.id);
		this.ele = this.animation.ele;
		//Base Stats
		this.attr_str += 13;
		this.attr_int += 5;
		this.attr_dex += 7;
		this.attr_vit += 10;
		this.attr_con += 7;
		//Base Stats increament per level // default: 1 per level
		this.str_per_level += 3;
		this.int_per_level += 1;
		this.dex_per_level += 2;
		this.vit_per_level += 1;
		this.con_per_level += 1;
		this.calculateLevel()
		this.calculateAttribute();
		this.attr_health = this.attr_health_max;
		this.attr_mana = this.attr_mana_max;
		this.skills = [
			"Tackle"
		]
		this.initSkills();
	} 	
}