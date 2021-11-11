const fs = require("fs");
const path = require("path");

module.exports = (name) => {
	
	const statusEffectPath = `${process.cwd()}/src/Classes/StatusEffects/`
	
	const content = `import { Character } from "../../Types/Characters";
import { GenerateObjectId } from "../../lib/GenerateObjectId.js";
import { StatusType } from "../../Types/StatusEffects.js";
import { AttributeOperator } from "../GameEngine/AttributeOperator.js";
//all StatusEffects must have:
// activate()
// deactivate()

export class Status${name}{
	public trackerId: string = GenerateObjectId()
	public effectStackable: boolean = false;
	public maxStack: number = 1;
	public type: StatusType = ""
	public name: string = "Status${name}" //This is internal name.
	public label: string = "${name}" //This is that the tooltips display as
	public icon: string = \`\`
	public description: string = \`
		description for ${name}
	\`
	public char: Character;
	private _cache: any;

	constructor(char: Character) { this.char = char}
	
	public activate(): void{}

	public deactivate(): void{}
}
	`
	fs.writeFileSync(`${statusEffectPath}/Status${name}.ts`, content)

	const statusEffectTypePath = `${process.cwd()}/src/Types/StatusEffects.ts`

	const typeContent = fs.readFileSync(statusEffectTypePath).toString()
	const contentArr = typeContent.split("\n")
	
	const sections = {
		"1":[],
		"2":[],
		"3":[],
		"4":[]
	}
	let currentSectionNo = 1;
	contentArr.forEach((line, index) => {
		if(line === ''){
			sections[currentSectionNo] = contentArr.splice(0, index)
			currentSectionNo++
		}
	});

	sections["1"].push(`import { Status${name} } from "../Classes/StatusEffects/Status${name}.js"`)
	
	sections["3"][sections["3"].length-1] += "|"
	sections["3"].push(`Status${name}`)

	sections["4"][sections["4"].length-2] += "|"
	sections["4"][sections["4"].length-1] = `"Status${name}"`

	let final = ""
	for(let sec in sections){
		let s = sections[sec]
		s = s.join("\n")
		final += s + "\n"
	}

	fs.writeFileSync(statusEffectTypePath, final)
}