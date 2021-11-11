export interface onRoundStartEvent{
	trackerId: string,
	ticksUntilExp: number, //Important turn includes opponent turn! ex) 6 turn = 3 self turn
	triggered?: boolean,
	onTrigger?:Function,
	onEvery?: Function,
	onExpire?: Function
}

class onRoundStartClass{
	constructor(){}

	private _onRoundStartEventList : onRoundStartEvent[] = []

	get onRoundStartEventList(): onRoundStartEvent[]{ return this._onRoundStartEventList }

	public async run(): Promise<void>{
		for(let i = 0; i<this._onRoundStartEventList.length ; i++){
			if(this._onRoundStartEventList[i].triggered === false && this._onRoundStartEventList[i].onTrigger){
				await this._onRoundStartEventList[i].onTrigger();
				this._onRoundStartEventList[i].triggered = true
			}
			await this._onRoundStartEventList[i].onEvery()
		}
			
	}
	public async nextTick(): Promise<void>{
		for(let i = 0; i<this._onRoundStartEventList.length ; i++)
			this._onRoundStartEventList[i].ticksUntilExp -= 1;
		let expiredId: string[] = []
		for(let i = 0; i<this._onRoundStartEventList.length ; i++){
			if(this._onRoundStartEventList[i].ticksUntilExp === 0){
				await this._onRoundStartEventList[i].onExpire()
				this._onRoundStartEventList[i].trackerId
				expiredId.push(this._onRoundStartEventList[i].trackerId)
			}
		}
		if(expiredId.length > 0) this.deleteEvent(expiredId)
	}
	public addEvent(event: onRoundStartEvent): void{
		let tmp = {
			trackerId: event.trackerId,
			ticksUntilExp: event.ticksUntilExp, //Important turn includes opponent turn! ex) 6 turn = 3 self turn
			triggered:false, // Private
			async onTrigger(){ event.onTrigger? await event.onTrigger() : null },
			async onEvery(){ event.onEvery? await event.onEvery() : null },
			async onExpire(){ event.onExpire? await event.onExpire() : null },
		}
		this._onRoundStartEventList.push(tmp)
	}
	public deleteEvent(trackerIds: string[]): void{
		trackerIds.forEach(id => {
			const expiredIndex = this._onRoundStartEventList.findIndex(event => event.trackerId === id)
			this._onRoundStartEventList.splice(expiredIndex, 1);
		});
	}
}
export const onRoundStart = new onRoundStartClass();
