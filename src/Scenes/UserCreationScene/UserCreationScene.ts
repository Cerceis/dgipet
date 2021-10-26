import { GetRandom } from "../../lib/GetRandom.js";
import { Dialog } from "../../Classes/Dialog.js";
import { ControlInput } from "../../VisualControls/Input.js"
import { Controller } from "../../Classes/Controller.js";
import { Screen } from "../../Classes/Screen.js";
import dlg from "./UserCreationSceneDialogs.js"
import { ControlButton } from "../../VisualControls/Button.js";
import { Sound } from "../../Classes/Sound.js";
import { Animator } from "../../Classes/Animator.js";
import { User } from "../../Classes/User.js";

const listOfPossibleStarters: string[] = [
	"Nyaromon", "Popomon", "Jyarimon"
]

const numbersOfCandidate: number = 2;

export class UserCreationScene{

	public animator: Animator = new Animator(300);
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
		//Add Glossary to dialogs
		Dialog.addGlossary([
			{
				tag: "numberOfCandidate",
				type: "text",
				value: numbersOfCandidate.toString()
			},
		])
		await this._part1();
		new Sound("../../assets/sound-effects/generals/reward.wav");
		await this._part2();
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

	private _part2(): Promise<void>{
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
						this.animator.addResources([
							this.candidatesClass[0].animation, this.candidatesClass[1].animation
						])	
						this.candidatesClass[0].ele.style.filter = "brightness(30%)"
						this.candidatesClass[1].ele.style.filter = "brightness(30%)"
						Screen.draw(this.candidatesClass[0].ele, 25, 50);
						Screen.draw(this.candidatesClass[1].ele, 75, 50);
						this.animator.start();
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
					console.log(`You selected ${this.candidatesClass[i].name}`)
				}) 
				Controller.add([candidateBtns[i].ele]);
			}
			
		})
	}

}