/*
	string: source,
	a: string to replace,
	b: replace to
*/
export const ReplaceAll = (string: string, a: string, b: string): string=>{
	const searchRegExp = new RegExp(a, 'g');
	return string.replace(searchRegExp, b)
}