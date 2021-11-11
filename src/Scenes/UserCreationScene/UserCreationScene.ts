import { GetRandom } from "../../lib/GetRandom.js";
import { Dialog } from "../../Classes/GameEngine/Dialog.js";
import { ControlInput } from "../../Classes/VisualControls/Input.js"
import { Controller } from "../../Classes/GameEngine/Controller.js";
import { Screen } from "../../Classes/GameEngine/Screen.js";
import { ControlButton } from "../../Classes/VisualControls/Button.js";
import { Sound } from "../../Classes/GameEngine/Sound.js";
import { Animator } from "../../Classes/GameEngine/Animator.js";
import { User } from "../../Classes/GameEngine/User.js";
import { gsap } from "../../../exlib/GSAP/index.js";
import { Character } from "../../Types/Characters.js";
import { HomeScene } from "../HomeScene/HomeScene.js";
import { RawMeat } from "../../Classes/GameObjects/Items/RawMeat.js"
import { Steak } from "../../Classes/GameObjects/Items/Steak.js"
import { Snackbar } from "../../Classes/VisualControls/SnackBar.js"

import dlg from "./dialogs/main.js"

const listOfPossibleStarters: string[] = [
	"Nyaromon", "Popomon", "Jyarimon"
]

const numbersOfCandidate: number = 2;

export class UserCreationScene{

	//public animator: Animator = new Animator(300);
	public candidates: any[] = [];
	public candidatesClass: any[] = [];
	private _imports: any = {};
	public userName: string = "";

	constructor(){
		//Logics
		this.candidates = GetRandom([...listOfPossibleStarters], numbersOfCandidate, true);
		this.initImports()
		this._startScene()
	}
	private async _startScene(): Promise<void>{
		await this._part1();
		new Sound("reward.wav");
		const selectedPartner: Character = await this._part2();
		User.partner = selectedPartner
		this.candidatesClass.forEach(candidate => {
			if(candidate.name !== selectedPartner.name){
				gsap.to(candidate.ele, { opacity: 0 , duration: .5 });
			}else{
				gsap.to(candidate.ele, {left:"50%", top:"50%", x:"-50%", y:"-50%", duration: .5, overwrite: true });
			}
		})
		await this._part3(selectedPartner.name);
		Dialog.clear();
		Screen.delete();
		new HomeScene();
	}
	private async initImports(): Promise<void>{
		for(let i = 0; i<this.candidates.length; i++){
			let candidate = this.candidates[i];
			this._imports[candidate] = await import(`./../../Classes/Characters/${candidate}.js`) 
			this.candidatesClass.push(new this._imports[candidate][candidate])
		}
	}

	private _part1(): Promise<void>{
		return new Promise(async(resolve)=>{
			Dialog.addGlossary([
				{
					tag: "numberOfCandidate",
					type: "text",
					value: numbersOfCandidate.toString()
				},
			])
			Dialog.setDialog(dlg.D001)
			await Dialog.untilEnd()
			const userNameInput = new ControlInput("What is your name?", 2, 12)
			const userNameBtn = new ControlButton("Confirm")
			userNameBtn.ele.disabled = true
			userNameInput.bindEvent("keydown", ()=>{
				if(userNameInput.value.length >= 2 && userNameInput.value.length <= 12)
					userNameBtn.ele.disabled = false
				else userNameBtn.ele.disabled = true
			})
			userNameBtn.bindFunc(()=>{
				this.userName = userNameInput.value;
				User.name = this.userName
				console.log(User)
				Controller.delete()
				resolve()
			})
			Controller.add([userNameInput.ele, userNameBtn.ele])
		})
	}

	private _part2(): Promise<Character>{
		return new Promise(async(resolve) => {
			Dialog.addGlossary([
				{
					tag: "playerName",
					type: "text",
					value: this.userName
				},
				{
					tag:"showCandidate",
					type:"function",
					value: () => {
						Animator.addResources([
							this.candidatesClass[0].animation, this.candidatesClass[1].animation
						])	
						this.candidatesClass[0].ele.style.filter = "brightness(30%)"
						this.candidatesClass[1].ele.style.filter = "brightness(30%)"
						Screen.draw(this.candidatesClass[0].ele, 25, 50);
						Screen.draw(this.candidatesClass[1].ele, 75, 50);
						Animator.start();
					}
				}
			])
			Dialog.setDialog(dlg.D002)
			await Dialog.untilEnd()
			let candidateBtns = []
			for(let i = 0; i<this.candidatesClass.length; i++){
				candidateBtns.push(new ControlButton(this.candidatesClass[i].name))
				candidateBtns[i].ele.addEventListener("mouseover", ()=>{
					this.candidatesClass[i].ele.style.filter = "brightness(100%)";
					this.candidatesClass[i].make("happy")
				}) 
				candidateBtns[i].ele.addEventListener("mouseleave", ()=>{
					this.candidatesClass[i].ele.style.filter = "brightness(30%)";
					this.candidatesClass[i].make("idle")
				}) 
				candidateBtns[i].bindFunc(()=> {
					Controller.delete()
					resolve(this.candidatesClass[i])
				}) 
				Controller.add([candidateBtns[i].ele]);
			}
			
		})
	}

	private _part3(partnerName: string): Promise<void> {
		return new Promise(async (resolve)=>{
			Dialog.addGlossary([
				{
					tag: "partnerName",
					type: "text",
					value: partnerName
				},
				{
					tag: "addItems",
					type: "function",
					value(){
						User.inventory.addItems([
							new RawMeat(), new RawMeat(), new RawMeat(),
							new Steak() 
						])
						Snackbar.add("Item added", "<g-icon name='rawMeat'></g-icon> Raw Meat x 3", 5000)
						Snackbar.add("Item added", "<g-icon name='steak'></g-icon> Steak x 1", 5000)
					}
					
				}
			])
			Dialog.setDialog(dlg.D003)
			await Dialog.untilEnd()
			const questions: any = [
				{
					control: new ControlButton("Who are you ?"),
					async func(){
						Controller.hide(true)
						Dialog.setDialog(dlg.V003a1)
						await Dialog.untilEnd()
						Controller.hide(false)
					}
				},
				{
					control: new ControlButton("What is this place ?"),
					async func(){
						Controller.hide()
						Dialog.setDialog(dlg.V003b1)
						await Dialog.untilEnd()
						Controller.hide(false)
					}
				},
				{
					control: new ControlButton("What are these... creatures ?"),
					async func(){
						Controller.hide()
						Dialog.setDialog(dlg.V003c1)
						await Dialog.untilEnd()
						Controller.hide(false)
					}
				},
				{
					control: new ControlButton("Nothing, let's go!"),
					async func(){
						Controller.delete()
						Dialog.setDialog(dlg.V003d1)
						await Dialog.untilEnd()
						resolve()
					}
				}
			]
			for(let i = 0; i<questions.length ; i++){
				questions[i].control.bindFunc(questions[i].func)
				Controller.add([questions[i].control.ele])
			}

		})
	}

}