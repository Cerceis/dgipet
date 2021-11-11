import { AttributeElement } from "../Types/AttributeElement.js"
const eleCounterMap = {
	"Fire": {
		"Fire":1,
		"Water":0.5,
		"Ice":1,
		"Wind":1.5,
		"Electro":1,
		"Earth":1,
		"Nature":2,
		"None":1.5,
		"Holy":1,
		"Dark":1
	},
	"Water": {
		"Fire":2,
		"Water":1,
		"Ice":1.5,
		"Wind":1,
		"Electro":0.5,
		"Earth":1,
		"Nature":1,
		"None":1.5,
		"Holy":1,
		"Dark":1
	},
	"Ice": {
		"Fire":1,
		"Water":1.5,
		"Ice":1,
		"Wind":2,
		"Electro":1,
		"Earth":1,
		"Nature":0.5,
		"None":1.5,
		"Holy":1,
		"Dark":1
	},
	"Wind": {
		"Fire":1,
		"Water":1,
		"Ice":0.5,
		"Wind":1,
		"Electro":1.5,
		"Earth":2,
		"Nature":1,
		"None":1.5,
		"Holy":1,
		"Dark":1
	},
	"Electro": {
		"Fire":1,
		"Water":2,
		"Ice":1,
		"Wind":1,
		"Electro":1,
		"Earth":0.5,
		"Nature":1.5,
		"None":1.5,
		"Holy":1,
		"Dark":1
	},
	"Earth": {
		"Fire":1.5,
		"Water":1,
		"Ice":1,
		"Wind":0.5,
		"Electro":2,
		"Earth":1,
		"Nature":1,
		"None":1.5,
		"Holy":1,
		"Dark":1
	},
	"Nature": {
		"Fire":0.5,
		"Water":1,
		"Ice":2,
		"Wind":1,
		"Electro":1,
		"Earth":1.5,
		"Nature":1,
		"None":1.5,
		"Holy":1,
		"Dark":1
	},
	"None": {
		"Fire":1,
		"Water":1,
		"Ice":1,
		"Wind":1,
		"Electro":1,
		"Earth":1,
		"Nature":1,
		"None":1,
		"Holy":2,
		"Dark":2
	},
	"Holy": {
		"Fire":1,
		"Water":1,
		"Ice":1,
		"Wind":1,
		"Electro":1,
		"Earth":1,
		"Nature":1,
		"None":0.5,
		"Holy":1,
		"Dark":2
	},
	"Dark": {
		"Fire":1,
		"Water":1,
		"Ice":1,
		"Wind":1,
		"Electro":1,
		"Earth":1,
		"Nature":1,
		"None":0.5,
		"Holy":2,
		"Dark":1
	}
}

export const calEleCounter = (attackerEle: AttributeElement[], defenderEle: AttributeElement[]): number=>{
	let multiplier = 1;
	attackerEle.forEach(aEle => {
		defenderEle.forEach(dEle => {
			multiplier *= eleCounterMap[aEle][dEle]
		})
	})
	return multiplier
}






