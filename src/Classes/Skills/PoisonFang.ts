import { Character } from "../../Types/Characters.js"
import { CombatControlType } from "../../Types/CombatControlType.js"
import { gsap } from "../../../exlib/GSAP/index.js"
import { Sound } from "../GameEngine/Sound.js"
import { Dialog } from "../GameEngine/Dialog.js"
import { AttributeOperator } from "../GameEngine/AttributeOperator.js"
import { onRoundStart } from "../GameEngine/BattleEvents/onRoundStart.js"
import { TargetOpponent } from "../GameEngine/BattleEvents/TargetOpponent.js"

export type useType = "type1" | "type2"

export class PoisonFang{

	public name: string = "PoisonFang";
	public label: string = "Poison Fang";
	public manaCost: number = 50;
	public type: CombatControlType = "physical";
	public baseDamage: number = 5;
	public skillIcon: string = `<g-icon name="skillPoisonFang"></g-icon>`;
	public soundEffect: string = "sharpPunch.mp3";
	public turnUntilExp: number = 16;
	public description: string = `
		Bite enemy with poisonous fang, dealing physical damage with a chance to poison enemy.
		(Poison deal % damage to target's current hp, not max hp, this means poison deal lower damage when hp is low)
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
			const damage = (this.baseDamage + this.char.attr_physical_damage * 2);
			const opponent: Character = TargetOpponent.class //<= This is important, because targetOpponent switch everyturn
			//Animations / Sounds
			Dialog.setDialog([`${this.char.nickName} use ${this.name}`])
			await Dialog.untilEnd();
			new Sound(this.soundEffect)
			gsap.to(this.char.ele, {
				x: type === "type1" ? `+=50px` : `-=50px`,
				y: type === "type1" ? `-=50px` : `+=50px`,
				filter: "invert(80%) sepia(83%) saturate(440%) hue-rotate(34deg) brightness(92%) contrast(86%)",
				duration: 0.2,
				repeat:1, 
				yoyo: true
			})
			//70% chance on applying poison
			const roll = Math.random()
			if(roll < 0.7){
				const StatusPoison = await opponent.addStatusEffect("StatusPoison");
				const onExpire = () => { 
					opponent.removeStatusEffects(StatusPoison)
				}
				const onEvery = async() => { 
					Dialog.setDialog([`${opponent.nickName} took poison damage.`])
					await Dialog.untilEnd();
					StatusPoison.activate()
				}
				onRoundStart.addEvent({
					trackerId:StatusPoison.trackerId,
					ticksUntilExp:this.turnUntilExp,
					onExpire,
					onEvery
				})
				Dialog.setDialog([`${opponent.nickName} is poisoned.`])
				await Dialog.untilEnd();
			}
			resolve(damage);
		})
	}

}