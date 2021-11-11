var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BGM } from "./BGM.js";
import { ScreenClass } from "../GameEngine/Screen.js";
import { gsap } from "../../../exlib/GSAP/index.js";
import { Animator } from "./Animator.js";
import { Controller } from "./Controller.js";
import { ControlButton } from "../VisualControls/Button.js";
import { AI } from "./AI.js";
import { Dialog } from "../GameEngine/Dialog.js";
import { BattleStatusPanel } from "../VisualControls/BattleStatusPanel.js";
import { Inventory } from "./Inventory.js";
import { calEleCounter } from "../../Constants/ElementalCounter.js";
import { AttributeOperator } from "./AttributeOperator.js";
import { onRoundStart } from "./BattleEvents/onRoundStart.js";
import { TargetOpponent } from "./BattleEvents/TargetOpponent.js";
let checkHealthFlag = false;
export class Battle {
    constructor(player, opponent) {
        this.teamABattleStatusPanel = [];
        this.teamBBattleStatusPanel = [];
        this.battleScreen = new ScreenClass();
        this.turn = 1;
        this.actionQueue = []; //Determine who goes first
        this.currentQueue = 0;
        this.player = player;
        this.opponent = opponent;
    }
    start() {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            function nextStep(t) {
                t.currentQueue++;
                t.turn++;
                if (t.currentQueue >= t.actionQueue.length)
                    t.currentQueue = 0;
                t.currentTeamTurn = t.actionQueue[t.currentQueue].team;
            }
            //Clear controls
            Controller.delete();
            //Set BGM
            this.bgmPlayer = new BGM("8bit_Battle-By_Ruari1.mp3");
            //Background
            yield this.startScreen("plains.png");
            //Display info bar
            this.initBattleStatusPanel();
            //Calculate Speed
            this.calActionQueue();
            Dialog.setDialog([`${this.actionQueue[this.currentQueue].char.nickName} goes first.`]);
            yield Dialog.untilEnd();
            /*
                ┌───────────────────────────────────────────┐
                │                                           │
                │               Battle Loop                 │
                │                                           │
                └───────────────────────────────────────────┘
                Battle calculation event/steps
                1) onRoundStart - event
                2) Control step - step
                3) onCombatCalculation - event
                4) Combat calculation step START - step
                   4.1) onFinalDamage - event
                   Combat calculation step END - step
                5) onRoundEnd - event
            */
            while (true) {
                Dialog.clear();
                TargetOpponent.setAs(this.actionQueue[this.currentQueue].team === "A" ? this.opponent : this.player);
                //HP MP regen
                AttributeOperator.set(this.player)._(["hp"], `+${this.player.attr_health_regen_rate}`);
                AttributeOperator.set(this.player)._(["mp"], `+${this.player.attr_mana_regen_rate}`);
                AttributeOperator.set(this.opponent)._(["hp"], `+${this.opponent.attr_health_regen_rate}`);
                AttributeOperator.set(this.opponent)._(["mp"], `+${this.opponent.attr_mana_regen_rate}`);
                console.log(`Turn ${this.turn}`);
                /*
                    ┌───────────────────────────────────────────┐
                    │                                           │
                    │               onRoundStart                │
                    │                                           │
                    └───────────────────────────────────────────┘
                    Event when round is started, before any control actions.
                */
                //1)Run onRoundStart event
                yield onRoundStart.nextTick();
                yield onRoundStart.run();
                //2)Update ui
                this.updateBattleStatusPanel();
                //3)Check health
                this.checkHealth();
                if (checkHealthFlag)
                    break;
                /*
                    ┌───────────────────────────────────────────┐
                    │                                           │
                    │               Control Step                │
                    │                                           │
                    └───────────────────────────────────────────┘
                    Where player/ai choose their actions
                */
                //1)Run controlResult step
                const controlResult = this.actionQueue[this.currentQueue].team === "A" ?
                    yield this.playerTurn() :
                    yield this.opponentTurn();
                //if skill missed
                if (controlResult.type === "missed") {
                    Dialog.setDialog([`${this.actionQueue[this.currentQueue].char.nickName} missed.`]);
                    yield Dialog.untilEnd();
                    nextStep(this);
                    continue;
                }
                //2)Update ui
                this.updateBattleStatusPanel();
                //3)Check health
                this.checkHealth();
                if (checkHealthFlag)
                    break;
                /*
                    ┌───────────────────────────────────────────┐
                    │                                           │
                    │           Combat calculation step         │
                    │                                           │
                    └───────────────────────────────────────────┘
                    Deal damage after armor calcualtion.
                */
                //1)Run controlResult step
                this.combatCalculation(controlResult, this.currentTeamTurn === "A" ? this.player : this.opponent, TargetOpponent.class);
                //2)Update ui
                this.updateBattleStatusPanel();
                //3)Check health
                this.checkHealth();
                if (checkHealthFlag)
                    break;
                nextStep(this);
            }
            //Print who is fainted
            console.log("Battle ended");
            resolve();
        }));
    }
    checkHealth() {
        if (this.player.attr_health <= 0 || this.opponent.attr_health <= 0)
            checkHealthFlag = true;
    }
    initBattleStatusPanel() {
        const panelA = new BattleStatusPanel(this.player);
        this.teamABattleStatusPanel.push(panelA);
        this.battleScreen.draw(panelA.ele, 95, 95);
        panelA.update();
        const panelB = new BattleStatusPanel(this.opponent);
        this.teamBBattleStatusPanel.push(panelB);
        this.battleScreen.draw(panelB.ele, 5, 5);
        panelB.update();
    }
    updateBattleStatusPanel() {
        this.teamABattleStatusPanel.forEach(a => {
            a.update();
        });
        this.teamBBattleStatusPanel.forEach(b => {
            b.update();
        });
    }
    calActionQueue() {
        this.actionQueue = [{ team: "A", char: this.player }, { team: "B", char: this.opponent }];
        this.actionQueue = this.actionQueue.sort((a, b) => a.char.attr_speed - b.char.attr_speed);
        this.currentTeamTurn = this.actionQueue[0].team;
    }
    startScreen(background = "") {
        return __awaiter(this, void 0, void 0, function* () {
            //Might not need animator during production, since it's already animated
            //This section is disaster
            Animator.addResources([this.player.animation, this.opponent.animation]);
            Animator.start();
            this.battleScreen.bind(document.getElementById("gameScreenWrapper"));
            const screenHeight = this.battleScreen.ele.offsetHeight;
            const screenWidth = this.battleScreen.ele.offsetWidth;
            const boxContainer = document.createElement("div");
            const bgContainer = document.createElement("div");
            const boxHeight = Number((screenHeight / 8).toFixed(1));
            boxContainer.style.height = `${screenHeight}px`;
            boxContainer.style.width = `${screenWidth}px`;
            bgContainer.style.height = `${screenHeight}px`;
            bgContainer.style.width = `${screenWidth}px`;
            if (background) {
                bgContainer.style.background = `url(../../assets/backgrounds/${background})`;
                bgContainer.style.backgroundPosition = `center`;
                bgContainer.style.backgroundSize = `cover`;
                bgContainer.style.backgroundRepeat = `norepeat`;
                bgContainer.style.opacity = "0";
            }
            for (let i = 0; i < 4; i++) {
                const boxLeftStyle = `
				position:absolute;
				top:${boxHeight * i}px;
				left:-100%;
				width:100%;
				background:rgb(0,0,0);
				height:${boxHeight}px;
			`;
                const boxRightStyle = `
				position:absolute;
				bottom:${boxHeight * i}px;
				right:-100%;
				width:100%;
				background:rgb(0,0,0);
				height:${boxHeight}px;
			`;
                const boxLeft = document.createElement("div");
                const boxRight = document.createElement("div");
                boxLeft.setAttribute("style", boxLeftStyle);
                boxRight.setAttribute("style", boxRightStyle);
                boxLeft.setAttribute("class", "screenBoxLeft");
                boxRight.setAttribute("class", "screenBoxRight");
                boxContainer.appendChild(boxLeft);
                boxContainer.appendChild(boxRight);
            }
            this.battleScreen.draw(bgContainer, 0, 0);
            this.battleScreen.draw(this.player.ele, 5, 95);
            this.battleScreen.draw(this.opponent.ele, 95, -50);
            gsap.set(this.player.ele, { opacity: 0, transform: "rotateY(180deg)" });
            gsap.set(this.opponent.ele, { opacity: 0 });
            this.battleScreen.draw(boxContainer, 0, 0, ["box"]);
            gsap.to(".screenBoxLeft", { left: "0", duration: 0.7, stagger: 0.1 });
            yield gsap.to(".screenBoxRight", { right: "0", duration: 0.7, stagger: 0.1 });
            bgContainer.style.opacity = "1";
            const circle = document.createElement("div");
            const circleStyle = `
			position:absolute;
			width:${screenWidth}px;
			height:${screenHeight}px;
			z-index:10;
			box-shadow: 0 0 0 ${screenHeight}px inset rgba(0, 0, 0, 1);
		`;
            circle.setAttribute("style", circleStyle);
            circle.setAttribute("class", "centerCircle");
            boxContainer.innerHTML = "";
            boxContainer.appendChild(circle);
            yield gsap.to(".centerCircle", { boxShadow: "0px 0px 0px 0px inset rgba(0, 0, 0, 1)", duration: 0.7 });
            gsap.to(this.player.ele, { opacity: 1, x: "5%", y: "-95%", rotationY: "180deg" });
            gsap.to(this.opponent.ele, { opacity: 1, top: "1%", x: "-95%", y: "1%", });
            this.battleScreen.delete(["box"]);
        });
    }
    combatCalculation(controlResult, attacker, defender) {
        if (controlResult.damage > 0) {
            let trueDamage = 0;
            if (controlResult.type === "physical") {
                trueDamage = controlResult.damage * 2 / defender.attr_physical_defense;
                trueDamage *= calEleCounter([attacker.attr_element], [defender.attr_element]);
                trueDamage = 1 + Number(trueDamage.toFixed(3));
            }
            if (controlResult.type === "magical") {
                trueDamage = controlResult.damage * 2 / defender.attr_skill_defense;
                trueDamage *= calEleCounter([attacker.attr_element], [defender.attr_element]);
                trueDamage = 1 + Number(trueDamage.toFixed(3));
            }
            AttributeOperator.set(defender)._(["hp"], `-${trueDamage}`);
        }
    }
    //Still in development, need to find a better scale.
    missed(skillType) {
        if (skillType !== "physical" && skillType !== "magical")
            return false;
        let hitChance = this.player.attr_accuracy - this.opponent.attr_speed;
        if (hitChance <= 0)
            hitChance = 0;
        hitChance = (hitChance + 50) / 100;
        const roll = Math.random();
        //Currently always return false, not missed.
        return false;
        if (roll > hitChance)
            return true;
        else
            false;
    }
    playerTurn() {
        return new Promise(resolve => {
            const inventoryBtn = new ControlButton(`Inventory`);
            inventoryBtn.bindFunc(() => __awaiter(this, void 0, void 0, function* () {
                yield Inventory.open();
                Inventory.close();
                Controller.delete();
                resolve({
                    type: "item",
                    damage: 0
                });
            }));
            Controller.add([inventoryBtn.ele]);
            this.player.skills.forEach(skill => {
                const skillBtn = new ControlButton(skill.label, skill.skillIcon);
                skillBtn.bindFunc(() => __awaiter(this, void 0, void 0, function* () {
                    Controller.delete();
                    const skillDamage = yield skill.use();
                    if (this.missed(skill.type)) {
                        resolve({
                            type: "missed",
                            damage: 0
                        });
                        return;
                    }
                    if ((skill.type === "physical" || skill.type === "magical") &&
                        skillDamage > 0) {
                        console.log(skillDamage);
                        yield this.enemyHitAnimation();
                    }
                    resolve({
                        type: skill.type,
                        damage: skillDamage
                    });
                }));
                Controller.add([skillBtn.ele]);
            });
        });
    }
    opponentTurn() {
        const ai = new AI(this.opponent);
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const aiSkillResult = yield ai.useSkill();
            //Need to check skill type
            if (this.missed(aiSkillResult.type)) {
                resolve({
                    type: "missed",
                    damage: 0
                });
                return;
            }
            if ((aiSkillResult.type === "physical" || aiSkillResult.type === "magical") &&
                aiSkillResult.damage > 0) {
                console.log(aiSkillResult.damage);
                yield this.selfHitAnimation();
            }
            resolve(aiSkillResult);
        }));
    }
    enemyHitAnimation() {
        return __awaiter(this, void 0, void 0, function* () {
            yield gsap.to(this.opponent.ele, { x: "+=30px", yoyo: true, repeat: 5, duration: 0.1 });
        });
    }
    selfHitAnimation() {
        return __awaiter(this, void 0, void 0, function* () {
            yield gsap.to(this.player.ele, { x: "+=30px", yoyo: true, repeat: 5, duration: 0.1 });
        });
    }
}
