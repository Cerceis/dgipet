import { Basic } from './Basic.js';
import { Animation } from '../GameEngine/Animation.js';
import { Emote, EmoteType } from '../../Types/Emote.js';

export class Popomon extends Basic{
	
	public name: string = "Popomon";
	public animation: Animation;
	
	constructor(size: number = 25){
		super();
		this.animation = new Animation(size, this.name, this.emotes.idle, this.id);
		this.ele = this.animation.ele;
	}

	public make(emote: EmoteType):void {
		if(this.emotes && this.emotes[emote]){
			this.animation.setSprite(this.emotes[emote])
		}
	}
 	
}