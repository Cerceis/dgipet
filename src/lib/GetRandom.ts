//Return array
//arr: Array to select random from
//no: number of random result
export const GetRandom = (arr: any, no: number = 1, unique: boolean = false): any[] => {
	let tmp = []
	if(!unique && no > arr.length) throw "Required number is bigger than input array's length."
	for(;no>0; no--){
		tmp.push(
			unique ? 
			arr.splice(Math.floor(Math.random()*arr.length),1) :
			tmp.push(arr[Math.floor(Math.random()*arr.length)])
		)
	}
	return tmp
} 