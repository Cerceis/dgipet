import { GenerateObjectId } from "../../lib/GenerateObjectId.js"
import { Character } from "../../Types/Characters.js"
import { Animator } from "./Animator.js"
import { Inventory } from "./Inventory.js"

class UserClass{
	public id: string = "";
	public name: string = "";
	public partner: Character;
	public experience: number 
	public inventory = Inventory;

	constructor(){
		this.id = GenerateObjectId()
	}

	public async loadUser(user: any): Promise<void>{
		return new Promise(async (resolve) =>{
			this.id = user.id;
			this.name = user.name;
			this.experience = user.experience;


			const partnerModule = await import(`../Characters/${user.partner.name}.js`) ;
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
			for(let i = 0; i<user.inventory.items.length ; i++){
				const itemModule = await import(`../GameObjects/Items/${user.inventory.items[i].objName}.js`) ;
				console.log(user.inventory.items[i].objName)
				console.log(itemModule)
				const itemClass = itemModule[user.inventory.items[i].objName];
				user.inventory.items[i].item = new itemClass();
				this.inventory.load(user.inventory)
			}
			resolve()
		})
	
	}
}
export let User = new UserClass();