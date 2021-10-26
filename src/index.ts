import { KeyboardController } from "./Classes/KeyboardController.js";
import { StartScreenScene } from "./Scenes/StartScreenScene/StartScreenScene.js";
import { Screen } from "./Classes/Screen.js";
import { Controller } from "./Classes/Controller.js";
import { Dialog } from "./Classes/Dialog.js";
var gameTick = 300; //Miliseconds
var GameInitiator = function () {
    new KeyboardController();
    Screen.bind(document.getElementById("gameScreenWrapper"));
    Controller.bind(document.getElementById("controlPanel"));
    document.getElementById("dialogPanel").appendChild(Dialog.ele);
    Dialog.toggleCursor(false);
    new StartScreenScene();
};
GameInitiator();
