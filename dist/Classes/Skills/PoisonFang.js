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
import { TargetOpponent } from "../GameEngine/BattleEvents/TargetOpponent.js";
export class PoisonFang {
    constructor(char) {
        this.name = "PoisonFang";
        this.label = "Poison Fang";
        this.manaCost = 50;
        this.type = "physical";
        this.baseDamage = 5;
        this.skillIcon = `<g-icon name="skillPoisonFang"></g-icon>`;
        this.soundEffect = "sharpPunch.mp3";
        this.turnUntilExp = 16;
        this.description = `
		Bite enemy with poisonous fang, dealing physical damage with a chance to poison enemy.
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
                const damage = (this.baseDamage + this.char.attr_physical_damage * 2);
                const opponent = TargetOpponent.class; //<= This is important, because targetOpponent switch everyturn
                //Animations / Sounds
                Dialog.setDialog([`${this.char.nickName} use ${this.name}`]);
                yield Dialog.untilEnd();
                new Sound(this.soundEffect);
                gsap.to(this.char.ele, {
                    x: type === "type1" ? `+=50px` : `-=50px`,
                    y: type === "type1" ? `-=50px` : `+=50px`,
                    filter: "invert(80%) sepia(83%) saturate(440%) hue-rotate(34deg) brightness(92%) contrast(86%)",
                    duration: 0.2,
                    repeat: 1,
                    yoyo: true
                });
                //70% chance on applying poison
                const roll = Math.random();
                if (roll < 0.7) {
                    const StatusPoison = yield opponent.addStatusEffect("StatusPoison");
                    const onExpire = () => {
                        opponent.removeStatusEffects(StatusPoison);
                    };
                    const onEvery = () => __awaiter(this, void 0, void 0, function* () {
                        Dialog.setDialog([`${opponent.nickName} took poison damage.`]);
                        yield Dialog.untilEnd();
                        StatusPoison.activate();
                    });
                    onRoundStart.addEvent({
                        trackerId: StatusPoison.trackerId,
                        ticksUntilExp: this.turnUntilExp,
                        onExpire,
                        onEvery
                    });
                    Dialog.setDialog([`${opponent.nickName} is poisoned.`]);
                    yield Dialog.untilEnd();
                }
                resolve(damage);
            }));
        });
    }
}
