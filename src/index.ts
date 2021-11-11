import { KeyboardController } from "./Classes/GameEngine/KeyboardController.js";
import { StartScreenScene } from "./Scenes/StartScreenScene/StartScreenScene.js";
import { Screen } from "./Classes/GameEngine/Screen.js";
import { Controller } from "./Classes/GameEngine/Controller.js";
import { Dialog } from "./Classes/GameEngine/Dialog.js";
import { initComponents } from "./Classes/WebComponents/main.js";
import { gsap } from "../exlib/GSAP/index.js"

initComponents();

let GameInitiator = function () {
    new KeyboardController();
    Screen.bind(document.getElementById("gameScreenWrapper"));
    Controller.bind(document.getElementById("controlPanel"));
    document.getElementById("dialogPanel").appendChild(Dialog.ele);
    Dialog.toggleCursor(false);
    new StartScreenScene();
};
GameInitiator();





//Debug

import { Snackbar } from "./Classes/VisualControls/SnackBar.js"
import { User } from "./Classes/GameEngine/User.js"
import { ControlDialog } from "./Classes/VisualControls/Dialog.js"
import { RawMeat } from "./Classes/GameObjects/Items/RawMeat.js"
import { Steak } from "./Classes/GameObjects/Items/Steak.js"
import { SkillBook } from "./Classes/GameObjects/Items/SkillBook.js"
import { Nyaromon } from "./Classes/Characters/Nyaromon.js"
import { BlackGrowmon } from "./Classes/Characters/BlackGrowmon.js"
import { calEleCounter } from "./Constants/ElementalCounter.js"
import { Battle } from "./Classes/GameEngine/Battle.js"
import { onRoundStart } from "./Classes/GameEngine/BattleEvents/onRoundStart.js"
import { AttributeOperator } from "./Classes/GameEngine/AttributeOperator.js";

const debugPanel = document.getElementById("debugPanel");

const testBtn = document.createElement("button")
testBtn.textContent = "Add Raw meat"
testBtn.onclick = () => {
	const tmp = new RawMeat()
	User.inventory.addItems([tmp]);
	User.inventory.addItems([new SkillBook("Tackle")]);
	Snackbar.add("Item added", "<g-icon name='rawMeat'></g-icon> Raw meat x 1", 5000)
	Snackbar.add("Item added", "<g-icon name='skillBook'></g-icon> Skill book x 1", 5000)
}


const testBtn2 = document.createElement("button")
testBtn2.textContent = "Add Steak"
testBtn2.onclick = () => {
	const tmp = new Steak()
	User.inventory.addItems([tmp]);
	Snackbar.add("Item added", "<g-icon name='steak'></g-icon> Steak x 1", 5000)
}

const inventoryBtn = document.createElement("button")
inventoryBtn.textContent = "Inventory"
inventoryBtn.onclick = () => {
	User.inventory.open()
}

const c1 = new Nyaromon();
const c2 = new BlackGrowmon();
c1.addExp(600)
//c2.addExp(450);

User.partner = c1

console.log(c1)
console.log(c2)

AttributeOperator.set(c1)._(["maxHp", "maxMp", "hp", "mp"], "+100%");
console.log(c1)

const battleBtn = document.createElement("button")
battleBtn.textContent = "Start battle"
battleBtn.onclick = async () => {
	const btl = new Battle(c1,c2)
	await btl.start()
}

debugPanel.appendChild(testBtn);
debugPanel.appendChild(testBtn2);
debugPanel.appendChild(inventoryBtn);
debugPanel.appendChild(battleBtn);
	




