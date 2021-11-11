#! /usr/bin/env node
const yargs = require("yargs");
const path = require("path");
const fs = require("fs");
const titleText = require("./text.js")
const coloredText = require("./coloredText.js")
const cmdInit = require("./cmd/init.js")
const cmdSprite = require("./cmd/sprite.js")
const genSe = require("./cmd/generate_status_effect.js")
console.log(titleText)

const usage = "\nUsage: tran <lang_name> sentence to be translated";
const options = yargs  
	.usage(usage)  
	.option("init", {alias:"languages", describe: "List all supported languages.", type: "boolean", demandOption: false })                                                                                                    
	.help(false)  
	.argv;

const args = yargs.argv._
const commandMap = {
	"init":{},
	"g":{
		"s":{},
		"c":{},
		"i":{},
		"se":{
			"?": {
				"?": true
			}
		}
	},
	"sprite": {
		"?": true
	}
}

//Check valid arg
const checkValidArg = (args, depth, current = 0, lastPath = null, optionalReached = false) => {
	if(args.length === 0) return true
	if(optionalReached) return true
	if(lastPath && lastPath["?"]) {
		optionalReached = true
	}
	lastPath = commandMap[args[current]];
	current ++;
	depth--;
	if(!lastPath) return true
	if(depth > 1) return checkValidArg(args, depth, current, lastPath, optionalReached)
	return true
}
checkValidArg(yargs.argv._, yargs.argv._.length)

//Check is config is inited
const configExist = fs.existsSync(`${process.cwd()}/dgpconfig.json`)
if(!configExist && args[0] !== "init") throw coloredText("File path not initiated, run 'dgp init' to initialize current path as root.");

if( args[0] === "init" ){
	cmdInit();
	return 0
}
if( args[0] === "sprite" ){
	if(!args[1]) throw coloredText("No file specified")
	if(!args[2]) throw coloredText("No size specified")
	cmdSprite(args[1], args[2]);
	return 0
}

if( args[0] === "g" ){
	if(!args[1]) throw coloredText("No operation specified, s: Skill, se: Status Effect, c: Character, i: Item")
	if(!args[2]) throw coloredText("No name specified")

	switch(args[1]){
		case "se":
			genSe(args[2])
			break
	}

	return 0
}




