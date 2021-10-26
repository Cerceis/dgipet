import { ControlButton } from "../../VisualControls/Button.js"
import { Screen } from "../../Classes/Screen.js";
import { UserCreationScene } from "../UserCreationScene/UserCreationScene.js"
import { ControlContainer } from "../../VisualControls/Container.js";
import { Controller } from "../../Classes/Controller.js"

export class StartScreenScene{
	constructor(){
		this._startScene()
	}
	private async _startScene(): Promise<void>{
		const startGameBtn = new ControlButton("Start", "width:100%;");
		const loadGameBtn = new ControlButton("Load", "width:100%;");
		startGameBtn.bindFunc(()=>{
			console.log("Starting game")
			Screen.delete()
			new UserCreationScene()
		})
		loadGameBtn.bindFunc(()=>{
			console.log("Loading game...")
			console.log("Function not implemented...")
		})
		const menuContainer = new ControlContainer(
			[startGameBtn.ele, loadGameBtn.ele],
			"width: 30%; height: 20%;"
		);
		Screen.draw(menuContainer.ele, 50, 40, ["menuCon"]);
	}
}