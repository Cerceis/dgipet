export class IconComponent extends HTMLElement{
	constructor(){
		super();
		const width = this.getAttribute('width') ?? "32px"
		const height = this.getAttribute('height') ?? "32px"
		this.innerHTML = `
			<img width="${width}" height="${height}" src="./assets/images/icons/i-${this.getAttribute('name')}.svg"><img>
		`
	}
}