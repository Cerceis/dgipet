import { GenerateObjectId } from "../../lib/GenerateObjectId.js";
import { AttributeOperator } from "../GameEngine/AttributeOperator.js";
//all StatusEffects must have:
// activate()
// deactivate()
export class StatusPoison {
    constructor(char) {
        this.trackerId = GenerateObjectId();
        this.effectStackable = true;
        this.maxStack = 3;
        this.type = "debuff";
        this.name = "StatusPoison"; //This is internal name.
        this.label = "Poison"; //This is that the tooltips display as
        this.icon = `<g-icon name="skillPoison"></g-icon>`;
        this.description = `
		Take damage periodically.
	`;
        this.char = char;
    }
    activate() {
        AttributeOperator.set(this.char)._(["hp"], "-5%");
    }
    deactivate() { }
}
