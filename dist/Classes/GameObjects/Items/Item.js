import { GameObject } from "../GameObject.js";
export class Item extends GameObject {
    constructor() {
        super();
        this.name = "";
        this.iconBaseDir = "./assets/images/gameIcons/";
        this.value = 1;
        this.itemIcon = "";
        this.itemRarity = 1;
        this.description = ``;
        this.itemEffects = [];
    }
}
