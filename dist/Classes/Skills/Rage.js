var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { gsap } from "../../../exlib/GSAP/index.js";
import { Sound } from "../GameEngine/Sound.js";
import { Dialog } from "../GameEngine/Dialog.js";
import { AttributeOperator } from "../GameEngine/AttributeOperator.js";
import { onRoundStart } from "../GameEngine/BattleEvents/onRoundStart.js";
export class Rage {
    constructor(char) {
        this.name = "Rage";
        this.label = "Rage";
        this.manaCost = 30;
        this.type = "buff";
        this.baseDamage = 0;
        this.skillIcon = `<g-icon name="skillRage"></g-icon>`;
        this.soundEffect = "skillRage.mp3";
        this.turnUntilExp = 8;
        this.description = `
		Increases physical attack by 25% for 12 (includes enemy) turn.
	`;
        this.char = char;
    }
    /*
        useType: To determine animation style for player at bottom left/top right.
    */
    use(type = "type1") {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                //Dont change 
                AttributeOperator.set(this.char)._(["mp"], `-${this.manaCost}`);
                //Calculations
                const damage = 0;
                const StatusRage = yield this.char.addStatusEffect("StatusRage");
                const onTrigger = () => {
                    console.log("Rage triggered");
                };
                const onExpire = () => {
                    this.char.removeStatusEffects(StatusRage);
                    StatusRage.deactivate();
                };
                onRoundStart.addEvent({
                    trackerId: StatusRage.trackerId,
                    ticksUntilExp: this.turnUntilExp,
                    onTrigger,
                    onExpire
                });
                //Animations / Sounds
                Dialog.setDialog([`${this.char.nickName} use ${this.name}`]);
                yield Dialog.untilEnd();
                new Sound(this.soundEffect);
                gsap.to(this.char.ele, {
                    y: `-=20px`,
                    filter: "invert(15%) sepia(74%) saturate(6593%) hue-rotate(358deg) brightness(105%) contrast(121%)",
                    duration: 0.3,
                    repeat: 1,
                    yoyo: true
                });
                Dialog.setDialog([`${this.char.nickName}'s attack increases.`]);
                yield Dialog.untilEnd();
                resolve(damage);
            }));
        });
    }
}
