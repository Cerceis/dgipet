import { StatusRage } from "../Classes/StatusEffects/StatusRage.js"
import { StatusBarrier } from "../Classes/StatusEffects/StatusBarrier.js"
import { StatusWeaken } from "../Classes/StatusEffects/StatusWeaken.js"
import { StatusPoison } from "../Classes/StatusEffects/StatusPoison.js"

export type StatusType = "buff" | "debuff"

export type StatusEffectName = 
"StatusRage" |
"StatusBarrier" |
"StatusWeaken" |
"StatusPoison" 

export type StatusEffects =
StatusRage |
StatusBarrier |
StatusWeaken |
StatusPoison 

