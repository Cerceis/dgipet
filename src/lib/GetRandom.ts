//Return array
//arr: Array to select random from
//no: number of random result
export const GetRandom = (arr: any, no: number = 1, unique: boolean = false): any[] => {
	let tmp = []
	for(;no>0; no--)
		tmp.push(arr[Math.floor(Math.random()*arr.length)])
	return tmp
}