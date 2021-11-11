import { Character } from "../../Types/Characters.js"
import { CombatControlType } from "../../Types/CombatControlType.js"
import { gsap } from "../../../exlib/GSAP/index.js"
import { Sound } from "../GameEngine/Sound.js"
import { Dialog } from "../GameEngine/Dialog.js"
import { AttributeOperator } from "../GameEngine/AttributeOperator.js"
import { onRoundStart } from "../GameEngine/BattleEvents/onRoundStart.js"

export type useType = "type1" | "type2"

export class Rage{

	public name: string = "Rage";
	public label: string = "Rage";
	public manaCost: number = 30;
	public type: CombatControlType = "buff";
	public baseDamage: number = 0;
	public skillIcon: string = `<g-icon name="skillRage"></g-icon>`;
	public soundEffect: string = "skillRage.mp3";
	public turnUntilExp: number = 8;
	public description: string = `
		Increases physical attack by 25% for 12 (includes enemy) turn.
	`

	public char: Character;

	constructor(char: Character){
		this.char = char;
	}
	/*
		useType: To determine animation style for player at bottom left/top right.
	*/
	public async use(type: useType = "type1"): Promise<number>{
		return new Promise(async (resolve)=>{
			//Dont change 
			AttributeOperator.set(this.char)._(["mp"], `-${this.manaCost}`)
			//Calculations
			const damage = 0
			const StatusRage = await this.char.addStatusEffect("StatusRage");
			const onTrigger = () => { 
				console.log("Rage triggered")
			}
			const onExpire = () => { 
				this.char.removeStatusEffects(StatusRage)
				StatusRage.deactivate()
			}
			onRoundStart.addEvent({
				trackerId:StatusRage.trackerId,
				ticksUntilExp:this.turnUntilExp,
				onTrigger,
				onExpire
			})
			//Animations / Sounds
			Dialog.setDialog([`${this.char.nickName} use ${this.name}`])
			await Dialog.untilEnd();
			new Sound(this.soundEffect)
			gsap.to(this.char.ele, {
				y: `-=20px`,
				filter:"invert(15%) sepia(74%) saturate(6593%) hue-rotate(358deg) brightness(105%) contrast(121%)",
				duration: 0.3,
				repeat:1, 
				yoyo: true
			})
			Dialog.setDialog([`${this.char.nickName}'s attack increases.`])
			await Dialog.untilEnd();
			resolve(damage);
		})
	}

}