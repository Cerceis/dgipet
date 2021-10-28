import { Animation } from "./Animation";

type updateTickMethod = "to" | "add" | "minus";

class AnimatorClass{

	private _globalInterval: any = 0;
	private _resources: Animation[] = [];
	private _tick = 0 ;

	constructor(tick: number){
		this._tick = tick;
	}

	public updateTick(method: updateTickMethod, tick: number): void{
		switch(method){
			case "to":
				this._tick = tick;
				break;
			case "add":
				this._tick += tick;
				break;
			case "minus":
				this._tick -= tick;		
				break;
		}
	} 

	public addResources(res: Animation | Animation[]): void{
		if(Array.isArray(res)) this._resources = [...this._resources, ...res];
		else this._resources.push(res);
	}

	public start():void {
		clearInterval(this._globalInterval);
		this._globalInterval = setInterval(()=>{
			this._resources.forEach(ani => {
				ani.next()
			})
		}, this._tick);
	} 
}

export const Animator = new AnimatorClass(300);