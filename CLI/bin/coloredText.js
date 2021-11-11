module.exports = (text, color = "red") => {
	switch(color){
		case "red": return `\u001b[1;31m${text}\u001b[0m`
	}
}