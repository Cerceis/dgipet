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
export class Tackle {
    constructor(char) {
        this.name = "Tackle";
        this.label = "Tackle";
        this.manaCost = 0;
        this.type = "physical";
        this.baseDamage = 20;
        this.skillIcon = `<g-icon name="skillTackle"></g-icon>`;
        this.soundEffect = "sharpPunch.mp3";
        this.turnUntilExp = -1;
        this.description = `
		Tackle your enemy, dealing physical damage.
	`;
        this.char = char;
    }
    use(type = "type1") {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                //Dont change 
                AttributeOperator.set(this.char)._(["mp"], `-${this.manaCost}`);
                //Calculations
                const damage = (this.baseDamage + this.char.attr_physical_damage * 10);
                //Animations / Sounds
                Dialog.setDialog([
                    `${this.char.nickName} use ${this.name}`
                ]);
                yield Dialog.untilEnd();
                new Sound(this.soundEffect);
                gsap.to(this.char.ele, {
                    x: type === "type1" ? `+=50px` : `-=50px`,
                    y: type === "type1" ? `-=50px` : `+=50px`,
                    duration: 0.2,
                    repeat: 1,
                    yoyo: true
                });
                resolve(damage);
            }));
        });
    }
}
