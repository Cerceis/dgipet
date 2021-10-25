//Return array
//arr: Array to select random from
//no: number of random result
export var GetRandom = function (arr, no, unique) {
    if (no === void 0) { no = 1; }
    if (unique === void 0) { unique = false; }
    var tmp = [];
    for (; no > 0; no--)
        tmp.push(arr[Math.floor(Math.random() * arr.length)]);
    return tmp;
};
