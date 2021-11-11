import { GenerateObjectId } from "../../lib/GenerateObjectId.js";
export class GameObject {
    constructor() {
        this.id = GenerateObjectId();
    }
}
