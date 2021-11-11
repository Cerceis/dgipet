export class GameIconComponent extends HTMLElement {
    constructor() {
        var _a, _b;
        super();
        const width = (_a = this.getAttribute('width')) !== null && _a !== void 0 ? _a : "24px";
        const height = (_b = this.getAttribute('height')) !== null && _b !== void 0 ? _b : "24px";
        this.setAttribute('style', `width:${width}; height:${height};`);
        this.innerHTML = `
			<img width="${width}" height="${height}" src="./assets/images/gameIcons/${this.getAttribute('name')}.png"><img>
		`;
    }
}
