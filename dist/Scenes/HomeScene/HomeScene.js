var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Screen } from "../../Classes/GameEngine/Screen.js";
import { Controller } from "../../Classes/GameEngine/Controller.js";
import { Animator } from "../../Classes/GameEngine/Animator.js";
import { User } from "../../Classes/GameEngine/User.js";
import { SaveGame } from "../../Classes/GameEngine/Save.js";
import { ControlButton } from "../../Classes/VisualControls/Button.js";
export class HomeScene {
    constructor() {
        this._startScene();
    }
    _startScene() {
        return __awaiter(this, void 0, void 0, function* () {
            const userPartner = User.partner;
            console.log(userPartner);
            Animator.start();
            Screen.draw(userPartner.ele, 50, 50);
            const menu = [
                {
                    controls: new ControlButton("<i class='i-save'></i> Save"),
                    func() { SaveGame(User); }
                },
                {
                    controls: new ControlButton("Partner Info"),
                    func() {
                        console.log("Accessing Partner Info");
                    }
                },
                {
                    controls: new ControlButton("Inventory"),
                    func() {
                        console.log("Opening Inventory");
                    }
                }
            ];
            menu.forEach(m => {
                m.controls.bindFunc(m.func);
                Controller.add([m.controls.ele]);
            });
        });
    }
}
