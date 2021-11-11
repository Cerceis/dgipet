import { Basic } from './Basic.js';
import { Animation } from '../GameEngine/Animation.js';

export class Popomon extends Basic{
	
	public name: string = "Popomon";
	public tier: number = 0;
	
	constructor(size: number = 25){
		super();
		this.nickName = this.name
		this.animation = new Animation(size, this.name, this.emotes.idle, this.id);
		this.ele = this.animation.ele;
		this.calculateAttribute()
		this.attr_health = this.attr_health_max;
		this.attr_mana = this.attr_mana_max;
	}

}