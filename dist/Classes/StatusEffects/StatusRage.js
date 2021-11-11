import { GenerateObjectId } from "../../lib/GenerateObjectId.js";
import { AttributeOperator } from "../GameEngine/AttributeOperator.js";
//all StatusEffects must have:
// activate()
// deactivate()
export class StatusRage {
    constructor(char) {
        this.trackerId = GenerateObjectId();
        this.effectStackable = false;
        this.maxStack = 1;
        this.tickStackable = false;
        this.type = "buff";
        this.name = "StatusRage"; //This is internal name.
        this.label = "Rage"; //This is that the tooltips display as
        this.icon = `<g-icon name="skillRage"></g-icon>`;
        this.description = `
		Increases physical damage for 25%.
	`;
        this.char = char;
    }
    activate() {
        this._cache = this.char.attr_physical_damage * 25 / 100;
        AttributeOperator.set(this.char)._(["phyDmg"], `+${this._cache}`);
    }
    deactivate() {
        AttributeOperator.set(this.char)._(["phyDmg"], `-${this._cache}`);
    }
}
