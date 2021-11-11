import { Character } from "../../Types/Characters.js";
import { LevelParser } from "../GameEngine/LevelParser.js";

export class BattleStatusPanel{

	public ele: HTMLDivElement = document.createElement("div");
	public ele_infoCon: HTMLDivElement = document.createElement("div"); 
	public ele_name: HTMLDivElement = document.createElement("div"); 
	public ele_level: HTMLDivElement = document.createElement("div"); 
	public ele_healthBar: HTMLDivElement = document.createElement("div"); 
	public ele_healthBarInner: HTMLDivElement = document.createElement("div"); 
	public ele_healthInfo: HTMLSpanElement = document.createElement("span");
	public ele_manaBar: HTMLDivElement = document.createElement("div"); 
	public ele_manaBarInner: HTMLDivElement = document.createElement("div");
	public ele_manaInfo: HTMLSpanElement = document.createElement("span"); 
	public ele_statusBarCon: HTMLDivElement = document.createElement("div"); 
	public char: Character;

	public statusList: string[] = []
	
	constructor(char: Character){
		this.ele_healthInfo.setAttribute("style", "position:absolute; top:50%; left:50%; transform:translate(-50%, -50%)");
		this.ele_manaInfo.setAttribute("style", "position:absolute; top:50%; left:50%; transform:translate(-50%, -50%)");
		const eleStyle: string = `
			display:grid;
			align-content:start;
			gap:.2em;
			width:55%;
			height:35%;
			max-width:250px;
			max-height:90px;
			background:rgb(100,100,100);
			border: 1px solid rgba(150,150,150, .7);
			border-radius: 10px;
			padding:.5em;
		`
		this.ele.setAttribute("style", eleStyle);
		//INFO
		const infoConStyle: string = `
			display:flex;
			align-items:center;
			justify-content:space-between;
		`
		this.ele_infoCon.setAttribute("style", infoConStyle);
		this.ele_name.setAttribute("style", "color:white; font-size:50%;");
		this.ele_level.setAttribute("style", "color:white; font-size:50%;");
		this.ele_name.textContent = char.nickName;
		this.ele_level.textContent = `Lv.${LevelParser(char.experience).level}`;
		this.ele_infoCon.appendChild(this.ele_name);
		this.ele_infoCon.appendChild(this.ele_level);
		//INFO END
		const healthBarStyle: string = `
			position:relative;
			display:flex;
			align-items:center;
			overflow: hidden;
			color:white;
			height:15px;
			width:100%;
			background: rgb(75,75,75);
			border:1px solid rgb(55,55,55);
			border-radius: 20px;
			font-size:50%;
		`
		this.ele_healthBar.setAttribute("style", healthBarStyle);
		const healthBarInnerStyle: string = `
			display:flex;
			align-items:center;
			justify-content:center;
			overflow: hidden;
			height: 100%;
			width: ${this.ele_healthBar.offsetWidth}px;
			background: red;
			transition: all .2s;
		`
		this.ele_healthBarInner.setAttribute("style", healthBarInnerStyle)
		this.ele_healthBar.appendChild(this.ele_healthInfo)
		this.ele_healthBar.appendChild(this.ele_healthBarInner)
		const manaBarStyle: string = `
			position:relative;
			display:flex;
			align-items:center;
			overflow:hidden;
			color:white;
			height:15px;
			width:100%;
			background:rgb(75,75,75);
			border:1px solid rgb(55,55,55);
			border-radius: 20px;
			font-size:50%;
		`
		this.ele_manaBar.setAttribute("style", manaBarStyle);
		const manaBarInnerStyle: string = `
			display:flex;
			align-items:center;
			justify-content:center;
			overflow: hidden;
			height: 100%;
			width: ${this.ele_manaBar.offsetWidth}px;
			background: blue;
			transition: all .2s;
		`
		this.ele_manaBarInner.setAttribute("style", manaBarInnerStyle)
		this.ele_manaBar.appendChild(this.ele_manaInfo)
		this.ele_manaBar.appendChild(this.ele_manaBarInner)
		const statusBarConStyle: string = `
			display:grid;
			grid-auto-flow: column;
			justify-content: start;
			align-items: center;
		`
		this.ele_statusBarCon.setAttribute("style", statusBarConStyle);
		this.ele.appendChild(this.ele_infoCon);
		this.ele.appendChild(this.ele_healthBar);
		this.ele.appendChild(this.ele_manaBar);
		this.ele.appendChild(this.ele_statusBarCon);
		this.char = char;
	}

	public update(char?: Character): void{
		if(char) this.char = char;
		this.ele_healthBarInner.style.width = `${(this.char.attr_health/this.char.attr_health_max)*this.ele_healthBar.offsetWidth+3}px`
		this.ele_healthInfo.textContent = `${this.char.attr_health.toFixed(0)}/${this.char.attr_health_max.toFixed(0)}`;
		this.ele_manaBarInner.style.width = `${(this.char.attr_mana/this.char.attr_mana_max)*this.ele_manaBar.offsetWidth+3}px`
		this.ele_manaInfo.textContent = `${this.char.attr_mana.toFixed(0)}/${this.char.attr_mana_max.toFixed(0)}`;
		this.ele_statusBarCon.innerHTML = ""
		this.statusList = this.char.statusEffects.map(s => s.status.icon)
		this.statusList.forEach(status => {
			this.ele_statusBarCon.innerHTML += status;
		});
	}
}