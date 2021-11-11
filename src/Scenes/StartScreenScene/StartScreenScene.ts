import { ControlButton } from "../../Classes/VisualControls/Button.js"
import { Screen } from "../../Classes/GameEngine/Screen.js";
import { UserCreationScene } from "../UserCreationScene/UserCreationScene.js"
import { ControlContainer } from "../../Classes/VisualControls/Container.js";
import { LoadGame } from "../../Classes/GameEngine/Load.js";
import { HomeScene } from "../HomeScene/HomeScene.js";
import { Sound } from "../../Classes/GameEngine/Sound.js";

export class StartScreenScene{
	constructor(){
		this._startScene()
	}
	private async _startScene(): Promise<void>{
		const startGameBtn = new ControlButton("Start", "","width:100%;");
		const loadGameBtn = new ControlButton("Load(Not working yet)","", "width:100%;");
		startGameBtn.bindFunc(()=>{
			Screen.delete()
			new UserCreationScene()
		})
		loadGameBtn.bindFunc(async()=>{
			await LoadGame()
			Screen.delete()
			new Sound("achievement.wav")
			new HomeScene()
		})
		const menuContainer = new ControlContainer(
			[startGameBtn.ele, loadGameBtn.ele],
			"width: 30%; height: 20%;"
		);
		Screen.draw(menuContainer.ele, 50, 40, ["menuCon"]);
	}
}