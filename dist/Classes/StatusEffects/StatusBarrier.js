import { GenerateObjectId } from "../../lib/GenerateObjectId.js";
//all StatusEffects must have:
// activate()
// deactivate()
export class StatusBarrier {
    constructor() {
        this.trackerId = GenerateObjectId();
        this.effectStackable = false;
        this.maxStack = 1;
        this.type = "buff";
        this.name = "StatusBarrier"; //This is internal name.
        this.label = "Barrier"; //This is that the tooltips display as
        this.icon = ``;
        this.description = `
		description for Barrier
	`;
    }
    activate() { }
    deactivate() { }
}
