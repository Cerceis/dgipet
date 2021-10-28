const isNumber = x => Object.prototype.toString.call(x) === "[object Number]";
const iaaest = (arr)=> new Set( arr.map( x => Object.prototype.toString.call(x) ) ).size <= 1;

const saae = (arr,symbol)=>{
	return arr.reduce((f,l)=> iaaest(arr) && isNumber(f)?f + l:symbol?f +symbol+ l:f +" "+ l)
}
const ssp = (is)=>{
	let r = ""
	for(let i = 0 ; i<is.length ; i++ ){
		if(i%2 === 1) r += is[i]+is[i-1]
		if(i%2 === 0 && i===is.length-1) r += is[i]
	}
	return r
}
export const GCK = (is)=>{
	const sbsl = (a,b) => a.length > b.length ? "s"+b+a : a+b
	const reformat2asc = (t)=>{
		let r = ""
		for(let i = 0 ; i<t.length ; i++){
			if(i%2 === 1){ 
				r += sbsl(String(t.charCodeAt(i-1)),String(t.charCodeAt(i))) 
				if(i !== t.length-1 && i !== 0) r+="-"
			}
			if(i%2 === 0 && i===t.length-1) r += "e"+String(t.charCodeAt(i))
		}
		return r
	}
	const binc = (ipt)=>{
		let r = []
		ipt.split("-").forEach((e,i) => e[0] !== "e" && e[0] !== "s" ? r.push(String(Number(e)+(i+i*2))) : r.push(e))
		return r
	}
	return saae(binc(reformat2asc(ssp(is))),"-")
}
export const RCK = (is: string): string=>{
	let r: string = ""
	const cs = (t): string[]=>{
		if(t.length === 2) return [t.slice(0,1),t.substring(1)]
		if(t.length === 3) return [t.slice(0,1),t.substring(1)]
		if(t.length === 4) return [t.slice(0,2),t.substring(2)]
		if(t.length === 5) return [t.slice(0,2),t.substring(2)]
		if(t.length === 6) return [t.slice(0,3),t.substring(3)]
	}
	is.split("-").forEach((e,i) => {
		switch(e[0]){
			case "s":
				cs(e.substring(1)).forEach(e2=>{r += String.fromCharCode(Number(e2))})
				break
			case "e":
				r += String.fromCharCode(Number(e.substring(1)))
				break
			default :
				let strs = cs(String(Number(e)-(i+i*2)))
				r += String.fromCharCode(Number(strs[1]))+String.fromCharCode(Number(strs[0]))
		}
	})
	return r
}
