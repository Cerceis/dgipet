import { Basic } from './Basic.js';
import { Animation } from '../Animation.js';
import { Emote, EmoteType } from '../../Types/Emote.js';

export class Nyaromon extends Basic{
	
	public name: string = "Nyaromon";
	public nickName: string = "";
	public emotes: Emote = {
		"idle": ["000", "001"],
		"angry": ["006", "008"]
	}
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