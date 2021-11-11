const fs = require("fs");
const coloredText = require("../coloredText.js")

module.exports = () => {
	const configPath = `${process.cwd()}/dgpconfig.json`
	if(fs.existsSync(configPath)) throw coloredText("Path already initalized.")
	const content = `{	
	"src":"./src",
	"spritePath":"./assets/sprites/"
}
	`
	fs.writeFileSync(configPath, content)
}