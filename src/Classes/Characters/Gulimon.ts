import { Basic } from './Basic.js';
import { Animation } from '../Animation.js';
import { Emote, EmoteType } from '../../Types/Emote.js';

export class Gulimon extends Basic{
	
	public name: string = "Gulimon";
	public animation: Animation;
	public ele: HTMLImageElement;
	
	constructor(size: number = 25){
		super();
		this.animation = new Animation(size, this.name, this.emotes.idle);
		this.ele = this.animation.ele;
	}

	public make(emote: EmoteType):void {
		if(this.emotes && this.emotes[emote]){
			this.animation.setSprite(this.emotes[emote])
		}
	}
 	
}