export class Basic{

	public name: string = "";

	constructor(){}

	public eat(){
		console.log(`${this.name} is eating...`)
	}

	public sleep(){
		console.log(`${this.name} is sleeping...`)
	}
}