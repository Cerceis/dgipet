import { Tackle } from "../Classes/Skills/Tackle.js"
import { Rage } from "../Classes/Skills/Rage.js"

export type Skill =
	Tackle | 
	Rage

export type SkillName =
	"Tackle" |
	"Rage" 