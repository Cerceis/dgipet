export class IconComponent extends HTMLElement {
    constructor() {
        var _a, _b;
        super();
        const width = (_a = this.getAttribute('width')) !== null && _a !== void 0 ? _a : "32px";
        const height = (_b = this.getAttribute('height')) !== null && _b !== void 0 ? _b : "32px";
        this.innerHTML = `
			<img width="${width}" height="${height}" src="./assets/images/icons/i-${this.getAttribute('name')}.svg"><img>
		`;
    }
}
