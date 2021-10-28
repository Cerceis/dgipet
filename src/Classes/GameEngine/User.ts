import { GenerateObjectId } from "../../lib/GenerateObjectId.js"
import { Character } from "../../Types/Characters.js"
import { Animator } from "./Animator.js"

class UserClass{
	public id: string = "";
	public name: string = "";
	public partners: Character[] = [];
	public experience: number 

	constructor(){
		this.id = GenerateObjectId()
	}

	public async loadUser(user: any): Promise<void>{
		return new Promise(async (resolve) =>{
			this.id = user.id;
			this.name = user.name;
			this.experience = user.experience;
			for(let i = 0; i<user.partners.length ; i++){
				const partnerModule = await import(`../Characters/${user.partners[i].name}.js`) ;
				const partnerClass = partnerModule[user.partners[i].name];
				this.partners[i] = new partnerClass();
				this.partners[i].load(user.partners[i]);
				Animator.addResources(this.partners[i].animation);
			}
			resolve()
		})
	
	}
}
export let User = new UserClass();