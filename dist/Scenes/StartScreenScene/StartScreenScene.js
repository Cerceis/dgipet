var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ControlButton } from "../../Classes/VisualControls/Button.js";
import { Screen } from "../../Classes/GameEngine/Screen.js";
import { UserCreationScene } from "../UserCreationScene/UserCreationScene.js";
import { ControlContainer } from "../../Classes/VisualControls/Container.js";
import { LoadGame } from "../../Classes/GameEngine/Load.js";
import { HomeScene } from "../HomeScene/HomeScene.js";
import { Sound } from "../../Classes/GameEngine/Sound.js";
export class StartScreenScene {
    constructor() {
        this._startScene();
    }
    _startScene() {
        return __awaiter(this, void 0, void 0, function* () {
            const startGameBtn = new ControlButton("Start", "", "width:100%;");
            const loadGameBtn = new ControlButton("Load", "", "width:100%;");
            startGameBtn.bindFunc(() => {
                Screen.delete();
                new UserCreationScene();
            });
            loadGameBtn.bindFunc(() => __awaiter(this, void 0, void 0, function* () {
                yield LoadGame();
                Screen.delete();
                new Sound("achievement.wav");
                new HomeScene();
            }));
            const menuContainer = new ControlContainer([startGameBtn.ele, loadGameBtn.ele], "width: 30%; height: 20%;");
            Screen.draw(menuContainer.ele, 50, 40, ["menuCon"]);
        });
    }
}
