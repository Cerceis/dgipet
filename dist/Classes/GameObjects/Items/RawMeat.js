var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Item } from "./Item.js";
import { AttributeOperator } from "../../GameEngine/AttributeOperator.js";
import { User } from "../../GameEngine/User.js";
export class RawMeat extends Item {
    constructor() {
        super();
        /*save*/
        this.name = "Raw Meat";
        this.objName = "RawMeat"; //Could use as item identifier.
        this.description = `
		A piece of raw meat. Should cook it before eating it...
	`;
        this.itemEffects = [
            "Increase hunger by 400",
            "Recover HP by 5"
        ];
        this.itemRarity = 1;
        this.useCount = 1;
        this.itemIcon = "rawMeat";
        this.stackable = true;
        this.stackLimit = 10;
        this.category = "Consumable";
        this.value = 5;
        /*No save*/
        this.ele_icon = document.createElement("img");
        this.ele_icon.src = `${this.iconBaseDir}${this.itemIcon}.png`;
        this.ele_icon.width = 24;
    }
    use() {
        return __awaiter(this, void 0, void 0, function* () {
            AttributeOperator.set(User.partner)._(["hp"], "+100");
            AttributeOperator.set(User.partner)._(["hunger"], "+400");
            return true;
        });
    }
}
