import { Basic } from './Basic.js';
import { Animation } from '../GameEngine/Animation.js';

export class Jyarimon extends Basic{
	
	public name: string = "Jyarimon";
	public tier: number = 0;
	
	constructor(size: number = 25){
		super();
		this.nickName = this.name
		this.animation = new Animation(size, this.name, this.emotes.idle, this.id);
		this.ele = this.animation.ele;
		//Stats
		this.attr_str += 2;
		this.attr_int += 0;
		this.attr_dex += 2;
		this.attr_vit += 1;
		this.attr_con += 1;
		this.calculateAttribute()
		this.attr_health = this.attr_health_max;
		this.attr_mana = this.attr_mana_max;
	}
 	
}