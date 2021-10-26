export interface Emote{	
	idle: string[],
	angry?: string[],
	happy?: string[],
}

export type EmoteType = "idle" | "angry" | "happy"