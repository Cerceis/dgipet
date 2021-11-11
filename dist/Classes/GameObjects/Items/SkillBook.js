var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from "../../GameEngine/User.js";
import { Item } from "./Item.js";
export class SkillBook extends Item {
    constructor(skillName) {
        super();
        /*save*/
        this.name = "Skill Book";
        this.objName = "SkillBook"; //Will update into SkillBook-<SkillName>
        this.description = `
		A Skill book.
	`;
        this.itemEffects = [];
        this.itemRarity = 3;
        this.useCount = 1;
        this.itemIcon = "skillBook";
        this.stackable = false;
        this.stackLimit = 1;
        this.category = "Consumable";
        this.value = 100;
        /*No save*/
        this.ele_icon = document.createElement("img");
        this.ele_icon.src = `${this.iconBaseDir}${this.itemIcon}.png`;
        this.ele_icon.width = 24;
        this.name = `Skill Book [${skillName}]`;
        this.objName = `SkillBook${skillName}`;
        this.initSkillBook(skillName);
    }
    initSkillBook(skillName) {
        return __awaiter(this, void 0, void 0, function* () {
            const skill = new (yield import(`../../Skills/${skillName}.js`))[skillName](User.partner);
            this._skill = skill;
        });
    }
    use() {
        return __awaiter(this, void 0, void 0, function* () {
            //Check skill not learnt yet
            User.partner.skills.push(this._skill);
            return true;
        });
    }
}
