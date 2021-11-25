export interface Emote{	
	idle: string[],
	angry?: string[],
	happy?: string[],
	asleep?: string[],
	eat?: string[]
	weak?: string[]
}

export type EmoteType = "idle" | "angry" | "happy" | "asleep" | "eat" | "weak"