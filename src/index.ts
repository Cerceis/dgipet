import { KeyboardController } from "./Classes/GameEngine/KeyboardController.js";
import { StartScreenScene } from "./Scenes/StartScreenScene/StartScreenScene.js";
import { Screen } from "./Classes/GameEngine/Screen.js";
import { Controller } from "./Classes/GameEngine/Controller.js";
import { Dialog } from "./Classes/GameEngine/Dialog.js";

let GameInitiator = function () {
    new KeyboardController();
    Screen.bind(document.getElementById("gameScreenWrapper"));
    Controller.bind(document.getElementById("controlPanel"));
    document.getElementById("dialogPanel").appendChild(Dialog.ele);
    Dialog.toggleCursor(false);
    new StartScreenScene();
};
GameInitiator();

