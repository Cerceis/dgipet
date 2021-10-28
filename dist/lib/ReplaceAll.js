/*
    string: source,
    a: string to replace,
    b: replace to
*/
export var ReplaceAll = function (string, a, b) {
    var searchRegExp = new RegExp(a, 'g');
    return string.replace(searchRegExp, b);
};
