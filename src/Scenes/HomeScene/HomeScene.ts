import { Screen } from "../../Classes/GameEngine/Screen.js";
import { Controller } from "../../Classes/GameEngine/Controller.js";
import { Animator } from "../../Classes/GameEngine/Animator.js";
import { User } from "../../Classes/GameEngine/User.js";
import { SaveGame } from "../../Classes/GameEngine/Save.js"

import { ControlButton } from "../../Classes/VisualControls/Button.js";

export class HomeScene{
	constructor(){
		this._startScene()
	}
	private async _startScene(): Promise<void>{
		const userPartner = User.partners[0]
		console.log(userPartner)
		Animator.start();
		Screen.draw(userPartner.ele, 50, 50)
		
		const menu = [
			{
				controls: new ControlButton("<i class='i-save'></i> Save"),
				func(){ SaveGame(User) } 
			},
			{
				controls: new ControlButton("Partner Info"),
				func(){
					console.log("Accessing Partner Info")
				}
			},
			{
				controls: new ControlButton("Inventory"),
				func(){
					console.log("Opening Inventory")
				}
			}
		]
		menu.forEach(m => {
			m.controls.bindFunc(m.func)
			Controller.add([m.controls.ele])
		})
		
	}
}