/*
    string: source,
    a: string to replace,
    b: replace to
*/
export const ReplaceAll = (string, a, b) => {
    const searchRegExp = new RegExp(a, 'g');
    return string.replace(searchRegExp, b);
};
