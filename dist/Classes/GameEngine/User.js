var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GenerateObjectId } from "../../lib/GenerateObjectId.js";
import { Animator } from "./Animator.js";
import { Inventory } from "./Inventory.js";
class UserClass {
    constructor() {
        this.id = "";
        this.name = "";
        this.inventory = Inventory;
        this.id = GenerateObjectId();
    }
    loadUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                this.id = user.id;
                this.name = user.name;
                this.experience = user.experience;
                const partnerModule = yield import(`../Characters/${user.partner.name}.js`);
                const partnerClass = partnerModule[user.partner.name];
                this.partner = new partnerClass();
                this.partner.load(user.partner);
                Animator.addResources(this.partner.animation);
                /*
                //Partners
                for(let i = 0; i<user.partners.length ; i++){
                    const partnerModule = await import(`../Characters/${user.partners[i].name}.js`) ;
                    const partnerClass = partnerModule[user.partners[i].name];
                    this.partner[i] = new partnerClass();
                    this.partner[i].load(user.partners[i]);
                    Animator.addResources(this.partners[i].animation);
                }*/
                //Inventory
                for (let i = 0; i < user.inventory.items.length; i++) {
                    const itemModule = yield import(`../GameObjects/Items/${user.inventory.items[i].objName}.js`);
                    console.log(user.inventory.items[i].objName);
                    console.log(itemModule);
                    const itemClass = itemModule[user.inventory.items[i].objName];
                    user.inventory.items[i].item = new itemClass();
                    this.inventory.load(user.inventory);
                }
                resolve();
            }));
        });
    }
}
export let User = new UserClass();
