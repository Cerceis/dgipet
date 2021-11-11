import { GenerateObjectId } from "../../lib/GenerateObjectId.js";
//all StatusEffects must have:
// activate()
// deactivate()
export class StatusWeaken {
    constructor(char) {
        this.trackerId = GenerateObjectId();
        this.effectStackable = false;
        this.maxStack = 1;
        this.type = "debuff";
        this.name = "StatusWeaken"; //This is internal name.
        this.label = "Weaken"; //This is that the tooltips display as
        this.icon = ``;
        this.description = `
		description for Weaken
	`;
        this.char = char;
    }
    activate() { }
    deactivate() { }
}
