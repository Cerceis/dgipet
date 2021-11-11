const coloredText = require("../coloredText.js");
const path = require("path")

module.exports = (file, pixelSize) => {
	const { exec } = require("child_process");
	const fs = require("fs");
	const config = JSON.parse(fs.readFileSync(`${process.cwd()}/dgpconfig.json`));
	const fileArr = file.split(".");
	const fileFormat = fileArr.pop();
	const filename = fileArr.join("")
	const spritePath = config.spritePath;
	if(fs.existsSync(`${spritePath}/${filename}`)) throw coloredText(`Folder "${filename}" already exist.`)
	else fs.mkdirSync(`${spritePath}/${filename}`)
	const targetFilePath = path.join(process.cwd(), `${spritePath}/${file}`)
	const resultFolderPath = path.join(process.cwd(), `${spritePath}/${filename}`)
	const cmd = `convert -crop ${pixelSize}x${pixelSize} +repage ${targetFilePath} ${resultFolderPath}/%03d.${fileFormat}`
	const cmd2 = `mv ${targetFilePath} ${resultFolderPath}`
	exec(`${cmd} && ${cmd2}`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
	});
}