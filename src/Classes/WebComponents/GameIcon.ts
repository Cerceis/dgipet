export class GameIconComponent extends HTMLElement{
	constructor(){
		super();
		const width: string = this.getAttribute('width') ?? "24px"
		const height: string = this.getAttribute('height') ?? "24px"
		this.setAttribute('style', `width:${width}; height:${height};`)
		this.innerHTML = `
			<img width="${width}" height="${height}" src="./assets/images/gameIcons/${this.getAttribute('name')}.png"><img>
		`
	}
}