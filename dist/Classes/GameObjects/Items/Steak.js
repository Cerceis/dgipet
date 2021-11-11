import { Item } from "./Item.js";
export class Steak extends Item {
    constructor() {
        super();
        /*save*/
        this.name = "Steak";
        this.objName = "Steak";
        this.description = `
		A medium rare steak, pink in the middle, yummy.
	`;
        this.itemEffects = [
            "Increase hunger by 800",
            "Recover HP by 5"
        ];
        this.itemRarity = 2;
        this.useCount = 1;
        this.itemIcon = "steak";
        this.stackable = true;
        this.stackLimit = 10;
        this.category = "Consumable";
        this.value = 10;
        /*No save*/
        this.ele_icon = document.createElement("img");
        this.ele_icon.src = `${this.iconBaseDir}${this.itemIcon}.png`;
        this.ele_icon.width = 24;
    }
}
